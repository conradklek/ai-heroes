import { POSTGRES_URL_NON_POOLING } from "$env/static/private"
import { createClient } from "@vercel/postgres"

export async function handle({ event, resolve }) {
	if (!event.route.id?.startsWith("/app")) return resolve(event)
	const token = event.cookies.get("session")
	if (!token) return resolve(event)
	const client = createClient({ connectionString: POSTGRES_URL_NON_POOLING })
	await client.connect()
	/*
	await client.query(`
		CREATE TABLE IF NOT EXISTS sessions (
			id SERIAL PRIMARY KEY,
			user_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
			session TEXT NOT NULL
		);
	`)
	await client.query(`
		CREATE TABLE IF NOT EXISTS customers (
			id SERIAL PRIMARY KEY,
			first_name TEXT NOT NULL,
			last_name TEXT NOT NULL,
			email TEXT NOT NULL UNIQUE,
			password TEXT NOT NULL
		);
	`)
	await client.query(`
		CREATE TABLE IF NOT EXISTS cards (
			id SERIAL PRIMARY KEY,
			user_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
			name TEXT NOT NULL,
			description TEXT NOT NULL,
			image TEXT NOT NULL,
			image_description TEXT NOT NULL,
			images TEXT[] NOT NULL,
			background_image TEXT NOT NULL,
			background_image_description TEXT NOT NULL,
			background_images TEXT[] NOT NULL,
			rarity TEXT NOT NULL,
			health INTEGER NOT NULL,
			damage INTEGER NOT NULL,
			created_at TIMESTAMP NOT NULL DEFAULT NOW(),
			updated_at TIMESTAMP NOT NULL DEFAULT NOW()
		);
	`)
	*/
	const session = await client.query(`SELECT * FROM sessions WHERE session = $1`, [token])
	if (session.rows.length === 0) {
		await client.end()
		return resolve(event)
	}
	const user = await client.query(`SELECT * FROM customers WHERE id = $1`, [session.rows[0].user_id])
	event.locals.user = user.rows[0]
	await client.end()
	return resolve(event)
}
