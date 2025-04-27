const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv") //to store the port value as a variable 
const connectDB = require("./config/db")
const productRoutes = require ("./routes/productRoutes")
const userRoutes = require ("./routes/userRoutes")
const orderRoutes = require ("./routes/orderRoutes")
const cookieParser = require("cookie-parser");
const path = require('path'); // <-- Import path module


dotenv.config()

const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173", // Adjust for frontend
        credentials: true, // Allow cookies
    }))



const PORT = process.env.PORT || 3000


//Conn to MongoDB
connectDB()

app.get("/", (req, res) => {
    res.send("Welcome to miapp")
});

app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

//API Routes, it started with User Registration
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})


