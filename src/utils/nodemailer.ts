import * as nodemailer from 'nodemailer'

export async function mailer(from, to, subject, link, html) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sqrcvproject@gmail.com',
        pass: 'mzumyqpqhmywbupv'
      }
    })

    await transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      text: link,
      html: html,
    })
  } catch (e) {
    console.log(e)
  }
}
