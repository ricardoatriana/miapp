const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware"); // To protect routes

const router = express.Router();

// Cookie options for secure storage
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
    sameSite: "Strict",
    maxAge: 40 * 60 * 60 * 1000, // 40 hours
};

// 1. User Registration API
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Hash password
       // const salt = await bcrypt.genSalt(10);
        //const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({ name, email, password });
        await user.save();

        // Create jwt payload
        const payload = { user: { id: user._id, name: user.name, email: user.email, role: user.role } };

        // Sign JWT and store it in an HTTP-only cookie
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" });

        res.cookie("jwt", token, cookieOptions);
        res.status(200).json({
            message: "Registration successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// 2. User Login API
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "No registered User with that email" });

        // Compare password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        // Create jwt payload
        const payload = { user: { id: user._id, name: user.name, email: user.email, role: user.role } };


        // Sign JWT and store it in an HTTP-only cookie
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" });

        res.cookie("jwt", token, cookieOptions);
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// 3. Logout API (Clears the cookie)
router.post("/logout", (req, res) => {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "Logged out successfully" });
});

// 4. Get User Profile (Protected Route)
router.get("/profile", protect, async (req, res) => {

    if (!req.user) {
        return res.status(401).json({ message: "User not found" });
    }

    const { _id, name, email } = req.user; // the _id, so it can also retrieve the order
    res.json({ _id, name, email });
});

// 5. API Get userId, that is used in CartDrawer.jsx

router.get("/userid", protect, async (req, res) => {
    try {
        if (!req.user) { // Check if user exists in the request
            return res.status(401).json({ message: "Not authorized" });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ _id: user._id });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

router.get("/auth", protect, async (req, res) => { // to verify if a user is currently logged in
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
});

module.exports = router;