import nodeMailer from "nodemailer";

export const sendMail = async (Option) => {
  if (!process.env.EMAIL || !process.env.PASSWORD) {
    console.error("Missing env vars:", {
      EMAIL: !!process.env.EMAIL,
      PASSWORD: !!process.env.PASSWORD,
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_SERVICE: process.env.SMTP_SERVICE,
      SMTP_PORT: process.env.SMTP_PORT,
      NODE_ENV: process.env.NODE_ENV,
    });
    throw new Error("Email credentials are not configured on the server");
  }

  console.log("SMTP config:", {
    host: process.env.SMTP_HOST,
    service: process.env.SMTP_SERVICE,
    port: process.env.SMTP_PORT,
    email: process.env.EMAIL,
    nodeEnv: process.env.NODE_ENV,
  });

  const transporter = nodeMailer.createTransport({
    service: process.env.SMTP_SERVICE,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
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
