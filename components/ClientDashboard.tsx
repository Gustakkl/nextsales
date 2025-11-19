import React from 'react';
import { Icons } from './Icons';
import { CyberButton } from './CyberButton';

interface ClientDashboardProps {
  onLogout: () => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-black pt-20 pb-10 px-6 font-rajdhani">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-orbitron text-white mb-2">
              CENTRAL DE COMANDO <span className="text-cyan-500 text-sm align-top">v3.0</span>
            </h1>
            <p className="text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Conexão Segura Estabelecida • Usuário: Admin
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <button className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
              <Icons.User size={18} /> Perfil
            </button>
            <button onClick={onLogout} className="flex items-center gap-2 text-gray-400 hover:text-fuchsia-400 transition-colors">
              <Icons.LogOut size={18} /> Desconectar
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* Card 1 */}
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Icons.TrendingUp size={80} className="text-cyan-500" />
            </div>
            <div className="text-sm text-cyan-400 uppercase tracking-widest font-bold mb-2">Vendas Hoje</div>
            <div className="text-4xl font-orbitron text-white mb-2">R$ 12.450,00</div>
            <div className="text-green-400 text-xs flex items-center gap-1">
              <Icons.TrendingUp size={12} /> +15% vs ontem
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl relative overflow-hidden group hover:border-fuchsia-500/50 transition-colors">
            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Icons.ShoppingCart size={80} className="text-fuchsia-500" />
            </div>
            <div className="text-sm text-fuchsia-400 uppercase tracking-widest font-bold mb-2">Transações</div>
            <div className="text-4xl font-orbitron text-white mb-2">142</div>
            <div className="text-gray-400 text-xs">Última há 2 min</div>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl relative overflow-hidden group hover:border-green-500/50 transition-colors">
            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Icons.Activity size={80} className="text-green-500" />
            </div>
            <div className="text-sm text-green-400 uppercase tracking-widest font-bold mb-2">Status do Sistema</div>
            <div className="text-4xl font-orbitron text-white mb-2">ONLINE</div>
            <div className="text-green-400 text-xs flex items-center gap-1">
              <Icons.Check size={12} /> Latência: 12ms
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area - Charts placeholder */}
          <div className="lg:col-span-2 bg-slate-900/30 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Icons.BarChart3 className="text-cyan-400" /> Fluxo de Caixa Semanal
              </h3>
              <select className="bg-black border border-slate-700 text-gray-300 text-xs p-1 rounded">
                <option>Últimos 7 dias</option>
                <option>Últimos 30 dias</option>
              </select>
            </div>
            
            {/* Mock Chart Visualization */}
            <div className="h-64 flex items-end justify-between gap-2 px-2">
              {[35, 55, 40, 70, 60, 85, 65].map((height, i) => (
                <div key={i} className="w-full bg-slate-800 rounded-t hover:bg-cyan-900/50 transition-colors relative group">
                  <div 
                    className="absolute bottom-0 left-0 w-full bg-cyan-500/20 border-t-2 border-cyan-400 transition-all duration-1000"
                    style={{ height: `${height}%` }}
                  ></div>
                  {/* Tooltip */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded border border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    R$ {height * 150},00
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-gray-500 text-xs font-mono uppercase">
              <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span>
            </div>
          </div>

          {/* Sidebar / Recent Activity */}
          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6 backdrop-blur-sm flex flex-col">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
              <Icons.Terminal className="text-fuchsia-400" /> Log de Atividades
            </h3>
            
            <div className="space-y-4 overflow-y-auto max-h-[300px] custom-scrollbar pr-2">
              {[
                { time: '10:42', action: 'Venda Finalizada', val: 'R$ 120,00', user: 'Caixa 01' },
                { time: '10:38', action: 'Sangria de Caixa', val: 'R$ 500,00', user: 'Gerente' },
                { time: '10:15', action: 'Login Sistema', val: 'Sucesso', user: 'Caixa 02' },
                { time: '09:55', action: 'Entrada Estoque', val: '50 itens', user: 'Estoque' },
                { time: '09:30', action: 'Abertura Caixa', val: '-', user: 'Caixa 01' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-black/40 rounded border-l-2 border-slate-700 hover:border-fuchsia-500 transition-colors">
                  <div>
                    <div className="text-sm text-white font-medium">{log.action}</div>
                    <div className="text-xs text-gray-500 font-mono">{log.user} • {log.time}</div>
                  </div>
                  <div className="text-xs font-bold text-cyan-400">{log.val}</div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6">
              <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400 uppercase">Plano Atual</span>
                  <span className="bg-cyan-900/30 text-cyan-400 text-[10px] px-2 py-0.5 rounded border border-cyan-500/30">PRO</span>
                </div>
                <div className="text-white font-bold mb-3">NexSales Profissional</div>
                <CyberButton variant="pink" className="w-full py-2 text-xs">Gerenciar Assinatura</CyberButton>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};