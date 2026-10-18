const Product = require("../models/Product");
const { getAuth } = require("@clerk/express");

const createProduct = async (req, res) => {
    try {
        const { userId } = getAuth(req);

        console.log("Clerk userId:", userId);
        console.log("Product data:", req.body);

        if (!userId) {
            return res.status(401).json({
                message: "User is not authenticated"
            });
        }

        const {
            title,
            description,
            price,
            category,
            condition,
            imageUrl
        } = req.body;

        const product = await Product.create({
            title,
            description,
            price,
            category,
            condition,
            imageUrl,
            ownerId: userId
        });

        res.status(201).json({
            message: "Product created successfully",
            product
        });

    } catch (error) {

        console.log("CREATE PRODUCT ERROR:", error);

        res.status(500).json({
            message: "Failed to create product",
            error: error.message
        });
    }
};


const getProducts = async (req, res) => {
    try {

        const products = await Product
            .find()
            .sort({ createdAt: -1 });

        res.status(200).json(products);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch products",
            error: error.message
        });
    }
};


module.exports = {
    createProduct,
    getProducts
};