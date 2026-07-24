# DekhoAurDekhao API (local/testing backend)

A lightweight Express backend for the DekhoAurDekhao frontend. Uses a JSON
file (`data/db.json`) instead of MongoDB, so there's nothing to install or
configure — good for local development and testing before you deploy a real
database.

## Run it

```bash
cd backend
npm install
cp .env.example .env   # optional — defaults work out of the box
npm run dev            # http://localhost:4000
```

Then, in another terminal, run the frontend as usual (`npm run dev` from the
project root) — it talks to this API at `http://localhost:4000/api` by
default (see the root `.env.example` / `VITE_API_URL`).

## Endpoints

| Method | Path                | Auth | Description |
|--------|---------------------|------|-------------|
| GET    | `/api/health`       | —    | Health check |
| POST   | `/api/auth/signup`  | —    | `{ name, email, password }` → `{ token, user }` |
| POST   | `/api/auth/login`   | —    | `{ email, password }` → `{ token, user }` |
| GET    | `/api/auth/me`      | JWT  | Returns the logged-in user |
| GET    | `/api/places`       | —    | Query params: `district`, `category`, `q` |
| GET    | `/api/places/:id`   | —    | Single place |
| POST   | `/api/places`       | JWT  | `multipart/form-data` — text fields + `images[]` / `videos[]` files |

Auth uses a `Bearer <token>` header. Tokens are signed JWTs valid for 7 days
(`JWT_SECRET` in `.env` — change it before deploying anywhere real).

Uploaded photos/videos are saved to `backend/uploads/` and served statically
at `/uploads/<filename>`.

## Data storage

Everything lives in `data/db.json` (`{ users: [...], places: [...] }`),
read/written through `utils/db.js`. That's the **only file you need to swap**
to move to a real database — replace `readDb`/`writeDb` with Mongoose model
calls and the routes don't need to change.

### Moving to MongoDB later

1. `npm install mongoose`
2. Define `User` and `Place` schemas matching the shapes already used here
   (see `data/db.json` for the place shape, and `routes/auth.js` for the user
   shape — note passwords are stored as `passwordHash`, never plain text).
3. Replace the `readDb()/writeDb()` calls in `routes/auth.js` and
   `routes/places.js` with the equivalent Mongoose queries.
4. Swap local `uploads/` storage for Cloudinary/S3 if you want it deployed
   somewhere the filesystem isn't persistent (e.g. most serverless hosts).

## Security notes for going further

- Passwords are hashed with bcrypt — never logged or returned in API responses.
- Add rate limiting (e.g. `express-rate-limit`) on `/api/auth/*` before
  deploying publicly.
- Add a moderation step by defaulting new submissions to `status: "pending"`
  in `routes/places.js` and adding an admin-only `PATCH /api/places/:id`
  route to approve them.
