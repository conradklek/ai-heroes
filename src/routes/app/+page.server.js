import { POSTGRES_URL_NON_POOLING } from "$env/static/private"
import { createClient } from "@vercel/postgres"
import { redirect } from "@sveltejs/kit"

export async function load({ cookies, locals }) {
	if (!cookies.get("session") || !locals.user) throw redirect(307, "/sign-in")
	const client = createClient({ connectionString: POSTGRES_URL_NON_POOLING })
	await client.connect()
	const cards = await client.query("SELECT * FROM cards WHERE user_id = $1 ORDER BY created_at DESC", [locals.user.id])
	await client.end()
	if (cards.rows.length > 0) {
		return { user: locals.user, cards: cards.rows }
	}
	return { user: locals.user, cards: null }
}

export const actions = {
	logout: async ({ cookies }) => {
		const client = createClient({ connectionString: POSTGRES_URL_NON_POOLING })
		await client.connect()
		const token = cookies.get("session")
		await client.query("DELETE FROM sessions WHERE session = $1", [token])
		await client.end()
		cookies.set("session", "")
		return { type: "redirect", location: "/sign-in" }
	}
}
