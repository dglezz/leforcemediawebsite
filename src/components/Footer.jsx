import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-violet-50 border-t border-violet-100 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div>
            <span className="text-xl font-black tracking-tight text-zinc-900">
              leForce <span className="text-violet-600">Media</span>
            </span>
            <p className="mt-4 text-zinc-500 text-sm leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h4 className="text-zinc-900 font-bold mb-4">{t('footer.links_title')}</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: t('nav.home') },
                { to: '/about', label: t('nav.about') },
                { to: '/apply', label: t('nav.apply') },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-zinc-400 hover:text-violet-600 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-violet-100 text-center">
          <p className="text-zinc-400 text-sm">{t('footer.legal')}</p>
        </div>
      </div>
    </footer>
  )
}
