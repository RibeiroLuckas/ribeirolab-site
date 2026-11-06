import { useState, type ReactNode } from 'react'
import { Menu, X, Check, Mail, MessageCircle, Linkedin, Github } from 'lucide-react'
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

type Project = { title: string; kind: string; text: string; url: string; image: string }

const clientSites: Project[] = [
  {
    title: "Nativa's Mel",
    kind: 'Loja virtual',
    text: 'Catálogo de méis por florada com carrinho que monta o pedido e envia direto para o WhatsApp da empresa.',
    url: 'https://nativasmel.netlify.app/',
    image: '/projetos/nativas-mel.webp',
  },
  {
    title: 'Nina Store',
    kind: 'Catálogo de moda e calçados',
    text: 'Vitrine das lojas físicas com Instagram integrado e compra pelo WhatsApp, pensada para o celular.',
    url: 'https://nsninastore.netlify.app/',
    image: '/projetos/nina-store.webp',
  },
]

const models: Project[] = [
  { title: 'Lumina Odonto Studio', kind: 'Clínica odontológica', text: 'Apresentação da clínica, especialidades e agendamento de consulta.', url: 'https://model-dentista.netlify.app/', image: '/projetos/lumina-odonto.webp' },
  { title: 'Silva & Associados', kind: 'Escritório de advocacia', text: 'Áreas de atuação, equipe, perguntas frequentes e pedido de consultoria.', url: 'https://model-adv.netlify.app/', image: '/projetos/silva-associados.webp' },
  { title: 'Marcenaria Arte', kind: 'Marcenaria', text: 'Portfólio de móveis planejados com pedido de orçamento.', url: 'https://model-marcenaria.netlify.app/', image: '/projetos/marcenaria-arte.webp' },
  { title: 'AutoMotion', kind: 'Loja de veículos', text: 'Estoque de carros e motos com busca e simulação de financiamento.', url: 'https://model-motor.netlify.app/', image: '/projetos/automotion.webp' },
  { title: 'Salão de beleza', kind: 'Salão e estética', text: 'Serviços por categoria com agenda integrada ao Trinks e ao WhatsApp.', url: 'https://seu-salao-aqui.netlify.app/', image: '/projetos/salao-beleza.webp' },
  { title: 'Barbearia Modelo', kind: 'Barbearia', text: 'Cortes com preço e duração, e agendamento pelo Booksy.', url: 'https://sua-marca.netlify.app/', image: '/projetos/barbearia-modelo.webp' },
]

const pdvFeatures = [
  'Leitor de código de barras: o item entra na hora',
  'Pagamento combinado em até três formas, com troco calculado',
  'Consulta em tempo real de qual loja tem a peça',
  'Estoque por cor e tamanho, com entrada de mercadoria',
  'Etiquetas com preço e código de barras',
]

const offers = [
  {
    title: 'Ser encontrado',
    who: 'Para quem precisa de um endereço na internet que passe confiança.',
    items: ['Site institucional', 'Landing page para campanhas', 'Cardápio digital', 'Botão e mensagens prontas de WhatsApp'],
    message: 'Olá! Quero um site para o meu negócio ser encontrado.',
  },
  {
    title: 'Vender pela internet',
    who: 'Para quem quer receber pedidos e agendamentos sem depender do telefone.',
    items: ['Loja virtual e catálogo', 'Pedido montado e enviado pelo WhatsApp', 'Agendamento online', 'Integração com Trinks, Booksy e similares'],
    message: 'Olá! Quero vender ou receber agendamentos pela internet.',
  },
  {
    title: 'Organizar a operação',
    who: 'Para quem tem uma rotina que já não cabe em planilha.',
    items: ['Sistemas sob medida', 'Frente de caixa e estoque', 'Relatórios e automações', 'Treinamento da equipe'],
    message: 'Olá! Quero conversar sobre um sistema sob medida.',
  },
]

const steps = [
  { title: 'Conversa', text: 'Você me conta pelo WhatsApp o que o seu negócio precisa. Sem formulário longo.' },
  { title: 'Proposta', text: 'Envio por escrito o que será feito, o prazo e o valor, antes de qualquer pagamento.' },
  { title: 'Desenvolvimento', text: 'Você acompanha o site sendo feito e pede ajustes no caminho.' },
  { title: 'No ar', text: 'Publico no seu domínio, conecto o WhatsApp e mostro como atualizar.' },
]

// ---------------------------------------------------------------------------
// Peças
// ---------------------------------------------------------------------------
function Wordmark() {
  return <span className="text-[22px] font-extrabold tracking-tight [font-stretch:115%]">RibeiroLab</span>
}

function BrowserFrame({ src, alt, className = '', eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return (
    <div className={`navegador ${className}`}>
      <div className="navegador-barra" aria-hidden="true"><span /><span /><span /></div>
      <img src={src} alt={alt} width={800} height={450} loading={eager ? 'eager' : 'lazy'} decoding="async" className="block aspect-video w-full object-cover object-top" />
    </div>
  )
}

function PhoneFrame({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[22px] border-[6px] border-tinta bg-tinta ${className}`}>
      <img src={src} alt={alt} width={480} height={1039} loading="eager" decoding="async" className="block aspect-[9/17] w-full rounded-[16px] object-cover object-top" />
    </div>
  )
}

function SectionTitle({ title, intro }: { title: string; intro?: ReactNode }) {
  return (
    <div className="mb-10 max-w-2xl md:mb-14">
      <h2 className="text-[32px] md:text-[40px]">{title}</h2>
      {intro && <p className="mt-4 text-lg text-grafite">{intro}</p>}
    </div>
  )
}

function WhatsAppLink({ children, className, message }: { children: ReactNode; className: string; message?: string }) {
  return (
    <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion('whatsapp')} className={className}>
      {children}
    </a>
  )
}

// ---------------------------------------------------------------------------
// Seções
// ---------------------------------------------------------------------------
const navLinks = [
  { label: 'Trabalhos', href: '#trabalhos' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Sobre', href: '#sobre' },
]

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b border-linha bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="pagina flex h-[68px] items-center justify-between gap-6">
        <a href="#inicio" aria-label="RibeiroLab, início"><Wordmark /></a>
        <nav aria-label="Navegação principal" className="hidden items-center gap-7 whitespace-nowrap lg:flex">
          {navLinks.map(l => <a key={l.href} href={l.href} className="font-medium text-grafite hover:text-tinta">{l.label}</a>)}
          <a href="#contato" className="botao-principal py-2.5">Pedir orçamento</a>
        </nav>
        <button type="button" onClick={() => setOpen(!open)} className="-mr-2 rounded-md p-2 lg:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="menu-celular">
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>
      {open && (
        <nav id="menu-celular" aria-label="Navegação principal" className="border-t border-linha bg-white lg:hidden">
          <div className="pagina flex flex-col py-3">
            {navLinks.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-lg font-medium">{l.label}</a>)}
            <a href="#contato" onClick={() => setOpen(false)} className="botao-principal mb-2 mt-2">Pedir orçamento</a>
          </div>
        </nav>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section id="inicio" className="overflow-hidden bg-papel">
      <div className="pagina grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
        <div className="max-w-xl">
          <h1 className="text-[40px] sm:text-[52px] lg:text-[58px]">Sites para pequenos negócios venderem pelo WhatsApp.</h1>
          <p className="mt-6 text-lg text-grafite md:text-xl">
            Eu crio o site da sua loja, restaurante ou consultório e deixo tudo pronto para o cliente chamar você
            no WhatsApp. Você fala direto comigo, do primeiro contato à publicação.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppLink className="botao-principal" message="Olá! Vi o site da RibeiroLab e quero um orçamento.">
              <MessageCircle className="h-5 w-5" aria-hidden="true" /> Pedir orçamento no WhatsApp
            </WhatsAppLink>
            <a href="#trabalhos" className="botao-contorno">Ver trabalhos</a>
          </div>
        </div>

        {/* Vitrine: sites de clientes no ar */}
        <figure className="relative pb-10 sm:pb-14 lg:pl-6">
          <BrowserFrame src="/projetos/nativas-mel.webp" alt="Página inicial do site da Nativa's Mel" eager className="shadow-[0_24px_60px_-24px_rgba(27,36,64,0.45)]" />
          <PhoneFrame src="/projetos/nina-store-celular.webp" alt="Site da Nina Store aberto no celular"
            className="absolute -bottom-2 right-3 w-[30%] max-w-[190px] shadow-[0_24px_50px_-20px_rgba(27,36,64,0.55)] sm:right-6" />
          <figcaption className="mt-4 max-w-[62%] text-sm text-grafite">Sites da Nativa's Mel e da Nina Store, clientes com o site no ar.</figcaption>
        </figure>
      </div>
    </section>
  )
}

function ClientStrip() {
  return (
    <section aria-label="Clientes" className="border-y border-linha bg-white">
      <div className="pagina flex flex-col gap-3 py-6 text-grafite sm:flex-row sm:items-center sm:gap-10">
        <p className="whitespace-nowrap font-semibold text-tinta">Quem já usa</p>
        <ul className="flex flex-wrap gap-x-10 gap-y-2 text-lg font-bold [font-stretch:110%]">
          <li><a href="https://nativasmel.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-placa">Nativa's Mel</a></li>
          <li><a href="https://nsninastore.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-placa">Nina Store</a></li>
          <li><a href="#meupdv" className="hover:text-placa">Rede de 3 lojas com o MeuPDV</a></li>
        </ul>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section id="trabalhos" className="scroll-mt-20 bg-white py-20 md:py-28">
      <div className="pagina">
        <SectionTitle title="Trabalhos" intro="Um sistema e sites em uso por negócios de verdade, além de modelos prontos para adaptar à sua marca." />

        {/* MeuPDV */}
        <article id="meupdv" className="scroll-mt-24 grid gap-10 rounded-moldura bg-papel p-6 md:p-10 lg:grid-cols-[1fr_1.35fr] lg:items-center">
          <div>
            <p className="font-semibold text-placa">Sistema em uso em 3 lojas</p>
            <h3 className="mt-2 text-[28px]">MeuPDV</h3>
            <p className="mt-4 text-grafite">
              Frente de caixa feito sob medida para uma rede de lojas de roupas. Antes, saber se outra loja tinha a peça
              dependia de um telefonema. Agora a resposta aparece na tela do caixa.
            </p>
            <ul className="mt-6 space-y-3">
              {pdvFeatures.map(f => (
                <li key={f} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-placa" aria-hidden="true" /><span>{f}</span></li>
              ))}
            </ul>
          </div>
          <figure>
            <video src="/videos/meupdv-apresentacao.mp4" poster="/videos/meupdv-capa.jpg" controls muted playsInline preload="none"
              width={1280} height={720} aria-label="Vídeo de apresentação do MeuPDV"
              className="aspect-video w-full rounded-moldura border border-linha bg-tinta" />
            <figcaption className="mt-3 text-sm text-grafite">Apresentação do sistema com dados de demonstração.</figcaption>
          </figure>
        </article>

        {/* Sites de clientes */}
        <h3 className="mt-20 text-[24px]">Sites de clientes</h3>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          {clientSites.map(p => (
            <article key={p.title}>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="block rounded-moldura" tabIndex={-1} aria-hidden="true">
                <BrowserFrame src={p.image} alt="" className="transition-colors hover:border-placa" />
              </a>
              <h4 className="mt-5 text-xl">{p.title}</h4>
              <p className="text-sm font-medium text-placa">{p.kind}</p>
              <p className="mt-2 text-grafite">{p.text}</p>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="link mt-3 inline-block">Visitar o site<span className="sr-only"> da {p.title} (abre em nova aba)</span></a>
            </article>
          ))}
        </div>

        {/* Modelos */}
        <div className="mt-20 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <h3 className="text-[24px]">Modelos prontos para adaptar</h3>
          <p className="text-grafite md:max-w-md">Sites de demonstração por ramo. Trocamos marca, fotos e textos pelos do seu negócio.</p>
        </div>
        <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {models.map(p => (
            <article key={p.title}>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="block rounded-moldura" aria-label={`Ver o modelo ${p.title} (abre em nova aba)`}>
                <BrowserFrame src={p.image} alt="" className="transition-colors hover:border-placa" />
              </a>
              <h4 className="mt-4 text-lg">{p.title}</h4>
              <p className="text-sm text-grafite">{p.kind}. {p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="servicos" className="scroll-mt-20 bg-papel py-20 md:py-28">
      <div className="pagina">
        <SectionTitle title="O que eu faço" intro="Escolha pelo que o seu negócio precisa agora. Dá para começar pequeno e crescer depois." />
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {offers.map(o => (
            <div key={o.title} className="flex flex-col border-t-4 border-placa pt-6">
              <h3 className="text-[24px]">{o.title}</h3>
              <p className="mt-3 text-grafite">{o.who}</p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {o.items.map(i => <li key={i} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-placa" aria-hidden="true" />{i}</li>)}
              </ul>
              <WhatsAppLink className="link mt-6 self-start" message={o.message}>Conversar sobre isso</WhatsAppLink>
            </div>
          ))}
        </div>
        <p className="mt-14 max-w-2xl text-grafite">
          Também cuido de anúncios no Google e no Instagram, com medição de quantas pessoas chamam no WhatsApp,
          para o site receber visitas desde o primeiro dia.
        </p>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-20 bg-white py-20 md:py-28">
      <div className="pagina">
        <SectionTitle title="Como funciona" />
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="block text-5xl font-extrabold text-placa [font-stretch:120%]" aria-hidden="true">{i + 1}</span>
              <h3 className="mt-3 text-xl">{s.title}</h3>
              <p className="mt-2 text-grafite">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="sobre" className="scroll-mt-20 bg-papel py-20 md:py-28">
      <div className="pagina grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div>
          <h2 className="text-[32px] md:text-[40px]">Quem faz</h2>
          <div className="mt-6 max-w-[62ch] space-y-4 text-lg">
            <p>
              Sou o Lucas Ribeiro, desenvolvedor em São Paulo. Criei a RibeiroLab para fazer sites e sistemas que resolvem
              problemas reais de pequenos negócios: aparecer no Google, receber pedidos pelo WhatsApp e organizar o dia a dia.
            </p>
            <p>Você fala direto comigo, do primeiro contato à publicação. Sem intermediário e sem resposta automática.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="botao-contorno py-2.5"><Linkedin className="h-4 w-4" aria-hidden="true" />LinkedIn</a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="botao-contorno py-2.5"><Github className="h-4 w-4" aria-hidden="true" />GitHub</a>
          </div>
        </div>
        <div>
          <h3 className="text-xl">Formação</h3>
          <ul className="mt-4 divide-y divide-linha border-y border-linha">
            {[
              'Análise e Desenvolvimento de Sistemas (em curso)',
              'Certificações em Java e Spring Boot',
              'Certificações Databricks em engenharia de dados e IA generativa',
              'Bootcamps de back-end com Java e soluções com inteligência artificial',
            ].map(i => <li key={i} className="py-3.5">{i}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}

const fieldClass = 'w-full rounded-md border border-linha bg-white px-4 py-3 text-tinta placeholder:text-grafite/70 focus:border-placa'

function Contact() {
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
    <section id="contato" className="scroll-mt-20 bg-placa py-20 text-white md:py-28">
      <div className="pagina grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-[32px] text-white md:text-[40px]">Vamos conversar sobre o seu site?</h2>
          <p className="mt-5 max-w-lg text-lg text-white/85">
            Conte o que o seu negócio faz e o que você precisa. Respondo pelo WhatsApp com as próximas etapas.
          </p>
          <ul className="mt-8 space-y-4 text-lg">
            <li>
              <WhatsAppLink className="inline-flex items-center gap-3 font-semibold underline decoration-white/40 underline-offset-4 hover:decoration-white">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />WhatsApp {WHATSAPP_DISPLAY}
              </WhatsAppLink>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-3 break-all font-semibold underline decoration-white/40 underline-offset-4 hover:decoration-white">
                <Mail className="h-5 w-5 shrink-0" aria-hidden="true" />{EMAIL}
              </a>
            </li>
          </ul>
        </div>

        <div className="rounded-moldura bg-white p-6 text-tinta md:p-8">
          {sent ? (
            <div className="py-8" role="status">
              <p className="text-2xl font-extrabold [font-stretch:112%]">Mensagem pronta no WhatsApp</p>
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
              <button type="submit" className="botao-principal w-full">Enviar pelo WhatsApp</button>
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

function Footer() {
  return (
    <footer className="bg-tinta py-12 text-white/75">
      <div className="pagina flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <span className="text-white"><Wordmark /></span>
          <p className="mt-2">Sites e sistemas para pequenos negócios, em São Paulo.</p>
        </div>
        <nav aria-label="Rodapé" className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8">
          {navLinks.map(l => <a key={l.href} href={l.href} className="hover:text-white">{l.label}</a>)}
          <a href="/politica-de-privacidade/" className="hover:text-white">Política de Privacidade</a>
          <CookiePreferencesLink className="text-left hover:text-white" />
        </nav>
      </div>
      <div className="pagina mt-10 text-sm text-white/60">© {new Date().getFullYear()} RibeiroLab. Lucas Ribeiro, São Paulo.</div>
    </footer>
  )
}

function WhatsAppButton() {
  return (
    <a href={whatsappUrl('Olá, RibeiroLab! Vim pelo site.')} target="_blank" rel="noopener noreferrer" aria-label="Conversar pelo WhatsApp" title="Conversar pelo WhatsApp"
      onClick={() => trackConversion('whatsapp')}
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-105">
      <svg className="h-7 w-7 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  )
}

export default function App() {
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-tinta focus:px-4 focus:py-2 focus:text-white">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <ClientStrip />
        <Work />
        <Services />
        <HowItWorks />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </>
  )
}
