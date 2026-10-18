const express = require("express");

const {
    createProduct,
    getProducts
} = require("../controllers/productController");

const { getAuth } = require("@clerk/express");

const router = express.Router();


router.post("/",
    (req, res, next) => {
        const { isAuthenticated } = getAuth(req);

        if (!isAuthenticated) {
            return res.status(401).json({
                message: "You must be logged in"
            });
        }

        next();
    },
    createProduct
);


router.get("/", getProducts);


module.exports = router;