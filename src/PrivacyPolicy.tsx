import type { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import CookieBanner, { CookiePreferencesLink } from '@/components/CookieBanner'

const LAST_UPDATED = '6 de novembro de 2026'
const CONTACT_EMAIL = 'lucas.ribeiro.araujo000@gmail.com'
const WHATSAPP_DISPLAY = '(11) 96501-9133'

const sections = [
  { id: 'quem-somos', title: '1. Quem é o responsável pelos seus dados' },
  { id: 'dados-coletados', title: '2. Quais dados coletamos' },
  { id: 'finalidades', title: '3. Para que usamos os dados' },
  { id: 'bases-legais', title: '4. Bases legais' },
  { id: 'cookies', title: '5. Cookies e tecnologias de medição' },
  { id: 'compartilhamento', title: '6. Com quem compartilhamos' },
  { id: 'transferencia', title: '7. Transferência internacional' },
  { id: 'retencao', title: '8. Por quanto tempo guardamos' },
  { id: 'seguranca', title: '9. Segurança' },
  { id: 'direitos', title: '10. Seus direitos' },
  { id: 'menores', title: '11. Crianças e adolescentes' },
  { id: 'links-externos', title: '12. Links para outros sites' },
  { id: 'alteracoes', title: '13. Alterações nesta política' },
  { id: 'contato', title: '14. Contato' },
]

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="mb-4 text-2xl">{title}</h2>
      <div className="space-y-4 leading-relaxed">{children}</div>
    </section>
  )
}

function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2 pl-5 list-disc marker:text-placa">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  )
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 border-b border-linha bg-white/95 backdrop-blur">
        <div className="pagina flex h-[68px] items-center justify-between">
          <a href="/" aria-label="RibeiroLab, página inicial" className="text-[22px] font-extrabold tracking-tight [font-stretch:115%]">RibeiroLab</a>
          <a href="/" className="inline-flex items-center gap-2 font-medium text-grafite hover:text-tinta">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Voltar ao site
          </a>
        </div>
      </header>

      <main className="pagina py-14 md:py-20">
        <div className="mb-12">
          <h1 className="mb-4 text-[36px] md:text-[48px]">Política de Privacidade</h1>
          <p className="max-w-3xl text-lg text-grafite">
            Esta política explica, de forma clara, quais dados pessoais a RibeiroLab trata quando você visita
            o site <strong className="text-tinta">ribeirolab.dev.br</strong> ou entra em contato conosco, por que
            fazemos isso e como você pode exercer seus direitos, conforme a Lei Geral de Proteção de Dados
            (Lei nº 13.709/2018 — LGPD).
          </p>
          <p className="mt-4 text-sm text-grafite">Última atualização: {LAST_UPDATED}</p>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-10">
          <nav aria-label="Sumário" className="hidden lg:block">
            <div className="sticky top-24 rounded-[10px] bg-papel p-5">
              <p className="mb-3 text-sm font-semibold">Nesta página</p>
              <ol className="space-y-2 text-sm">
                {sections.map(s => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-grafite hover:text-placa">{s.title}</a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="max-w-[70ch] space-y-12">
            <Section id="quem-somos" title={sections[0].title}>
              <p>
                O controlador dos dados pessoais tratados por meio deste site é a <strong>RibeiroLab</strong>,
                marca de desenvolvimento web de Lucas Ribeiro Araujo, com atuação em São Paulo/SP.
              </p>
              <p>
                Para qualquer assunto relacionado a privacidade e proteção de dados, fale diretamente com o responsável
                pelo e-mail <a className="link font-medium" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
            </Section>

            <Section id="dados-coletados" title={sections[1].title}>
              <p>Coletamos apenas o necessário para responder ao seu contato e manter o site funcionando:</p>
              <List items={[
                <><strong>Dados que você nos envia:</strong> nome, e-mail e o conteúdo da mensagem preenchidos no formulário de contato, além do número de telefone e das mensagens trocadas quando você fala conosco pelo WhatsApp ou por e-mail.</>,
                <><strong>Dados de navegação:</strong> endereço IP, tipo de navegador e dispositivo, páginas acessadas, data e hora do acesso. Esses dados são registrados automaticamente pelo provedor de hospedagem e pelos serviços de terceiros carregados na página.</>,
                <><strong>Dados de campanhas:</strong> quando você chega ao site por um anúncio, informações sobre a campanha e interações com a página podem ser coletadas por ferramentas de medição (veja a seção de cookies).</>,
              ]} />
              <p>
                O formulário do site não grava suas informações em banco de dados: ao clicar em “Enviar Mensagem”, ele
                apenas monta o texto e abre uma conversa no WhatsApp para que você decida se quer enviá-la.
              </p>
              <p>Não solicitamos dados pessoais sensíveis (como saúde, religião ou biometria). Por favor, não os envie em suas mensagens.</p>
            </Section>

            <Section id="finalidades" title={sections[2].title}>
              <List items={[
                'Responder dúvidas, preparar orçamentos e conversar sobre um possível projeto;',
                'Executar e acompanhar os serviços contratados;',
                'Manter o site seguro, disponível e funcionando corretamente;',
                'Medir o desempenho do site e dos anúncios para melhorar nossa comunicação;',
                'Cumprir obrigações legais e regulatórias.',
              ]} />
              <p>Não vendemos nem alugamos seus dados pessoais, e não enviamos mensagens promocionais sem o seu pedido.</p>
            </Section>

            <Section id="bases-legais" title={sections[3].title}>
              <p>Tratamos dados pessoais com fundamento no art. 7º da LGPD, em especial:</p>
              <List items={[
                <><strong>Procedimentos preliminares e execução de contrato</strong> — quando você pede um orçamento ou contrata um serviço;</>,
                <><strong>Legítimo interesse</strong> — para manter a segurança do site e entender, de forma agregada, como ele é usado;</>,
                <><strong>Consentimento</strong> — para cookies e ferramentas de medição que não são estritamente necessárias, quando utilizadas;</>,
                <><strong>Cumprimento de obrigação legal</strong> — quando a lei exigir a guarda de determinadas informações.</>,
              ]} />
            </Section>

            <Section id="cookies" title={sections[4].title}>
              <p>
                Cookies são pequenos arquivos salvos no seu navegador. Este site pode utilizar ferramentas do Google
                (como Google Ads e Google Analytics) e de outras plataformas de anúncio para medir visitas e saber quais
                campanhas geram contatos. Essas ferramentas podem usar cookies e identificadores semelhantes.
              </p>
              <p>
                Essas ferramentas só são ativadas depois que você clica em “Aceitar” no aviso de cookies. Você pode mudar
                sua escolha a qualquer momento pelo link “Preferências de cookies” no rodapé do site, bloquear ou apagar
                cookies nas configurações do navegador e gerenciar a personalização de
                anúncios do Google em{' '}
                <a className="link font-medium" href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">adssettings.google.com</a>.
                Bloquear cookies não impede o uso do site.
              </p>
            </Section>

            <Section id="compartilhamento" title={sections[5].title}>
              <p>Seus dados podem ser tratados pelos seguintes prestadores de serviço, apenas para as finalidades descritas aqui:</p>
              <List items={[
                <><strong>Provedor de hospedagem</strong> do site, que registra dados técnicos de acesso;</>,
                <><strong>WhatsApp / Meta</strong>, quando você conversa conosco pelo WhatsApp;</>,
                <><strong>Google</strong>, pelo serviço de e-mail (Gmail) e pelas ferramentas de anúncio e medição;</>,
                <><strong>Serviços de imagem e vídeo</strong> (como Unsplash e Netlify) que exibem as prévias dos projetos do portfólio.</>,
              ]} />
              <p>
                Cada uma dessas empresas tem sua própria política de privacidade. Também poderemos compartilhar dados
                quando exigido por lei ou por ordem de autoridade competente.
              </p>
            </Section>

            <Section id="transferencia" title={sections[6].title}>
              <p>
                Alguns dos serviços citados mantêm servidores fora do Brasil. Nesses casos, a transferência ocorre nos
                termos do art. 33 da LGPD, com fornecedores que adotam medidas de proteção compatíveis com a lei.
              </p>
            </Section>

            <Section id="retencao" title={sections[7].title}>
              <List items={[
                'Mensagens e dados de contato que não viraram projeto: por até 12 meses após o último contato, salvo se você pedir a exclusão antes;',
                'Dados de clientes: pelo tempo do contrato e pelos prazos exigidos pela legislação fiscal e civil;',
                'Registros de acesso: pelo prazo mínimo de 6 meses previsto no Marco Civil da Internet (Lei nº 12.965/2014), quando aplicável.',
              ]} />
              <p>Depois desses prazos, os dados são apagados ou anonimizados.</p>
            </Section>

            <Section id="seguranca" title={sections[8].title}>
              <p>
                O site é servido com conexão criptografada (HTTPS) e o acesso às contas onde recebemos mensagens é
                restrito ao responsável pela RibeiroLab. Nenhum sistema é totalmente imune a falhas; se ocorrer
                um incidente que possa trazer risco a você, comunicaremos os titulares afetados e a ANPD, conforme a lei.
              </p>
            </Section>

            <Section id="direitos" title={sections[9].title}>
              <p>Pela LGPD (art. 18), você pode, a qualquer momento e sem custo:</p>
              <List items={[
                'Confirmar se tratamos seus dados e acessá-los;',
                'Corrigir dados incompletos, inexatos ou desatualizados;',
                'Pedir anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade;',
                'Solicitar a portabilidade dos dados;',
                'Saber com quem seus dados foram compartilhados;',
                'Revogar o consentimento e pedir a eliminação dos dados tratados com base nele;',
                'Opor-se a um tratamento feito com base em legítimo interesse.',
              ]} />
              <p>
                Para exercer seus direitos, envie um e-mail para{' '}
                <a className="link font-medium" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                Responderemos em até 15 dias. Você também pode apresentar reclamação à Autoridade Nacional de Proteção de
                Dados (ANPD) em{' '}
                <a className="link font-medium" href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer">gov.br/anpd</a>.
              </p>
            </Section>

            <Section id="menores" title={sections[10].title}>
              <p>
                Nossos serviços são destinados a empresas e adultos. Não coletamos intencionalmente dados de menores de
                18 anos. Se você acredita que um menor nos enviou dados, fale conosco para que possamos excluí-los.
              </p>
            </Section>

            <Section id="links-externos" title={sections[11].title}>
              <p>
                O portfólio contém links para projetos e sites de terceiros. Ao acessá-los, você estará sujeito às
                políticas de privacidade desses sites, pelas quais a RibeiroLab não é responsável.
              </p>
            </Section>

            <Section id="alteracoes" title={sections[12].title}>
              <p>
                Esta política pode ser atualizada para refletir mudanças no site, nos serviços ou na legislação. A data
                da última atualização fica sempre no topo desta página.
              </p>
            </Section>

            <Section id="contato" title={sections[13].title}>
              <p>Dúvidas sobre esta política ou sobre seus dados? Fale com a gente:</p>
              <List items={[
                <>E-mail: <a className="link font-medium" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></>,
                <>WhatsApp: <a className="link font-medium" href="https://wa.me/5511965019133" target="_blank" rel="noopener noreferrer">{WHATSAPP_DISPLAY}</a></>,
              ]} />
            </Section>
          </article>
        </div>
      </main>

      <footer className="bg-tinta py-10 text-white/75">
        <div className="pagina flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 RibeiroLab. Lucas Ribeiro, São Paulo.</p>
          <div className="flex gap-6">
            <CookiePreferencesLink className="hover:text-white" />
            <a href="/" className="hover:text-white">Voltar para a página inicial</a>
          </div>
        </div>
      </footer>
      <CookieBanner />
    </div>
  )
}
