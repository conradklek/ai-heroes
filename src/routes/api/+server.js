import { OPENAI_API_KEY, STABILITY_API_KEY, BLOB_READ_WRITE_TOKEN, POSTGRES_URL_NON_POOLING } from "$env/static/private"
import { createClient } from "@vercel/postgres"
import { put } from "@vercel/blob"
import { json } from "@sveltejs/kit"
import OpenAI from "openai"

const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

const system = "You are helping the user create cards for a fantasy trading card game. The user will provide some detail, your job is to creatively imagine the missing details when using the generate_character function."
const temperature = 1.0
const model = "gpt-4-0613"

const functions = [
	{
		"name": "generate_character",
		"description": "Generate a character for the game",
		"parameters": {
			"type": "object",
			"properties": {
				"name": {
					"type": "string",
					"description": "The name of the character. If the user is vague, make up a creative name for the character."
				},
				"description": {
					"type": "string",
					"description": "A brief one or two sentence introduction of the character. Do not include the character's name in this description"
				},
				"image_description": {
					"type": "string",
					"description": "Describe the character as if you were describing it to an artist. Use as many descriptive keywords as you can"
				},
				"background_image_description": {
					"type": "string",
					"description": "Describe a background enviornment scene using only descriptive keywords. Do not include the character in this description"
				}
			},
			"required": ["name", "description", "image_description", "background_image_description"]
		}
	}
]

async function generate_image(fetch, prompt, samples = 1, steps = 50, cfg_scale = 10, clip_guidance_preset = "FAST_BLUE") {
	let engineId = "stable-diffusion-xl-1024-v1-0"
	let apiHost = "https://api.stability.ai"
	const response = await fetch(`${apiHost}/v1/generation/${engineId}/text-to-image`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${STABILITY_API_KEY}`,
			},
			body: JSON.stringify({
				text_prompts: [{ text: prompt }],
				cfg_scale,
				clip_guidance_preset,
				height: 1024,
				width: 1024,
				style_preset: "fantasy-art",
				samples,
				steps
			})
		}
	)
	let data = await response.json()
	let images = []
	data.artifacts.forEach(async (image) => {
		let buffer = Buffer.from(image.base64, "base64")
		let uuid = crypto.randomUUID()
		let file = new File([buffer], uuid + ".png", { type: "image/png" })
		let { url } = await put(uuid + ".png", file, { access: "public", token: BLOB_READ_WRITE_TOKEN })
		images.push(url)
	})
	return new Promise((resolve, reject) => {
		let interval = setInterval(() => {
			if (images.length === samples) {
				clearInterval(interval)
				resolve(images)
			}
		}, 100)
	})
}

async function generate_character(name, description, image_description, background_image_description, fetch) {
	let rarityLevels = ["common", "common", "common", "common", "rare", "rare", "rare", "epic", "epic", "legendary"]
	let rarityIndex = Math.floor(Math.random() * rarityLevels.length)
	let rarity = rarityLevels[rarityIndex]
	let scalingRatio = { "common": 1, "uncommon": 1.5, "rare": 2, "epic": 2.5, "legendary": 3 }
	let baseHealth = 100
	let baseDamage = 50
	let health = baseHealth * scalingRatio[rarity]
	let damage = baseDamage * scalingRatio[rarity]
	let [images, background_images] = await Promise.all([generate_image(fetch, image_description, 1), generate_image(fetch, background_image_description, 1)])
	let image = images[0]
	let background_image = background_images[0]
	let card = { name, description, image, image_description, background_images, background_image, background_image_description, rarity, health, damage }
	console.log(card)
	return card
}

async function chat(message, fetch) {
	let messages = [{
		role: "system",
		content: system
	}, {
		role: "user",
		content: message
	}]
	try {
		let response = await openai.chat.completions.create({ model, messages, functions, temperature })
		let responseMessage = response.choices[0].message
		if (responseMessage.function_call) {
			let availableFunctions = { generate_character }
			let functionName = responseMessage.function_call.name
			let functionToCall = availableFunctions[functionName]
			let functionArgs = {...JSON.parse(responseMessage.function_call.arguments), fetch }
			let functionResponse = await functionToCall(...Object.values(functionArgs))
			let message = { role: "assistant", content: "", function_call: responseMessage.function_call }
			messages = [...messages, message]
			message = { role: "function", name: functionName, content: functionResponse }
			messages = [...messages, message]
			return { success: true, card: functionResponse, messages }
		} else {
			let message = { role: "assistant", content: responseMessage.content }
			messages = [...messages, message]
			return { success: false, message: "Function not called. Please try again." }
		}
	} catch (error) {
		console.error(error)
	}
}

export async function POST({ request, fetch }) {
	let { user, data } = await request.json()
	if (!data?.length) return json({ success: false, message: "Please provide a message" })
	const client = createClient({ connectionString: POSTGRES_URL_NON_POOLING })
	await client.connect()
	let message = `Please generate a character with the following details:\n\n${data}.\n\nDo not ask for additional details.`
	let response = await chat(message, fetch)
	if (response.success) {
		let card = response.card
		await client.query(`
			INSERT INTO cards (user_id, name, description, image, image_description, images, background_image, background_image_description, background_images, rarity, health, damage)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
		`, [user, card.name, card.description, card.image, card.image_description, card.images, card.background_image, card.background_image_description, card.background_images, card.rarity, card.health, card.damage])
		await client.end()
		return json({ success: true, card })
	} else {
		await client.end()
		return json({ success: false, message: response.message })
	}
}
