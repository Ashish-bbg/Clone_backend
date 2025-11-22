import Razorpay from "razorpay";
import dotenv from "dotenv";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
dotenv.config();

// like logging to razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createRazorpayOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2. Calculate Total from REAL Database Prices (Source of Truth)
    // We do this to ensure the user didn't fake the price in the Cart either.
    const productIds = cart.items.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    // Create a map for fast price lookup
    const priceMap = new Map();
    products.forEach((p) => priceMap.set(p._id.toString(), p.price));

    let secureAmount = 0;

    for (const item of cart.items) {
      const realPrice = priceMap.get(item.productId.toString());
      if (realPrice) {
        secureAmount += realPrice * item.quantity;
      }
    }

    const options = {
      // razorpay takes amount in payess so convert rupess to paise 1 rupee == 100 paise
      amount: secureAmount * 100,
      currency: "INR",
      //   A unique string for your own internal tracking. We use Date.now() to ensure it's unique every time
      receipt: `receipt_${Date.now()}`,
    };

    // talking to razorpay sending details
    //await ... create(options): This is the actual network call. Your server sends a message to Razorpay: "Please create an order for 50000 paisa."

    // const order: Razorpay replies with an object containing an id (e.g., order_Kz92...). This ID is required to open the payment popup on the frontend.
    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay error:", error);
    res.status(500).json({ message: "Payment initialization failed" });
  }
};
