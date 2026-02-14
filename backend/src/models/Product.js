import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      en: {
        type: String,
        required: true,
      },
      ta: {
        type: String,
        required: true,
      },
    },
    description: {
      en: {
        type: String,
        required: true,
      },
      ta: {
        type: String,
        required: true,
      },
    },
    price: {
      type: Number,
      required: [true, "Please provide price"],
    },
    useCases: [
      {
        type: String,
        enum: [
          "small_families",
          "large_families",
          "energy_saving",
          "premium",
          "popular",
        ],
      },
    ],
    images: [
      {
        type: String,
        required: true,
      },
    ],
    specifications: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    isEnabled: {
      type: Boolean,
      default: true,
    },
    gstPercentage: {
      type: Number,
      default: 18,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
