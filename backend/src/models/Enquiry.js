import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    enquiryType: {
      type: String,
      enum: ["call", "whatsapp", "email", "contact-form"],
      default: "contact-form",
    },
    status: {
      type: String,
      enum: ["pending", "contacted", "resolved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);
