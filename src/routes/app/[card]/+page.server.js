import { createClient } from "@vercel/postgres"
import { POSTGRES_URL_NON_POOLING } from "$env/static/private"
import { redirect } from "@sveltejs/kit"

export async function load({ locals, params }) {
	const client = createClient({ connectionString: POSTGRES_URL_NON_POOLING })
	await client.connect()
	const cards = await client.query("SELECT * FROM cards WHERE id = $1", [params.card])
	await client.end()
	if (cards.rows.length > 0) {
		return { user: locals.user, card: cards.rows[0] }
	} else {
		throw redirect(307, "/sign-in")
	}
}

export const actions = {
	delete: async ({ locals, params }) => {
		const client = createClient({ connectionString: POSTGRES_URL_NON_POOLING })
		await client.connect()
		const card = await client.query(`SELECT * FROM cards WHERE id = $1`, [params.card])
		if (card.rows.length === 0) {
			await client.end()
			return { type: "redirect", location: "/app" }
		}
		if (card.rows[0].user_id !== locals.user.id) {
			await client.end()
			return { type: "redirect", location: "/app" }
		}
		await client.query(`DELETE FROM cards WHERE id = $1`, [params.card])
		await client.end()
		return { type: "redirect", location: "/app" }
	}
}
