
export const getGeminiResponse = async (userMessage: string, history: string, imageFile?: File | null) => {
  try {
    let imageBase64: string | undefined = undefined;
    let mimeType: string | undefined = undefined;

    if (imageFile) {
      const fileData = await fileToBase64(imageFile);
      imageBase64 = fileData.base64;
      mimeType = fileData.mimeType;
    }

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userMessage, history, imageBase64, mimeType })
    });

    if (!response.ok) {
      if (response.status === 429) {
        return "Je réfléchis un peu trop vite ☕ ! Attendez une petite minute avant le prochain message.";
      }
      throw new Error("Erreur lors de la communication avec le serveur");
    }

    const data = await response.json();
    return data.text;
  } catch (error: any) {
    console.error("Erreur Gemini (Client) :", error?.message ?? error);
    return "Petit souci technique. Contactez-nous via le bouton Contact !";
  }
};

async function fileToBase64(file: File): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== 'string') {
        reject(new Error('Impossible de lire le fichier en base64.'));
        return;
      }

      const [meta, data] = result.split(',');
      const mimeType = meta.replace(/^data:(.*);base64$/, '$1');
      resolve({ base64: data, mimeType });
    };

    reader.onerror = () => reject(new Error('Erreur de lecture du fichier.'));
    reader.readAsDataURL(file);
  });
}
