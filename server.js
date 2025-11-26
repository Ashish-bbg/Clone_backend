import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import User from "./models/userModel.js";
import Review from "./models/reviewModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import Cart from "./models/cartModel.js";
import Address from "./models/addressModel.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
// connect to db
connectDB();

// app
const app = express();
app.use(
  cors({
    origin: ["https://clone-frontend-opal.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

// Middleware
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// router middlewares starts here
app.use("/api/users", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/payment", paymentRoutes);
// route middlewares ends here

app.get("/", (req, res) => {
  res.send("Everything is fine and running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
