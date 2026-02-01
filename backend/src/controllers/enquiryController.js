import Enquiry from "../models/Enquiry.js";
import SibApiV3Sdk from "sib-api-v3-sdk";

/* =========================
   BREVO API CONFIG
========================= */
const brevoClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = brevoClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const transactionalApi = new SibApiV3Sdk.TransactionalEmailsApi();

/* =========================
   CREATE ENQUIRY
========================= */
export const createEnquiry = async (req, res) => {
  try {
    const { productId, name, email, phone, message, enquiryType } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    /* 1️⃣ SAVE ENQUIRY */
    const enquiry = await Enquiry.create({
      user: req.user?.id || null,
      product: productId || null,
      name,
      email,
      phone,
      message,
      enquiryType: enquiryType || "contact-form",
    });

    /* 2️⃣ RESPOND IMMEDIATELY (NO UI HANG) */
    res.status(201).json({
      message: "Enquiry submitted successfully",
      enquiryId: enquiry._id,
    });

    /* 3️⃣ SEND EMAIL ASYNC (NON-BLOCKING) */
    const emailData = {
      sender: {
        name: "ARS Electronics",
        email: "no-reply@arsworld.com", // can be any verified sender
      },
      to: [
        {
          email: process.env.OWNER_EMAIL,
          name: "Store Owner",
        },
      ],
      subject: `📩 New Enquiry from ${name}`,
      htmlContent: `
        <h2>New Enquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Type:</strong> ${enquiryType || "General"}</p>
        <p><strong>Message:</strong></p>
        <p>${message || "-"}</p>
        <hr/>
        <small>${new Date().toLocaleString()}</small>
      `,
    };

    transactionalApi
      .sendTransacEmail(emailData)
      .then(() => console.log("✅ Brevo email sent successfully"))
      .catch((err) =>
        console.error("⚠️ Brevo email failed:", err?.response?.body || err.message)
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
