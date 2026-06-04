const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the product name"],
    },
    description: {
      type: String,
      required: [true, "Please provide the product description"],
    },
    category: {
      type: String,
      required: [true, "Please provide the product category"],
    },
    tags: {
      type: [String], // Array of tags
      default: [],
    },
    price: {
      type: Number,
      required: [true, "Please provide the product price"],
    },
    stock: {
      type: Number,
      required: [true, "Please provide the product stock"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      match: [/.+@.+\..+/, "Please provide a valid email address"],
    },
    images: {
      type: [String], // Array of image URLs (base64 or hosted links)
      required: [true, "Please upload product images"],
    },
    brand: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    soldCount: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the creation date
    },
  },
  {
    timestamps: true,
  }
);

// Compound text index for full-text search across key fields
productSchema.index(
  { name: 'text', description: 'text', category: 'text', tags: 'text', brand: 'text' },
  { weights: { name: 10, brand: 5, category: 5, tags: 3, description: 1 } }
);

module.exports = mongoose.model("Product", productSchema);