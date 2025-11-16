
# HydrateAD Node.js Chatbot (Render + GitHub Ready)

## What this is

- Node.js + Express backend
- `/api/chat` endpoint using OpenAI (`gpt-4.1-mini`)
- Frontend chat UI in `public/`
- `render.yaml` ready for Render deployment

## Local usage

```bash
npm install
cp .env.example .env
# edit .env and put your real OPENAI_API_KEY
npm start
```

Then open: http://localhost:3000

## Deploy to Render

1. Push this folder to a GitHub repository.
2. In Render, create a **New Web Service** from that repo.
3. Render will detect Node automatically:
   - Build command: `npm install`
   - Start command: `npm start`
4. Add environment variable in Render:
   - `OPENAI_API_KEY = your-key`
5. Deploy. Your bot will be live at e.g.
   `https://your-app-name.onrender.com`
