import { useState, useEffect, useRef, type ReactNode } from 'react'
import {
  Menu, X, Code, ArrowRight, Zap, Shield, Rocket, Mail, Phone, ChevronRight,
  ArrowUpRight, Sparkles, Terminal, Database, Lock, UtensilsCrossed, ShoppingBag,
  CalendarCheck2, MessageCircleMore, Building2, PanelsTopLeft, Workflow, Target,
  GraduationCap, Linkedin, Github, Check,
} from 'lucide-react'
import CookieBanner, { CookiePreferencesLink } from '@/components/CookieBanner'
import { trackConversion } from '@/lib/analytics'

// ---------------------------------------------------------------------------
// Dados de contato e do responsável — edite aqui.
// ---------------------------------------------------------------------------
const WHATSAPP_NUMBER = '5511965019133'
const WHATSAPP_DISPLAY = '(11) 96501-9133'
const EMAIL = 'lucas.ribeiro.araujo000@gmail.com'

const FOUNDER = {
  name: 'Lucas Ribeiro',
  role: 'Fundador e desenvolvedor da RibeiroLab',
  // Coloque sua foto em /public (ex.: /public/lucas.jpg) e informe o caminho: '/lucas.jpg'
  photo: '',
  // Preencha para exibir os botões (deixe vazio para ocultar)
  linkedin: 'https://www.linkedin.com/in/lucasribeirodesenvolvedor/',
  github: 'https://github.com/RibeiroLuckas/',
}

const whatsappUrl = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`

const services = [
  { icon: Building2, title: 'Sites institucionais', description: 'Passe credibilidade logo no primeiro acesso e transforme visitas em pedidos de orçamento.' },
  { icon: PanelsTopLeft, title: 'Landing pages', description: 'Páginas focadas em uma única ação, ideais para campanhas e captação de contatos.' },
  { icon: Workflow, title: 'Sistemas sob medida', description: 'Automatize tarefas repetitivas com um sistema feito para a rotina do seu negócio.' },
  { icon: UtensilsCrossed, title: 'Cardápio digital', description: 'Cardápio sempre atualizado, fácil de abrir no celular e de compartilhar.' },
  { icon: ShoppingBag, title: 'Lojas virtuais', description: 'Venda online com catálogo organizado e pedido enviado direto para você.' },
  { icon: CalendarCheck2, title: 'Sistemas de agendamento', description: 'Clientes marcam horário sozinhos e você para de perder tempo no telefone.' },
  { icon: MessageCircleMore, title: 'Integração com WhatsApp', description: 'Leve o visitante do site para uma conversa no WhatsApp em um clique.' },
  { icon: Target, title: 'Tráfego pago e crescimento', description: 'Campanhas no Google e Meta com medição de resultados para gerar contatos qualificados.' },
]

type Project = { type: string; title: string; text: string; url: string; image: string; mediaType?: 'video'; live?: boolean }

const projects: Project[] = [
  { type: 'Odontologia', title: 'Lumina Odonto Studio', text: 'Experiência digital para clínica odontológica com foco em conforto, estética e planejamento digital em 3D.', url: 'https://model-dentista.netlify.app/', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=70' },
  { type: 'Advocacia empresarial', title: 'Silva & Associados', text: 'Site institucional com áreas de atuação, equipe, prova social, FAQ e chamada para consultoria jurídica.', url: 'https://model-adv.netlify.app/', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=70' },
  { type: 'Marcenaria', title: 'Marcenaria Arte', text: 'Portfólio de móveis planejados com projetos residenciais e comerciais, design de interiores e modelagem 3D.', url: 'https://model-marcenaria.netlify.app/', image: 'https://model-marcenaria.netlify.app/video.mp4', mediaType: 'video' },
  { type: 'Catálogo automotivo', title: 'AutoMotion', text: 'Catálogo de carros e motos com estoque, busca por veículos, financiamento e captação de interessados.', url: 'https://model-motor.netlify.app/', image: 'https://model-motor.netlify.app/video.mp4', mediaType: 'video' },
  { type: 'E-commerce', title: "Nativa's Mel", text: 'Loja de produtos apícolas com catálogo e carrinho que monta o pedido e envia tudo diretamente para o WhatsApp da empresa.', url: 'https://nativasmel.netlify.app/', image: 'https://nativasmel.netlify.app/imagens/bisnagas.png', live: true },
  { type: 'Beleza e estética', title: 'Salão de beleza', text: 'Catálogo de serviços por categoria com agenda integrada ao Trinks e opção de agendamento pelo WhatsApp.', url: 'https://seu-salao-aqui.netlify.app/', image: 'https://seu-salao-aqui.netlify.app/salon-animation.mp4', mediaType: 'video' },
  { type: 'Barbearia e agendamento', title: 'Barbearia Modelo', text: 'Apresentação de cortes e serviços com preços, duração e agendamento conectado ao Booksy.', url: 'https://sua-marca.netlify.app/', image: 'https://sua-marca.netlify.app/video.mp4', mediaType: 'video' },
  { type: 'Serviço local', title: 'Assistência Técnica', text: 'Site de assistência técnica com orçamento pelo WhatsApp, serviços especializados e leva e traz.', url: 'https://model-assistencia-tec.netlify.app/', image: 'https://model-assistencia-tec.netlify.app/marketing.jpg.jpg' },
  { type: 'Varejo e catálogo', title: 'Nina Store', text: 'Catálogo de moda e calçados com unidades físicas, Instagram e compra pelo WhatsApp.', url: 'https://nsninastore.netlify.app/', image: 'https://nsninastore.netlify.app/Captura%20de%20tela_28-7-2026_182416_.jpeg', live: true },
]

// Sites em produção primeiro, depois os modelos
const sortedProjects = [...projects].sort((a, b) => Number(!!b.live) - Number(!!a.live))
const liveCount = projects.filter(p => p.live).length
const modelCount = projects.length - liveCount

const pdvFeatures = [
  'Leitor de código de barras: o item entra na hora',
  'Pagamento combinado em até três formas, com troco calculado',
  'Consulta em tempo real de qual loja tem a peça',
  'Estoque com grade (cor e tamanho) e entrada de mercadoria',
  'Etiquetas com preço e código de barras',
]

// ---------------------------------------------------------------------------
// Efeitos visuais
// ---------------------------------------------------------------------------
function FloatingElements() {
  const rocket = 'M12 2C12 2 7 7 7 12C7 14.5 8 16.5 10 18L9 22L12 20L15 22L14 18C16 16.5 17 14.5 17 12C17 7 12 2 12 2ZM12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14Z'
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute top-[20%] left-[5%] animate-float"><svg className="w-12 h-12 text-purple-500/20" viewBox="0 0 24 24" fill="currentColor"><path d={rocket} /></svg></div>
      <div className="absolute bottom-[30%] left-[10%] animate-float" style={{ animationDelay: '2s' }}><svg className="w-10 h-10 text-cyan-500/20 rotate-45" viewBox="0 0 24 24" fill="currentColor"><path d={rocket} /></svg></div>
      <div className="absolute top-[70%] left-[50%] animate-float" style={{ animationDelay: '4s' }}><svg className="w-8 h-8 text-pink-500/15 -rotate-45" viewBox="0 0 24 24" fill="currentColor"><path d={rocket} /></svg></div>
      <div className="absolute top-[15%] right-[20%] w-2 h-2 bg-purple-400/30 rounded-full animate-pulse" />
      <div className="absolute top-[45%] left-[15%] w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-[25%] right-[25%] w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  )
}

// Atualiza a posição direto no DOM (sem re-render do React) e só em telas com mouse.
function MouseFollower() {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(finePointer && !reducedMotion)
  }, [])

  useEffect(() => {
    if (!enabled) return
    let frame = 0
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (ref.current) ref.current.style.transform = `translate3d(${e.clientX - 150}px, ${e.clientY - 150}px, 0)`
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => { window.removeEventListener('mousemove', handleMouseMove); cancelAnimationFrame(frame) }
  }, [enabled])

  if (!enabled) return null
  return <div ref={ref} className="mouse-follower" aria-hidden="true" />
}

function Logo() {
  return (
    <>
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
        <Terminal className="w-5 h-5 text-white" aria-hidden="true" />
      </div>
      <span className="font-bold text-xl text-white">Ribeiro<span className="text-gradient">Lab</span></span>
    </>
  )
}

// ---------------------------------------------------------------------------
// Seções
// ---------------------------------------------------------------------------
function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#contato' },
  ]

  return (
    <nav aria-label="Navegação principal" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isOpen ? 'glass shadow-lg' + (isOpen ? ' !bg-[#0d0d16]' : '') : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="#inicio" className="flex items-center gap-2" aria-label="RibeiroLab — início"><Logo /></a>
          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <a key={link.href} href={link.href} className="text-gray-300 hover:text-white transition-colors font-medium">{link.label}</a>
            ))}
            <a href="#contato" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2.5 rounded-full font-semibold hover:opacity-90 transition-all flex items-center gap-2">
              Solicitar orçamento <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 -mr-2 rounded-lg"
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isOpen}
            aria-controls="menu-mobile"
          >
            {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div id="menu-mobile" className="md:hidden border-t border-purple-500/20 bg-[#0d0d16] shadow-2xl">
          <div className="px-4 py-4 space-y-3">
            {links.map(link => (
              <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="block py-2 text-gray-300 hover:text-white transition-colors font-medium">{link.label}</a>
            ))}
            <a href="#contato" onClick={() => setIsOpen(false)} className="block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full font-semibold text-center">Solicitar orçamento</a>
          </div>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
          Sites que <span className="text-gradient">transformam visitantes</span> em clientes.
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Sites, landing pages e sistemas sob medida para pequenas empresas e profissionais autônomos —
          rápidos, fáceis de usar e conectados ao seu WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contato" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-full font-bold hover:opacity-90 transition-all hover:scale-105 glow-purple">
            Solicitar orçamento <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
          <a href="#servicos" className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors">
            Ver serviços <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>
      </div>

      <a href="#servicos" aria-label="Ir para os serviços" className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
        <ChevronRight className="w-6 h-6 text-purple-400 rotate-90" aria-hidden="true" />
      </a>
    </section>
  )
}

function Services() {
  return (
    <section id="servicos" className="py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-purple-300 font-semibold text-sm uppercase tracking-wider">Serviços</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">O que a RibeiroLab <span className="text-gradient">entrega</span></h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Soluções pensadas para restaurantes, prestadores de serviço, lojas e pequenas empresas.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ icon: Icon, title, description }) => (
            <div key={title} className="glass rounded-2xl p-6 card-hover group text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/15 flex items-center justify-center text-purple-300 mb-6 group-hover:-translate-y-1 transition-transform">
                <Icon className="w-8 h-8" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
              <p className="text-gray-300 text-sm flex-1">{description}</p>
              <a
                href={whatsappUrl(`Olá, RibeiroLab! Tenho interesse em: ${title}.`)}
                target="_blank" rel="noopener noreferrer"
                onClick={() => trackConversion('whatsapp')}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-300 hover:text-white transition-colors"
              >
                Quero este serviço <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectMedia({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  if (project.mediaType === 'video') {
    return (
      <video
        ref={videoRef}
        // "#t=0.1" faz o navegador mostrar o primeiro quadro como capa
        src={`${project.image}#t=0.1`}
        muted playsInline loop preload="metadata"
        aria-label={`Prévia em vídeo do projeto ${project.title}`}
        onMouseEnter={() => videoRef.current?.play().catch(() => {})}
        onMouseLeave={() => videoRef.current?.pause()}
        className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
      />
    )
  }
  return (
    <img
      src={project.image} alt={`Prévia do projeto ${project.title}`}
      loading="lazy" decoding="async" width={800} height={384}
      className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
    />
  )
}

function Projects() {
  return (
    <section id="projetos" className="py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-purple-300 font-semibold text-sm uppercase tracking-wider">Projetos</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Ideias que ganham <span className="text-gradient">forma</span></h2>
          </div>
          <p className="text-gray-300 max-w-md">
            Sistema e sites em uso por negócios reais, além de modelos prontos para adaptar à sua marca.
          </p>
        </div>

        {/* Case real em destaque */}
        <article className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent p-6 md:p-10 mb-12">
          <div className="grid lg:grid-cols-[2fr_3fr] gap-8 lg:gap-10 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-green-300">Em produção em 3 lojas</p>
              <h3 className="text-3xl font-bold text-white mt-2 mb-3">MeuPDV</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-5">
                Frente de caixa desenvolvido sob medida para uma rede de lojas de roupas. Antes, saber se outra loja tinha
                a peça dependia de um telefonema — agora a resposta aparece na tela do caixa.
              </p>
              <ul className="space-y-2.5">
                {pdvFeatures.map(item => (
                  <li key={item} className="flex gap-3 text-gray-200 text-sm">
                    <Check className="w-5 h-5 text-green-400 shrink-0" aria-hidden="true" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <figure>
              <video
                src="/videos/meupdv-apresentacao.mp4"
                poster="/videos/meupdv-capa.jpg"
                controls muted playsInline preload="none"
                width={1280} height={720}
                aria-label="Vídeo de apresentação do MeuPDV"
                className="w-full aspect-video rounded-2xl border border-white/10 bg-black shadow-2xl"
              />
              <figcaption className="text-gray-400 text-xs mt-3 text-center">Apresentação do sistema com dados de demonstração.</figcaption>
            </figure>
          </div>
        </article>

        <h3 className="text-xl font-bold text-white mb-6">Sites</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map((project) => (
            <article key={project.title} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] flex flex-col">
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900/40 to-blue-900/40">
                <ProjectMedia project={project} />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs uppercase tracking-wider text-purple-300">
                  {project.type} ·{' '}
                  {project.live
                    ? <span className="font-semibold text-green-300">Em produção</span>
                    : <span className="text-gray-400">Modelo</span>}
                </p>
                <h4 className="text-xl font-bold text-white mt-2 mb-2">{project.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed flex-1">{project.text}</p>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-semibold text-sm mt-5 hover:text-purple-300 transition-colors">
                  {project.live ? 'Visitar site' : 'Ver modelo'} <ArrowUpRight className="w-4 h-4" aria-hidden="true" /><span className="sr-only">(abre em nova aba)</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass rounded-2xl p-6 text-center">
      <p className="text-4xl font-bold text-gradient">{value}</p>
      <p className="text-gray-300 text-sm mt-1">{label}</p>
    </div>
  )
}

function About() {
  const initials = FOUNDER.name.split(' ').map(n => n[0]).slice(0, 2).join('')
  return (
    <section id="sobre" className="py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-purple-300 font-semibold text-sm uppercase tracking-wider">Sobre</p>
          <h2 className="text-4xl font-bold text-white mt-2 mb-6">Conheça a <span className="text-gradient">RibeiroLab</span></h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="glass rounded-3xl p-8 md:p-12">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
              {FOUNDER.photo ? (
                <img src={FOUNDER.photo} alt={`Foto de ${FOUNDER.name}`} width={128} height={128} className="w-32 h-32 rounded-2xl object-cover shrink-0 border border-purple-500/30" />
              ) : (
                <div className="w-32 h-32 rounded-2xl shrink-0 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-4xl font-bold text-white" aria-hidden="true">{initials}</div>
              )}
              <div className="text-center sm:text-left">
                <p className="text-2xl font-bold text-white">{FOUNDER.name}</p>
                <p className="text-purple-300 mb-4">{FOUNDER.role}</p>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  A <strong className="text-white">RibeiroLab</strong> nasceu da vontade de transformar ideias em experiências digitais
                  que geram resultado. O foco é <strong className="text-white">design moderno</strong>, <strong className="text-white">código limpo</strong> e
                  <strong className="text-white"> boa performance</strong> — sites que impressionam e, principalmente, trazem contatos para o seu negócio.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Você fala direto com quem desenvolve: do primeiro briefing até o deploy final, cada projeto recebe atenção individual
                  e comunicação clara.
                </p>
                {(FOUNDER.linkedin || FOUNDER.github) && (
                  <div className="flex justify-center sm:justify-start gap-3 mt-6">
                    {FOUNDER.linkedin && (
                      <a href={FOUNDER.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/10">
                        <Linkedin className="w-4 h-4" aria-hidden="true" /> LinkedIn
                      </a>
                    )}
                    {FOUNDER.github && (
                      <a href={FOUNDER.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/10">
                        <Github className="w-4 h-4" aria-hidden="true" /> GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Stat value="3" label="lojas usando o MeuPDV" />
            <Stat value={String(liveCount)} label="sites de clientes no ar" />
            <Stat value={String(modelCount)} label="modelos de sites publicados" />
          </div>

          <div className="glass rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-purple-300" aria-hidden="true" />
              Formação e certificações
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Mantenho uma formação contínua em desenvolvimento de software: curso Análise e Desenvolvimento de Sistemas e tenho
              <strong className="text-white"> certificações em Java e Spring Boot</strong> e em
              <strong className="text-white"> dados com Databricks</strong> (Engenharia de Dados e IA Generativa).
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Também participei de <strong className="text-white">bootcamps práticos</strong> de desenvolvimento back-end com Java
              e de soluções com <strong className="text-white">Inteligência Artificial</strong>.
            </p>

            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <Code className="w-6 h-6" />, text: 'Java & Spring Boot', color: 'text-orange-400' },
                { icon: <Database className="w-6 h-6" />, text: 'Databricks', color: 'text-red-400' },
                { icon: <Terminal className="w-6 h-6" />, text: 'Back-end', color: 'text-green-400' },
                { icon: <Sparkles className="w-6 h-6" />, text: 'IA Generativa', color: 'text-purple-400' },
              ].map((item) => (
                <li key={item.text} className="flex flex-col items-center gap-2 bg-lab-dark/50 rounded-xl p-4 text-center">
                  <span className={item.color} aria-hidden="true">{item.icon}</span>
                  <span className="font-medium text-white text-sm">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Zap className="w-5 h-5" />, text: 'Entrega rápida', color: 'text-yellow-400' },
              { icon: <Shield className="w-5 h-5" />, text: 'Código limpo', color: 'text-green-400' },
              { icon: <Rocket className="w-5 h-5" />, text: 'Performance', color: 'text-blue-400' },
              { icon: <Lock className="w-5 h-5" />, text: 'Segurança', color: 'text-purple-400' },
            ].map((item) => (
              <li key={item.text} className="flex flex-col items-center gap-2 glass rounded-xl p-6 text-center">
                <span className={item.color} aria-hidden="true">{item.icon}</span>
                <span className="font-medium text-white text-sm">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" aria-hidden="true" />
          <div className="relative z-10">
            <Sparkles className="w-12 h-12 text-purple-300 mx-auto mb-6" aria-hidden="true" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pronto para transformar seu negócio?</h2>
            <p className="text-gray-300 text-lg mb-8">Conte sua ideia e receba uma proposta sem compromisso.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contato" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all hover:scale-105 glow-purple">
                Solicitar orçamento <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href={whatsappUrl('Olá, RibeiroLab! Quero conversar sobre um projeto.')} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion('whatsapp')}
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors">
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const inputClass = 'w-full bg-white/90 border border-purple-500/30 rounded-xl px-4 py-3 text-black placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-400/60 transition-colors'

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-gray-200 mb-2 block">{label}</label>
      {children}
    </div>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const service = formData.get('service')
    const message = [
      `Olá, RibeiroLab! Meu nome é ${formData.get('name')}.`,
      `Meu e-mail é ${formData.get('email')}.`,
      service ? `Tenho interesse em: ${service}.` : '',
      String(formData.get('message') || ''),
    ].filter(Boolean).join(' ')
    trackConversion('form')
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <section id="contato" className="py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-purple-300 font-semibold text-sm uppercase tracking-wider">Contato</p>
            <h2 className="text-4xl font-bold text-white mt-2 mb-6">Vamos <span className="text-gradient">conversar</span>?</h2>
            <p className="text-gray-300 text-lg mb-8">Conte sobre o seu projeto — você fala diretamente com quem vai desenvolver.</p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center"><Mail className="w-6 h-6 text-purple-300" aria-hidden="true" /></div>
                <div className="min-w-0">
                  <p className="text-white font-medium">E-mail</p>
                  <a href={`mailto:${EMAIL}`} className="text-gray-300 hover:text-white transition-colors break-all">{EMAIL}</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center"><Phone className="w-6 h-6 text-blue-300" aria-hidden="true" /></div>
                <div>
                  <p className="text-white font-medium">WhatsApp</p>
                  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion('whatsapp')} className="text-gray-300 hover:text-white transition-colors">{WHATSAPP_DISPLAY}</a>
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-8">
            {sent ? (
              <div className="text-center py-10" role="status">
                <MessageCircleMore className="w-12 h-12 text-green-400 mx-auto mb-4" aria-hidden="true" />
                <p className="text-2xl font-bold text-white mb-2">Quase lá!</p>
                <p className="text-gray-300 mb-6">Sua mensagem foi preparada no WhatsApp. É só tocar em enviar por lá.</p>
                <button type="button" onClick={() => setSent(false)} className="text-purple-300 font-semibold hover:text-white underline underline-offset-4">Escrever outra mensagem</button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <Field id="name" label="Nome">
                  <input id="name" name="name" required type="text" autoComplete="name" className={inputClass} placeholder="Seu nome" />
                </Field>
                <Field id="email" label="E-mail">
                  <input id="email" name="email" required type="email" autoComplete="email" className={inputClass} placeholder="seu@email.com" />
                </Field>
                <Field id="service" label="Serviço de interesse (opcional)">
                  <select id="service" name="service" className={inputClass} defaultValue="">
                    <option value="">Ainda não sei</option>
                    {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                  </select>
                </Field>
                <Field id="message" label="Mensagem">
                  <textarea id="message" name="message" required className={`${inputClass} h-32 resize-none`} placeholder="Conte um pouco sobre o seu negócio e o que você precisa" />
                </Field>
                <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  Enviar pelo WhatsApp <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Ao enviar, você será direcionado ao WhatsApp. Saiba como tratamos seus dados na{' '}
                  <a href="/politica-de-privacidade/" className="text-purple-300 hover:text-white underline underline-offset-4">Política de Privacidade</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 border-t border-purple-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4"><Logo /></div>
            <p className="text-gray-400 text-sm">Desenvolvimento web em São Paulo/SP.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              {services.map((service) => <li key={service.title}><a href="#servicos" className="hover:text-purple-300 transition-colors">{service.title}</a></li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#servicos" className="hover:text-purple-300 transition-colors">Serviços</a></li>
              <li><a href="#projetos" className="hover:text-purple-300 transition-colors">Projetos</a></li>
              <li><a href="#sobre" className="hover:text-purple-300 transition-colors">Sobre</a></li>
              <li><a href="#contato" className="hover:text-purple-300 transition-colors">Contato</a></li>
              <li><a href="/politica-de-privacidade/" className="hover:text-purple-300 transition-colors">Política de Privacidade</a></li>
              <li><CookiePreferencesLink className="hover:text-purple-300 transition-colors" /></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href={`mailto:${EMAIL}`} className="hover:text-purple-300 transition-colors break-all">{EMAIL}</a></li>
              <li><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion('whatsapp')} className="hover:text-purple-300 transition-colors">{WHATSAPP_DISPLAY}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-purple-500/20 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} RibeiroLab — Todos os direitos reservados ·{' '}
            <a href="/politica-de-privacidade/" className="hover:text-purple-300 transition-colors underline underline-offset-4">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

function WhatsAppButton() {
  return (
    <a href={whatsappUrl('Olá, RibeiroLab! Vim pelo site.')} target="_blank" rel="noopener noreferrer" aria-label="Conversar pelo WhatsApp" title="Conversar pelo WhatsApp"
      onClick={() => trackConversion('whatsapp')}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 hover:scale-110 transition-all">
      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-lab-dark">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-lg">
        Pular para o conteúdo
      </a>
      <MouseFollower />
      <FloatingElements />
      <div className="noise" aria-hidden="true" />
      <Navbar />
      <main id="conteudo">
        <Hero />
        <Services />
        <Projects />
        <About />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </div>
  )
}
