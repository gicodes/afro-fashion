const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

router.post('/api/send-email-verification-success-alert', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.NODEMAILER_USER, 
      pass: process.env.NODEMAILER_PASS, 
    },
  });

  const mailOptions = {
    from: 'no-reply@afrofashion.site',
    to: email,
    subject: 'Congratulations on verifying your Email!  ✔',
    text: `Hi there! \n\n
      Thank you for verifying your email. \n\n 
      Your account is now active, and you can explore the full features of AfroFashion. 
      \n\n
      Happy shopping! 👻 \n\n AfroFashion AI`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending congratulatory email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});
     
module.exports = router;
