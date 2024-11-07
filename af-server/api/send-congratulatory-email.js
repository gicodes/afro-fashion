const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "maddison53@ethereal.email", // setup user
    pass: "jn7jnAPss4f63QBp6D", // setup pass
  },
});

// async function main() {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }

// main().catch(console.error);

app.post('/api/sendCongratulatoryEmail', async (req, res) => {
  const { email } = req.body;
  
  const mailOptions = {
    from: 'no-reply@afrofashion.site',
    to: email,
    subject: 'Congratulations on Verifying Your Email!',
    text: `Hi there! \n\nThank you for verifying your email. Your account is now active, and you can explore the full features of AfroFashion. \n\nHappy shopping!\n\nThe AfroFashion Team`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending congratulatory email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});
              