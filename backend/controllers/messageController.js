

const Message = require("../models/message");
const { getAuth } = require("@clerk/express");

// Send a new message
const sendMessage = async (req, res) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({
                message: "You must be logged in"
            });
        }

        const { receiverId, productId, text } = req.body;

        if (
            !receiverId ||
            !productId ||
            !text ||
            !text.trim()
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Prevent sending a message to yourself
        if (receiverId === userId) {
            return res.status(400).json({
                message: "You cannot message yourself"
            });
        }

        const message = await Message.create({
            senderId: userId,
            receiverId,
            productId,
            text: text.trim()
        });

        return res.status(201).json({
            message: "Message sent successfully",
            data: message
        });

    } catch (error) {
        console.log("SEND MESSAGE ERROR:", error);

        return res.status(500).json({
            message: "Failed to send message",
            error: error.message
        });
    }
};


// Fetch conversation messages
const getMessages = async (req, res) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({
                message: "You must be logged in"
            });
        }

        const { productId, otherUserId } = req.params;

        const messages = await Message.find({
            productId,
            $or: [
                {
                    senderId: userId,
                    receiverId: otherUserId
                },
                {
                    senderId: otherUserId,
                    receiverId: userId
                }
            ]
        }).sort({ createdAt: 1 });

        return res.status(200).json(messages);

    } catch (error) {
        console.log("GET MESSAGES ERROR:", error);

        return res.status(500).json({
            message: "Failed to fetch messages",
            error: error.message
        });
    }
};



// const getInboxMessages = async (req, res) => {
//     try {
//         const { userId } = getAuth(req);

//         if (!userId) {
//             return res.status(401).json({
//                 message: "You must be logged in"
//             });
//         }

//         const messages = await Message.find({
//             receiverId: userId
//         }).sort({ createdAt: -1 });

//         return res.status(200).json(messages);

//     } catch (error) {
//         console.log("INBOX ERROR:", error);

//         return res.status(500).json({
//             message: "Failed to fetch inbox"
//         });
//     }
// };

const getInboxMessages = async (req, res) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({
                message: "You must be logged in"
            });
        }

        const messages = await Message.find({
            receiverId: userId
        })
            .populate("productId", "title price imageUrl")
            .sort({ createdAt: -1 });

        return res.status(200).json(messages);

    } catch (error) {
        console.log("INBOX ERROR:", error);

        return res.status(500).json({
            message: "Failed to fetch inbox"
        });
    }
};


// IMPORTANT: Keep exports at the very bottom
module.exports = {
    sendMessage,
    getMessages,
    getInboxMessages
};