import Address from "../models/addressModel.js";

// @desc create address for the logged-in user
// @route POST /api/address
export const createAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { type, line1, city, state, zip, country } = req.body;

    const newAddress = new Address({
      userId,
      type,
      line1,
      city,
      state,
      zip,
      country,
    });
    const savedAddress = await newAddress.save();
    res.send(201).json(savedAddress);
  } catch (error) {
    console.log("Error creating address:", error);
    res.status(500).json({ message: "Server error creating address" });
  }
};

// @desc get All Address for the logged-in user
// @route GET /api/address
export const getAllAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const addresses = await Address.find({ userId: userId });
    res.status(200).json(addresses);
  } catch (error) {
    console.log("Error fetching addresses:", error);
    res.status(500).json({ message: "Server error fetching Address" });
  }
};

// @desc update Address for logged-in user
// @route PUT /api/address
export const updateAddress = async (req, res) => {
  try {
    const userId = req.user._id;
  } catch (error) {}
};
