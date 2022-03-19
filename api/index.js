// Imports
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Configuration
dotenv.config();

// Create expresss app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const productSalesRoute = require("./routes/productSales");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");

// Connect to mongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// API Endpoints
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/productSales", productSalesRoute);

// Listen on port 5000
app.listen(process.env.PORT || 5000, () => {
  console.log("Server Running");
});
