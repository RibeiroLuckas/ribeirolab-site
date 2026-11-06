// Google Ads com consentimento (LGPD).
// A tag só é carregada depois que o visitante aceita os cookies.
// Os códigos abaixo não são secretos (aparecem no código de qualquer site com Google Ads).
// Para trocar sem mexer no código, use as variáveis VITE_GOOGLE_ADS_* (veja .env.example).

const DEFAULTS = {
  id: 'AW-18553897997',
  whatsapp: 'vGr4CP35y7MdEI2ImI9F', // conversão "Clique no WhatsApp"
  form: 'rezJCNOeprEdEI2ImI9F', // conversão "Enviar formulário de lead"
}

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export const ADS_ID = (import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined)?.trim() || DEFAULTS.id
const LABELS = {
  whatsapp: (import.meta.env.VITE_GOOGLE_ADS_WHATSAPP_LABEL as string | undefined)?.trim() || DEFAULTS.whatsapp,
  form: (import.meta.env.VITE_GOOGLE_ADS_FORM_LABEL as string | undefined)?.trim() || DEFAULTS.form,
}

const STORAGE_KEY = 'ribeirolab-consent'
export type Consent = 'granted' | 'denied'

export const trackingEnabled = ADS_ID.length > 0

export function getConsent(): Consent | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

export function setConsent(value: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* navegador sem armazenamento: segue só nesta visita */
  }
  if (value === 'granted') loadGoogleTag()
  else if (window.gtag) {
    window.gtag('consent', 'update', {
      ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied',
    })
  }
}

let loaded = false
function loadGoogleTag() {
  if (!trackingEnabled || loaded) return
  loaded = true
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }
  window.gtag('consent', 'default', {
    ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted',
  })
  window.gtag('js', new Date())
  window.gtag('config', ADS_ID)
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ADS_ID)}`
  document.head.appendChild(script)
}

export function initAnalytics() {
  if (getConsent() === 'granted') loadGoogleTag()
}

/** Registra uma conversão no Google Ads (só funciona com consentimento). */
export function trackConversion(kind: keyof typeof LABELS) {
  if (!loaded || !window.gtag) return
  window.gtag('event', 'generate_lead', { method: kind })
  if (LABELS[kind]) window.gtag('event', 'conversion', { send_to: `${ADS_ID}/${LABELS[kind]}` })
}

export const OPEN_PREFERENCES_EVENT = 'ribeirolab:open-cookie-preferences'
export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))
}
