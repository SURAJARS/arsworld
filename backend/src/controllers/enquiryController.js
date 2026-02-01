import Enquiry from "../models/Enquiry.js";
import SibApiV3Sdk from "sib-api-v3-sdk";

/* =========================
   BREVO API SETUP
========================= */
const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

/* =========================
   CREATE ENQUIRY
========================= */
export const createEnquiry = async (req, res) => {
  try {
    const { productId, name, email, phone, message, enquiryType } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
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

    // respond immediately
    res.status(201).json({
      message: "Enquiry submitted successfully",
      enquiryId: enquiry._id,
    });

    // async email
    emailApi
      .sendTransacEmail({
        sender: {
          name: "ARS Electronics",
          email: process.env.OWNER_EMAIL,
        },
        to: [{ email: process.env.OWNER_EMAIL }],
        subject: `📩 New Enquiry from ${name}`,
        htmlContent: `
          <h2>New Enquiry</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Message:</b> ${message || "-"}</p>
        `,
      })
      .then(() => console.log("✅ Brevo API email sent"))
      .catch((err) =>
        console.error("⚠️ Brevo API email failed:", err.message)
      );
  } catch (err) {
    console.error("❌ Enquiry error:", err);
    res.status(500).json({ message: "Server error" });
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
