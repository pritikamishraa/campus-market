const messageRoutes = require("./routes/messageRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { clerkMiddleware } = require("@clerk/express");
const productRoutes = require("./routes/productRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.use("/api/products", productRoutes);
app.use("/api/messages", messageRoutes);


app.get("/", (req, res) => {
    res.send("Campus Market API is running");
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});