import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    festivalBannerEnabled: {
      type: Boolean,
      default: false,
    },
    festivalBannerText: {
      en: {
        type: String,
        default: "Celebrate with us!",
      },
      ta: {
        type: String,
        default: "எங்களுடன் கொண்டாடவும்!",
      },
    },
    shopName: {
      type: String,
      default: "ARS Electronics World",
    },
    shopPhone: {
      type: String,
      required: true,
    },
    shopWhatsapp: {
      type: String,
      required: true,
    },
    shopLocation: {
      type: String,
      default: "Krishnagiri",
    },
    googleMapsEmbed: {
      type: String,
    },
    googleAnalyticsId: {
      type: String,
    },
    gstPercentage: {
      type: Number,
      default: 18,
      description: "GST percentage (default 18%)",
    },
    shippingCharge: {
      type: Number,
      default: 200,
      description: "Shipping charge in ₹ (default ₹200)",
    },
    freeShippingThreshold: {
      type: Number,
      default: 5000,
      description: "Free shipping if cart > this amount in ₹ (default ₹5000)",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);
