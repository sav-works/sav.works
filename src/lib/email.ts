import resend from './resend'

const FROM = 'Chahd <chahd@sav.works>'

export async function sendContactNotification(params: {
  name: string
  email: string
  message: string
}) {
  const { name, email, message } = params

  const { data, error } = await resend.emails.send({
    from: FROM,
    to: ['chahd@sav.works'],
    subject: `New contact from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Message: ${message}`,
      '',
      '---',
      'Sent via sav.works contact form',
    ].join('\n'),
    replyTo: email,
  })

  if (error) {
    console.error('Resend error:', error)
    throw new Error(error.message)
  }

  return data
}

export async function sendTestEmail() {
  const { data, error } = await resend.emails.send({
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
