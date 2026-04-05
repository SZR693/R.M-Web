// src/utils/gemini.ts

async function fileToBase64(file: File): Promise<{ data: string; mimeType: string }> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(",")[1];
      resolve({ data: base64, mimeType: file.type });
    };
    reader.readAsDataURL(file);
  });
}

export const getGeminiResponse = async (
  userMessage: string,
  history: string,
  imageFile?: File | null
): Promise<string> => {
  try {
    let image: string | undefined;
    let mimeType: string | undefined;

    if (imageFile) {
      const b64 = await fileToBase64(imageFile);
      image = b64.data;
      mimeType = b64.mimeType;
    }

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage, history, image, mimeType }),
    });

    if (res.status === 429) {
      return "Je réfléchis un peu trop vite ☕ ! Attendez une petite minute avant le prochain message.";
    }

    if (!res.ok) throw new Error("Server error");

    const data = await res.json();
    return data.text;

  } catch (error) {
    console.error("Erreur chat:", error);
    return "Petit souci technique. Contactez-nous via le bouton Contact !";
  }
};