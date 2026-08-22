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

  const password = process.env.PASSWORD.replace(/\s+/g, "");

  console.log("SMTP config:", {
    host: process.env.SMTP_HOST,
    service: process.env.SMTP_SERVICE,
    port: process.env.SMTP_PORT,
    nodeEnv: process.env.NODE_ENV,
  });

  const baseConfig = {
    family: 4,
    auth: {
      user: process.env.EMAIL,
      pass: password,
    },
    connectionTimeout: 10000,
    socketTimeout: 10000,
  };

  if (process.env.SMTP_HOST) {
    baseConfig.host = process.env.SMTP_HOST;
  } else if (process.env.SMTP_SERVICE) {
    baseConfig.service = process.env.SMTP_SERVICE;
  } else {
    throw new Error(
      "Neither SMTP_HOST nor SMTP_SERVICE is configured. Cannot send email."
    );
  }

  const primaryPort = Number(process.env.SMTP_PORT) || 465;

  const mailOptions = {
    from: process.env.EMAIL,
    to: Option.email,
    subject: Option.subject,
    text: Option.message,
  };

  const trySendMail = async (config, label) => {
    const transporter = nodeMailer.createTransport(config);
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent (${label}):`, info.messageId);
    return info;
  };

  const errors = [];

  try {
    return await trySendMail(
      { ...baseConfig, port: primaryPort, secure: primaryPort === 465 },
      "primary"
    );
  } catch (err) {
    console.error(`Send mail error (${primaryPort}):`, err.message);
    errors.push(`${primaryPort}: ${err.message}`);
  }

  const fallbackPort = 587;
  try {
    return await trySendMail(
      { ...baseConfig, port: fallbackPort, secure: false },
      "fallback (STARTTLS)"
    );
  } catch (err) {
    console.error(`Send mail error (${fallbackPort}):`, err.message);
    errors.push(`${fallbackPort}: ${err.message}`);
  }

  throw new Error(
    `Failed to send email on ports ${primaryPort} and ${fallbackPort}: ${errors.join("; ")}`
  );
};
