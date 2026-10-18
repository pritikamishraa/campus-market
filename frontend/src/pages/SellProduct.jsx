
import { useState } from "react";
import { useAuth } from "@clerk/react";

const initialForm = {
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    imageUrl: ""
};

function SellProduct() {
    const { getToken, isSignedIn } = useAuth();

    const [formData, setFormData] = useState(initialForm);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isSignedIn) {
            setMessageType("error");
            setMessage("Please log in before listing a product.");
            return;
        }

        if (Number(formData.price) < 0 || formData.price === "") {
            setMessageType("error");
            setMessage("Please enter a valid product price.");
            return;
        }

        try {
            setSubmitting(true);
            setMessage("");

            const token = await getToken();

            const response = await fetch(
                "http://localhost:5000/api/products",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        ...formData,
                        price: Number(formData.price)
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to create product."
                );
            }

            setMessageType("success");
            setMessage("Your product has been listed successfully!");
            setFormData(initialForm);
        } catch (error) {
            console.error("Product listing error:", error);
            setMessageType("error");
            setMessage(error.message || "Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="cm-sell-page">
            <div className="cm-sell-orb cm-sell-orb-one"></div>
            <div className="cm-sell-orb cm-sell-orb-two"></div>

            <div className="cm-sell-container">
                <header className="cm-sell-hero">
                    <span className="cm-sell-eyebrow">
                        SHARE <span>•</span> SELL <span>•</span> HELP
                    </span>

                    <h1 className="cm-sell-hero-title">
                        List Your <span>Product</span>
                    </h1>

                    <p className="cm-sell-hero-description">
                        Give your pre-loved items a new home
                        <br className="cm-sell-desktop-break" /> and help
                        fellow students!
                    </p>

                    <div className="cm-sell-doodle">
                        <span>Small deals,</span>
                        <span>big impact!</span>
                        <span className="cm-sell-doodle-arrow">↙</span>
                    </div>
                </header>

                <section className="cm-sell-main-card">
                    <aside className="cm-sell-promo">
                        <span className="cm-sell-brand-pill">
                            CAMPUS MARKET
                        </span>

                        <h2 className="cm-sell-promo-title">
                            Turn your unused items into{" "}
                            <span>new opportunities!</span>
                        </h2>

                        <div className="cm-sell-benefits">
                            <div className="cm-sell-benefit">
                                <div className="cm-sell-benefit-icon">♧</div>
                                <div>
                                    <h3>Give it a second life</h3>
                                    <p>Reduce waste, increase value</p>
                                </div>
                            </div>

                            <div className="cm-sell-benefit">
                                <div className="cm-sell-benefit-icon">♙</div>
                                <div>
                                    <h3>Help fellow students</h3>
                                    <p>Affordable and useful finds</p>
                                </div>
                            </div>

                            <div className="cm-sell-benefit">
                                <div className="cm-sell-benefit-icon">ϟ</div>
                                <div>
                                    <h3>Fast and easy</h3>
                                    <p>List your product in minutes</p>
                                </div>
                            </div>
                        </div>

                        <div className="cm-sell-illustration">
                            <div className="cm-sell-illustration-glow"></div>
                            <div className="cm-sell-book cm-sell-book-back"></div>
                            <div className="cm-sell-book cm-sell-book-front"></div>
                            <div className="cm-sell-bag">
                                <div className="cm-sell-bag-handle"></div>
                                <span>✦</span>
                            </div>
                            <span className="cm-sell-spark cm-sell-spark-one">✦</span>
                            <span className="cm-sell-spark cm-sell-spark-two">✧</span>
                            <span className="cm-sell-spark cm-sell-spark-three">✦</span>
                        </div>

                        <p className="cm-sell-promo-footer">
                            Made for students, powered by community.
                        </p>
                    </aside>

                    <section className="cm-sell-form-panel">
                        <div className="cm-sell-form-heading">
                            <div>
                                <h2>Product Details</h2>
                                <p>
                                    Fill in the details below to list your
                                    product.
                                </p>
                            </div>
                            <div className="cm-sell-heading-icon">✎</div>
                        </div>

                        <form
                            className="cm-sell-form"
                            onSubmit={handleSubmit}
                        >
                            <div className="cm-sell-field">
                                <label htmlFor="cm-sell-title">
                                    <span className="cm-sell-field-icon">◇</span>
                                    Product Title <span className="cm-sell-required">*</span>
                                </label>
                                <input
                                    id="cm-sell-title"
                                    type="text"
                                    name="title"
                                    placeholder="e.g. Physics Textbook"
                                    value={formData.title}
                                    onChange={handleChange}
                                    maxLength={100}
                                    required
                                />
                            </div>

                            <div className="cm-sell-field">
                                <label htmlFor="cm-sell-description">
                                    <span className="cm-sell-field-icon">▤</span>
                                    Description <span className="cm-sell-required">*</span>
                                </label>
                                <textarea
                                    id="cm-sell-description"
                                    name="description"
                                    placeholder="Tell us about the item, its features and condition..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    maxLength={1000}
                                    required
                                />
                                <span className="cm-sell-character-count">
                                    {formData.description.length}/1000
                                </span>
                            </div>

                            <div className="cm-sell-field">
                                <label htmlFor="cm-sell-price">
                                    <span className="cm-sell-field-icon">₹</span>
                                    Price (₹) <span className="cm-sell-required">*</span>
                                </label>
                                <input
                                    id="cm-sell-price"
                                    type="number"
                                    name="price"
                                    placeholder="e.g. 499"
                                    value={formData.price}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>

                            <div className="cm-sell-field">
                                <label htmlFor="cm-sell-category">
                                    <span className="cm-sell-field-icon">▦</span>
                                    Category <span className="cm-sell-required">*</span>
                                </label>
                                <select
                                    id="cm-sell-category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Books">Books</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Lab Equipment">Lab Equipment</option>
                                    <option value="Clothing">Clothing</option>
                                    <option value="Cycles">Cycles</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="cm-sell-field">
                                <label htmlFor="cm-sell-condition">
                                    <span className="cm-sell-field-icon">♧</span>
                                    Condition <span className="cm-sell-required">*</span>
                                </label>
                                <select
                                    id="cm-sell-condition"
                                    name="condition"
                                    value={formData.condition}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Condition</option>
                                    <option value="New">New</option>
                                    <option value="Like New">Like New</option>
                                    <option value="Good">Good</option>
                                    <option value="Used">Used</option>
                                </select>
                            </div>

                            <div className="cm-sell-field">
                                <label htmlFor="cm-sell-image">
                                    <span className="cm-sell-field-icon">▧</span>
                                    Image URL <span className="cm-sell-optional">(optional)</span>
                                </label>
                                <input
                                    id="cm-sell-image"
                                    type="url"
                                    name="imageUrl"
                                    placeholder="https://example.com/image.jpg"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                />
                            </div>

                            {formData.imageUrl.trim() && (
                                <div className="cm-sell-image-preview">
                                    <img
                                        src={formData.imageUrl}
                                        alt="Product preview"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
                                        onLoad={(e) => {
                                            e.currentTarget.style.display = "block";
                                        }}
                                    />
                                    <span>Image preview</span>
                                </div>
                            )}

                            <button
                                className="cm-sell-submit"
                                type="submit"
                                disabled={submitting}
                            >
                                <span>{submitting ? "Listing your product..." : "♧"}</span>
                                {submitting ? "Please wait" : "List Product"}
                                {!submitting && <span className="cm-sell-submit-arrow">→</span>}
                            </button>

                            {message && (
                                <div
                                    className={`cm-sell-feedback ${
                                        messageType === "success"
                                            ? "cm-sell-feedback-success"
                                            : "cm-sell-feedback-error"
                                    }`}
                                    role="status"
                                >
                                    <span>
                                        {messageType === "success" ? "✓" : "!"}
                                    </span>
                                    {message}
                                </div>
                            )}

                            <p className="cm-sell-form-note">
                                ✦ Your next great campus connection starts here.
                            </p>
                        </form>
                    </section>
                </section>
            </div>
        </main>
    );
}

export default SellProduct;
