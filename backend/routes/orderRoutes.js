const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// 1. API to POST items in the cart to Order Collection
router.post("/", async (req, res) => {
    try {
        const { user, cart } = req.body; 

        if (!user) {
            return res.status(400).json({ message: "User is required" });
        }
        if (!cart || cart.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Calculate totalPrice
        const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

        const newOrder = new Order({
            user, 
            items: cart.map(item => ({
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


module.exports = router;