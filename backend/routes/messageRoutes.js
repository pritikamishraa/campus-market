
const express = require("express");

const {
    sendMessage,
    getMessages,
    getInboxMessages
} = require("../controllers/messageController");



const { getAuth } = require("@clerk/express");

const router = express.Router();


// SEND MESSAGE
router.post(
    "/",
    (req, res, next) => {

        const { isAuthenticated } = getAuth(req);

        if (!isAuthenticated) {
            return res.status(401).json({
                message: "You must be logged in"
            });
        }

        next();
    },
    sendMessage
);



router.get("/inbox", (req, res, next) => {
    const { isAuthenticated } = getAuth(req);

    if (!isAuthenticated) {
        return res.status(401).json({
            message: "You must be logged in"
        });
    }

    next();
}, getInboxMessages);


// GET MESSAGES
router.get(
    "/:productId/:otherUserId",
    (req, res, next) => {

        const { isAuthenticated } = getAuth(req);

        if (!isAuthenticated) {
            return res.status(401).json({
                message: "You must be logged in"
            });
        }

        next();
    },
    getMessages
);


module.exports = router;