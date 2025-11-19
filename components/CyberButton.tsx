import React from 'react';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'pink';
  glow?: boolean;
}

export const CyberButton: React.FC<CyberButtonProps> = ({ 
  children, 
  variant = 'cyan', 
  glow = true, 
  className = '',
  ...props 
}) => {
  const baseColor = variant === 'cyan' ? 'cyan' : 'fuchsia';
  
  // Tailwind doesn't support dynamic class names well with arbitrary values in string interpolation for full purging
  // using specific classes instead
  const colorClasses = variant === 'cyan' 
    ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black'
    : 'border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-black';
    
  const shadowClass = glow 
    ? variant === 'cyan' ? 'hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]' : 'hover:shadow-[0_0_20px_rgba(217,70,239,0.6)]'
    : '';

  return (
    <button
      className={`
        relative px-8 py-3 font-bold uppercase tracking-widest transition-all duration-300
        border-2 ${colorClasses} ${shadowClass}
        clip-path-slanted
        ${className}
      `}
      style={{
        clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)'
      }}
      {...props}
    >
      {children}
    </button>
  );
};