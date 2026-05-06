import React, { useState, useRef, useEffect } from 'react';

// Data converted from kijanacribs_data.csv
const CHAT_DATA = [
  { Keywords: "bedsitter rongai", Response: "Yes we have affordable bedsitters in Rongai starting from KES 6,000." },
  { Keywords: "cheap house", Response: "The cheapest units are bedsitters starting from around KES 4,500." },
  { Keywords: "furnished apartment", Response: "Yes we offer both furnished and unfurnished apartments." },
  { Keywords: "1 bedroom cheap", Response: "You can find options in Athi River and Mlolongo." },
  { Keywords: "kitengela houses", Response: "Yes we have bedsitters, 1 and 2 bedroom houses in Kitengela." },
  { Keywords: "parking", Response: "Most apartments provide secure parking." },
  { Keywords: "pets", Response: "Some properties allow pets depending on the landlord." },
  { Keywords: "near town", Response: "Yes we have listings near town like Ngara and Pangani." },
  { Keywords: "near stage", Response: "Yes many listings are near transport stages." },
  { Keywords: "student housing", Response: "Yes we have affordable and furnished options for students." },
  { Keywords: "2 bedroom syokimau", Response: "Prices range from KES 20,000 to 30,000." },
  { Keywords: "utilities", Response: "Water is sometimes included but electricity is separate." },
  { Keywords: "short term", Response: "Yes furnished apartments are available for short stays." },
  { Keywords: "viewing", Response: "Yes house viewing can be arranged." },
  { Keywords: "agency fee", Response: "Some listings may require a small agency fee." },
  { Keywords: "security", Response: "Most properties have guards and gated compounds." },
  { Keywords: "wifi", Response: "Furnished units often include WiFi." },
  { Keywords: "westlands", Response: "Yes we have premium apartments in Westlands." },
  { Keywords: "family house", Response: "Yes we have 2 and 3 bedroom homes." },
  { Keywords: "cbd", Response: "Yes but availability is limited and prices are higher." },
  { Keywords: "booking", Response: "You can book by contacting us and scheduling a viewing." },
  { Keywords: "rent payment", Response: "Yes most landlords accept monthly payments." },
  { Keywords: "balcony", Response: "Yes some apartments have balconies." },
  { Keywords: "gated", Response: "Yes we have listings in gated communities." },
  { Keywords: "school", Response: "Yes we can help you find houses near schools." },
  { Keywords: "lift", Response: "Yes modern apartments include lifts." },
  { Keywords: "water", Response: "Yes many properties have reliable water." },
  { Keywords: "cheap nairobi", Response: "Yes areas like Kayole and Dandora have budget options." },
  { Keywords: "no deposit", Response: "Most landlords require a deposit but some are flexible." },
  { Keywords: "bedsitter cheap", Response: "Yes several options are available." },
  { Keywords: "ruaka", Response: "Yes we have modern apartments in Ruaka." },
  { Keywords: "near work", Response: "Share your location and we will suggest options nearby." },
  { Keywords: "luxury", Response: "Yes in areas like Karen and Lavington." },
  { Keywords: "security guarantee", Response: "We prioritize secure locations though no place is 100 percent guaranteed." },
  { Keywords: "gym", Response: "Some premium apartments include a gym." },
  { Keywords: "negotiation", Response: "In some cases rent is negotiable." },
  { Keywords: "cctv", Response: "Yes many apartments have CCTV." },
  { Keywords: "borehole", Response: "Yes several properties have boreholes." },
  { Keywords: "thika", Response: "Yes we have listings in Thika." },
  { Keywords: "garden", Response: "Yes especially standalone homes." },
  { Keywords: "studio", Response: "Yes studio apartments are available." },
  { Keywords: "south b", Response: "Yes we have listings in South B." },
  { Keywords: "south c", Response: "Yes South C has several options." },
  { Keywords: "airport", Response: "Yes Embakasi and Syokimau are close." },
  { Keywords: "prepaid", Response: "Yes most apartments use prepaid meters." },
  { Keywords: "furnished bedsitter", Response: "Yes furnished bedsitters are available." },
  { Keywords: "kileleshwa", Response: "Yes executive apartments are available." },
  { Keywords: "guard", Response: "Yes many apartments have guards." },
  { Keywords: "pool", Response: "Yes luxury apartments may include pools." },
  { Keywords: "urgent", Response: "Yes we can help find immediate options." },
  { Keywords: "umoja", Response: "Yes affordable options are available." },
  { Keywords: "donholm", Response: "Yes Donholm has several listings." },
  { Keywords: "langata", Response: "Yes family homes are available." },
  { Keywords: "hospital", Response: "Yes we can recommend nearby houses." },
  { Keywords: "tiles", Response: "Yes most modern houses are tiled." },
  { Keywords: "backup water", Response: "Yes many have tanks or boreholes." },
  { Keywords: "kahawa", Response: "Yes Kahawa has affordable units." },
  { Keywords: "mall", Response: "Yes we can suggest houses near malls." },
  { Keywords: "githurai", Response: "Yes budget options are available." },
  { Keywords: "pipeline", Response: "Yes Pipeline has many houses." },
  { Keywords: "roysambu", Response: "Yes modern apartments are available." },
  { Keywords: "parking needed", Response: "Yes most apartments provide parking." },
  { Keywords: "kilimani", Response: "Yes premium apartments are available." },
  { Keywords: "lavington", Response: "Yes high-end options are available." },
  { Keywords: "karen", Response: "Yes Karen has spacious homes." },
  { Keywords: "gate", Response: "Yes many compounds are gated." },
  { Keywords: "kawangware", Response: "Yes affordable houses are available." },
  { Keywords: "kangemi", Response: "Yes listings are available." },
  { Keywords: "ruai", Response: "Yes budget options exist." },
  { Keywords: "university", Response: "Yes we have student housing." },
  { Keywords: "zimmerman", Response: "Yes listings are available." },
  { Keywords: "ngong", Response: "Yes affordable homes are available." },
  { Keywords: "kikuyu", Response: "Yes several listings exist." },
  { Keywords: "modern finish", Response: "Yes many apartments have modern finishes." },
  { Keywords: "wardrobe", Response: "Yes most houses include wardrobes." },
  { Keywords: "internet ready", Response: "Yes some apartments are internet ready." },
  { Keywords: "parklands", Response: "Yes executive apartments are available." },
  { Keywords: "view", Response: "Yes some apartments offer scenic views." },
  { Keywords: "pangani", Response: "Yes central apartments are available." },
  { Keywords: "ngara", Response: "Yes many options exist." },
  { Keywords: "kasarani", Response: "Yes affordable apartments are available." },
  { Keywords: "electricity", Response: "Yes most areas have reliable electricity." },
  { Keywords: "ruiru", Response: "Yes many affordable homes exist." },
  { Keywords: "mlolongo", Response: "Yes budget-friendly options are available." },
  { Keywords: "athi river", Response: "Yes affordable rentals are available." },
  { Keywords: "road access", Response: "Yes many listings are near main roads." },
  { Keywords: "embakasi", Response: "Yes many rental options exist." },
  { Keywords: "drainage", Response: "Yes we prioritize developed areas." },
  { Keywords: "secure doors", Response: "Yes security doors are common." },
  { Keywords: "church", Response: "Yes we can help find one." },
  { Keywords: "supermarket", Response: "Yes many houses are near supermarkets." },
  { Keywords: "clean water", Response: "Yes clean water is available." },
  { Keywords: "kitchen", Response: "Yes many houses have modern kitchens." },
  { Keywords: "lighting", Response: "Yes most houses have natural lighting." },
  { Keywords: "tiled floor", Response: "Yes tiled floors are standard." },
  { Keywords: "ventilation", Response: "Yes proper ventilation is ensured." },
  { Keywords: "wardrobe again", Response: "Yes wardrobes are included." },
  { Keywords: "quiet", Response: "Yes we have quiet neighborhoods." },
  { Keywords: "schools", Response: "Yes many listings are near schools." },
  { Keywords: "help", Response: "Yes we can help based on your needs and budget." },
];

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSend = async () => {
    if (!message.trim()) {
      setError("Please enter a message before sending.");
      return;
    }
    // Reset error on successful "send"
    setError(null);

    const userMsg = { text: message, sender: 'user', timestamp: new Date() };
    const currentMessage = message.toLowerCase();
    
    setChatLog(prev => [...prev, userMsg]);
    setMessage("");

    // Matching Logic (Ported from your Python script)
    setTimeout(() => {
      let foundAnswer = false;
      let botResponse = "Sorry, I don't know that one. Try asking about locations, pricing, or specific crib types!";

      for (const item of CHAT_DATA) {
       const escapedKeywords = item.Keywords.split(',')
          .map(kw => kw.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
          .join('|');
        const regex = new RegExp(`\\b(${escapedKeywords})\\b`, 'i');

        if (regex.test(currentMessage)) {
          botResponse = item.Response;
          foundAnswer = true;
          break;
        }
      }

      const botMsg = { text: botResponse, sender: 'bot', timestamp: new Date() };
      setChatLog(prev => [...prev, botMsg]);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chatLog]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div
          style={{
            width: "320px",
            height: "450px",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.3)"
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #1e3c72, #2a5298)",
              color: "white",
              padding: "15px",
              textAlign: "center",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span style={{ flex: 1 }}>Kijana Cribs Assistant 🏠</span>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '18px' }}>✕</button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              padding: "15px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}
          >
            <div style={{ alignSelf: "flex-start", background: "#f1f1f1", color: "black", padding: "8px 12px", borderRadius: "15px", maxWidth: "75%", fontSize: "14px", boxShadow: "0 3px 10px rgba(0,0,0,0.1)" }}>
              Hello{user ? `, ${user.username}` : ''}! Looking for a specific crib? I can help with location and pricing.
            </div>
            
            {chatLog.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  background: msg.sender === "user" ? "linear-gradient(135deg, #2a5298, #1e3c72)" : "#f1f1f1",
                  color: msg.sender === "user" ? "white" : "black",
                  padding: "8px 12px",
                  borderRadius: "15px",
                  maxWidth: "75%",
                  fontSize: "14px",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
                }}
              >
                {msg.text}
              </div>
            ))}
            {error && <div style={{ color: "red", fontSize: "11px", textAlign: "center" }}>{error}</div>}
          </div>

          {/* Input Area */}
          <div style={{ display: "flex", padding: "10px", borderTop: "1px solid #ddd", background: "#fff" }}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about houses, rent..."
              style={{ flex: 1, padding: "8px", border: "none", outline: "none", fontSize: "14px" }}
            />
            <button
              onClick={handleSend}
              style={{ background: "#1e3c72", color: "white", border: "none", padding: "8px 15px", cursor: "pointer", borderRadius: "5px", fontWeight: "bold" }}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1e3c72, #2a5298)",
            color: "white",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          💬
        </button>
      )}
    </div>
  );
};