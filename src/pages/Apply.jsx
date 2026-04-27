import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

const inputClass = 'w-full bg-white border border-zinc-200 rounded-xl px-4 py-3.5 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all'
const labelClass = 'block text-zinc-700 text-sm font-semibold mb-2'

export default function Apply() {
  const { t } = useTranslation()
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [files, setFiles] = useState([])
  const fileInputRef = useRef(null)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    country: '', handle: '', additionalLinks: '',
    contentType: '', whyUs: '', skills: '',
    followers: '', monthlyViews: '', agree: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files))
  }

  const uploadFiles = async (email) => {
    if (!supabase) {
      throw new Error('Supabase is not configured.')
    }

    const urls = []
    for (const file of files) {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      const path = `${email}/${Date.now()}_${safeName}`
      const { data, error } = await supabase.storage
        .from('application-files')
        .upload(path, file, { upsert: false })

      if (error) {
        throw error
      }

      if (!data) continue

      const { data: urlData } = supabase.storage
        .from('application-files')
        .getPublicUrl(data.path)
      urls.push(urlData.publicUrl)
    }
    return urls
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setUploading(true)

    if (!isSupabaseConfigured || !supabase) {
      setUploading(false)
      setError('El formulario no está configurado todavía. Agrega VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en Vercel.')
      return
    }

    try {
      const fileUrls = files.length > 0 ? await uploadFiles(form.email) : []

      const payload = {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        phone: form.phone || null,
        country: form.country,
        tiktok_handle: form.handle,
        additional_links: form.additionalLinks || null,
        content_type: form.contentType,
        why_us: form.whyUs,
        skills: form.skills || null,
        followers: form.followers,
        monthly_views: form.monthlyViews || null,
      }

      if (fileUrls.length > 0) {
        payload.content_files = fileUrls
      }

      const { error: dbError } = await supabase.from('applications').insert(payload)

      if (dbError) {
        throw dbError
      }

      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('Application form submission failed.', err)
      setError('Hubo un error al enviar tu solicitud. Verifica la configuración de Supabase e intenta de nuevo.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-36 pb-16 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-black text-zinc-900 mb-6">
              {t('apply.title')}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-zinc-500 text-xl max-w-2xl mx-auto">
              {t('apply.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-6">
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-violet-50 border border-violet-200 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-black text-zinc-900 mb-4">¡Solicitud Recibida!</h2>
            <p className="text-zinc-600 text-lg">{t('apply.success')}</p>
          </motion.div>
        ) : (
          <motion.form initial="hidden" animate="show" variants={stagger} onSubmit={handleSubmit}
            className="bg-white border border-zinc-100 rounded-2xl p-8 md:p-10 space-y-6 shadow-sm">

            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>{t('apply.first_name')} *</label>
                <input className={inputClass} name="firstName" required value={form.firstName} onChange={handleChange} placeholder={t('apply.first_name')} />
              </div>
              <div>
                <label className={labelClass}>{t('apply.last_name')} *</label>
                <input className={inputClass} name="lastName" required value={form.lastName} onChange={handleChange} placeholder={t('apply.last_name')} />
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>{t('apply.email')} *</label>
                <input className={inputClass} name="email" type="email" required value={form.email} onChange={handleChange} placeholder="correo@ejemplo.com" />
              </div>
              <div>
                <label className={labelClass}>{t('apply.phone')}</label>
                <input className={inputClass} name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>{t('apply.country')} *</label>
                <input className={inputClass} name="country" required value={form.country} onChange={handleChange} placeholder="México" />
              </div>
              <div>
                <label className={labelClass}>{t('apply.handle')} *</label>
                <input className={inputClass} name="handle" required value={form.handle} onChange={handleChange} placeholder={t('apply.handle_placeholder')} />
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <label className={labelClass}>{t('apply.additional_links')}</label>
              <input className={inputClass} name="additionalLinks" value={form.additionalLinks} onChange={handleChange} placeholder="https://..." />
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>{t('apply.followers')} *</label>
                <input className={inputClass} name="followers" required value={form.followers} onChange={handleChange} placeholder="ej. 50,000" />
              </div>
              <div>
                <label className={labelClass}>{t('apply.monthly_views')}</label>
                <input className={inputClass} name="monthlyViews" value={form.monthlyViews} onChange={handleChange} placeholder="ej. 500,000" />
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <label className={labelClass}>{t('apply.content_type')} *</label>
              <textarea className={`${inputClass} resize-none h-28`} name="contentType" required value={form.contentType} onChange={handleChange} />
            </motion.div>

            <motion.div variants={fadeUp}>
              <label className={labelClass}>{t('apply.why_us')} *</label>
              <textarea className={`${inputClass} resize-none h-28`} name="whyUs" required value={form.whyUs} onChange={handleChange} />
            </motion.div>

            <motion.div variants={fadeUp}>
              <label className={labelClass}>{t('apply.skills')}</label>
              <textarea className={`${inputClass} resize-none h-24`} name="skills" value={form.skills} onChange={handleChange} />
            </motion.div>

            {/* File upload */}
            <motion.div variants={fadeUp}>
              <label className={labelClass}>{t('apply.upload')}</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-zinc-200 hover:border-violet-400 rounded-xl p-8 text-center transition-colors cursor-pointer bg-zinc-50 hover:bg-violet-50">
                <div className="text-3xl mb-2">📎</div>
                {files.length > 0 ? (
                  <div className="space-y-1">
                    {files.map((f, i) => (
                      <p key={i} className="text-violet-700 text-sm font-medium">{f.name}</p>
                    ))}
                    <p className="text-zinc-400 text-xs mt-2">Haz clic para cambiar</p>
                  </div>
                ) : (
                  <p className="text-zinc-400 text-sm">{t('apply.upload_hint')}</p>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="video/*,image/*,application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-start gap-3">
              <input type="checkbox" name="agree" id="agree" required
                checked={form.agree} onChange={handleChange}
                className="mt-1 w-4 h-4 accent-violet-600 cursor-pointer flex-shrink-0" />
              <label htmlFor="agree" className="text-zinc-500 text-sm cursor-pointer leading-relaxed">
                {t('apply.agree')}
              </label>
            </motion.div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <motion.div variants={fadeUp}>
              <button type="submit" disabled={uploading}
                className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl text-base transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-200">
                {uploading ? 'Enviando...' : t('apply.submit')}
              </button>
            </motion.div>
          </motion.form>
        )}
      </section>
    </div>
  )
}
