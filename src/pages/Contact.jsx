import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const inputClass = 'w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#8B5CF6] focus:bg-[#8B5CF6]/5 transition-all'
const labelClass = 'block text-white/70 text-sm font-semibold mb-2'

export default function Contact() {
  const { t } = useTranslation()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await fetch('https://formspree.io/f/FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
    } catch (_) {}
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-36 pb-16 bg-gradient-to-b from-violet-50/40 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.span variants={fadeUp} className="inline-block bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-[#8B5CF6] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              Reach Out
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-black text-white mb-6">
              {t('contact.title')}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/50 text-xl max-w-xl mx-auto">
              {t('contact.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="lg:col-span-2 space-y-8"
          >
            <motion.div variants={fadeUp} className="bg-white/3 border border-white/10 rounded-2xl p-7">
              <h3 className="text-white font-black text-xl mb-6">{t('contact.info_title')}</h3>
              <div className="space-y-5">
                <div>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">{t('contact.email_label')}</p>
                  <a href="mailto:info@leforcemedia.com" className="text-white hover:text-[#8B5CF6] transition-colors font-semibold">
                    info@leforcemedia.com
                  </a>
                </div>
                <div>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">{t('contact.response')}</p>
                  <p className="text-white font-semibold">{t('contact.response_val')}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">{t('contact.follow')}</p>
                  <div className="flex gap-3 mt-2">
                    {['TikTok', 'Instagram', 'YouTube'].map(s => (
                      <span key={s} className="bg-white/5 border border-white/10 text-white/60 text-xs font-semibold px-3 py-1.5 rounded-lg">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center"
              >
                <div className="text-6xl mb-6">✅</div>
                <h2 className="text-2xl font-black text-white mb-4">Message Sent!</h2>
                <p className="text-white/60">{t('contact.success')}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/3 border border-white/10 rounded-2xl p-8 space-y-6">
                <motion.div variants={fadeUp}>
                  <label className={labelClass}>{t('contact.name')} *</label>
                  <input className={inputClass} name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <label className={labelClass}>{t('contact.email')} *</label>
                  <input className={inputClass} name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@email.com" />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <label className={labelClass}>{t('contact.message')} *</label>
                  <textarea className={`${inputClass} resize-none h-40`} name="message" required value={form.message} onChange={handleChange} placeholder="What's on your mind?" />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <button
                    type="submit"
                    className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-black py-4 rounded-xl text-base transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-[#8B5CF6]/30"
                  >
                    {t('contact.send')}
                  </button>
                </motion.div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
