import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  try {
    const payload = await req.json()
    const r = payload.record

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111">
        <h2 style="color:#7C3AED;margin-bottom:4px">Nueva Solicitud de Creador</h2>
        <p style="color:#666;margin-top:0">Le Force Media — TikTok</p>
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>

        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#666;width:40%">Nombre</td><td style="padding:8px 0;font-weight:600">${r.first_name} ${r.last_name}</td></tr>
          <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0;font-weight:600"><a href="mailto:${r.email}">${r.email}</a></td></tr>
          ${r.phone ? `<tr><td style="padding:8px 0;color:#666">Teléfono</td><td style="padding:8px 0">${r.phone}</td></tr>` : ''}
          <tr><td style="padding:8px 0;color:#666">País</td><td style="padding:8px 0">${r.country}</td></tr>
          <tr><td style="padding:8px 0;color:#666">TikTok</td><td style="padding:8px 0;font-weight:600">${r.tiktok_handle}</td></tr>
          ${r.additional_links ? `<tr><td style="padding:8px 0;color:#666">Otros enlaces</td><td style="padding:8px 0">${r.additional_links}</td></tr>` : ''}
          <tr><td style="padding:8px 0;color:#666">Seguidores</td><td style="padding:8px 0">${r.followers}</td></tr>
          ${r.monthly_views ? `<tr><td style="padding:8px 0;color:#666">Vistas/mes</td><td style="padding:8px 0">${r.monthly_views}</td></tr>` : ''}
        </table>

        <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>

        <p style="color:#666;margin-bottom:4px"><strong>Tipo de contenido</strong></p>
        <p style="margin-top:0">${r.content_type}</p>

        <p style="color:#666;margin-bottom:4px"><strong>¿Por qué quiere trabajar con nosotros?</strong></p>
        <p style="margin-top:0">${r.why_us}</p>

        ${r.skills ? `<p style="color:#666;margin-bottom:4px"><strong>Habilidades</strong></p><p style="margin-top:0">${r.skills}</p>` : ''}

        <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
        <p style="color:#aaa;font-size:12px">Recibido el ${new Date(r.created_at).toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}</p>
      </div>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Le Force Media <onboarding@resend.dev>',
        to: ['leforceps@gmail.com'],
        subject: `Nueva solicitud: ${r.first_name} ${r.last_name} (${r.tiktok_handle})`,
        html,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      return new Response(JSON.stringify({ error: err }), { status: 500 })
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})
