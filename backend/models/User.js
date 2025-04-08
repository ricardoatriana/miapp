const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    role: {
        type: String,
        required: ["customer", "admin"],
        default: "customer",
    },
})

// Match password method to be used in userRoutes
userSchema.methods.matchPassword = function (enteredPassword) {
    return enteredPassword === this.password; // ⚠️ Plain text comparison (Not Secure)
};



module.exports = mongoose.model("User", userSchema);