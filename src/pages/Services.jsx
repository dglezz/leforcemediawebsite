import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const serviceIcons = ['🗂️', '✨', '🚀', '💰', '✅']
const details = [
  ['Account performance audits', 'Revenue tracking & reporting', 'Platform-specific optimization', 'Dedicated account manager'],
  ['Content strategy development', 'SEO optimization for platforms', 'Posting schedule optimization', 'Engagement rate improvement'],
  ['Brand positioning strategy', 'Audience growth planning', 'Cross-platform expansion', 'Competitor analysis'],
  ['Payment processing setup', 'Revenue reconciliation', 'Payout tracking', 'Financial reporting'],
  ['Policy review & monitoring', 'Appeal support', 'Monetization program guidance', 'Risk mitigation'],
]

export default function Services() {
  const { t } = useTranslation()
  const items = t('services.items', { returnObjects: true })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-36 pb-20 bg-gradient-to-b from-violet-50/40 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.span variants={fadeUp} className="inline-block bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-[#8B5CF6] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              What We Offer
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-black text-white mb-6">
              {t('services.title')}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/50 text-xl max-w-2xl mx-auto">
              {t('services.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="flex flex-col gap-8"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white/3 border border-white/10 rounded-2xl p-8 md:p-10 hover:border-[#8B5CF6]/40 transition-all group grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
            >
              <div>
                <div className="text-4xl mb-5">{serviceIcons[i]}</div>
                <h2 className="text-2xl font-black text-white mb-3 group-hover:text-[#8B5CF6] transition-colors">
                  {item.title}
                </h2>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </div>
              <ul className="space-y-3">
                {details[i].map((d, j) => (
                  <li key={j} className="flex items-center gap-3 text-white/70 text-sm">
                    <span className="w-5 h-5 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#8B5CF6] text-xs">✓</span>
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-violet-50 to-[#8B5CF6]/30 border-y border-[#8B5CF6]/20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-6">{t('cta_section.title')}</h2>
          <p className="text-white/60 text-lg mb-10">{t('cta_section.subtitle')}</p>
          <Link
            to="/apply"
            className="inline-block bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-black px-10 py-5 rounded-xl text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#8B5CF6]/30"
          >
            {t('cta_section.button')}
          </Link>
        </div>
      </section>
    </div>
  )
}
