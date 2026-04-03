import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || "";
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
    // 🟢 Utilisation de la syntaxe la plus simple possible pour éviter le 404
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // On remet les instructions dans le prompt mais de façon très courte
    const instructionCourte = `Tu es l'expert de l'agence R.M Web. Sois luxueux et concis (4 lignes max). Redirige vers "Contact". Si image : fait un mini-audit UX.`;

    const promptText = `${instructionCourte}\n\nHistorique:\n${history}\n\nClient: ${userMessage || "Analyse mon image."}`;

    const promptParts: any[] = [promptText];
    
    if (imageFile) {
      const imagePart = await fileToGenerativePart(imageFile);
      promptParts.push(imagePart);
    }

    const result = await model.generateContent(promptParts);
    const response = await result.response;
    return response.text();
    
  } catch (error: any) {
    console.error("Erreur Gemini :", error.message);
    // Si l'erreur 429 revient, on prévient l'utilisateur proprement
    if (error.message.includes("429")) {
      return "L'IA est très sollicitée ! Attendez 30 secondes et réessayez. ✨";
    }
    return "Petit souci technique. Contactez-nous via le bouton Contact !";
  }
};