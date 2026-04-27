import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }

export default function About() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-36 pb-20 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-black text-zinc-900 mb-6">
              {t('about.title')}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-zinc-500 text-xl max-w-2xl mx-auto">
              {t('about.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
          variants={stagger} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.p variants={fadeUp} className="text-zinc-600 text-xl leading-relaxed">
            {t('about.body')}
          </motion.p>
          <motion.div variants={fadeUp}
            className="bg-violet-50 border border-violet-200 rounded-2xl p-10">
            <div className="text-4xl mb-5">🎯</div>
            <h3 className="text-zinc-900 font-black text-2xl mb-4">{t('about.mission_title')}</h3>
            <p className="text-zinc-600 text-lg leading-relaxed">{t('about.mission')}</p>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-24 bg-violet-600">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-6">{t('cta_section.title')}</h2>
          <p className="text-violet-100 text-lg mb-10">{t('cta_section.subtitle')}</p>
          <Link to="/apply"
            className="inline-block bg-white hover:bg-violet-50 text-violet-700 font-black px-10 py-5 rounded-xl text-lg transition-all hover:scale-105">
            {t('cta_section.button')}
          </Link>
        </div>
      </section>
    </div>
  )
}
