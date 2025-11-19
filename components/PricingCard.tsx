import React from 'react';
import { Plan } from '../types';
import { Icons } from './Icons';
import { CyberButton } from './CyberButton';

interface PricingCardProps {
  plan: Plan;
  billingCycle: 'monthly' | 'yearly';
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, billingCycle }) => {
  const isRecommended = plan.recommended;
  
  // Determine price to display based on billing cycle
  const displayPrice = billingCycle === 'yearly' && plan.priceYearly 
    ? plan.priceYearly 
    : plan.price;

  const cycleLabel = billingCycle === 'yearly' && plan.priceYearly 
    ? '/mês*' 
    : '/mês';
  
  return (
    <div className={`
      relative p-8 flex flex-col h-full group
      bg-slate-900/60 backdrop-blur-md transition-all duration-500
      border-t-2 border-b-0 border-x-0
      ${isRecommended 
        ? 'border-cyan-400 bg-slate-800/40 shadow-[0_0_30px_rgba(34,211,238,0.1)] scale-105 z-10' 
        : 'border-slate-700 hover:border-fuchsia-500 hover:bg-slate-800/60'}
    `}>
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-current text-gray-500 group-hover:text-white transition-colors"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-current text-gray-500 group-hover:text-white transition-colors"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-current text-gray-500 group-hover:text-white transition-colors"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-current text-gray-500 group-hover:text-white transition-colors"></div>

      {isRecommended && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-cyan-400 text-black text-xs font-black py-1 px-6 uppercase tracking-widest clip-path-slanted shadow-[0_0_15px_cyan]">
          Mais Popular
        </div>
      )}

      <div className="text-center mb-8 pt-4">
        <h3 className={`text-xl font-bold uppercase tracking-wider mb-4 ${isRecommended ? 'text-cyan-400' : 'text-white'}`}>
          {plan.name}
        </h3>
        <div className="flex items-end justify-center gap-1 text-white group-hover:scale-110 transition-transform duration-300">
          <span className={`text-4xl font-black font-orbitron ${isRecommended ? 'text-white' : 'text-gray-200'}`}>
            {displayPrice}
          </span>
          <span className="text-gray-400 text-sm mb-1">{cycleLabel}</span>
        </div>
        {billingCycle === 'yearly' && plan.priceYearly && (
          <div className="text-xs text-green-400 mt-2 font-bold uppercase tracking-wider">
            Faturado anualmente (20% OFF)
          </div>
        )}
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8 group-hover:via-fuchsia-500 transition-colors"></div>

      <ul className="space-y-4 mb-8 flex-grow">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3 text-gray-300 text-sm group-hover:text-white transition-colors">
            <div className={`p-1 rounded-full ${isRecommended ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-700 text-gray-400 group-hover:text-fuchsia-400'}`}>
              <Icons.Check size={12} />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      <CyberButton 
        variant={isRecommended ? 'cyan' : 'pink'} 
        className="w-full mt-auto"
        glow={isRecommended}
      >
        Selecionar
      </CyberButton>
    </div>
  );
};