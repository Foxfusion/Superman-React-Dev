# Superman React Dev

Canonical repository for the Project Nuclear / Superman React application.

This repo consolidates the active code from the older Nuclear/Superman experiments into one maintained codebase.

## Structure

- `frontend/` — React application
- `backend/` — Express + JWT + MySQL API
- `backend/routes/scrape.routes.js` — Project Archlight scrape queue integration

## Consolidated capabilities

- JWT login and `/api/auth/me`
- Protected project CRUD API
- MySQL health check
- Scrape queue and throttle API
- Idle-session logout
- Environment-variable based secrets/configuration

## Local setup

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm start
```

Do not commit real `.env` files, IDE metadata, `node_modules`, passwords, tokens, or production credentials.

See `docs/CONSOLIDATION.md` for the repository consolidation notes.
