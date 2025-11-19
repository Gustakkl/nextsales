import React, { useEffect, useState } from 'react';
import { Icons } from './components/Icons';
import { CyberButton } from './components/CyberButton';
import { ProductCard } from './components/ProductCard';
import { PricingCard } from './components/PricingCard';
import { AIChat } from './components/AIChat';
import { LoginModal } from './components/LoginModal';
import { ClientDashboard } from './components/ClientDashboard';
import { Product, Plan } from './types';

// --- Data ---
const PRODUCTS: Product[] = [
  {
    id: 'bijou',
    name: 'NexSales Bijuterias',
    tagline: 'Precisão para Detalhes Preciosos',
    description: 'O sistema definitivo para joalherias. Controle de estoque unitário, etiquetas Code-128 e gestão de consignado em uma interface de vidro.',
    features: ['Etiquetas Inteligentes', 'Gestão de Consignado', 'Rastreio Unitário', 'Tendências AI'],
    icon: 'diamond',
    color: 'pink'
  },
  {
    id: 'caixa',
    name: 'NexSales Caixa',
    tagline: 'Velocidade Supersônica',
    description: 'PDV projetado para o caos. Processamento instantâneo, fechamento cego e integração fiscal total. Nunca deixe seu cliente esperando.',
    features: ['PDV Instantâneo', 'NFC-e/SAT Fiscal', 'Fechamento Cego', 'Modo Offline'],
    icon: 'cart',
    color: 'cyan'
  }
];

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Iniciante',
    price: 'R$ 99',
    priceYearly: 'R$ 79',
    features: ['1 Usuário Neural', 'Até 500 SKUs', 'Suporte Email', 'Backup Nuvem'],
    recommended: false
  },
  {
    id: 'pro',
    name: 'Profissional',
    price: 'R$ 199',
    priceYearly: 'R$ 159',
    features: ['3 Usuários Neurais', 'SKUs Ilimitados', 'Suporte WhatsApp', 'Fiscal Ilimitado', 'Dashboard AI'],
    recommended: true
  },
  {
    id: 'enterprise',
    name: 'Corporativo',
    price: 'Consulte',
    features: ['Usuários Ilimitados', 'Multi-Lojas', 'API Dedicada', 'Gerente de Conta', 'IA Preditiva Custom'],
    recommended: false
  }
];

const TESTIMONIALS = [
  {
    name: "Sarah 'Viper' Connor",
    role: "CEO, Neo-Joias",
    text: "O controle de estoque unitário mudou o jogo. Antes perdíamos 15% em furtos e erros. Com o NexSales Bijuterias, a precisão é cirúrgica.",
    rating: 5
  },
  {
    name: "Marcos Tech",
    role: "Gerente, MegaVarejo",
    text: "O PDV não trava. Nunca. Passamos pela Black Friday processando 3 vendas por segundo e o sistema nem piscou. A sincronia offline é bruxaria.",
    rating: 5
  },
  {
    name: "Elena 2077",
    role: "Franqueada, StyleCorp",
    text: "A interface é linda, meus funcionários aprenderam em 10 minutos. É como usar um software do futuro hoje.",
    rating: 4
  }
];

const FAQS = [
  {
    q: "O sistema funciona sem internet?",
    a: "Afirmativo. O NexSales opera com um núcleo híbrido. Você vende offline e o sistema sincroniza com a nuvem assim que a conexão neural é restabelecida."
  },
  {
    q: "Preciso comprar servidor dedicado?",
    a: "Negativo. Todo o processamento pesado ocorre em nossos clusters na nuvem. Você só precisa de um computador básico ou tablet."
  },
  {
    q: "O suporte técnico é humano ou robô?",
    a: "Híbrido. Nossa IA resolve 80% dos casos instantaneamente. Para problemas complexos, nossos engenheiros de elite assumem o controle via acesso remoto seguro."
  },
  {
    q: "Emite notas fiscais (NFC-e / NF-e)?",
    a: "Totalmente homologado em todos os estados da federação. Integração nativa com SAT, MFE e certificados A1."
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

const ContactForm = () => {
  return (
    <form className="space-y-6 bg-slate-900/50 p-8 border border-slate-700 backdrop-blur-sm rounded-lg relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500"></div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-cyan-400 text-xs uppercase tracking-widest font-bold">Codinome / Nome</label>
          <input type="text" className="w-full bg-black/50 border border-slate-700 text-white p-3 focus:border-cyan-400 focus:outline-none transition-colors clip-path-input" placeholder="Digite seu nome" />
        </div>
        <div className="space-y-2">
          <label className="text-cyan-400 text-xs uppercase tracking-widest font-bold">Frequência / Email</label>
          <input type="email" className="w-full bg-black/50 border border-slate-700 text-white p-3 focus:border-cyan-400 focus:outline-none transition-colors clip-path-input" placeholder="email@exemplo.com" />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-cyan-400 text-xs uppercase tracking-widest font-bold">Dados da Missão / Mensagem</label>
        <textarea rows={4} className="w-full bg-black/50 border border-slate-700 text-white p-3 focus:border-cyan-400 focus:outline-none transition-colors clip-path-input" placeholder="Descreva sua necessidade..."></textarea>
      </div>

      <CyberButton variant="cyan" className="w-full flex items-center justify-center gap-2" onClick={(e) => e.preventDefault()}>
        <Icons.Send size={18} /> Iniciar Protocolo de Contato
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
        <span className={`font-bold uppercase tracking-wider ${isOpen ? 'text-cyan-400' : 'text-gray-300'}`}>
          <span className="text-fuchsia-500 mr-2">root@user:~$</span> {question}
        </span>
        {isOpen ? <Icons.ChevronUp className="text-cyan-400" /> : <Icons.ChevronDown className="text-gray-500" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-5 pt-0 text-gray-400 border-t border-slate-800/50 font-mono text-sm leading-relaxed">
          {'>'} {answer}
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
  
  // Client Area State
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isClientArea, setIsClientArea] = useState(false);

  const heroTitle = useTypewriter("SISTEMA OPERACIONAL V3.0", 100);
  
  useIntersectionObserver();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    setIsLoginModalOpen(false);
    setIsClientArea(true);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setIsClientArea(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen font-rajdhani text-gray-200 selection:bg-fuchsia-500/30 selection:text-fuchsia-200 overflow-x-hidden">
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      {/* Navigation */}
      <nav className={`
        fixed top-0 w-full z-50 transition-all duration-500 border-b
        ${scrolled || isClientArea ? 'bg-black/90 backdrop-blur-md py-3 border-cyan-900/50' : 'bg-transparent py-6 border-transparent'}
      `}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div 
            className="text-2xl font-orbitron font-black tracking-widest italic flex items-center gap-2 group cursor-pointer"
            onClick={() => setIsClientArea(false)}
          >
            <div className="w-3 h-3 bg-cyan-400 rotate-45 group-hover:animate-spin"></div>
            NEX<span className="text-cyan-400 group-hover:text-fuchsia-400 transition-colors">SALES</span>
          </div>
          
          {/* Desktop Menu */}
          {!isClientArea && (
            <div className="hidden md:flex gap-8 font-medium tracking-wider text-sm uppercase items-center">
              {['Sistemas', 'Recursos', 'Planos', 'FAQ', 'Contato'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="relative text-gray-400 hover:text-white transition-colors group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
                </a>
              ))}
              <CyberButton 
                variant="pink" 
                className="text-xs py-2 px-6 scale-90"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Área do Cliente
              </CyberButton>
            </div>
          )}

          {/* Mobile Toggle */}
          {!isClientArea && (
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <Icons.X /> : <Icons.Terminal />}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && !isClientArea && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 border-b border-cyan-500/30 p-6 flex flex-col gap-4 animate-slideDown">
             {['Sistemas', 'Recursos', 'Planos', 'FAQ', 'Contato'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-lg font-orbitron text-cyan-400 border-l-2 border-transparent hover:border-fuchsia-500 pl-4 transition-all">
                {item}
              </a>
            ))}
            <button 
              className="text-left text-lg font-orbitron text-fuchsia-400 border-l-2 border-transparent hover:border-white pl-4 transition-all"
              onClick={() => setIsLoginModalOpen(true)}
            >
              ÁREA DO CLIENTE
            </button>
          </div>
        )}
      </nav>

      {/* Content Switcher */}
      {isClientArea ? (
        <ClientDashboard onLogout={handleLogout} />
      ) : (
        <>
          {/* Hero Section */}
          <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Dynamic Background Elements */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-600/20 blur-[120px] rounded-full animate-pulse pointer-events-none" />
            <div className="absolute bottom-0 -right-20 w-96 h-96 bg-fuchsia-600/20 blur-[120px] rounded-full animate-pulse pointer-events-none delay-1000" />

            <div className="container mx-auto px-6 relative z-10 text-center">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1 border border-cyan-500/30 rounded-full bg-cyan-950/30 backdrop-blur-md">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                <span className="text-cyan-400 text-xs uppercase tracking-[0.3em] font-bold">{heroTitle}<span className="animate-pulse">_</span></span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight tracking-tighter glitch-wrapper">
                <span className="glitch-effect" data-text="DOMINE">DOMINE</span><br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-fuchsia-500">O MERCADO</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed border-l-2 border-fuchsia-500 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
                Não é apenas um sistema. É uma vantagem competitiva desleal para sua loja de <span className="text-fuchsia-400 font-bold">Bijuterias</span> e <span className="text-cyan-400 font-bold">Varejo</span>.
              </p>
              
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <CyberButton variant="cyan" glow className="text-lg px-10 py-4">Inicializar Demo</CyberButton>
                <CyberButton variant="pink" className="text-lg px-10 py-4 bg-transparent">Ver Hardware</CyberButton>
              </div>

               <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-80">
                {[
                  { val: '0.2s', label: 'Latência' },
                  { val: '99.9%', label: 'Uptime' },
                  { val: 'AI', label: 'Analytics' },
                  { val: 'AES-256', label: 'Segurança' }
                ].map((stat, i) => (
                  <div key={i} className="border-l border-cyan-900 pl-4 text-left">
                    <div className="text-3xl font-bold text-white font-orbitron">{stat.val}</div>
                    <div className="text-xs uppercase tracking-widest text-cyan-500 font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </header>

          {/* Products Section */}
          <section id="sistemas" className="py-32 relative">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6 reveal-on-scroll">
                 <div>
                   <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wide mb-2">
                     Arsenal <span className="text-cyan-400">Tecnológico</span>
                   </h2>
                   <p className="text-gray-400 text-lg max-w-md">Ferramentas especializadas para operações de alto desempenho.</p>
                 </div>
                 <div className="hidden md:block h-px w-32 bg-gradient-to-r from-transparent to-cyan-500"></div>
              </div>

              <div className="grid lg:grid-cols-2 gap-16">
                {PRODUCTS.map((product, i) => (
                  <div key={product.id} className={`reveal-on-scroll`} style={{ transitionDelay: `${i * 200}ms` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Hardware Compatibility Section */}
          <section id="hardware" className="py-20 bg-slate-900/20 border-y border-slate-800 relative">
            <div className="container mx-auto px-6">
              <div className="flex flex-col items-center text-center mb-12 reveal-on-scroll">
                <Icons.Cpu className="text-fuchsia-500 mb-4" size={40} />
                <h2 className="text-3xl font-bold uppercase tracking-widest mb-4">Equipamento Compatível</h2>
                <p className="text-gray-400 max-w-xl">Nosso código roda nos metais mais resistentes do mercado.</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 reveal-on-scroll delay-200">
                {[
                  { icon: Icons.Printer, label: "Impressoras Térmicas", detail: "Epson, Bematech, Elgin" },
                  { icon: Icons.Scan, label: "Scanners 1D/2D", detail: "Leitura em < 0.1ms" },
                  { icon: Icons.Smartphone, label: "Mobile / Tablets", detail: "Android & iOS" },
                  { icon: Icons.CreditCard, label: "TEF Integrado", detail: "Stone, Cielo, Rede" },
                ].map((item, i) => (
                  <div key={i} className="bg-black/40 border border-slate-800 p-6 rounded-lg hover:border-cyan-400 transition-all group text-center">
                    <div className="inline-flex p-4 bg-slate-800 rounded-full text-cyan-400 mb-4 group-hover:scale-110 group-hover:bg-cyan-900/20 transition-all">
                      <item.icon size={24} />
                    </div>
                    <h4 className="font-bold text-white mb-1">{item.label}</h4>
                    <p className="text-xs text-gray-500 font-mono">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section id="recursos" className="py-32 bg-slate-950/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            
            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center mb-20 reveal-on-scroll">
                <div className="inline-block border border-fuchsia-500/30 px-3 py-1 rounded text-fuchsia-400 text-xs font-bold tracking-widest uppercase mb-4">Core Features</div>
                <h2 className="text-4xl font-bold uppercase tracking-widest mb-4">Arquitetura do Sistema</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                 {[
                   { title: "Cloud Híbrida", icon: Icons.Zap, text: "Sincronização quântica. Funciona offline e atualiza a nuvem assim que a conexão retorna.", color: "text-yellow-400" },
                   { title: "Cyber Security", icon: Icons.Shield, text: "Criptografia de ponta-a-ponta. Seus dados de faturamento protegidos como segredos de estado.", color: "text-cyan-400" },
                   { title: "Neural Analytics", icon: Icons.BarChart3, text: "IA preditiva que analisa tendências de vendas antes mesmo delas acontecerem.", color: "text-fuchsia-400" }
                 ].map((feat, i) => (
                   <div key={i} className="reveal-on-scroll p-8 border border-slate-800 bg-black/40 hover:bg-slate-900/60 transition-all duration-300 rounded-xl hover:-translate-y-2 hover:border-cyan-500/30 group">
                     <div className={`w-14 h-14 bg-slate-900 rounded-lg flex items-center justify-center ${feat.color} mb-6 group-hover:scale-110 transition-transform border border-slate-800 group-hover:border-current shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                       <feat.icon size={28} />
                     </div>
                     <h4 className="text-2xl font-bold text-white mb-3 font-orbitron">{feat.title}</h4>
                     <p className="text-gray-400 leading-relaxed">{feat.text}</p>
                   </div>
                 ))}
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="planos" className="py-32 relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-900 to-transparent"></div>
            <div className="container mx-auto px-6">
              <div className="text-center mb-16 reveal-on-scroll">
                <h2 className="text-5xl font-bold uppercase tracking-widest mb-6 text-white">
                  Planos de Acesso
                </h2>
                
                {/* Pricing Toggle */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <span className={`text-sm font-bold tracking-widest uppercase ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-500'}`}>Mensal</span>
                  <button 
                    onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                    className="w-16 h-8 bg-slate-800 rounded-full p-1 relative border border-cyan-500/50 transition-all shadow-[0_0_10px_rgba(34,211,238,0.2)]"
                  >
                    <div className={`w-6 h-6 bg-cyan-400 rounded-full shadow-sm transition-all duration-300 ${billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-0'}`}></div>
                  </button>
                  <span className={`text-sm font-bold tracking-widest uppercase ${billingCycle === 'yearly' ? 'text-cyan-400' : 'text-gray-500'}`}>Anual <span className="text-[10px] bg-fuchsia-600 text-white px-1 rounded ml-1">-20%</span></span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
                {PLANS.map((plan, i) => (
                  <div key={plan.id} className="reveal-on-scroll" style={{ transitionDelay: `${i * 150}ms` }}>
                    <PricingCard plan={plan} billingCycle={billingCycle} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-24 relative overflow-hidden">
             <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 reveal-on-scroll">
                  <h2 className="text-3xl font-bold uppercase tracking-widest text-white mb-2">Transmissões de <span className="text-fuchsia-500">Parceiros</span></h2>
                  <div className="w-24 h-1 bg-fuchsia-500 mx-auto"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {TESTIMONIALS.map((testi, i) => (
                    <div key={i} className="reveal-on-scroll p-6 bg-slate-900/40 border border-slate-800 backdrop-blur-sm rounded-tl-2xl rounded-br-2xl hover:bg-slate-800/60 transition-all relative">
                      <div className="absolute -top-3 -left-3 text-fuchsia-500/20">
                        <Icons.MessageSquare size={40} />
                      </div>
                      <div className="flex gap-1 mb-4 text-cyan-400">
                         {[...Array(5)].map((_, starI) => (
                           <Icons.Star key={starI} size={14} fill={starI < testi.rating ? "currentColor" : "none"} className={starI < testi.rating ? "text-cyan-400" : "text-gray-700"} />
                         ))}
                      </div>
                      <p className="text-gray-300 mb-6 italic relative z-10">"{testi.text}"</p>
                      <div className="flex items-center gap-3 border-t border-slate-800 pt-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-black">
                          {testi.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{testi.name}</div>
                          <div className="text-xs text-fuchsia-400 font-mono">{testi.role}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-24 bg-black relative">
            <div className="container mx-auto px-6 max-w-3xl">
              <div className="text-center mb-12 reveal-on-scroll">
                <div className="inline-flex items-center justify-center p-3 bg-cyan-900/20 rounded-full text-cyan-400 mb-4">
                  <Icons.HelpCircle size={24} />
                </div>
                <h2 className="text-3xl font-bold uppercase tracking-widest text-white">Banco de Dados Neural (FAQ)</h2>
              </div>
              
              <div className="reveal-on-scroll delay-100">
                {FAQS.map((faq, i) => (
                  <FAQItem key={i} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          </section>

          {/* Contact / Footer Section */}
          <footer id="contato" className="py-20 bg-slate-950 relative border-t border-slate-900">
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-16 mb-20">
                <div className="reveal-on-scroll">
                   <div className="mb-8">
                    <h2 className="text-4xl font-bold mb-4 text-white">INICIAR CONEXÃO</h2>
                    <p className="text-gray-400">Nossos agentes estão prontos para implantar o sistema na sua base.</p>
                  </div>
                  
                  <div className="space-y-6 font-rajdhani">
                    <div className="flex items-center gap-4 p-4 bg-slate-900/30 border border-slate-800 rounded hover:border-cyan-500 transition-colors">
                      <div className="bg-cyan-900/20 p-3 rounded text-cyan-400"><Icons.Send size={20}/></div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest">Canal de Email</div>
                        <div className="text-lg text-white">comercial@nexsales.cyber</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-slate-900/30 border border-slate-800 rounded hover:border-fuchsia-500 transition-colors">
                      <div className="bg-fuchsia-900/20 p-3 rounded text-fuchsia-400"><Icons.MessageSquare size={20}/></div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest">Link Neural (WhatsApp)</div>
                        <div className="text-lg text-white">+55 11 99999-0000</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="reveal-on-scroll delay-200">
                  <ContactForm />
                </div>
              </div>

              <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 opacity-50 hover:opacity-100 transition-opacity">
                <div className="text-2xl font-orbitron font-black italic">
                  NEX<span className="text-cyan-400">SALES</span>
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">
                  © 2077 NexSales Systems. Protocolo Seguro.
                </div>
              </div>
            </div>
          </footer>

          {/* Chat Widget - Only on landing page */}
          <AIChat />
        </>
      )}
    </div>
  );
};

export default App;