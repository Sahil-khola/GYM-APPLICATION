import nodeMailer from "nodemailer";

export const sendMail = async (Option) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: Option.email,
    subject: Option.subject,
    text: Option.message,
  };

  await transporter.sendMail(mailOptions);
};
