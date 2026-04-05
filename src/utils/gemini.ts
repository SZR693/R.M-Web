import { GoogleGenerativeAI } from "@google/generative-ai";

// @ts-ignore
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

async function fileToGenerativePart(file: File) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise as string, mimeType: file.type },
  };
}

export const getGeminiResponse = async (userMessage: string, history: string, imageFile?: File | null) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: "Tu es l'expert de l'agence R.M Web Design. Ton ton est luxueux et concis (4 lignes max, utilise des emojis/puces). Services: Site, SEO, IA, Automatisation. Redirige toujours vers le bouton Contact. Si image: fait un audit UX rapide."
    });

    const promptParts: any[] = [`Historique:\n${history}\n\nClient: ${userMessage || "Analyse mon image."}`];
    
    if (imageFile) {
      const imagePart = await fileToGenerativePart(imageFile);
      promptParts.push(imagePart);
    }

    const result = await model.generateContent(promptParts);
    return result.response.text();
    
  } catch (error: any) {
    console.error("Erreur Gemini :", error.message);
    if (error.message.includes("429")) return "Je réfléchis un peu trop vite ☕ ! Attendez une petite minute avant le prochain message.";
    return "Petit souci technique. Contactez-nous via le bouton Contact !";
  }
};