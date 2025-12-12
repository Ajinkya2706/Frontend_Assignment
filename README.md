# PrimeTrade Notes – Full-Stack Assignment

React (Vite) frontend + Express/MongoDB backend with JWT auth and CRUD notes.

## Setup

1. Create env files from samples:
   - `server/env.sample` -> `.env`
   - `client/env.sample` -> `.env`
2. Install deps:
   - Backend: `cd server && npm install`
   - Frontend: `cd client && npm install`
3. Run dev servers:
   - API: `npm run dev` (defaults to `http://localhost:5000`)
   - UI: `npm run dev` in `client` (Vite prompts the port, e.g. 5173)

## API (summary)

- `POST /api/auth/register` — name, email, password → `{token, user}`
- `POST /api/auth/login` — email, password → `{token, user}`
- `GET /api/profile` — Bearer token → profile
- `PUT /api/profile` — `{name}` → updated profile
- `GET /api/notes?q=&tag=&pinned=` — list notes
- `POST /api/notes` — `{title, body?, tags?, pinned?}` → note
- `PUT /api/notes/:id` — same body → note
- `DELETE /api/notes/:id` — remove note

Auth: `Authorization: Bearer <token>`. Passwords hashed with bcrypt, JWT signed via `JWT_SECRET`.

## Production/scale notes

- API ready for containerization; add rate limiting + request logging to centralized sink.
- Use a dedicated Mongo cluster with indexes on `{userId, updatedAt}` and `{userId, title text}`.
- Serve the React build via CDN/reverse proxy; enable HTTPS-only cookies if moved server-side.
- Split services by domain (auth/notes) and add background workers for heavy tasks or audits.

## Testing

- Backend: hit `/health` then auth → CRUD via Postman (collection mirrors routes above).
- Frontend: login/register flows, create/update/delete notes, search text + pinned filter, logout.

