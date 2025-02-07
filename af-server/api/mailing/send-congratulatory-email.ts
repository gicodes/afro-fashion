import express, { Request, Response, Router, } from 'express';
import nodemailer from 'nodemailer';

const router: Router = express.Router();

router.post("/send-email-verification-success-alert", async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: Number(process.env.NODEMAILER_PORT), // Ensure port is a number
    secure: false, // true for port 465, false for others
    auth: {
      user: process.env.NODEMAILER_USER as string,
      pass: process.env.NODEMAILER_PASS as string,
    },
  });

  const mailOptions = {
    from: 'no-reply@afrofashion.site',
    to: email,
    subject: 'Congratulations on verifying your Email! ✔',
    text: `Hi there!\n\nThank you for verifying your email.\n\nYour account is now active, and you can explore the full features of AfroFashion.\n\nHappy shopping! 👻\n\nAfroFashion AI`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending congratulatory email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;
