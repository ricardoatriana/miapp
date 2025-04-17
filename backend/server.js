const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv") //to store the port value as a variable 
const connectDB = require("./config/db")
const productRoutes = require ("./routes/productRoutes")
const userRoutes = require ("./routes/userRoutes")

const cookieParser = require("cookie-parser");


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

//API Routes, it started with User Registration
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})


