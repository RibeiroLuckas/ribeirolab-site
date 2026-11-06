import { useEffect, useState } from 'react'
import { getConsent, initAnalytics, OPEN_PREFERENCES_EVENT, setConsent, trackingEnabled } from '@/lib/analytics'

export default function CookieBanner() {
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
    <div role="dialog" aria-live="polite" aria-label="Preferências de cookies"
      className="fixed inset-x-3 bottom-3 z-[60] rounded-[10px] border border-linha bg-white p-5 text-tinta shadow-[0_18px_50px_-20px_rgba(27,36,64,0.5)] sm:left-5 sm:right-auto sm:max-w-md">
      <p className="font-bold">Cookies de medição</p>
      <p className="mt-1.5 text-[15px] leading-relaxed text-grafite">
        Uso cookies do Google para saber quais anúncios trazem contatos. O site funciona normalmente se você recusar.
        Detalhes na <a href="/politica-de-privacidade/#cookies" className="link font-medium">Política de Privacidade</a>.
      </p>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => choose('granted')} className="rounded-[10px] bg-placa px-5 py-2.5 font-semibold text-white hover:bg-placa-escura">Aceitar</button>
        <button type="button" onClick={() => choose('denied')} className="rounded-[10px] border border-tinta/20 px-5 py-2.5 font-semibold hover:border-tinta/50">Recusar</button>
      </div>
    </div>
  )
}

/** Link "Preferências de cookies" para o rodapé (só aparece se o rastreamento estiver configurado). */
export function CookiePreferencesLink({ className = '' }: { className?: string }) {
  if (!trackingEnabled) return null
  return (
    <button type="button" className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}>
      Preferências de cookies
    </button>
  )
}
