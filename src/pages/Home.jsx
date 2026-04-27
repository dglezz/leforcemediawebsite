import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const serviceIcons = ['🗂️', '✨', '🚀', '💰', '✅']

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-50 to-white" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-200/30 rounded-full blur-[100px]" />

        <div className="relative max-w-4xl mx-auto px-6 text-center pt-24">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.h1 variants={fadeUp}
              className="text-5xl md:text-7xl font-black text-zinc-900 leading-tight mb-6">
              {t('hero.headline')}
            </motion.h1>

            <motion.p variants={fadeUp}
              className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('hero.subheadline')}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/apply"
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-4 rounded-xl text-base transition-all hover:scale-105 hover:shadow-lg hover:shadow-violet-200">
                {t('hero.cta_primary')}
              </Link>
              <a href="#servicios"
                className="bg-white hover:bg-violet-50 border border-zinc-200 text-zinc-700 font-bold px-8 py-4 rounded-xl text-base transition-all">
                {t('hero.cta_secondary')}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="servicios" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
            variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-zinc-900 mb-4">
              {t('services.title')}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-zinc-500 text-lg max-w-xl mx-auto">
              {t('services.subtitle')}
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
              {t('services.items', { returnObjects: true }).slice(0, 3).map((item, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="bg-white border border-violet-100 rounded-2xl p-7 hover:border-violet-300 hover:shadow-sm transition-all">
                  <div className="text-3xl mb-4">{serviceIcons[i]}</div>
                  <h3 className="text-zinc-900 font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-5">
              {t('services.items', { returnObjects: true }).slice(3).map((item, i) => (
                <motion.div key={i + 3} variants={fadeUp}
                  className="bg-white border border-violet-100 rounded-2xl p-7 hover:border-violet-300 hover:shadow-sm transition-all w-full md:w-[calc(33.333%-10px)]">
                  <div className="text-3xl mb-4">{serviceIcons[i + 3]}</div>
                  <h3 className="text-zinc-900 font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-violet-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
            variants={stagger} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-zinc-900 mb-4">
              {t('process.title')}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-zinc-500 text-lg max-w-xl mx-auto">
              {t('process.subtitle')}
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
            variants={stagger} className="flex flex-col md:flex-row relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent z-0" />
            {t('process.steps', { returnObjects: true }).map((step, i) => (
              <motion.div key={i} variants={fadeUp}
                className="relative flex-1 flex flex-col items-center text-center px-4 py-8 z-10">
                <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center text-white font-black text-lg mb-4 shadow-md shadow-violet-200">
                  {step.num}
                </div>
                <h3 className="text-zinc-900 font-bold text-base mb-2">{step.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-[160px]">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-violet-600">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
          variants={stagger} className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white mb-6">
            {t('cta_section.title')}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-violet-100 text-lg mb-10">
            {t('cta_section.subtitle')}
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link to="/apply"
              className="inline-block bg-white hover:bg-violet-50 text-violet-700 font-black px-10 py-5 rounded-xl text-lg transition-all hover:scale-105 hover:shadow-xl">
              {t('cta_section.button')}
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
