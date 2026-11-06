import { useEffect, useState } from 'react'
import { getConsent, initAnalytics, OPEN_PREFERENCES_EVENT, setConsent, trackingEnabled } from '@/lib/analytics'

const TXT = {
  pt: {
    aria: 'Preferências de cookies', title: 'Cookies de medição',
    text: 'Uso cookies do Google para saber quais anúncios trazem contatos. O site funciona normalmente se você recusar. Detalhes na',
    link: 'Política de Privacidade', accept: 'Aceitar', decline: 'Recusar', prefs: 'Preferências de cookies',
  },
  en: {
    aria: 'Cookie preferences', title: 'Measurement cookies',
    text: 'I use Google cookies to see which ads bring in contacts. The site works normally if you decline. Details in the',
    link: 'Privacy Policy (in Portuguese)', accept: 'Accept', decline: 'Decline', prefs: 'Cookie preferences',
  },
}

export default function CookieBanner({ lang = 'pt' }: { lang?: 'pt' | 'en' }) {
  const tx = TXT[lang]
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!trackingEnabled) return
    initAnalytics()
    if (getConsent() === null) setOpen(true)
    const reopen = () => setOpen(true)
    window.addEventListener(OPEN_PREFERENCES_EVENT, reopen)
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, reopen)
  }, [])

  if (!trackingEnabled || !open) return null

  const choose = (value: 'granted' | 'denied') => {
    setConsent(value)
    setOpen(false)
  }

  return (
    <div role="dialog" aria-live="polite" aria-label={tx.aria}
      className="fixed inset-x-3 bottom-3 z-[60] rounded-[10px] border border-linha bg-white p-5 text-tinta shadow-[0_18px_50px_-20px_rgba(27,36,64,0.5)] sm:left-5 sm:right-auto sm:max-w-md">
      <p className="font-bold">{tx.title}</p>
      <p className="mt-1.5 text-[15px] leading-relaxed text-grafite">
        {tx.text} <a href="/politica-de-privacidade/#cookies" className="link font-medium">{tx.link}</a>.
      </p>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => choose('granted')} className="rounded-[10px] bg-placa px-5 py-2.5 font-semibold text-white hover:bg-placa-escura">{tx.accept}</button>
        <button type="button" onClick={() => choose('denied')} className="rounded-[10px] border border-tinta/20 px-5 py-2.5 font-semibold hover:border-tinta/50">{tx.decline}</button>
      </div>
    </div>
  )
}

/** Link "Preferências de cookies" para o rodapé (só aparece se o rastreamento estiver configurado). */
export function CookiePreferencesLink({ className = '', lang = 'pt' }: { className?: string; lang?: 'pt' | 'en' }) {
  if (!trackingEnabled) return null
  return (
    <button type="button" className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}>
      {TXT[lang].prefs}
    </button>
  )
}
