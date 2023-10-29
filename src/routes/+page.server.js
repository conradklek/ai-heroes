import { POSTGRES_URL_NON_POOLING } from "$env/static/private"
import { createClient } from "@vercel/postgres"

export async function load({ locals }) {
	const client = createClient({ connectionString: POSTGRES_URL_NON_POOLING })
	await client.connect()
	const cards = await client.query("SELECT * FROM cards")
	await client.end()
	return {
		user: locals.user,
		cards: cards.rows
	}
}
