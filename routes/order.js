const router = require("express").Router();
const Order = require("../models/order"); 
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book");

// ✅ Place Order
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const id = req.headers.id;
    const { order } = req.body;

    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();

      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });

      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }

    return res.json({
      status: "Success",
      message: "Order placed successfully",
    });

  } catch (err) {
    res.status(500).json({ message: "Internal server error!", err });
  }
});

router.get('/get-order-history', authenticateToken, async (req, res) => {
  try {
    const id = req.headers.id;
    
    console.log("Received user ID:", id);

    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!userData.orders) {
      return res.status(200).json({ status: "Success", data: [] });
    }

    const orderData = userData.orders.reverse();

    return res.json({
      status: "Success",
      data: orderData,
    });

  } catch (err) {
    console.error("❌ Error in /get-order-history route:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
});


// ✅ Get All Orders (Admin)
router.get('/get-all-orders', authenticateToken, async (req, res) => {
  try {
    const allOrders = await Order.find()
      .populate({ path: "book" })
      .populate({ path: "user" })
      .sort({ createdAt: -1 });

    return res.json({
      status: "Success",
      data: allOrders,
    });

  } catch (err) {
    return res.status(500).json({ message: "Internal server Error", err });
  }
});

// ✅ Update Status (Admin)
router.put('/update-status/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    await Order.findByIdAndUpdate(id, { status: req.body.status });

    return res.json({
      status: "Success",
      message: "Status updated successfully",
    });

  } catch (err) {
    return res.status(500).json({ message: "Internal server Error..!", err });
  }
});

module.exports = router ;
