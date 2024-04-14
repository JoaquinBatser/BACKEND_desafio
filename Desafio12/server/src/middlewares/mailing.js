import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_MAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
})

const sendPassswordChangeEmail = async (email, id, token) => {
  const mailOptions = {
    from: process.env.NODEMAILER_MAIL,
    to: email,
    subject: 'Password Reset',
    text: `Your password reset link is localhost:8000/api/sessions/password/change/${id}/${token} . It has a validity of 1 hour.`,
  }
  try {
    await transport.sendMail(mailOptions)
  } catch (error) {
    console.error(error)
  }
}

export default { sendPassswordChangeEmail }
