import Address from "../models/addressModel.js";

// @desc create address for the logged-in user
// @route POST /api/address
export const createAddress = async (req, res) => {
  try {
    const userId = req.user?._id;
    console.log("frontend data:", req.body);
    const { name, phoneNumber, type, line1, city, state, zip, country } =
      req.body;

    const newAddress = new Address({
      userId,
      name,
      phoneNumber,
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
    const { id } = req.params;
    const userId = req.user._id;
    const updateData = req.body;
    const updateAddress = await Address.findOneAndUpdate(
      { _id: id, userId: userId },
      updateData,
      {
        new: true,
      }
    );

    if (!updateAddress) {
      return res.json(404).json({ message: "Address not found" });
    }
    res.status(200).json(updateAddress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc update Address for logged-in user
// @route delete /api/address
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const address = await Address.findOneAndDelete({ _id: id, userId: userId });
    if (!address) {
      return res
        .status(404)
        .json({ message: "Address not found or not authorized" });
    }
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
