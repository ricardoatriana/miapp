const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// 1. API to POST items in the cart to Order Collection
router.post("/", async (req, res) => {
    try {
        const { user, products } = req.body; 

        if (!user) {
            return res.status(400).json({ message: "User is required" });
        }
        if (!products || products.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Calculate totalPrice
       const totalPrice = products.reduce((sum, item) => sum + item.price, 0);

        const newOrder = new Order({
            user, 
            products: products.map(item => ({
                productId: item._id,
                quantity: 1, 
                price: item.price
            })),
            totalPrice
        });

        await newOrder.save();
        res.status(201).json({ message: "Order created successfully", order: newOrder });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// 2 GET API  fetching all orders is to /AdminHomePage
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name"); // Populate user name
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// 3 GET API fetching all orders for a user
const mongoose = require('mongoose');

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const orders = await Order.find({ user: userId }).populate("products.productId");

    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error.message, error.stack);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
});

module.exports = router;