import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/apply', label: t('nav.apply') },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-violet-100' : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <span className="text-xl font-black tracking-tight text-zinc-900">
            LE FORCE <span className="text-violet-600">MEDIA</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to}
              className={`text-sm font-semibold transition-colors ${
                location.pathname === to ? 'text-violet-600' : 'text-zinc-500 hover:text-zinc-900'
              }`}>
              {label}
            </Link>
          ))}
          <button onClick={toggleLang}
            className="text-sm font-bold text-zinc-400 hover:text-zinc-700 transition-colors border border-zinc-200 rounded px-3 py-1 hover:border-zinc-400">
            {i18n.language === 'es' ? 'EN' : 'ES'}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggleLang}
            className="text-xs font-bold text-zinc-400 border border-zinc-200 rounded px-2 py-1">
            {i18n.language === 'es' ? 'EN' : 'ES'}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-1" aria-label="Toggle menu">
            <div className="flex flex-col gap-1.5">
              <span className={`block h-0.5 w-6 bg-zinc-700 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-6 bg-zinc-700 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-zinc-700 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-violet-100 px-6 py-6 flex flex-col gap-5">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to}
              className={`text-base font-semibold ${location.pathname === to ? 'text-violet-600' : 'text-zinc-700'}`}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
