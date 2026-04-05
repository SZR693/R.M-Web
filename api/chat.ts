// api/chat.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

declare var process: {
  env: {
    [key: string]: string | undefined;
  };
};

// Ici, on utilise process.env (côté serveur) et NON import.meta.env
// La clé n'a PAS de préfixe VITE_, elle reste donc secrète
const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export default async function handler(req: any, res: any) {
  // On n'accepte que les requêtes POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    // On récupère les données envoyées par ton frontend
    const { userMessage, history, imageBase64, mimeType } = req.body;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "Tu es l'expert de l'agence R.M Web Design. Ton ton est luxueux et concis (4 lignes max, utilise des emojis/puces). Services: Site, SEO, IA, Automatisation. Redirige toujours vers le bouton Contact. Si image: fait un audit UX rapide."
    });

    const promptParts: any[] = [`Historique:\n${history}\n\nClient: ${userMessage || "Analyse mon image."}`];
    
    // Si une image a été envoyée, on l'ajoute au prompt
    if (imageBase64 && mimeType) {
      promptParts.push({
        inlineData: { data: imageBase64, mimeType: mimeType }
      });
    }

    const result = await model.generateContent(promptParts);
    
    // On renvoie la réponse au frontend
    res.status(200).json({ text: result.response.text() });
    
  } catch (error: any) {
    console.error("Erreur serveur Gemini :", error);
    res.status(500).json({ error: error.message });
  }
}