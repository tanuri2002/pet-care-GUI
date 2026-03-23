# Deploying this repo to Vercel

Two options: web UI (recommended) or CLI (requires login or a `VERCEL_TOKEN`).

1) Using Vercel web dashboard (recommended):
   - Go to https://vercel.com and sign in with GitHub.
   - Click "New Project" → Import Git Repository → choose `tanuri2002/pet-care-GUI`.
   - For Project Settings set:
     - Framework Preset: `Create React App` (or leave auto-detected)
     - Build Command: `npm run build`
     - Output Directory: `build`
   - Deploy. Your frontend will be live. If you need the backend deployed too, see note below.

2) Using Vercel CLI (local):
   - Install CLI: `npm i -g vercel`
   - Login: `vercel login` (opens browser) OR set `VERCEL_TOKEN` environment variable.
   - From repo root run: `vercel --prod` to deploy once, or `vercel` for interactive deploy.

Backend note:
- The repository contains an Express backend in `backend/` which currently runs as a long-lived Node server. Vercel expects serverless functions or separate services.
- Options:
  - Deploy backend separately (Render, Railway, or a VPS) and set the frontend to call that URL.
  - Refactor selected endpoints into Vercel Serverless Functions under an `/api` directory (I can help with this).

If you want me to finish the deploy from here, provide a `VERCEL_TOKEN` (temporary) or authorize the Vercel CLI on this machine and I will run `vercel --prod` and confirm the deployment.
