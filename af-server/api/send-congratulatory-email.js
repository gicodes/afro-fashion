const nodemailer = require("nodemailer");

console.log(process.env.NODEMAILER_HOST)

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.NODEMAILER_USER, 
    pass: process.env.NODEMAILER_PASS, 
  },
});

app.post('/api/sendCongratulatoryEmail', async (req, res) => {
  const { email } = req.body;
  
  const mailOptions = {
    from: 'no-reply@afrofashion.site',
    to: email,
    subject: 'Congratulations on verifying your Email!  ✔',
    html: "<b>Hi There!</b>",
    text: `Hi there! \n\nThank you for verifying your email. 
    \n\n Your account is now active, and you can explore the full features of AfroFashion. 
    \n\nHappy shopping! 👻 
    \n\nThe AfroFashion Team`,
  };

  // console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending congratulatory email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});
              