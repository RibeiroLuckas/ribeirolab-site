import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Menu, X, Mail, Linkedin, Github } from 'lucide-react'
import CookieBanner, { CookiePreferencesLink } from '@/components/CookieBanner'
import { trackConversion } from '@/lib/analytics'

// ---------------------------------------------------------------------------
// Dados — edite aqui.
// ---------------------------------------------------------------------------
const WHATSAPP_NUMBER = '5511965019133'
const WHATSAPP_DISPLAY = '(11) 96501-9133'
const EMAIL = 'lucas.ribeiro.araujo000@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/lucasribeirodesenvolvedor/'
const GITHUB = 'https://github.com/RibeiroLuckas/'

const whatsappUrl = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`

const vitrine = ['nativas-mel', 'nina-store', 'lumina-odonto', 'marcenaria-arte', 'automotion', 'silva-associados', 'salao-beleza', 'barbearia-modelo']

type Work = { title: string; kind: string; status: string; text: string; image: string; url?: string; video?: string }

const works: Work[] = [
  { title: "Nativa's Mel", kind: 'Loja virtual', status: 'Cliente', text: 'Catálogo por florada e carrinho que envia o pedido pronto para o WhatsApp da empresa.', image: '/projetos/nativas-mel.webp', url: 'https://nativasmel.netlify.app/' },
  { title: 'Nina Store', kind: 'Catálogo de moda', status: 'Cliente', text: 'Vitrine das lojas físicas, Instagram integrado e compra pelo WhatsApp.', image: '/projetos/nina-store.webp', url: 'https://nsninastore.netlify.app/' },
  { title: 'MeuPDV', kind: 'Sistema sob medida', status: 'Cliente, em uso em 3 lojas', text: 'Frente de caixa com estoque entre lojas, etiquetas com código de barras e pagamento combinado.', image: '/videos/meupdv-capa.jpg', video: '/videos/meupdv-apresentacao.mp4' },
  { title: 'Lumina Odonto', kind: 'Clínica odontológica', status: 'Modelo para adaptar', text: 'Identidade elegante, especialidades e agendamento de consulta.', image: '/projetos/lumina-odonto.webp', url: 'https://model-dentista.netlify.app/' },
  { title: 'Marcenaria Arte', kind: 'Marcenaria', status: 'Modelo para adaptar', text: 'Portfólio de móveis planejados com pedido de orçamento.', image: '/projetos/marcenaria-arte.webp', url: 'https://model-marcenaria.netlify.app/' },
  { title: 'AutoMotion', kind: 'Loja de veículos', status: 'Modelo para adaptar', text: 'Estoque de carros e motos com busca e simulação de financiamento.', image: '/projetos/automotion.webp', url: 'https://model-motor.netlify.app/' },
]

const offers = [
  { title: 'Ser encontrado', text: 'Site institucional, landing page, cardápio digital e botão de WhatsApp.', message: 'Olá! Quero um site para o meu negócio ser encontrado.' },
  { title: 'Vender pela internet', text: 'Loja virtual, catálogo com pedido no WhatsApp e agendamento online.', message: 'Olá! Quero vender ou receber agendamentos pela internet.' },
  { title: 'Organizar a operação', text: 'Sistemas sob medida como o MeuPDV, em uso em 3 lojas.', message: 'Olá! Quero conversar sobre um sistema sob medida.' },
]

const steps = [
  { title: 'Conversa', text: 'Você me conta pelo WhatsApp o que o seu negócio precisa.' },
  { title: 'Proposta', text: 'Escopo, prazo e valor por escrito, antes de qualquer pagamento.' },
  { title: 'Criação', text: 'Você acompanha o site sendo feito e pede ajustes.' },
  { title: 'No ar', text: 'Publico, conecto o WhatsApp e mostro como atualizar.' },
]

const navLinks = [
  { label: 'Trabalhos', href: '#trabalhos' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Como funciona', href: '#processo' },
  { label: 'Sobre', href: '#sobre' },
]

// ---------------------------------------------------------------------------
// Peças
// ---------------------------------------------------------------------------
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  )
}

function WhatsAppLink({ children, className, message, label }: { children: ReactNode; className?: string; message?: string; label?: string }) {
  return (
    <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion('whatsapp')} className={className} aria-label={label}>
      {children}
    </a>
  )
}

function Win({ src, alt = '' }: { src: string; alt?: string }) {
  return (
    <div className="d-win">
      <div className="d-win-barra" aria-hidden="true"><i /><i /><i /></div>
      <img src={src} alt={alt} width={800} height={450} loading="lazy" decoding="async" />
    </div>
  )
}

/** Faz títulos aparecerem ao rolar (uma vez). */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.d-rev')
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return }
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    }), { threshold: 0.15 })
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [])
}

// ---------------------------------------------------------------------------
// Seções
// ---------------------------------------------------------------------------
function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.75)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`d-header ${solid ? 'solid' : ''} ${open ? 'aberto' : ''}`}>
      <div className="d-wrap">
        <a href="#inicio" className="d-logo" aria-label="RibeiroLab, início">RibeiroLab</a>
        <nav aria-label="Navegação principal" className="d-nav flex items-center">
          <span className="d-nav-links">
            {navLinks.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
          </span>
          <a href="#contato" className="d-btn d-nav-cta ml-7">Pedir orçamento</a>
          <button type="button" onClick={() => setOpen(!open)} className="-mr-2 ml-4 rounded-md p-2 lg:hidden"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="menu-celular">
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </nav>
      </div>
      {open && (
        <nav id="menu-celular" aria-label="Navegação principal" className="border-t border-linha bg-white text-tinta lg:hidden">
          <div className="d-wrap flex flex-col py-3">
            {navLinks.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-lg font-medium">{l.label}</a>)}
            <a href="#contato" onClick={() => setOpen(false)} className="d-btn my-2">Pedir orçamento</a>
          </div>
        </nav>
      )}
    </header>
  )
}

function Hero() {
  const words = 'Identidade que faz o cliente parar.'.split(' ')
  return (
    <section id="inicio" className="d-hero">
      <div className="d-wrap">
        <h1 className="d-h" aria-label="Identidade que faz o cliente parar.">
          {words.map((w, i) => (
            <span key={i} aria-hidden="true">
              <span className="d-palavra"><span style={{ animationDelay: `${i * 0.08}s` }}>{w}</span></span>{i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>
        <div className="d-hero-linha">
          <p>Sites, lojas virtuais e sistemas para pequenos negócios, com visual próprio e pedidos chegando no WhatsApp. Você fala direto com quem cria.</p>
          <WhatsAppLink className="d-btn" message="Olá! Vi o site da RibeiroLab e quero um orçamento."><WhatsAppIcon /> Pedir orçamento</WhatsAppLink>
        </div>
      </div>
      <div className="d-faixa" aria-label="Sites feitos pela RibeiroLab">
        <div className="d-trilho">
          {[...vitrine, ...vitrine].map((v, i) => (
            <div key={i} aria-hidden={i >= vitrine.length ? true : undefined}>
              <Win src={`/projetos/${v}.webp`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Trabalhos() {
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i))
    }), { rootMargin: '-45% 0px -45% 0px' })
    stepRefs.current.forEach(el => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!works[active].video) videoRef.current?.pause()
  }, [active])

  return (
    <section id="trabalhos" className="d-sec scroll-mt-16">
      <div className="d-wrap">
        <div className="d-intro d-rev">
          <h2 className="d-h d-h2">Trabalhos</h2>
          <p>Role a página: cada projeto aparece na tela ao lado. Clientes reais e modelos prontos para receber a sua marca.</p>
        </div>
        <div className="d-scrolly">
          <ol className="d-steps">
            {works.map((w, i) => (
              <li key={w.title} data-i={i} ref={el => { stepRefs.current[i] = el }} className={`d-step ${active === i ? 'on' : ''}`}>
                <span className="d-step-tipo">{w.kind}</span>
                <h3 className="d-h">{w.title}</h3>
                <p>{w.text}</p>
                <span className="d-step-status">{w.status}</span>
                <img className="d-step-img" src={w.image} alt="" loading="lazy" decoding="async" width={800} height={450} />
                {w.url && <><br /><a className="d-step-link" href={w.url} target="_blank" rel="noopener noreferrer">{w.status === 'Cliente' ? 'Visitar o site' : 'Ver o modelo'}<span className="sr-only"> {w.title} (abre em nova aba)</span></a></>}
                {w.video && <><br /><a className="d-step-link" href={w.video} target="_blank" rel="noopener noreferrer">Assistir ao vídeo do sistema</a></>}
              </li>
            ))}
          </ol>
          <div className="d-palco" aria-hidden="true">
            <div className="d-win">
              <div className="d-win-barra"><i /><i /><i /></div>
              <div className="d-tela">
                {works.map((w, i) => w.video
                  ? <video key={w.title} ref={videoRef} className={active === i ? 'on' : ''} src={w.video} poster={w.image} controls muted playsInline preload="none" tabIndex={-1} />
                  : <img key={w.title} className={active === i ? 'on' : ''} src={w.image} alt="" loading="lazy" decoding="async" />)}
              </div>
            </div>
            <div className="d-contador"><b>{String(active + 1).padStart(2, '0')}</b> / {String(works.length).padStart(2, '0')}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Servicos() {
  return (
    <section id="servicos" className="d-sec d-serv scroll-mt-16">
      <div className="d-wrap">
        <h2 className="d-h d-h2 d-rev">O que eu faço</h2>
        <div className="d-lista">
          {offers.map((o, i) => (
            <div key={o.title} className="d-item">
              <b aria-hidden="true">{i + 1}</b>
              <h3 className="d-h">{o.title}</h3>
              <p>{o.text}</p>
              <WhatsAppLink message={o.message}>Conversar sobre isso</WhatsAppLink>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-grafite">
          Também cuido de anúncios no Google e no Instagram, com medição de quantas pessoas chamam no WhatsApp.
        </p>
      </div>
    </section>
  )
}

function Processo() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const r = el.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.85 - r.top) / (r.height + window.innerHeight * 0.3)))
      el.style.setProperty('--pr', `${p * 100}%`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <section id="processo" className="d-sec scroll-mt-16">
      <div className="d-wrap">
        <h2 className="d-h d-h2 d-rev">Como funciona</h2>
        <div className="d-proc-wrap" ref={ref}>
          <div className="d-proc-linha" aria-hidden="true"><i /></div>
          <ol className="d-proc">
            {steps.map(s => (
              <li key={s.title}><h3 className="d-h">{s.title}</h3><p>{s.text}</p></li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Sobre() {
  return (
    <section id="sobre" className="d-sec d-sobre scroll-mt-16">
      <div className="d-wrap d-sobre-grade">
        <div>
          <h2 className="d-h d-h2 d-rev">Quem faz</h2>
          <div className="mt-8 max-w-[62ch] space-y-4 text-lg">
            <p>
              Sou o Lucas Ribeiro, desenvolvedor em São Paulo. Criei a RibeiroLab para dar a pequenos negócios um visual
              próprio na internet e um caminho direto até o WhatsApp.
            </p>
            <p>Você fala comigo do primeiro contato à publicação. Sem intermediário e sem resposta automática.</p>
          </div>
        </div>
        <div>
          <h3 className="d-h text-2xl">Formação</h3>
          <ul className="mt-5">
            <li>Análise e Desenvolvimento de Sistemas (em curso)</li>
            <li>Certificações em Java e Spring Boot</li>
            <li>Certificações Databricks em engenharia de dados e IA generativa</li>
            <li>Bootcamps de back-end com Java e soluções com inteligência artificial</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

const fieldClass = 'w-full rounded-lg border border-linha bg-white px-4 py-3 text-tinta placeholder:text-grafite/70 focus:border-placa'

function Contato() {
  const [sent, setSent] = useState(false)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const service = data.get('service')
    const message = [
      `Olá, RibeiroLab! Meu nome é ${data.get('name')}.`,
      `Meu e-mail é ${data.get('email')}.`,
      service ? `Tenho interesse em: ${service}.` : '',
      String(data.get('message') || ''),
    ].filter(Boolean).join(' ')
    trackConversion('form')
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <section id="contato" className="d-cta scroll-mt-16">
      <div className="d-grande" aria-hidden="true">RibeiroLab</div>
      <div className="d-wrap d-cta-grade">
        <div>
          <h2 className="d-h d-rev">Vamos dar uma cara nova para o seu negócio?</h2>
          <p className="mt-6 max-w-lg text-lg text-white/80">Conte o que você precisa. Respondo pelo WhatsApp com as próximas etapas.</p>
          <WhatsAppLink className="d-btn mt-8" message="Olá! Vi o site da RibeiroLab e quero um orçamento."><WhatsAppIcon /> Chamar no WhatsApp</WhatsAppLink>
          <ul className="mt-10 space-y-3 text-lg">
            <li><WhatsAppLink className="underline decoration-white/30 underline-offset-4 hover:decoration-white">WhatsApp {WHATSAPP_DISPLAY}</WhatsAppLink></li>
            <li><a href={`mailto:${EMAIL}`} className="break-all underline decoration-white/30 underline-offset-4 hover:decoration-white">{EMAIL}</a></li>
          </ul>
        </div>

        <div className="rounded-2xl bg-white p-6 text-tinta md:p-8">
          {sent ? (
            <div className="py-8" role="status">
              <p className="d-h text-2xl">Mensagem pronta no WhatsApp</p>
              <p className="mt-3 text-grafite">Abri uma conversa com o seu texto. Toque em enviar por lá para eu receber.</p>
              <button type="button" onClick={() => setSent(false)} className="link mt-6">Escrever outra mensagem</button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="mb-1.5 block font-medium">Nome</label>
                <input id="name" name="name" required type="text" autoComplete="name" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block font-medium">E-mail</label>
                <input id="email" name="email" required type="email" autoComplete="email" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="service" className="mb-1.5 block font-medium">O que você precisa</label>
                <select id="service" name="service" className={fieldClass} defaultValue="">
                  <option value="">Ainda não sei</option>
                  {offers.map(o => <option key={o.title} value={o.title}>{o.title}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block font-medium">Mensagem</label>
                <textarea id="message" name="message" required rows={4} className={`${fieldClass} resize-none`} placeholder="Ex.: tenho uma loja de roupas e quero vender pelo Instagram e WhatsApp" />
              </div>
              <button type="submit" className="w-full rounded-full bg-placa px-6 py-4 font-bold text-white transition-colors hover:bg-placa-escura">Enviar pelo WhatsApp</button>
              <p className="text-sm text-grafite">
                O formulário abre o WhatsApp com a sua mensagem. Veja a <a href="/politica-de-privacidade/" className="link font-medium">Política de Privacidade</a>.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Rodape() {
  const icon = 'd-icone'
  return (
    <footer className="d-rodape">
      <div className="d-wrap">
        <div className="d-rodape-topo">
          <div>
            <a href="#inicio" className="d-logo text-white">RibeiroLab</a>
            <p className="mt-2 max-w-sm">Sites, lojas virtuais e sistemas para pequenos negócios, em São Paulo.</p>
            <div className="d-icones">
              <WhatsAppLink className={icon} label="Conversar pelo WhatsApp"><WhatsAppIcon /></WhatsAppLink>
              <a className={icon} href={`mailto:${EMAIL}`} aria-label="Enviar e-mail"><Mail aria-hidden="true" /></a>
              <a className={icon} href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Lucas Ribeiro (abre em nova aba)"><Linkedin aria-hidden="true" /></a>
              <a className={icon} href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub de Lucas Ribeiro (abre em nova aba)"><Github aria-hidden="true" /></a>
            </div>
          </div>
          <nav aria-label="Rodapé">
            {navLinks.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
            <a href="#contato">Contato</a>
            <a href="/politica-de-privacidade/">Política de Privacidade</a>
            <CookiePreferencesLink />
          </nav>
        </div>
        <div className="d-rodape-base">© {new Date().getFullYear()} RibeiroLab. Lucas Ribeiro, São Paulo.</div>
      </div>
    </footer>
  )
}

export default function App() {
  useReveal()
  return (
    <div className="d-body">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-tinta">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Trabalhos />
        <Servicos />
        <Processo />
        <Sobre />
        <Contato />
      </main>
      <Rodape />
      <WhatsAppLink className="d-wa" label="Conversar pelo WhatsApp" message="Olá, RibeiroLab! Vim pelo site."><WhatsAppIcon /></WhatsAppLink>
      <CookieBanner />
    </div>
  )
}
