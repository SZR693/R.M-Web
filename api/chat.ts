// api/chat.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  const { message, history, image, mimeType } = req.body;

  // Validation des inputs
  if (message !== undefined && (typeof message !== "string" || message.length > 2000)) {
    return res.status(400).json({ error: "invalid_message" });
  }
  if (history !== undefined && (typeof history !== "string" || history.length > 10000)) {
    return res.status(400).json({ error: "history_too_long" });
  }
  if (image && !ALLOWED_MIME.includes(mimeType)) {
    return res.status(400).json({ error: "invalid_mime" });
  }
  if (!message && !image) {
    return res.status(400).json({ error: "empty_request" });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction:
        "Tu es l'expert de l'agence R.M Web Design. Ton ton est luxueux et concis (4 lignes max, utilise des emojis/puces). Services: Site, SEO, IA, Automatisation. Redirige toujours vers le bouton Contact. Si image: fait un audit UX rapide.",
    });

    const promptParts: any[] = [
      `Historique:\n${history || ""}\n\nClient: ${message || "Analyse mon image."}`,
    ];

    if (image && mimeType) {
      promptParts.push({ inlineData: { data: image, mimeType } });
    }

    const result = await model.generateContent(promptParts);
    return res.status(200).json({ text: result.response.text() });

  } catch (error: any) {
    console.error("Gemini error:", error.message);
    if (error.message?.includes("429")) {
      return res.status(429).json({ error: "rate_limit" });
    }
    return res.status(500).json({ error: "internal" });
  }
}