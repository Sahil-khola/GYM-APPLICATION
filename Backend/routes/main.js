import express from "express";
import { sendMail } from "../utils/sendMail.js";

const router = express.Router();

router.post("/mail", async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    await sendMail({
      email: "sahilkhola7202@gmail.com",
      subject: "GYM WEBSITE CONTACT",
      message: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router; 

