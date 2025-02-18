"use client"
import { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare, XCircle } from 'lucide-react';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

export default function LibraryChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessage: Message = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      const botResponse: Message = { text: `¡Gracias por tu mensaje! ¿En qué más puedo ayudarte?`, sender: 'bot' };
      setMessages((prev) => [...prev, botResponse]);
    }, 1500);

    setInput('');
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end z-50">
      {isOpen && (
        <div className="bg-white shadow-2xl rounded-3xl w-96 h-[28rem] flex flex-col border border-gray-300 animate-fade-in">
          <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white p-4 rounded-t-3xl flex items-center justify-between">
            <span className="text-xl font-bold">Asistente Biblioteca Virtual</span>
            <button onClick={() => setIsOpen(false)}>
              <XCircle className="w-7 h-7 text-white hover:text-red-400" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-2xl max-w-[75%] text-sm ${msg.sender === 'user' ? 'bg-blue-100 text-blue-900 self-end ml-auto' : 'bg-gray-200 text-gray-800 self-start mr-auto'}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 bg-white border-t border-gray-300 flex items-center gap-3 rounded-b-3xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 focus:outline-none flex items-center justify-center transition-transform active:scale-95"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white p-4 rounded-full shadow-xl flex items-center gap-2 hover:scale-110 transition-transform animate-pulse"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="font-semibold">Abrir Asistente</span>
        </button>
      )}
    </div>
  );
}
