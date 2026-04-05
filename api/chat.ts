// api/chat.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

declare var process: {
  env: {
    [key: string]: string | undefined;
  };
};

// Ici, on utilise process.env (côté serveur) et NON import.meta.env
// La clé n'a PAS de préfixe VITE_, elle reste donc secrète

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY manquante");
    return res.status(500).json({ error: "Clé Gemini manquante sur le serveur" });
  }

  try {
    const { userMessage, history, imageBase64, mimeType } = req.body;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: "Tu es l'expert de l'agence R.M Web Design. Ton ton est luxueux et concis (4 lignes max, utilise des emojis/puces). Services: Site, SEO, IA, Automatisation. Redirige toujours vers le bouton Contact. Si image: fait un audit UX rapide."
    });

    const promptParts: any[] = [`Historique:\n${history}\n\nClient: ${userMessage || "Analyse mon image."}`];
    if (imageBase64 && mimeType) {
      promptParts.push({
        inlineData: { data: imageBase64, mimeType }
      });
    }

    const result = await model.generateContent(promptParts);
    const text = extractTextFromResult(result);
    return res.status(200).json({ text });
  } catch (error: any) {
    console.error("Erreur serveur Gemini :", error);
    return res.status(500).json({ error: error?.message ?? "Erreur interne du serveur" });
  }
}

function extractTextFromResult(result: any) {
  const content = result?.response?.candidates?.[0]?.content;
  if (!content?.parts) {
    return "Désolé, je n'ai pas pu générer de réponse.";
  }

  return content.parts
    .map((part: any) => {
      if (typeof part.text === "string") {
        return part.text;
      }
      if (part.executableCode?.code) {
        return `\n\`\`\`${part.executableCode.language}\n${part.executableCode.code}\n\`\`\`\n`;
      }
      if (part.codeExecutionResult?.output) {
        return `\n\`\`\`\n${part.codeExecutionResult.output}\n\`\`\`\n`;
      }
      return "";
    })
    .join("");
}
