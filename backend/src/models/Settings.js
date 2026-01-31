const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    festivalBannerEnabled: {
      type: Boolean,
      default: false,
    },
    festivalBannerText: {
      en: {
        type: String,
        default: 'Celebrate with us!',
      },
      ta: {
        type: String,
        default: 'எங்களுடன் கொண்டாடவும்!',
      },
    },
    shopName: {
      type: String,
      default: 'ARS Electronics World',
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
      default: 'Krishnagiri',
    },
    googleMapsEmbed: {
      type: String,
    },
    googleAnalyticsId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
