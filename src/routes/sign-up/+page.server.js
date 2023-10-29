import { POSTGRES_URL_NON_POOLING } from "$env/static/private"
import { createClient } from "@vercel/postgres"
import { fail } from "@sveltejs/kit"
import bcrypt from "bcrypt"

export const actions = {
	signup: async ({ request }) => {
		const client = createClient({ connectionString: POSTGRES_URL_NON_POOLING })
		await client.connect()
		const data = await request.formData()
		const body = Object.fromEntries(data.entries())
		const { email, password, first_name, last_name } = body
		if (!email || !password || !first_name || !last_name) {
			await client.end()
			return fail(400, { error: "Missing required fields" })
		}
		const hashedPassword = await bcrypt.hash(password, 10)
		await client.query("INSERT INTO customers (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)", [first_name, last_name, email, hashedPassword])
		await client.end()
		return { success: true, type: "redirect", location: "/sign-in" }
	}
}
