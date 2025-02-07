import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post("/send-password-changed-alert", async (req: Request<{}, {}, any>, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: Number(process.env.NODEMAILER_PORT),
    secure: false, // true for port 465, false for others
    auth: {
      user: process.env.NODEMAILER_USER as string,
      pass: process.env.NODEMAILER_PASS as string,
    },
  });

  const mailOptions = {
    from: 'AfroFashion Support Team <support@afrofashion.site>',
    to: email,
    subject: 'Password Reset Successful',
    text: `Hello,\n\nYour password has been reset successfully. If you did not request this change, please contact our support team immediately.\n\nBest regards,\n\nAfroFashion Support Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password Reset email sent successfully' });
  } catch (error: any) {
    console.error('Error sending Password Reset email:', error.message);
    res.status(500).json({ error: 'Failed to send Password Reset email' });
  }
});

export default router;
