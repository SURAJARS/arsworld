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

    // 1️⃣ Save enquiry immediately
    const enquiry = await Enquiry.create({
      user: req.user?.id || null,
      product: productId || null,
      name,
      email,
      phone,
      message,
      enquiryType: enquiryType || "contact-form",
    });

    // 2️⃣ Respond immediately (NO waiting)
    res.status(201).json({
      message: "Enquiry submitted successfully",
      enquiryId: enquiry._id,
    });

    // 3️⃣ Send email async via API (safe on Render)
    emailApi
      .sendTransacEmail({
        sender: { name: "ARS Electronics", email: process.env.OWNER_EMAIL },
        to: [{ email: process.env.OWNER_EMAIL }],
        subject: `📩 New Enquiry from ${name}`,
        htmlContent: `
          <h2>New Enquiry</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Message:</b> ${message || "-"}</p>
          <hr/>
          <small>${new Date().toLocaleString()}</small>
        `,
      })
      .then(() => console.log("✅ Brevo API email sent"))
      .catch((err) =>
        console.error("⚠️ Brevo API email failed:", err.message)
      );
  } catch (err) {
    console.error("❌ Enquiry error:", err);
  }
};
