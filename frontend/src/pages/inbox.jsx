
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/react";
import { useNavigate } from "react-router-dom";


function Inbox() {
    const { getToken, userId } = useAuth();
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInbox = async () => {
            try {
                const token = await getToken();

                const response = await fetch(
                    "http://localhost:5000/api/messages/inbox",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    console.log("Inbox error:", data);
                    return;
                }

                setMessages(Array.isArray(data) ? data : []);
            } catch (error) {
                console.log("Inbox error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInbox();
    }, [getToken]);

    // const openConversation = (message) => {
    //     const productId =
    //         typeof message.productId === "object"
    //             ? message.productId?._id
    //             : message.productId;

    //     if (!productId || !message.senderId) {
    //         alert("Conversation details are unavailable.");
    //         return;
    //     }

    //     navigate(`/chat/${productId}/${message.senderId}`);
    // };
//     const openConversation = (message) => {
//     const productId =
//         typeof message.productId === "object"
//             ? message.productId?._id
//             : message.productId;

//     const otherUserId = message.senderId;

//     console.log("Inbox message:", message);
//     console.log("Product ID:", productId);
//     console.log("Other user ID:", otherUserId);

//     if (!productId || !otherUserId) {
//         alert("Missing product or student ID. Check the browser console.");
//         return;
//     }

//     navigate(
//         `/chat/${encodeURIComponent(productId)}/${encodeURIComponent(otherUserId)}`
//     );
// };
const openConversation = (message) => {
    const productId =
        typeof message.productId === "object"
            ? message.productId?._id
            : message.productId;

    const senderId =
        typeof message.senderId === "object"
            ? message.senderId?._id
            : message.senderId;

    const receiverId =
        typeof message.receiverId === "object"
            ? message.receiverId?._id
            : message.receiverId;

    // Find the other participant in the conversation.
    const otherUserId =
        senderId && senderId !== userId
            ? senderId
            : receiverId && receiverId !== userId
                ? receiverId
                : null;

    console.log("Opening conversation:", {
        productId,
        senderId,
        receiverId,
        currentUserId: userId,
        otherUserId
    });

    if (!productId || !otherUserId) {
        console.error("Cannot identify conversation participants:", message);
        alert("Conversation details are missing. Check the browser console.");
        return;
    }

    navigate(
        `/chat/${encodeURIComponent(String(productId))}/${encodeURIComponent(String(otherUserId))}`
    );
};






    if (loading) {
        return (
            <main className="cm-inbox-page">
                <section className="cm-inbox-loading">
                    <div className="cm-inbox-spinner"></div>
                    <h2>Opening your inbox...</h2>
                    <p>Getting your campus conversations ready.</p>
                </section>
            </main>
        );
    }

    return (
        <main className="cm-inbox-page">
            <div className="cm-inbox-container">
                <header className="cm-inbox-header">
                    <span className="cm-inbox-eyebrow">
                        YOUR CAMPUS CONNECTIONS
                    </span>

                    <div className="cm-inbox-title-row">
                        <div>
                            <h1 className="cm-inbox-title">
                                My <span>Inbox.</span>
                            </h1>

                            <p className="cm-inbox-subtitle">
                                Every good deal starts with a conversation.
                                See who's interested in your products.
                            </p>
                        </div>

                        <div className="cm-inbox-count">
                            <span className="cm-inbox-count-number">
                                {messages.length}
                            </span>
                            <span className="cm-inbox-count-label">
                                {messages.length === 1
                                    ? "MESSAGE"
                                    : "MESSAGES"}
                            </span>
                        </div>
                    </div>
                </header>

                {messages.length === 0 ? (
                    <section className="cm-inbox-empty">
                        <div className="cm-inbox-empty-icon">✉</div>
                        <h2>Your inbox is taking a little nap</h2>
                        <p>
                            When students message you about your products,
                            their conversations will appear here.
                        </p>

                        <button
                            type="button"
                            className="cm-inbox-browse-btn"
                            onClick={() => navigate("/products")}
                        >
                            Explore Products <span>↗</span>
                        </button>
                    </section>
                ) : (
                    <section className="cm-inbox-list">
                        {messages.map((message) => {
                            const product = message.productId;
                            const productTitle =
                                typeof product === "object"
                                    ? product?.title
                                    : null;

                            const productPrice =
                                typeof product === "object"
                                    ? product?.price
                                    : null;

                            const productImage =
                                typeof product === "object"
                                    ? product?.imageUrl
                                    : null;

                            return (
                                <article
                                    className="cm-inbox-card"
                                    key={message._id}
                                >
                                    <div className="cm-inbox-card-top">
                                        <div className="cm-inbox-product">
                                            {productImage ? (
                                                <img
                                                    className="cm-inbox-product-image"
                                                    src={productImage}
                                                    alt={productTitle || "Product"}
                                                />
                                            ) : (
                                                <div className="cm-inbox-product-placeholder">
                                                    <span>🛍️</span>
                                                </div>
                                            )}

                                            <div className="cm-inbox-product-info">
                                                <span className="cm-inbox-product-label">
                                                    PRODUCT ENQUIRY
                                                </span>

                                                <h2 className="cm-inbox-product-title">
                                                    {productTitle ||
                                                        "Product unavailable"}
                                                </h2>

                                                {productPrice != null && (
                                                    <p className="cm-inbox-price">
                                                        ₹
                                                        {Number(
                                                            productPrice
                                                        ).toLocaleString("en-IN")}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <span className="cm-inbox-message-tag">
                                            <span className="cm-inbox-status-dot"></span>
                                            Message
                                        </span>
                                    </div>

                                    <div className="cm-inbox-message-box">
                                        <div className="cm-inbox-sender-avatar">
                                            {String(message.senderId || "?")
                                                .slice(0, 1)
                                                .toUpperCase()}
                                        </div>

                                        <div className="cm-inbox-message-content">
                                            <p className="cm-inbox-sender">
                                                Student
                                            </p>

                                            <p className="cm-inbox-message-text">
                                                {message.text ||
                                                    "No message text available."}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="cm-inbox-card-footer">
                                        <span className="cm-inbox-date">
                                            <span>◷</span>{" "}
                                            {message.createdAt
                                                ? new Date(
                                                      message.createdAt
                                                  ).toLocaleString()
                                                : "Date unavailable"}
                                        </span>

                                        <button
                                            type="button"
                                            className="cm-inbox-reply-btn"
                                            onClick={() =>
                                                openConversation(message)
                                            }
                                        >
                                            Open Conversation
                                            <span>↗</span>
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </section>
                )}

                <footer className="cm-inbox-footer-note">
                    <span>✦</span>
                    Good conversations make great campus deals.
                </footer>
            </div>
        </main>
    );
}

export default Inbox;
