// Vercel Serverless Function for Neon Postgres
// Set DATABASE_URL in Vercel env vars (Neon connection string)

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const rows = await sql`SELECT * FROM tests ORDER BY created_at DESC`;
    return res.status(200).json(rows);
  }
  if (req.method === 'POST') {
    const body = req.body;
    const result = await sql`
      INSERT INTO tests (data) VALUES (${JSON.stringify(body)})
      RETURNING id
    `;
    return res.status(201).json(result[0]);
  }
  if (req.method === 'PUT') {
    const { id, ...data } = req.body;
    await sql`UPDATE tests SET data = ${JSON.stringify(data)} WHERE id = ${id}`;
    return res.status(200).json({ ok: true });
  }
  res.status(405).end();
}
