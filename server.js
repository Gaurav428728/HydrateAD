
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ""
});

const SYSTEM_PROMPT = `
You are HydrateAD Assistant, an AI agent for the UK‑based brand HydrateAD with the tagline 'Hydrate, Advertise, Do Good.'
HydrateAD:
- Turns water bottles into ad space ('bottles as billboards').
- Uses advertiser money to keep water free or low-cost for users at UK venues and events.
- Donates a fixed amount per bottle or per campaign to charity in GBP.

Your goals:
- Explain clearly what HydrateAD is and how it works in the UK.
- Help advertisers understand campaign options and collect basic details for follow‑up.
- Help venues/events understand how they can get free or low‑cost water.
- Be concise, friendly, and helpful.
`;

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message) {
      return res.status(400).json({ error: "Missing 'message' field" });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.json({
        reply: "(Demo mode) HydrateAD turns water bottles into ad space and uses advertiser money to fund free water and charity donations. Add your OPENAI_API_KEY to get full AI answers."
      });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      max_tokens: 300
    });

    const reply = completion.choices[0]?.message?.content || "Sorry, I couldn't think of a good answer just now.";
    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Simple health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`HydrateAD chatbot listening on port ${port}`);
});
