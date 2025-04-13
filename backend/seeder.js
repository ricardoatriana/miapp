const mongoose = require("mongoose")
const dotenv = require("dotenv");
const Product = require("./models/Products")
const User = require("./models/User")

const products = require("./data/dataProducts")


dotenv.config();

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URI);

//Function to seed data

const seedData = async () => {
    try {
        //Clear existing data
        await Product.deleteMany();
        await User.deleteMany();
       

        //Create a default admin User
        const createdUser = await User.create({
            name: "Admin",
            email: "admin@realestate.co",
            password:"123456",
            role: "admin",
        })

    // Insert the producs into the database
    await Product.insertMany(products);
    console.log(" Product data deployed succesfully")
    process.exit();

    } catch (error) {
        console.error("Error seeding the data:", error)
        process.exit(1);
    }
};

seedData();