import React from 'react';
import { Product } from '../types';
import { Icons } from './Icons';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isCyan = product.color === 'cyan';
  const borderColor = isCyan ? 'border-cyan-500' : 'border-fuchsia-500';
  const textColor = isCyan ? 'text-cyan-400' : 'text-fuchsia-400';
  const glowShadow = isCyan ? 'hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]' : 'hover:shadow-[0_0_30px_rgba(232,121,249,0.2)]';
  const bgGradient = isCyan 
    ? 'bg-gradient-to-b from-cyan-950/30 to-transparent' 
    : 'bg-gradient-to-b from-fuchsia-950/30 to-transparent';

  return (
    <div className={`
      relative group p-1 rounded-xl overflow-hidden transition-all duration-500
      ${glowShadow}
    `}>
      {/* Animated Border Gradient */}
      <div className={`absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity duration-500 ${bgGradient} border ${borderColor} rounded-xl`}></div>
      
      <div className="relative z-10 p-8 h-full flex flex-col bg-slate-950/80 backdrop-blur-sm rounded-lg border border-slate-800">
        <div className="mb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 border-2 ${borderColor} ${textColor}`}>
             {product.icon === 'diamond' ? <Icons.Zap size={32} /> : <Icons.ShoppingCart size={32} />}
          </div>
          <h3 className={`text-3xl font-bold mb-2 text-white`}>{product.name}</h3>
          <p className={`text-lg ${textColor} font-medium`}>{product.tagline}</p>
        </div>
        
        <p className="text-gray-400 mb-8 leading-relaxed">
          {product.description}
        </p>
        
        <ul className="space-y-3 mb-8 flex-grow">
          {product.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-gray-300">
              <span className={`mt-1 ${textColor}`}><Icons.Terminal size={16} /></span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <button className={`
          w-full py-3 font-bold uppercase tracking-widest transition-all
          border ${borderColor} ${textColor} hover:bg-white/5
        `}>
          Acessar Sistema
        </button>
      </div>
    </div>
  );
};