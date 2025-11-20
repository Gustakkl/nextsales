import React, { useEffect, useRef } from 'react';

export const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Caracteres Katakana + Latinos + Números para o efeito clássico
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArray = chars.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Array de gotas - uma por coluna
    // Inicializa com valores aleatórios negativos para que elas não caiam todas juntas no início
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100);
    }

    const draw = () => {
      // Cria o efeito de rastro desenhando um retângulo preto semi-transparente sobre o frame anterior
      // Usando a cor de fundo do site (#030303)
      ctx.fillStyle = 'rgba(3, 3, 3, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Lógica de cor:
        // 1% de chance de ser um caractere "brilhante" (cabeça da gota)
        // O resto é ciano mais escuro (cauda)
        const isBright = Math.random() > 0.975;
        
        if (isBright) {
           ctx.fillStyle = '#cffafe'; // Cyan-100 (Quase branco)
           ctx.shadowBlur = 5;
           ctx.shadowColor = '#22d3ee';
        } else {
           ctx.fillStyle = '#0891b2'; // Cyan-600
           ctx.shadowBlur = 0;
        }
        
        // Desenha o caractere
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reinicia a gota quando sai da tela (com um fator aleatório para variar o padrão)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move a gota para baixo
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
      style={{ opacity: 0.6 }} // Aumentei a opacidade global para ficar mais visível
    />
  );
};