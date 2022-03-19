// Import Mongoose
const mongoose = require("mongoose");

// User Schema
const productSalesSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductSales", productSalesSchema);
