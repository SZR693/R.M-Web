import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

// 1. On définit l'identité de l'agence (System Instruction)
const SYSTEM_PROMPT = `
  Tu es l'assistant de l'agence "R.M Web". Ton ton est luxueux, expert et concis (4-5 lignes max).
  SERVICES : Starter (Vitrine), Croissance (SEO/Ads), Premium (IA/E-commerce).
  RÈGLES : Pas de prix (devis sur-mesure), redirige vers le bouton "Contact". 
  Si image : audit UX rapide (1 top, 2 flops).
  Termine toujours par une invitation au bouton "Contact". ✨🚀
`;

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
    // 🟢 CHANGEMENT MAJEUR : On utilise gemini-1.5-flash (plus stable pour les quotas gratuits)
    // Et on injecte le SYSTEM_PROMPT séparément.
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT, 
    });

    const promptParts: any[] = [`Voici l'historique : ${history}\n\nClient : ${userMessage || "Analyse mon image."}`];
    
    if (imageFile) {
      const imagePart = await fileToGenerativePart(imageFile);
      promptParts.push(imagePart);
    }

    const result = await model.generateContent(promptParts);
    return result.response.text();
    
  } catch (error: any) {
    console.error("Erreur Gemini :", error.message);
    if (error.message.includes("429")) return "Je reçois trop de messages ! Attendez 30s et réessayez. ✨";
    return "Petit souci technique. Contactez-nous via le bouton Contact !";
  }
};