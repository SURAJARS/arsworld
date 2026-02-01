import Enquiry from "../models/Enquiry.js";
import nodemailer from "nodemailer";

/* =========================
   BREVO SMTP TRANSPORT
========================= */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,        // smtp-relay.brevo.com
  port: Number(process.env.SMTP_PORT),// 587
  secure: false,                      // TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/* =========================
   CREATE ENQUIRY
========================= */
export const createEnquiry = async (req, res) => {
  try {
    const { productId, name, email, phone, message, enquiryType } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        message: "Name, email and phone are required",
      });
    }

    const enquiry = await Enquiry.create({
      user: req.user?.id || null,
      product: productId || null,
      name,
      email,
      phone,
      message,
      enquiryType: enquiryType || "contact-form",
    });

    /* =========================
       SEND EMAIL (BREVO)
    ========================= */
    try {
      await transporter.sendMail({
        from: `"ARS Electronics" <${process.env.SMTP_USER}>`,
        to: process.env.OWNER_EMAIL,
        replyTo: email,
        subject: `📩 New Enquiry from ${name}`,
        html: `
          <h2>New Enquiry Received</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Type:</b> ${enquiryType || "Contact Form"}</p>
          <p><b>Message:</b></p>
          <p>${message || "-"}</p>
          <hr/>
          <small>Received at ${new Date().toLocaleString()}</small>
        `,
      });

      console.log("✅ Brevo email sent");
    } catch (mailErr) {
      console.error("❌ Brevo mail failed:", mailErr.message);
    }

    return res.status(201).json({
      message: "Enquiry submitted successfully",
      enquiry,
    });
  } catch (err) {
    console.error("❌ Enquiry error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET ALL ENQUIRIES
========================= */
export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .populate("product")
      .populate("user")
      .sort({ createdAt: -1 });

    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   UPDATE STATUS
========================= */
export const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    res.json({ message: "Status updated", enquiry });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   DELETE
========================= */
export const deleteEnquiry = async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ message: "Enquiry deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
