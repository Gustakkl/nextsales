import React, { useState } from 'react';
import { Icons } from './Icons';
import { CyberButton } from './CyberButton';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simula delay de rede/autenticação
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md">
        {/* Borders Cyberpunk */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-500"></div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-fuchsia-500"></div>
        
        <div className="bg-slate-950 border border-slate-700 p-8 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          {/* Background Grid Animation */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
          
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
            <Icons.X />
          </button>

          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-cyan-500/10 rounded-full border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <Icons.Lock size={32} className="text-cyan-400" />
              </div>
            </div>

            <h2 className="text-2xl font-orbitron text-center text-white mb-2 tracking-widest">
              ACESSO RESTRITO
            </h2>
            <p className="text-center text-gray-400 text-sm mb-8 font-mono">
              Identificação Neural Necessária
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-cyan-500 font-bold flex items-center gap-2">
                  <Icons.User size={12} /> ID do Usuário
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-slate-700 text-white p-3 focus:border-cyan-500 focus:outline-none transition-colors clip-path-input font-mono"
                  placeholder="admin@nexsales.corp"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-fuchsia-500 font-bold flex items-center gap-2">
                  <Icons.Shield size={12} /> Chave de Acesso
                </label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-slate-700 text-white p-3 focus:border-fuchsia-500 focus:outline-none transition-colors clip-path-input font-mono"
                  placeholder="••••••••••••"
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className={`
                  w-full py-4 font-bold uppercase tracking-widest transition-all relative overflow-hidden group
                  ${isLoading ? 'bg-slate-800 cursor-wait' : 'bg-gradient-to-r from-cyan-900 to-blue-900 hover:from-cyan-800 hover:to-blue-800 border border-cyan-500'}
                `}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2 text-cyan-400">
                    <Icons.Cpu className="animate-spin" size={18} />
                    <span className="animate-pulse">Descriptografando...</span>
                  </div>
                ) : (
                  <span className="text-cyan-100 group-hover:text-white">Inicializar Sessão</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};