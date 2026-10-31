# WD Test Log — Vercel + Neon

## Deploy
1. Push this folder to a GitHub repo
2. Import into Vercel
3. Add Neon integration or set DATABASE_URL env var
4. Run the SQL below in Neon console

## SQL (run once in Neon)
CREATE TABLE tests (
  id SERIAL PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

## Notes
- Current index.html still uses localStorage by default
- To switch to permanent storage, update the JS getDB/setDB functions to call /api/tests
- Version shown in header
