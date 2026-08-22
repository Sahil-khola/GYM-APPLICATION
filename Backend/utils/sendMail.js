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
    nodeEnv: process.env.NODE_ENV,
  });

  const port = Number(process.env.SMTP_PORT) || 465;
  const useSecure = port === 465;

  const transportConfig = {
    port,
    secure: useSecure,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    connectionTimeout: 10000,
    socketTimeout: 10000,
  };

  if (process.env.SMTP_HOST) {
    transportConfig.host = process.env.SMTP_HOST;
  } else if (process.env.SMTP_SERVICE) {
    transportConfig.service = process.env.SMTP_SERVICE;
  } else {
    throw new Error(
      "Neither SMTP_HOST nor SMTP_SERVICE is configured. Cannot send email."
    );
  }

  const transporter = nodeMailer.createTransport(transportConfig);

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
