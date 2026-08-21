import nodeMailer from "nodemailer";

export const sendMail = async (Option) => {
  if (!process.env.EMAIL || !process.env.PASSWORD) {
    throw new Error("Email credentials are not configured on the server");
  }

  const transporter = nodeMailer.createTransport({
    host :process.env.SMTP_HOST,
    service: process.env.SMTP_SERVICE,
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  try {
    await transporter.verify();
  } catch (err) {
    console.error("SMTP connection failed:", err.message);
    throw new Error("Unable to connect to email server. Check SMTP credentials.");
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: Option.email,
    subject: Option.subject,
    text: Option.message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("Send mail error:", err.message);
    throw new Error(`Failed to send email: ${err.message}`);
  }
};
