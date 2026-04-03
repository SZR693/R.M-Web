import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2, Paperclip, ImageIcon } from "lucide-react"; // Ajout d'icônes
import { getGeminiResponse } from "../../utils/gemini";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // Pour stocker l'image
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Pour la miniature
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [messages, setMessages] = useState<{role: string, content: string, image?: string}[]>([
    { role: "ai", content: "Bonjour ! Je suis l'assistant IA de R.M Web Design. Posez-moi vos questions ou envoyez-moi une capture d'écran de votre site pour un analyse rapide ! ✨" }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Gérer la sélection d'image
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // Limite à 4MB
         alert("L'image est trop grande (max 4MB).");
         return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;
    if (isLoading) return; 
    setIsLoading(true);

    // Ajouter le message de l'utilisateur à l'interface
    const userMsg = { role: "user", content: input, image: imagePreview || undefined };
    setMessages(prev => [...prev, userMsg]);
    
    const currentInput = input;
    const currentImage = selectedImage;

    // Réinitialiser les champs
    setInput("");
    setSelectedImage(null);
    setImagePreview(null);
    setIsLoading(true);

    const historyText = messages.map(m => 
      `${m.role === 'ai' ? 'Assistant R.M Web' : 'Client'} : ${m.content}`
    ).join('\n');

    // 🟢 On passe l'image à la fonction Gemini
    const aiContent = await getGeminiResponse(currentInput, historyText, currentImage);
    
    setMessages(prev => [...prev, { role: "ai", content: aiContent }]);
    setIsLoading(false);
  };

  return (
    <div style={{ position: "fixed", bottom: "25px", right: "25px", zIndex: 1000 }}>
      {/* 🟢 BOUTON 1 : Bouton principal du Chat */}
      <button 
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir l'assistant IA"}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "60px", height: "60px", borderRadius: "50%",
          background: "var(--rm-gold)", border: "none", cursor: "pointer",
          boxShadow: "0 8px 32px rgba(162, 119, 67, 0.3)",
          display: "flex", justifyContent: "center", alignItems: "center", color: "#161614",
          transition: "transform 0.2s"
        }}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {isOpen && (
        <div style={{
          position: "absolute", bottom: "80px", right: 0,
          width: "360px", height: "550px", background: "#161614", // Légèrement plus haut
          border: "1px solid var(--rm-border)", borderRadius: "20px",
          display: "flex", flexDirection: "column", overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
        }}>
          
          <div style={{ padding: "1rem", borderBottom: "1px solid var(--rm-border)", background: "rgba(162,119,67,0.1)" }}>
            <span style={{ color: "var(--rm-gold)", fontWeight: "bold" }}>R.M Web Assistant</span>
          </div>

          <div style={{ flex: 1, padding: "1rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === "ai" ? "flex-start" : "flex-end",
                background: m.role === "ai" ? "#222" : "var(--rm-gold)",
                color: m.role === "ai" ? "#fff" : "#000",
                padding: "8px 12px", borderRadius: "12px", fontSize: "0.9rem", maxWidth: "80%"
              }}>
                {m.image && <img src={m.image} alt="Upload" style={{ maxWidth: "100%", borderRadius: "8px", marginBottom: "8px" }} />}
                {m.content && <div>{m.content}</div>}
              </div>
            ))}
            {isLoading && <Loader2 size={18} className="animate-spin" style={{ color: "var(--rm-gold)" }} />}
            <div ref={messagesEndRef} />
          </div>

          {/* Zone de prévisualisation de l'image sélectionnée */}
          {imagePreview && (
            <div style={{ padding: "0 1rem", position: "relative" }}>
              <div style={{ position: "relative", display: "inline-block" }}>
                <img src={imagePreview} alt="Preview" style={{ height: "50px", borderRadius: "4px", border: "1px solid var(--rm-gold)" }} />
                
                {/* 🟢 BOUTON 2 : Suppression de l'image */}
                <button 
                  aria-label="Supprimer l'image jointe"
                  onClick={() => { setSelectedImage(null); setImagePreview(null); }}
                  style={{ position: "absolute", top: -5, right: -5, background: "red", color: "white", border: "none", borderRadius: "50%", width: "20px", height: "20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}
                >
                  <X size={12}/>
                </button>
              </div>
            </div>
          )}

          <div style={{ padding: "1rem", borderTop: "1px solid var(--rm-border)" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              
              {/* INPUT FILE CACHÉ */}
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleImageSelect} 
                style={{ display: "none" }} 
              />
              
              {/* 🟢 BOUTON 3 : Upload (Trombone) */}
              <button 
                aria-label="Joindre une image"
                onClick={() => fileInputRef.current?.click()} 
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--rm-gold)", padding: "5px" }}
                title="Joindre une capture de votre site"
              >
                <Paperclip size={20} />
              </button>

              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={selectedImage ? "Ajouter un commentaire..." : "Votre question..."} 
                style={{ flex: 1, background: "#222", border: "1px solid #333", color: "#fff", padding: "8px", borderRadius: "8px", outline: "none" }}
              />
              
              {/* 🟢 BOUTON 4 : Envoyer (Avion en papier) */}
              <button 
                aria-label="Envoyer le message" 
                onClick={handleSend} 
                style={{ background: "var(--rm-gold)", border: "none", padding: "8px", borderRadius: "8px", cursor: "pointer" }}
              >
                <Send size={18} color="#000" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}