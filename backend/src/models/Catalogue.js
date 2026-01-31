import mongoose from "mongoose";

const catalogueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Products", "Pricing", "Support", "Warranty", "Other"],
      default: "Products",
    },
    url: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
    },
    thumbnail: {
      type: String,
      default: "📄",
    },
    views: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Catalogue", catalogueSchema);
