const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    const token = req.cookies.jwt; // Get token from cookies
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.user.id).select("-password");
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

module.exports = { protect };
