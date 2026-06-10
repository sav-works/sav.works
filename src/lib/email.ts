import getResend from './resend'

const FROM = 'Chahd <chahd@sav.works>'

export async function sendContactNotification(params: {
  name: string
  email: string
  message: string
}) {
  const { name, email, message } = params
  const date = new Date().toLocaleString('en-KW', {
    timeZone: 'Asia/Kuwait',
    dateStyle: 'long',
    timeStyle: 'short',
  })

  const { data, error } = await getResend().emails.send({
    from: FROM,
    to: ['chahd@sav.works'],
    subject: `New contact — ${name} via sav.works`,
    replyTo: email,
    html: [
      `<!doctype html>`,
      `<html>`,
      `<head><meta charset="utf-8"></head>`,
      `<body style="margin:0;padding:0;background-color:#f5f5f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">`,
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f4;padding:32px 16px;">`,
      `<tr><td align="center">`,
      `<table role="presentation" width="540" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%;">`,

      // ── Logo / Brand Header ──
      `<tr><td style="padding-bottom:20px;">`,
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">`,
      `<tr>`,
      `<td style="font-size:22px;font-weight:700;color:#1c1917;letter-spacing:-0.3px;">sav.works</td>`,
      `<td align="right" style="font-size:13px;color:#78716c;">${date}</td>`,
      `</tr>`,
      `</table>`,
      `</td></tr>`,

      // ── Main Card ──
      `<tr><td style="background-color:#ffffff;border-radius:12px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04);">`,

      // Badge + heading
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">`,
      `<tr><td style="padding-bottom:24px;">`,
      `<span style="display:inline-block;background-color:#f3e8ff;color:#6b21a8;font-size:12px;font-weight:600;padding:4px 12px;border-radius:999px;letter-spacing:0.3px;text-transform:uppercase;">New Inquiry</span>`,
      `</td></tr>`,
      `<tr><td style="font-size:20px;font-weight:600;color:#1c1917;padding-bottom:24px;border-bottom:1px solid #e7e5e4;">Someone reached out through your site</td></tr>`,
      `</table>`,

      // ── Sender details ──
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">`,

      // Name
      `<tr>`,
      `<td width="80" style="font-size:13px;font-weight:600;color:#78716c;vertical-align:top;padding-bottom:16px;">Name</td>`,
      `<td style="font-size:15px;color:#1c1917;padding-bottom:16px;">${escapeHtml(name)}</td>`,
      `</tr>`,

      // Email
      `<tr>`,
      `<td width="80" style="font-size:13px;font-weight:600;color:#78716c;vertical-align:top;padding-bottom:16px;">Email</td>`,
      `<td style="padding-bottom:16px;">`,
      `<a href="mailto:${escapeHtml(email)}" style="color:#6b21a8;font-size:15px;text-decoration:none;border-bottom:1px solid #d8b4fe;">${escapeHtml(email)}</a>`,
      `</td>`,
      `</tr>`,

      // Message
      `<tr>`,
      `<td width="80" style="font-size:13px;font-weight:600;color:#78716c;vertical-align:top;padding-bottom:4px;">Message</td>`,
      `<td style="font-size:15px;color:#292524;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</td>`,
      `</tr>`,

      `</table>`,

      // ── Divider ──
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">`,
      `<tr><td style="border-top:1px solid #e7e5e4;padding-top:20px;">`,
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">`,
      `<tr>`,
      `<td style="font-size:13px;color:#a8a29e;">Reply directly &rarr;</td>`,
      `<td align="right">`,
      `<a href="mailto:${escapeHtml(email)}" style="display:inline-block;background-color:#7c3aed;color:#ffffff;font-size:13px;font-weight:500;padding:8px 18px;border-radius:8px;text-decoration:none;">Reply to ${escapeHtml(name)}</a>`,
      `</td>`,
      `</tr>`,
      `</table>`,
      `</td></tr>`,

      `</td></tr>`,

      // ── Footer ──
      `<tr><td style="padding-top:20px;text-align:center;font-size:12px;color:#a8a29e;line-height:1.5;">`,
      `Sent via <a href="https://sav.works" style="color:#7c3aed;text-decoration:none;">sav.works</a> contact form`,
      `</td></tr>`,

      `</table>`,
      `</td></tr>`,
      `</table>`,
      `</body>`,
      `</html>`,
    ].join('\n'),
    text: [
      `─ New Contact Form Submission ─`,
      ``,
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Message:`,
      `${message}`,
      ``,
      `───`,
      `Sent ${date} via sav.works contact form`,
      `Reply to: ${email}`,
    ].join('\n'),
  })

  if (error) {
    console.error('Resend error:', error)
    throw new Error(error.message)
  }

  return data
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function sendTestEmail() {
  const { data, error } = await getResend().emails.send({
    from: FROM,
    to: ['hamamyshahd@gmail.com'],
    subject: 'sav.works — System test',
    text: 'Email sending is configured and working correctly.',
  })

  if (error) {
    console.error('Resend test error:', error)
    throw new Error(error.message)
  }

  return data
}
