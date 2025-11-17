import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

// @route   POST /api/orders
// @desc    Create (place) a new order
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { paymentMethod = "COD", shippingAddressId } = req.body;
    const userId = req.user._id;

    if (!shippingAddressId) {
      return res.status(400).json({ message: "Shipping Address is required" });
    }

    const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "name price stock"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }
    // 3. SERVER-SIDE CALCULATION (Fix for Security Flaw)
    let finalTotalAmount = 0;
    const orderItems = [];
    for (const item of cart.items) {
      if (!item.productId || typeof item.productId.price !== "number") {
        return res.status(400).json({
          message: `Invalid product in cart: ${item.productId}`,
        });
      }

      // checking if stock is available
      if (item.productId.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Not enough stock for ${item.productId.name}` });
      }

      orderItems.push({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      });

      finalTotalAmount += item.productId.price * item.quantity;
    }
    const stockUpdateBulk = orderItems.map((item) => ({
      updateOne: {
        filter: {
          _id: item.productId,
        },
        update: {
          $inc: {
            stock: -item.quantity,
          },
        },
      },
    }));

    await Product.bulkWrite(stockUpdateBulk);

    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount: finalTotalAmount,
      paymentMethod,
      shippingAddress: shippingAddressId,
    });

    // Clear the cart after placing
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();
    res.status(201).json({
      message: "Order placed Successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/orders/my
// @desc    get (placed)  order
// @access  Private
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user._id })
    .populate("items.productId", "name price imageUrl")
    .populate("shippingAddress");
  res.status(200).json(orders);
};
