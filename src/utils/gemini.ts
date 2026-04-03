import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

// Fonction helper pour convertir le File en format lisible par l'API Gemini
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

// 🟢 On ajoute le paramètre "image"
export const getGeminiResponse = async (userMessage: string, history: string, imageFile?: File | null) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 📚 DATA ENRICHIE : Ajout des bénéfices clients, de l'approche et des garanties
    const agencyData = `
      AGENCE : R.M Web (Création premium, Visibilité, Automatisation IA).
      NOTRE APPROCHE : Pas de templates tout faits. Chaque pixel est pensé pour la conversion.
      TARIFS : Sur devis uniquement. Pas de prix fixes.
      
      --- PACKS ---
      1. STARTER (Site Vitrine) : Idéal petits budgets/artisans. Jusqu'à 5 pages, design sur-mesure, formulaire, SEO basique. (2-3 semaines).
      2. CROISSANCE DIGITALE : Idéal PME. Starter + Stratégie SEO, pubs Google Ads, gestion réseaux sociaux et reporting.
      3. COMPLET PREMIUM : Sur-mesure. E-commerce, CRM, automatisation IA, SEO/SEA intégré, API. (6-10 semaines).
      
      --- EXPERTISES ---
      A. CRÉATION WEB : Design Digital, Mobile-First, Rapide, Sécurisé (Certificat SSL inclus).
      B. SEO (Référencement) : Technique, On-Page, Local (Google Maps), Off-Page.
      C. ACQUISITION : Pubs Google/Bing, Réseaux Sociaux (Meta, TikTok), Landing Pages optimisées conversion.
      D. IA & AUTOMATISATION : Chatbots, Zapier/Make (gain de temps), Génération de contenu, Agents IA.
      E. INTÉGRATION & API : CRM , Paiement, Réservation, Webhooks.

      --- BÉNÉFICES CLÉS (À utiliser pour convaincre) ---
      - "Un site rapide convertit mieux." (Performance = Score PageSpeed 90+)
      - "Automatisez les tâches chronophages pour vous concentrer sur votre cœur de métier."
      - "Dominez les résultats locaux pour attirer les clients de votre zone."
    `;

    const promptText = `
      Tu es l'assistant commercial virtuel de l'agence "R.M Web". 
      Ton ton est : luxueux , expert, chaleureux (1 ou 2 emojis ✨🚀) mais EXTRÊMEMENT CONCIS.
      
      BASE DE CONNAISSANCES :
      ${agencyData}

      RÈGLES DE CONVERSATION (À RESPECTER STRICTEMENT) :
      1. LONGUEUR MAXIMALE : 4 à 5 lignes grand maximum. Va droit au but. Utilise des listes à puces si tu énumères plus de 2 éléments.
      2. MÉMOIRE : Lis l'historique ci-dessous pour comprendre le contexte et ne pas te répéter.
      3. HORS-SUJET : Si la question ne concerne pas le web/digital, recentre poliment.
      4. QUALIFICATION : Si le client ne donne pas de détails (secteur, budget, objectif), pose UNE question courte pour le qualifier.
      5. TARIFS / DEVIS : Si on te demande le prix, ne donne AUCUN chiffre. Explique que chaque projet est unique et invite à utiliser le bouton "Contact" pour une étude sur-mesure.
      6. UPLOAD D'IMAGE (AUDIT) : Si tu reçois une image, mets ta casquette d'expert UX/UI. Trouve 1 point fort et 2 axes d'amélioration (modernité, lisibilité, appel à l'action...). Explique ensuite comment R.M Web peut sublimer ça via une refonte.
      7. SI LE CLIENT A DÉJÀ UN SITE : Propose-lui immédiatement notre Audit Gratuit : invite-le à importer une capture d'écran ici même dans le chat (grâce au bouton trombone) ou à nous contacter via le bouton "Contact" pour une analyse poussée (SEO, Vitesse, UX).
      8. ACTION (CTA) : Termine TOUJOURS ta réponse en invitant naturellement le client à cliquer sur le bouton "Contact" en haut du site pour un appel gratuit ou un devis.

      --- DÉBUT DE L'HISTORIQUE DE CONVERSATION ---
      ${history}
      --- FIN DE L'HISTORIQUE ---

      DERNIER MESSAGE DU CLIENT À TRAITER : "${userMessage || "Voici une image de mon site."}"
    `;

    // 🟢 On prépare le tableau des éléments à envoyer (Texte + Image si elle existe)
    const promptParts: any[] = [promptText];
    
    if (imageFile) {
      const imagePart = await fileToGenerativePart(imageFile);
      promptParts.push(imagePart);
    }

    const result = await model.generateContent(promptParts);
    const response = await result.response;
    return response.text();
    
  } catch (error: any) {
    console.error("Erreur technique :", error.message);
    return "Je rencontre une petite perturbation technique. N'hésitez pas à nous contacter via le bouton Contact !";
  }
};