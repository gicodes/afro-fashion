const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

router.post('/api/send-password-reset-success-alert', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

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
    from: '"AfroFashion Support" <support@afrofashion.site>',
    to: email,
    subject: 'Password Reset Successful',
    text: `Hello,

Your password has been reset successfully. If you did not request this change, please contact our support team immediately.

Best regards,
AfroFashion Support Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Congratulatory email sent to:', email);
    res.status(200).json({ message: 'Congratulatory email sent successfully' });
  } catch (error) {
    console.error('Error sending congratulatory email:', error.message);
    res.status(500).json({ error: 'Failed to send congratulatory email' });
  }
});

module.exports = router;