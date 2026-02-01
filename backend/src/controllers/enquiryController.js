import Enquiry from "../models/Enquiry.js";
import nodemailer from "nodemailer";

/* =========================
   BREVO SMTP TRANSPORT
========================= */
const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT),
  secure: false, // IMPORTANT for port 587
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
  connectionTimeout: 10000, // ⏱ prevent hanging
});

/* =========================
   CREATE ENQUIRY
========================= */
export const createEnquiry = async (req, res) => {
  try {
    const { productId, name, email, phone, message, enquiryType } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 1️⃣ Save enquiry first
    const enquiry = await Enquiry.create({
      user: req.user?.id || null,
      product: productId || null,
      name,
      email,
      phone,
      message,
      enquiryType: enquiryType || "contact-form",
    });

    // 2️⃣ Respond immediately (VERY IMPORTANT)
    res.status(201).json({
      message: "Enquiry submitted successfully",
      enquiryId: enquiry._id,
    });

    // 3️⃣ Send email ASYNC (non-blocking)
    transporter
      .sendMail({
        from: `"ARS Electronics" <${process.env.BREVO_SMTP_USER}>`,
        to: process.env.OWNER_EMAIL,
        subject: `📩 New Enquiry from ${name}`,
        html: `
          <h2>New Enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong> ${message || "-"}</p>
          <hr/>
          <small>${new Date().toLocaleString()}</small>
        `,
      })
      .then(() => console.log("✅ Brevo email sent"))
      .catch((err) =>
        console.error("⚠️ Brevo email failed:", err.message)
      );
  } catch (err) {
    console.error("❌ Enquiry error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   ADMIN APIs
========================= */
export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateEnquiryStatus = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteEnquiry = async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ message: "Enquiry deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
