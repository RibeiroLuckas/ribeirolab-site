import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { Menu, X, Mail, Linkedin, Github } from 'lucide-react'
import CookieBanner, { CookiePreferencesLink } from '@/components/CookieBanner'
import { trackConversion } from '@/lib/analytics'
import { content, type Content, type Lang } from '@/content'

// ---------------------------------------------------------------------------
// Contatos — edite aqui. Os textos ficam em src/content.ts
// ---------------------------------------------------------------------------
const WHATSAPP_NUMBER = '5511965019133'
const EMAIL = 'lucas.ribeiro.araujo000@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/lucasribeirodesenvolvedor/'
const GITHUB = 'https://github.com/RibeiroLuckas/'

const whatsappUrl = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`

const vitrine = ['nativas-mel', 'nina-store', 'lumina-odonto', 'marcenaria-arte', 'automotion', 'silva-associados', 'salao-beleza', 'barbearia-modelo']

const Txt = createContext<Content>(content.pt)
const useT = () => useContext(Txt)

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
      <img src={src} alt={alt} width={800} height={450} decoding="async" />
    </div>
  )
}

/** Faz títulos aparecerem ao rolar (uma vez). */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.d-rev, .d-card')
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
  const t = useT()
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
        <a href="#inicio" className="d-logo" aria-label={t.logoAria}>RibeiroLab</a>
        <nav aria-label={t.navAria} className="d-nav flex items-center">
          <span className="d-nav-links">
            {t.nav.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
          </span>
          <a href={t.other.href} hrefLang={t.lang === 'pt' ? 'en' : 'pt-BR'} className="d-lang" aria-label={t.other.aria}>{t.other.label}</a>
          <a href="#contato" className="d-btn d-nav-cta ml-5">{t.cta}</a>
          <button type="button" onClick={() => setOpen(!open)} className="-mr-2 ml-4 rounded-md p-2 lg:hidden"
            aria-label={open ? t.menuClose : t.menuOpen} aria-expanded={open} aria-controls="menu-celular">
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </nav>
      </div>
      {open && (
        <nav id="menu-celular" aria-label={t.navAria} className="border-t border-linha bg-white text-tinta lg:hidden">
          <div className="mx-auto flex max-w-[1240px] flex-col px-5 py-3 sm:px-8">
            {t.nav.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-lg font-medium">{l.label}</a>)}
            <a href={t.other.href} className="py-3 text-lg font-medium" aria-label={t.other.aria}>{t.other.aria}</a>
            <a href="#contato" onClick={() => setOpen(false)} className="d-btn my-2">{t.cta}</a>
          </div>
        </nav>
      )}
    </header>
  )
}

function Hero() {
  const t = useT()
  const words = t.hero.title.split(' ')
  return (
    <section id="inicio" className="d-hero">
      <div className="d-wrap">
        <h1 className="d-h" aria-label={t.hero.title}>
          {words.map((w, i) => (
            <span key={i} aria-hidden="true">
              <span className="d-palavra"><span style={{ animationDelay: `${i * 0.08}s` }}>{w}</span></span>{i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>
        <div className="d-hero-linha">
          <p>{t.hero.text}</p>
          <WhatsAppLink className="d-btn" message={t.hero.msg}><WhatsAppIcon /> {t.cta}</WhatsAppLink>
        </div>
      </div>
      <div className="d-faixa" aria-label={t.hero.stripAria}>
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
  const t = useT()
  const works = t.sites.items
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i))
    }), { rootMargin: '-45% 0px -45% 0px' })
    stepRefs.current.forEach(el => el && io.observe(el))
    return () => io.disconnect()
  }, [])


  return (
    <section id="trabalhos" className="d-sec scroll-mt-16">
      <div className="d-wrap">
        <div className="d-intro d-rev">
          <h2 className="d-h d-h2">{t.sites.title}</h2>
          <p>{t.sites.intro}</p>
        </div>
        <div className="d-scrolly">
          <ol className="d-steps">
            {works.map((w, i) => (
              <li key={w.title} data-i={i} ref={el => { stepRefs.current[i] = el }} className={`d-step d-card ${active === i ? 'on' : ''}`}>
                <span className="d-step-tipo">{w.kind}</span>
                <h3 className="d-h">{w.title}</h3>
                <p>{w.text}</p>
                <span className="d-step-status">{w.status}</span>
                <img className="d-step-img" src={w.image} alt="" loading="lazy" decoding="async" width={800} height={450} />
                {w.url && <><br /><a className="d-step-link" href={w.url} target="_blank" rel="noopener noreferrer">{w.client ? t.sites.visit : t.sites.model}<span className="sr-only"> {w.title} {t.sites.newTab}</span></a></>}
              </li>
            ))}
          </ol>
          <div className="d-palco" aria-hidden="true">
            <div className="d-win">
              <div className="d-win-barra"><i /><i /><i /></div>
              <div className="d-tela">
                {works.map((w, i) => <img key={w.title} className={active === i ? 'on' : ''} src={w.image} alt="" decoding="async" />)}
              </div>
            </div>
            <div className="d-contador"><b>{String(active + 1).padStart(2, '0')}</b> / {String(works.length).padStart(2, '0')}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Sistemas() {
  const t = useT()
  const s = t.sistemas
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = videoRef.current
    if (!v || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {})
      else v.pause()
    }, { threshold: 0.5 })
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <section id="sistemas" className="d-sec d-sis scroll-mt-16">
      <div className="d-wrap">
        <div className="d-sis-topo d-rev">
          <div>
            <p className="d-sis-rotulo">{s.label}</p>
            <h2 className="d-h d-h2">MeuPDV</h2>
          </div>
          <div className="d-sis-num" aria-label={s.numAria}><b className="d-h">3</b><span>{s.numText[0]}<br />{s.numText[1]}</span></div>
        </div>
        <p className="d-sis-intro d-rev">{s.intro}</p>
        <div className="d-sis-grade">
          <figure className="d-sis-video d-card">
            <div className="d-win">
              <div className="d-win-barra" aria-hidden="true"><i /><i /><i /></div>
              <video ref={videoRef} src="/videos/meupdv-apresentacao.mp4" poster="/videos/meupdv-capa.jpg" muted loop playsInline controls preload="metadata"
                width={1280} height={720} aria-label={s.videoAria} />
            </div>
            <figcaption>{s.caption}</figcaption>
          </figure>
          <ul className="d-sis-lista">
            {s.features.map(r => (
              <li key={r.title} className="d-card"><strong className="d-h">{r.title}</strong><span>{r.text}</span></li>
            ))}
          </ul>
        </div>
        <div className="d-sis-cta">
          <p>{s.ctaText}</p>
          <WhatsAppLink className="d-btn" message={s.ctaMsg}><WhatsAppIcon /> {s.ctaButton}</WhatsAppLink>
        </div>
      </div>
    </section>
  )
}

// Exemplos fictícios usados na vitrine "O que dá para criar"
function DemoCardapio() {
  const d = useT().produzir.demo
  return (
    <span className="dm-cel">
      <span className="dm-cel-topo"><b>{d.menuName}</b><small>{d.example}</small></span>
      <span className="dm-cel-abas">{d.tabs.map((tab, i) => <i key={tab} className={i === 0 ? 'on' : ''}>{tab}</i>)}</span>
      <span className="dm-cel-lista">
        <span className="dm-cel-rola">
          {[...d.menu, ...d.menu].map(([n, v], i) => (
            <span key={i} className="dm-item"><span>{n}</span><b>{d.currency} {v}</b></span>
          ))}
        </span>
      </span>
    </span>
  )
}

function DemoLogo() {
  const d = useT().produzir.demo
  return (
    <span className="dm-logo">
      <span className="dm-logo-img"><img src="/projetos/nina-logo.webp" alt={d.logoAlt} width={800} height={400} loading="lazy" decoding="async" /></span>
      <span className="dm-logo-cores"><i style={{ background: '#E52128' }} /><i style={{ background: '#fff' }} /><i style={{ background: '#C9CCD3' }} /></span>
    </span>
  )
}

function DemoAnuncio() {
  const d = useT().produzir.demo
  return (
    <span className="dm-ad">
      <span className="dm-ad-card">
        <small>{d.adLabel}</small>
        <b>{d.adName}</b>
        <span>{d.adText}</span>
        <span className="dm-ad-btn">{d.adButton}</span>
        <span className="dm-ad-dedo" />
      </span>
      <span className="dm-ad-chat">
        <span className="dm-bolha">{d.chat[0]}</span>
        <span className="dm-bolha dm-bolha-resp">{d.chat[1]}</span>
      </span>
    </span>
  )
}

function Produzir() {
  const t = useT()
  const pz = t.produzir
  return (
    <section id="produzir" className="d-sec d-prod-sec scroll-mt-16">
      <div className="d-wrap">
        <div className="d-intro d-rev">
          <h2 className="d-h d-h2">{pz.title}</h2>
          <p>{pz.intro}</p>
        </div>
        <ul className="d-bento">
          {pz.items.map(p => (
            <li key={p.title} className={`d-tile d-card d-tile-${p.size} ${'tom' in p && p.tom ? `d-tom-${p.tom}` : ''} ${'demo' in p && p.demo ? 'd-tem-demo' : ''}`}>
              <WhatsAppLink message={pz.msg(p.title)} label={pz.aria(p.title)}>
                {'image' in p && p.image && <span className="d-tile-img"><img src={p.image} alt="" loading="lazy" decoding="async" /></span>}
                {'demo' in p && p.demo && <span className="d-tile-demo" aria-hidden="true">{p.demo === 'cardapio' ? <DemoCardapio /> : p.demo === 'logo' ? <DemoLogo /> : <DemoAnuncio />}</span>}
                <span className="d-tile-txt">
                  <strong className="d-h">{p.title}</strong>
                  <span>{p.text}</span>
                </span>
              </WhatsAppLink>
            </li>
          ))}
        </ul>
        <p className="d-prod-fim">
          {pz.endText} <WhatsAppLink message={pz.endMsg}>{pz.endLink}</WhatsAppLink>.
        </p>
      </div>
    </section>
  )
}

function Servicos() {
  const t = useT()
  return (
    <section id="servicos" className="d-sec d-serv scroll-mt-16">
      <div className="d-wrap">
        <h2 className="d-h d-h2 d-rev">{t.servicos.title}</h2>
        <div className="d-lista">
          {t.servicos.items.map((o, i) => (
            <div key={o.title} className="d-item">
              <b aria-hidden="true">{i + 1}</b>
              <h3 className="d-h">{o.title}</h3>
              <p>{o.text}</p>
              <WhatsAppLink message={o.msg}>{t.servicos.talk}</WhatsAppLink>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-grafite">{t.servicos.note}</p>
      </div>
    </section>
  )
}

function Processo() {
  const t = useT()
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
        <h2 className="d-h d-h2 d-rev">{t.processo.title}</h2>
        <div className="d-proc-wrap" ref={ref}>
          <div className="d-proc-linha" aria-hidden="true"><i /></div>
          <ol className="d-proc">
            {t.processo.steps.map(s => (
              <li key={s.title}><h3 className="d-h">{s.title}</h3><p>{s.text}</p></li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Sobre() {
  const t = useT()
  return (
    <section id="sobre" className="d-sec d-sobre scroll-mt-16">
      <div className="d-wrap d-sobre-grade">
        <div>
          <h2 className="d-h d-h2 d-rev">{t.sobre.title}</h2>
          <div className="mt-8 max-w-[62ch] space-y-4 text-lg">
            {t.sobre.paras.map(p => <p key={p}>{p}</p>)}
          </div>
        </div>
        <div>
          <h3 className="d-h text-2xl">{t.sobre.eduTitle}</h3>
          <ul className="mt-5">
            {t.sobre.edu.map(e => <li key={e}>{e}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}

const fieldClass = 'w-full rounded-lg border border-linha bg-white px-4 py-3 text-tinta placeholder:text-grafite/70 focus:border-placa'

function Contato() {
  const t = useT()
  const c = t.contato
  const [sent, setSent] = useState(false)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const service = data.get('service')
    const message = c.compose(String(data.get('name') || ''), String(data.get('email') || ''), String(service || ''), String(data.get('message') || ''))
    trackConversion('form')
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <section id="contato" className="d-cta scroll-mt-16">
      <div className="d-grande" aria-hidden="true">RibeiroLab</div>
      <div className="d-wrap d-cta-grade">
        <div>
          <h2 className="d-h d-rev">{c.title}</h2>
          <p className="mt-6 max-w-lg text-lg text-white/80">{c.text}</p>
          <WhatsAppLink className="d-btn mt-8" message={t.hero.msg}><WhatsAppIcon /> {c.button}</WhatsAppLink>
          <ul className="mt-10 space-y-3 text-lg">
            <li><WhatsAppLink className="underline decoration-white/30 underline-offset-4 hover:decoration-white">WhatsApp {c.phone}</WhatsAppLink></li>
            <li><a href={`mailto:${EMAIL}`} className="break-all underline decoration-white/30 underline-offset-4 hover:decoration-white">{EMAIL}</a></li>
          </ul>
        </div>

        <div className="rounded-2xl bg-white p-6 text-tinta md:p-8">
          {sent ? (
            <div className="py-8" role="status">
              <p className="d-h text-2xl">{c.sentTitle}</p>
              <p className="mt-3 text-grafite">{c.sentText}</p>
              <button type="button" onClick={() => setSent(false)} className="link mt-6">{c.again}</button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="mb-1.5 block font-medium">{c.name}</label>
                <input id="name" name="name" required type="text" autoComplete="name" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block font-medium">{c.email}</label>
                <input id="email" name="email" required type="email" autoComplete="email" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="service" className="mb-1.5 block font-medium">{c.need}</label>
                <select id="service" name="service" className={fieldClass} defaultValue="">
                  <option value="">{c.unsure}</option>
                  {t.servicos.items.map(o => <option key={o.title} value={o.title}>{o.title}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block font-medium">{c.message}</label>
                <textarea id="message" name="message" required rows={4} className={`${fieldClass} resize-none`} placeholder={c.placeholder} />
              </div>
              <button type="submit" className="w-full rounded-full bg-placa px-6 py-4 font-bold text-white transition-colors hover:bg-placa-escura">{c.submit}</button>
              <p className="text-sm text-grafite">
                {c.privacyPre} <a href="/politica-de-privacidade/" className="link font-medium">{c.privacy}</a>.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Rodape() {
  const t = useT()
  const r = t.rodape
  const icon = 'd-icone'
  return (
    <footer className="d-rodape">
      <div className="d-wrap">
        <div className="d-rodape-topo">
          <div>
            <a href="#inicio" className="d-logo text-white">RibeiroLab</a>
            <p className="mt-2 max-w-sm">{r.tagline}</p>
            <div className="d-icones">
              <WhatsAppLink className={icon} label={r.wa}><WhatsAppIcon /></WhatsAppLink>
              <a className={icon} href={`mailto:${EMAIL}`} aria-label={r.mail}><Mail aria-hidden="true" /></a>
              <a className={icon} href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label={r.linkedin}><Linkedin aria-hidden="true" /></a>
              <a className={icon} href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label={r.github}><Github aria-hidden="true" /></a>
            </div>
          </div>
          <nav aria-label={r.aria}>
            {t.nav.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
            <a href="#contato">{r.contact}</a>
            <a href={t.other.href} hrefLang={t.lang === 'pt' ? 'en' : 'pt-BR'}>{t.other.aria}</a>
            <a href="/politica-de-privacidade/">{r.privacy}</a>
            <CookiePreferencesLink lang={t.lang} />
          </nav>
        </div>
        <div className="d-rodape-base">© {new Date().getFullYear()} {r.copy}</div>
      </div>
    </footer>
  )
}

export default function App({ lang = 'pt' }: { lang?: Lang }) {
  useReveal()
  const t = content[lang]
  return (
    <Txt.Provider value={t}>
      <div className="d-body">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-tinta">
          {t.skip}
        </a>
        <Header />
        <main id="conteudo">
          <Hero />
          <Trabalhos />
          <Sistemas />
          <Produzir />
          <Servicos />
          <Processo />
          <Sobre />
          <Contato />
        </main>
        <Rodape />
        <WhatsAppLink className="d-wa" label={t.rodape.wa} message={t.floatMsg}><WhatsAppIcon /></WhatsAppLink>
        <CookieBanner lang={lang} />
      </div>
    </Txt.Provider>
  )
}
