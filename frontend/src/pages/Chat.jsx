
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/react";
import { useNavigate, useParams } from "react-router-dom";

function Chat() {
    const { getToken, userId, isSignedIn } = useAuth();
    const { productId, ownerId: otherUserId } = useParams();
    const navigate = useNavigate();

    const actualProductId = productId;

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");

    const fetchMessages = useCallback(async () => {
        if (!actualProductId || !otherUserId || !isSignedIn) {
            setLoading(false);
            return;
        }

        try {
            const token = await getToken();

            const response = await fetch(
                `http://localhost:5000/api/messages/${encodeURIComponent(actualProductId)}/${encodeURIComponent(otherUserId)}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to load conversation."
                );
            }

            setMessages(Array.isArray(data) ? data : []);
            setError("");
        } catch (err) {
            console.error("Chat loading error:", err);
            setError(err.message || "Unable to load messages.");
        } finally {
            setLoading(false);
        }
    }, [actualProductId, otherUserId, getToken, isSignedIn]);

    useEffect(() => {
        fetchMessages();

        const intervalId = setInterval(fetchMessages, 3000);

        return () => clearInterval(intervalId);
    }, [fetchMessages]);

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!text.trim() || sending) return;

        try {
            setSending(true);
            const token = await getToken();

            const response = await fetch(
                "http://localhost:5000/api/messages",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        receiverId: otherUserId,
                        productId: actualProductId,
                        text: text.trim()
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Message could not be sent.");
            }

            setText("");
            await fetchMessages();
        } catch (err) {
            console.error("Send message error:", err);
            setError(err.message || "Message could not be sent.");
        } finally {
            setSending(false);
        }
    };

    if (loading) {
        return (
            <main className="cm-chat-page">
                <div className="cm-chat-loading">
                    Loading conversation...
                </div>
            </main>
        );
    }

    return (
        <main className="cm-chat-page">
            <section className="cm-chat-container">
                <header className="cm-chat-header">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                    >
                        ← Back
                    </button>

                    <div>
                        <h1>Campus Chat</h1>
                        <p>Chat with your campus connection</p>
                    </div>
                </header>

                <div className="cm-chat-product">
                    <strong>Product conversation</strong>
                    <span>Product ID: {actualProductId}</span>
                </div>

                {error && (
                    <div className="cm-chat-error" role="alert">
                        {error}
                        <button
                            type="button"
                            onClick={() => {
                                setError("");
                                fetchMessages();
                            }}
                        >
                            Retry
                        </button>
                    </div>
                )}

                <section className="cm-chat-messages">
                    {messages.length === 0 ? (
                        <div className="cm-chat-empty">
                            <span>💬</span>
                            <h2>Start the conversation</h2>
                            <p>Send a message to get things started.</p>
                        </div>
                    ) : (
                        messages.map((message) => {
                            const senderId =
                                typeof message.senderId === "object"
                                    ? message.senderId?._id
                                    : message.senderId;

                            const mine = senderId === userId;

                            return (
                                <div
                                    key={message._id}
                                    className={
                                        mine
                                            ? "cm-chat-message cm-chat-message-mine"
                                            : "cm-chat-message cm-chat-message-theirs"
                                    }
                                >
                                    <p>{message.text}</p>
                                    <span>
                                        {message.createdAt
                                            ? new Date(
                                                message.createdAt
                                            ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })
                                            : ""}
                                    </span>
                                </div>
                            );
                        })
                    )}
                </section>

                <form
                    className="cm-chat-composer"
                    onSubmit={sendMessage}
                >
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write a message..."
                        aria-label="Message"
                        required
                    />

                    <button type="submit" disabled={sending || !text.trim()}>
                        {sending ? "Sending..." : "Send →"}
                    </button>
                </form>
            </section>
        </main>
    );
}

export default Chat;

