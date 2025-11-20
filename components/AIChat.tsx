import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './Icons';
import { ChatMessage } from '../types';
import { sendMessageToGemini, resetChatSession } from '../services/geminiService';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Olá! Sou a IA da NexSales. Como posso ajudar a modernizar sua loja hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasKey, setHasKey] = useState(true);
  
  // Refs
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Check API Key on load/open
  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const hasSelected = await window.aistudio.hasSelectedApiKey();
        setHasKey(hasSelected);
      }
    };
    checkKey();
  }, [isOpen]);

  const handleConnectKey = async () => {
    if (window.aistudio) {
      try {
        await window.aistudio.openSelectKey();
        const hasSelected = await window.aistudio.hasSelectedApiKey();
        if (hasSelected) {
          setHasKey(true);
          resetChatSession(); // Reset service session to pick up new key
          // Optionally send a "hello" or just let user type
        }
      } catch (e) {
        console.error("Failed to select key", e);
      }
    }
  };

  // Scroll to bottom on new messages with smooth behavior
  useEffect(() => {
    if (scrollRef.current) {
      const { scrollHeight, clientHeight } = scrollRef.current;
      const maxScrollTop = scrollHeight - clientHeight;
      
      // Only scroll if content overflows
      if (maxScrollTop > 0) {
        scrollRef.current.scrollTo({
          top: scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, [messages, isOpen, isLoading]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen && 
        chatContainerRef.current && 
        !chatContainerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Check key before sending
    if (!hasKey) {
      handleConnectKey();
      return;
    }

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (e: any) {
      if (e.message === "API_KEY_MISSING" || e.message === "API Key missing") {
        setHasKey(false);
        setMessages(prev => [...prev, { role: 'model', text: '⚠️ Acesso negado. Por favor, conecte sua chave de API para continuar.' }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: 'Erro de conexão. Tente novamente.' }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-rajdhani">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-cyan-500 text-black p-4 rounded-full shadow-[0_0_20px_cyan] hover:scale-110 transition-transform animate-pulse"
        >
          <Icons.MessageSquare size={28} />
        </button>
      )}

      {isOpen && (
        <div 
          ref={chatContainerRef}
          className="w-80 md:w-96 bg-slate-950 border border-cyan-500/50 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col h-[500px]"
        >
          {/* Header */}
          <div className="bg-slate-900 p-4 flex justify-between items-center border-b border-cyan-500/30">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full animate-ping ${hasKey ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-cyan-400 font-bold tracking-wider">NEX_ASSISTANT_V2</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <Icons.X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50 scroll-smooth" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm border ${
                    msg.role === 'user'
                      ? 'bg-fuchsia-900/20 border-fuchsia-500/50 text-gray-200 rounded-tr-none'
                      : 'bg-cyan-900/20 border-cyan-500/50 text-cyan-100 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* API Key Warning / Connect Button */}
            {!hasKey && (
              <div className="flex justify-center py-4">
                <button 
                  onClick={handleConnectKey}
                  className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-2 rounded text-xs font-bold uppercase tracking-wider hover:bg-red-900/40 transition-colors animate-pulse"
                >
                  <span className="flex items-center gap-2">
                    <Icons.Lock size={14} /> Conectar Neural Link (API Key)
                  </span>
                </button>
              </div>
            )}

            {/* Cyberpunk Loader */}
            {isLoading && (
              <div className="flex justify-start w-full">
                <div className="bg-cyan-950/30 border border-cyan-500/20 p-3 rounded-lg rounded-tl-none max-w-[85%]">
                  <div className="flex items-center gap-3 mb-2">
                     <Icons.Cpu size={16} className="text-cyan-400 animate-spin-slow" />
                     <span className="text-xs font-mono text-cyan-400 tracking-widest animate-pulse">
                       PROCESSING_DATA...
                     </span>
                  </div>
                  <div className="h-1 w-full bg-cyan-900/50 rounded-full overflow-hidden">
                     <div className="h-full bg-cyan-400 w-full animate-progress-indeterminate origin-left"></div>
                  </div>
                  <div className="mt-2 flex gap-1">
                    <div className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 bg-slate-900 border-t border-cyan-500/30 flex gap-2 relative">
            {isLoading && <div className="absolute inset-0 bg-black/50 z-10 cursor-wait"></div>}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isLoading ? "Aguarde a resposta..." : (hasKey ? "Digite sua pergunta..." : "Conecte a chave para iniciar")}
              disabled={isLoading || !hasKey}
              className="flex-1 bg-black border border-slate-700 text-white px-3 py-2 rounded focus:outline-none focus:border-cyan-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !hasKey}
              className={`bg-cyan-600 hover:bg-cyan-500 text-white p-2 rounded transition-all disabled:opacity-50 disabled:grayscale ${isLoading ? 'cursor-not-allowed' : ''}`}
            >
              <Icons.Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
