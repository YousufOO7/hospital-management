"use client";

import { Doctor } from "@/lib/types/doctor";
import { useState, useEffect } from "react";

type Message = {
  sender: "user" | "bot";
  text: string;
};

const QUICK_REPLIES = [
  "I have fever and cough",
  "Chest pain",
  "Skin allergy",
  "Headache",
  "Bone pain",
  "Diabetes problem"
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "👋 Hello! I'm your hospital assistant. Please describe your symptoms, and I'll recommend the best doctor for you." },
  ]);
  const [input, setInput] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("/doctors.json");
        const data = await res.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSend = (message?: string) => {
    const textToSend = message || input;
    if (!textToSend.trim()) return;

    const userMessage = { sender: "user" as const, text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const lowerInput = textToSend.toLowerCase();

      const matchedDoctors = doctors.filter((doc) =>
        doc.symptom_keywords.some((keyword: string) =>
          lowerInput.includes(keyword.toLowerCase())
        )
      );

      let botReply = "";

      if (matchedDoctors.length === 0) {
        botReply = "😔 I couldn't find any doctor matching your symptoms. Could you please describe your problem with different words?\n\nYou can try: fever, chest pain, skin problem, headache, etc.";
      } else {
        botReply = `✅ Found ${matchedDoctors.length} doctor(s):\n\n` +
          matchedDoctors
            .slice(0, 3)
            .map(
              (doc) =>
                `👨‍⚕️ *${doc.name}*\n` +
                `📌 ${doc.specialization}\n` +
                `⏰ ${doc.visit_time.start} - ${doc.visit_time.end}\n` +
                `💰 BDT ${doc.visit_charge} ${doc.discount_percentage > 0 ? `(🔥 ${doc.discount_percentage}% off)` : ""}`
            )
            .join("\n\n");
      }

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botReply },
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
        >
          💬
        </button>
      ) : (
        <div className="w-96 h-[600px] bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden border">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>🤖</span>
              <span className="font-semibold">Hospital Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-lg whitespace-pre-line text-sm ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none shadow"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-lg shadow">Typing...</div>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          {messages.length < 3 && (
            <div className="p-2 border-t bg-white">
              <p className="text-xs text-gray-500 mb-2">Quick replies:</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t bg-white flex gap-2">
            <input
              type="text"
              placeholder="Type your symptoms..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}