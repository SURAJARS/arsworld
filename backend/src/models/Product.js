const mongoose = require('mongoose');

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
      required: [true, 'Please provide price'],
    },
    useCases: [
      {
        type: String,
        enum: [
          'small_families',
          'large_families',
          'energy_saving',
          'premium',
          'popular',
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
