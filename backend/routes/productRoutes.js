const express = require("express");
const Products = require("../models/Products");

const router = express.Router();

// GET api/products to home page
router.get("/", async (req, res) => {
    try {
      const products = await Products.find({});
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  });  

module.exports = router;
