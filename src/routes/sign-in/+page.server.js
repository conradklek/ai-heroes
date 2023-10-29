import { JWT_SECRET, POSTGRES_URL_NON_POOLING } from "$env/static/private"
import { createClient } from "@vercel/postgres"
import { fail } from "@sveltejs/kit"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const actions = {
	login: async ({ request, cookies, locals }) => {
		const client = createClient({ connectionString: POSTGRES_URL_NON_POOLING })
		await client.connect()
		const data = await request.formData()
		const body = Object.fromEntries(data.entries())
		const { email, password } = body
		const result = await client.query(`SELECT * FROM customers WHERE email = $1`, [email])
		if (result.rows.length === 0) {
			await client.end()
			return fail(400, { error: "Invalid email or password" })
		}
		const hashedPassword = result.rows[0].password
		const passwordMatch = await bcrypt.compare(password, hashedPassword)
		if (!passwordMatch) {
			await client.end()
			return fail(400, { error: "Invalid email or password" })
		}
		const user = result.rows[0]
		const existingSession = await client.query(`SELECT * FROM sessions WHERE user_id = $1`, [user.id])
		if (existingSession.rows.length > 0) {
			await client.query(`DELETE FROM sessions WHERE user_id = $1`, [user.id])
		}
		const token = jwt.sign(user, JWT_SECRET)
		await client.query(`INSERT INTO sessions (user_id, session) VALUES ($1, $2)`, [user.id, token])
		await client.end()
		cookies.set("session", token)
		locals.user = user
		return { type: "redirect", location: "/app" }
	}
}

export async function load({ cookies }) {
	const client = createClient({ connectionString: POSTGRES_URL_NON_POOLING })
	await client.connect()
	const token = cookies.get("session")
	if (!token) {
		await client.end()
		return { user: null }
	}
	const session = await client.query(`SELECT * FROM sessions WHERE session = $1`, [token])
	if (session.rows.length === 0) {
		await client.end()
		return { user: null }
	}
	const user = await client.query(`SELECT * FROM customers WHERE id = $1`, [session.rows[0].user_id])
	await client.end()
	return {
		user: {
			id: user.rows[0].id,
			firstName: user.rows[0].first_name,
			lastName: user.rows[0].last_name,
			email: user.rows[0].email
		}
	}
}
