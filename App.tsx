import React, { useEffect, useState, useRef } from 'react';
import { Icons } from './components/Icons';
import { CyberButton } from './components/CyberButton';
import { ProductCard } from './components/ProductCard';
import { PricingCard } from './components/PricingCard';
import { AIChat } from './components/AIChat';
import { MatrixRain } from './components/MatrixRain';
import { Product, Plan } from './types';

// --- Data ---
const PRODUCTS: Product[] = [
  {
    id: 'maletas',
    name: 'NexSales Maletas',
    tagline: 'Gestão Total de Consignado',
    description: 'O sistema definitivo para distribuidores. Monte maletas em segundos, controle o que sai e o que volta, e calcule comissões automaticamente. Financeiro completo incluso.',
    features: ['Montagem de Maletas', 'Acerto Automático', 'App da Revendedora', 'Financeiro Completo'],
    icon: 'diamond',
    color: 'pink'
  },
  {
    id: 'finance',
    name: 'NexSales Finance',
    tagline: 'Estoque & Fluxo de Caixa',
    description: 'Controle blindado para sua operação interna. Gestão rigorosa de estoque, contas a pagar/receber e emissão de etiquetas. Focado em quem não trabalha com consignado.',
    features: ['Fluxo de Caixa', 'Controle de Estoque', 'Emissão de Etiquetas', 'DRE em Tempo Real'],
    icon: 'cart',
    color: 'cyan'
  }
];

const PLANS: Plan[] = [
  {
    id: 'star',
    name: 'STAR',
    price: 'R$ 59,99',
    priceYearly: 'R$ 49,99',
    features: [
      '3 Usuários',
      'Maletas Ilimitadas',
      'Controle Financeiro & Estoque',
      'Etiquetas (PDF) & Clientes',
      'Garantia Virtual'
    ],
    recommended: false
  },
  {
    id: 'evolui',
    name: 'EVOLUI',
    price: 'R$ 99,99',
    priceYearly: 'R$ 79,99',
    features: [
      '5 Usuários',
      'Tudo do STAR +',
      'Promoções e Cupons',
      'Conferência de Entrega',
      'Integração E-commerce',
      'Líder de Revendedoras'
    ],
    recommended: false
  },
  {
    id: 'pro',
    name: 'PRO',
    price: 'R$ 169,99',
    priceYearly: 'R$ 139,99',
    features: [
      '8 Usuários',
      'Tudo do EVOLUI +',
      'Emissão Fiscal (NF-e/Cupom)',
      'Área Logada do Consumidor',
      'Boletim Automático',
      'Níveis de Revendedoras'
    ],
    recommended: true
  },
  {
    id: 'elite',
    name: 'ELITE',
    price: 'R$ 199,99',
    priceYearly: 'R$ 169,99',
    features: [
      '15 Usuários',
      'Tudo do PRO +',
      'Relatórios via IA',
      'Maleta Mágica & Gamificação',
      'App para Representantes',
      'Contrato Virtual & Aluguel'
    ],
    recommended: false
  }
];

const FAQS = [
  {
    q: "Como funciona a montagem da maleta?",
    a: "Você bipa as peças com leitor de código de barras. O sistema cria um romaneio digital automático vinculado à revendedora. Ao retornar, você bipa o que voltou e o sistema calcula a venda."
  },
  {
    q: "O plano Financeiro permite fazer maletas?",
    a: "Negativo. O plano Finance é focado em gestão interna (loja/estoque). Para consignado, você precisa do módulo Maletas (Plano Pro)."
  },
  {
    q: "Consigo ver o ranking de melhores revendedoras?",
    a: "Afirmativo. O Dashboard Neural classifica seus agentes de campo por volume de vendas, menor índice de devolução e pontualidade no acerto."
  },
  {
    q: "O sistema imprime etiquetas de joias?",
    a: "Sim. Compatível com impressoras Zebra e Argox. Etiquetas específicas para joias (bopp, código de barras pequeno e resistente)."
  }
];

// --- Hooks ---
const useIntersectionObserver = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

const useTypewriter = (text: string, speed: number = 100) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let i = 0;
    setDisplayText('');
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return displayText;
};

// --- Internal Components ---

// Explicitly typed as React.FC to include intrinsic attributes like 'key'
const AnimatedCounter: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  const [displayValue, setDisplayValue] = useState("000");
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        
        let iteration = 0;
        const maxIterations = 20;
        const interval = setInterval(() => {
          setDisplayValue(prev => {
            if (iteration >= maxIterations) {
              clearInterval(interval);
              return value;
            }
            
            // Generate random characters for the "decoding" effect
            const chars = "0123456789X%#";
            return value.split('')
              .map((char, index) => {
                if (index < iteration / 2) return value[index];
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join('');
          });
          iteration++;
        }, 50);
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center group hover:scale-105 transition-transform duration-300">
      <div className="text-3xl md:text-4xl font-black text-white font-orbitron mb-1 relative inline-block">
        <span className="relative z-10">{displayValue}</span>
        <div className="absolute inset-0 bg-cyan-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <div className="text-xs uppercase tracking-widest text-gray-500 font-bold group-hover:text-cyan-400 transition-colors">{label}</div>
    </div>
  );
};

const VideoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="relative w-full max-w-5xl aspect-video bg-slate-950 border border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.2)] overflow-hidden rounded-lg flex flex-col">
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-cyan-400 z-20 bg-black/50 p-2 rounded-full">
          <Icons.X size={24} />
        </button>
        
        {/* Video Header */}
        <div className="bg-slate-900/80 p-2 flex justify-between items-center border-b border-slate-800">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-mono text-cyan-400">LIVE_FEED // SYSTEM_PREVIEW_MODE</span>
            </div>
            <div className="text-xs font-mono text-gray-500">1080p_60FPS</div>
        </div>

        {/* Video Placeholder / Simulation */}
        <div className="flex-1 relative flex items-center justify-center bg-slate-900 overflow-hidden group">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            
            {/* Center Interface */}
            <div className="text-center relative z-10">
                <div className="w-20 h-20 mx-auto border-4 border-cyan-500 rounded-full flex items-center justify-center mb-6 animate-spin-slow relative">
                     <div className="absolute inset-0 border-t-4 border-fuchsia-500 rounded-full animate-spin"></div>
                     <Icons.Zap size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-orbitron text-white mb-2">NEXSALES SYSTEM</h3>
                <p className="text-cyan-400 font-mono text-sm tracking-widest mb-8">INITIALIZING DEMO INTERFACE...</p>
                
                <div className="w-64 h-2 bg-slate-800 rounded-full mx-auto overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 w-full animate-progress-indeterminate"></div>
                </div>
            </div>

            {/* Decor elements */}
            <div className="absolute bottom-10 left-10 p-4 border border-slate-700 bg-black/50 backdrop-blur-sm rounded font-mono text-xs text-green-400">
                <div>> LOAD_MODULE: MALETAS.EXE</div>
                <div>> CHECKING_DATABASE... OK</div>
                <div className="animate-pulse">> WAITING_USER_INPUT_</div>
            </div>
        </div>
      </div>
    </div>
  );
};

const ProcessTimeline = () => {
  const steps = [
    {
      icon: Icons.Package,
      title: "1. Montagem da Maleta",
      desc: "Selecione as joias bipando o código de barras. O sistema cria um romaneio digital automático vinculado à revendedora.",
      color: "text-cyan-400",
      border: "border-cyan-500"
    },
    {
      icon: Icons.Users,
      title: "2. Período de Venda",
      desc: "A revendedora recebe a maleta e o espelho via WhatsApp/App. Ela vende durante o ciclo combinado (ex: 30 dias).",
      color: "text-fuchsia-400",
      border: "border-fuchsia-500"
    },
    {
      icon: Icons.RefreshCw,
      title: "3. Acerto Inteligente",
      desc: "No retorno, você bipa APENAS o que sobrou. O sistema calcula automaticamente: Vendas, Comissão e Lucro Líquido.",
      color: "text-green-400",
      border: "border-green-500"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 relative">
      {/* Connector Line (Desktop) */}
      <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-900 via-fuchsia-900 to-green-900 -z-10"></div>

      {steps.map((step, i) => (
        <div key={i} className="reveal-on-scroll relative bg-black/60 border border-slate-800 p-8 rounded-xl backdrop-blur-sm group hover:bg-slate-900/80 transition-all duration-300">
          <div className={`w-16 h-16 rounded-full bg-slate-950 border-2 ${step.border} flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform mx-auto md:mx-0`}>
            <step.icon size={32} className={step.color} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3 font-orbitron">{step.title}</h3>
          <p className="text-gray-400 leading-relaxed text-sm">{step.desc}</p>
          
          {i < 2 && (
            <div className="md:hidden flex justify-center my-4 text-slate-700">
              <Icons.ArrowRight size={24} className="rotate-90" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const ContactForm = () => {
  return (
    <form className="space-y-6 bg-slate-900/50 p-8 border border-slate-700 backdrop-blur-sm rounded-lg relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500"></div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-cyan-400 text-xs uppercase tracking-widest font-bold">Nome Completo</label>
          <input type="text" className="w-full bg-black/50 border border-slate-700 text-white p-3 focus:border-cyan-400 focus:outline-none transition-colors clip-path-input" placeholder="Seu nome" />
        </div>
        <div className="space-y-2">
          <label className="text-cyan-400 text-xs uppercase tracking-widest font-bold">Email Corporativo</label>
          <input type="email" className="w-full bg-black/50 border border-slate-700 text-white p-3 focus:border-cyan-400 focus:outline-none transition-colors clip-path-input" placeholder="voce@empresa.com" />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-cyan-400 text-xs uppercase tracking-widest font-bold">Como podemos ajudar?</label>
        <textarea rows={4} className="w-full bg-black/50 border border-slate-700 text-white p-3 focus:border-cyan-400 focus:outline-none transition-colors clip-path-input" placeholder="Descreva sua operação (nº de revendedoras, volume, etc)..." />
      </div>

      <CyberButton variant="cyan" className="w-full flex items-center justify-center gap-2" onClick={(e) => e.preventDefault()}>
        <Icons.Send size={18} /> Solicitar Demonstração
      </CyberButton>
    </form>
  );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-800 bg-slate-900/30 rounded overflow-hidden mb-4 transition-all duration-300 hover:border-cyan-500/50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
      >
        <span className={`font-bold uppercase tracking-wider text-sm md:text-base ${isOpen ? 'text-cyan-400' : 'text-gray-300'}`}>
          {question}
        </span>
        {isOpen ? <Icons.ChevronUp className="text-cyan-400" /> : <Icons.ChevronDown className="text-gray-500" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-5 pt-0 text-gray-400 border-t border-slate-800/50 font-sans text-sm leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  
  const heroTitle = useTypewriter("SISTEMA DE MALETAS V4.0", 100);
  
  useIntersectionObserver();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-rajdhani text-gray-200 selection:bg-fuchsia-500/30 selection:text-fuchsia-200 overflow-x-hidden">
      <MatrixRain />
      <VideoModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} />
      
      {/* Navigation */}
      <nav className={`
        fixed top-0 w-full z-50 transition-all duration-500 border-b
        ${scrolled ? 'bg-black/90 backdrop-blur-md py-3 border-cyan-900/50' : 'bg-transparent py-6 border-transparent'}
      `}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => window.scrollTo(0, 0)}
          >
            <img 
              src="https://i.postimg.cc/Vs35JqPQ/Whats-App-Image-2025-11-12-at-17-40-27-removebg-preview.png" 
              alt="NexSales Logo" 
              className="h-12 w-auto object-contain rounded-md border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)] group-hover:scale-105 transition-transform"
            />
            <span className="sr-only">NexSales</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 font-medium tracking-wider text-xs uppercase items-center">
            {['Workflow', 'Sistemas', 'Planos', 'FAQ', 'Contato'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="relative text-gray-400 hover:text-white transition-colors group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <Icons.X /> : <Icons.Terminal />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 border-b border-cyan-500/30 p-6 flex flex-col gap-4 animate-slideDown shadow-2xl">
             {['Workflow', 'Sistemas', 'Planos', 'FAQ', 'Contato'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-lg font-orbitron text-cyan-400 border-l-2 border-transparent hover:border-fuchsia-500 pl-4 transition-all">
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Dynamic Background Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full animate-pulse pointer-events-none" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-fuchsia-600/10 blur-[120px] rounded-full animate-pulse pointer-events-none delay-1000" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          
          {/* Trust Badge */}
          <div className="flex justify-center mb-8">
              <div className="bg-slate-900/50 border border-slate-700 rounded-full px-4 py-1 flex items-center gap-2 backdrop-blur-sm">
                <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gray-700 border-2 border-black"></div>
                    <div className="w-6 h-6 rounded-full bg-gray-600 border-2 border-black"></div>
                    <div className="w-6 h-6 rounded-full bg-gray-500 border-2 border-black"></div>
                </div>
                <span className="text-xs text-gray-300 font-medium tracking-wide">Usado por +500 Distribuidores</span>
              </div>
          </div>

          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1 border border-cyan-500/30 rounded-full bg-cyan-950/30 backdrop-blur-md">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
            <span className="text-cyan-400 text-xs uppercase tracking-[0.3em] font-bold">{heroTitle}<span className="animate-pulse">_</span></span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tighter glitch-text" data-text="CONTROLE DE MALETAS E CAIXA">
            CONTROLE DE<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-fuchsia-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              MALETAS E CAIXA
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            A plataforma definitiva para <strong className="text-white">Distribuidores de Joias</strong>. Automatize o acerto de consignado, elimine erros de cálculo e profissionalize sua gestão financeira.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-20">
            <CyberButton variant="pink" glow className="text-base md:text-lg px-10 py-4">
              Começar Agora
            </CyberButton>
            <CyberButton 
              variant="cyan" 
              className="text-base md:text-lg px-10 py-4 bg-transparent hover:bg-cyan-950/30"
              onClick={() => setVideoModalOpen(true)}
            >
              Ver Demonstração
            </CyberButton>
          </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-slate-800 pt-12 opacity-80">
            {[
              { val: '95%', label: 'Menos tempo no Acerto' },
              { val: 'Zero', label: 'Erros de Cálculo' },
              { val: '24/7', label: 'Sincronização Nuvem' },
              { val: 'Auto', label: 'Gestão de Comissões' }
            ].map((stat, i) => (
              <AnimatedCounter key={i} value={stat.val} label={stat.label} />
            ))}
          </div>
        </div>
      </header>

        {/* Workflow Section - NEW */}
        <section id="workflow" className="py-24 bg-slate-950 border-y border-slate-900 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-3xl font-bold uppercase tracking-widest mb-4 text-white">
              O Ciclo da <span className="text-cyan-400">Maleta Perfeita</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Entenda como o NexSales revoluciona a logística do seu consignado em 3 passos simples.</p>
          </div>
          
          <ProcessTimeline />
        </div>
      </section>

      {/* Products Section */}
      <section id="sistemas" className="py-32 relative bg-black/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6 reveal-on-scroll">
              <div>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wide mb-2 text-white">
                  Nossas <span className="text-fuchsia-500">Soluções</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-md">Tecnologia modular adaptada ao tamanho da sua operação.</p>
              </div>
              <div className="hidden md:block h-px w-32 bg-gradient-to-r from-transparent to-fuchsia-500"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {PRODUCTS.map((product, i) => (
              <div key={product.id} className={`reveal-on-scroll`} style={{ transitionDelay: `${i * 200}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware Compatibility Section */}
      <section id="hardware" className="py-24 bg-gradient-to-b from-slate-900/80 to-black/80 border-y border-slate-800 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16 reveal-on-scroll">
            <div className="p-3 bg-fuchsia-900/20 rounded-full mb-6 text-fuchsia-400">
              <Icons.Cpu size={32} />
            </div>
            <h2 className="text-3xl font-bold uppercase tracking-widest mb-4 text-white">Ecossistema Integrado</h2>
            <p className="text-gray-400 max-w-xl">Compatibilidade nativa com os principais periféricos do mercado.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 reveal-on-scroll delay-200">
            {[
              { icon: Icons.Printer, label: "Impressoras Térmicas", detail: "Zebra, Argox, Elgin" },
              { icon: Icons.Scan, label: "Leitores CCD/Laser", detail: "Leitura ultra-rápida" },
              { icon: Icons.Smartphone, label: "Mobile First", detail: "iOS & Android Nativo" },
              { icon: Icons.Briefcase, label: "Gestão de RFID", detail: "Compatível (Add-on)" },
            ].map((item, i) => (
              <div key={i} className="bg-slate-950/50 border border-slate-800 p-8 rounded-xl hover:border-cyan-400 transition-all group text-center hover:-translate-y-1 shadow-lg">
                <div className="inline-flex p-4 bg-slate-900 rounded-full text-cyan-400 mb-6 group-hover:scale-110 group-hover:bg-cyan-900/20 transition-all shadow-[0_0_15px_rgba(0,0,0,0.3)]">
                  <item.icon size={28} />
                </div>
                <h4 className="font-bold text-white mb-2 text-lg">{item.label}</h4>
                <p className="text-sm text-gray-500">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="py-32 relative bg-slate-950/80">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-900 to-transparent"></div>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-5xl font-bold uppercase tracking-widest mb-6 text-white">
              Planos & Valores
            </h2>
            
            {/* Pricing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8 bg-black/40 inline-flex p-2 rounded-full border border-slate-800 backdrop-blur-sm">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${billingCycle === 'monthly' ? 'bg-slate-700 text-white shadow-md' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Mensal
              </button>
              <button 
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(8,145,178,0.4)]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Anual <span className="text-[10px] bg-black/50 px-1.5 py-0.5 rounded border border-white/10">-20%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-[1400px] mx-auto items-stretch">
            {PLANS.map((plan, i) => (
              <div key={plan.id} className="reveal-on-scroll h-full" style={{ transitionDelay: `${i * 100}ms` }}>
                <PricingCard plan={plan} billingCycle={billingCycle} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-black/80 relative">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12 reveal-on-scroll">
            <div className="inline-flex items-center justify-center p-3 bg-cyan-900/20 rounded-full text-cyan-400 mb-4 border border-cyan-500/20">
              <Icons.HelpCircle size={24} />
            </div>
            <h2 className="text-3xl font-bold uppercase tracking-widest text-white">Perguntas Frequentes</h2>
          </div>
          
          <div className="reveal-on-scroll delay-100">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Footer Section */}
      <footer id="contato" className="pt-24 pb-12 bg-slate-950 relative border-t border-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <div className="reveal-on-scroll">
                <div className="mb-8">
                <h2 className="text-4xl font-bold mb-4 text-white">Fale com um Especialista</h2>
                <p className="text-gray-400 text-lg">Nossa equipe de implantação está pronta para desenhar o projeto ideal para sua distribuidora.</p>
              </div>
              
              <div className="space-y-6 font-rajdhani mt-10">
                <div className="flex items-center gap-4 p-5 bg-slate-900/30 border border-slate-800 rounded-xl hover:border-cyan-500 transition-colors group cursor-pointer">
                  <div className="bg-cyan-900/20 p-3 rounded-full text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all"><Icons.Send size={24}/></div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Email Corporativo</div>
                    <div className="text-xl text-white font-medium">comercial@nexsales.com.br</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 bg-slate-900/30 border border-slate-800 rounded-xl hover:border-fuchsia-500 transition-colors group cursor-pointer">
                  <div className="bg-fuchsia-900/20 p-3 rounded-full text-fuchsia-400 group-hover:bg-fuchsia-500 group-hover:text-black transition-all"><Icons.MessageSquare size={24}/></div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">WhatsApp Comercial</div>
                    <div className="text-xl text-white font-medium">+55 11 99999-0000</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-on-scroll delay-200">
              <ContactForm />
            </div>
          </div>

          {/* Professional Footer Columns */}
          <div className="border-t border-slate-900 pt-16 pb-8 grid md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <img 
                src="https://i.postimg.cc/Vs35JqPQ/Whats-App-Image-2025-11-12-at-17-40-27-removebg-preview.png" 
                alt="NexSales Logo" 
                className="h-16 w-auto mb-6 rounded-lg border border-slate-800 opacity-80 hover:opacity-100 transition-opacity"
              />
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Transformando a gestão de joias e consignado através de tecnologia de ponta e design futurista.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-500 hover:text-white transition-colors"><Icons.Instagram size={20} /></a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors"><Icons.Facebook size={20} /></a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors"><Icons.Linkedin size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Produto</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Sistema de Maletas</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Controle Financeiro</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">App da Revendedora</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Integrações</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Empresa</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Partner Program</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Legal & Suporte</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Status do Servidor</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-900 pt-8 text-center text-xs text-gray-600 uppercase tracking-widest">
            © {new Date().getFullYear()} NexSales Systems Ltda. Todos os direitos reservados. CNPJ: 00.000.000/0001-00
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <AIChat />
    </div>
  );
};

export default App;