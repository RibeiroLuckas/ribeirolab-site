import { useEffect, useState } from 'react'
import { Cookie } from 'lucide-react'
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
      className="fixed inset-x-4 bottom-4 sm:left-6 sm:right-auto sm:max-w-md z-[60] glass rounded-2xl p-5 shadow-2xl">
      <div className="flex items-start gap-3">
        <Cookie className="w-6 h-6 text-purple-300 shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="text-white font-semibold mb-1">Cookies de medição</p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Usamos cookies do Google para medir quais anúncios trazem contatos. Você pode aceitar ou recusar —
            o site funciona normalmente nos dois casos. Veja a{' '}
            <a href="/politica-de-privacidade/#cookies" className="text-purple-300 underline underline-offset-4 hover:text-white">Política de Privacidade</a>.
          </p>
          <div className="flex gap-3 mt-4">
            <button type="button" onClick={() => choose('granted')}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90">
              Aceitar
            </button>
            <button type="button" onClick={() => choose('denied')}
              className="border border-white/20 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-white/10">
              Recusar
            </button>
          </div>
        </div>
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
