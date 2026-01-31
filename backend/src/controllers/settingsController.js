import Settings from "../models/Settings.js";

const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({
        shopPhone: "+91-9876543210",
        shopWhatsapp: "+91-9876543210",
      });
    }

    return res.status(200).json(settings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const {
      festivalBannerEnabled,
      festivalBannerText,
      shopPhone,
      shopWhatsapp,
      googleAnalyticsId,
    } = req.body;

    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({
        festivalBannerEnabled,
        festivalBannerText,
        shopPhone,
        shopWhatsapp,
        googleAnalyticsId,
      });
    } else {
      if (festivalBannerEnabled !== undefined)
        settings.festivalBannerEnabled = festivalBannerEnabled;
      if (festivalBannerText)
        settings.festivalBannerText = festivalBannerText;
      if (shopPhone) settings.shopPhone = shopPhone;
      if (shopWhatsapp) settings.shopWhatsapp = shopWhatsapp;
      if (googleAnalyticsId)
        settings.googleAnalyticsId = googleAnalyticsId;

      await settings.save();
    }

    return res.status(200).json({
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default {
  getSettings,
  updateSettings,
};
