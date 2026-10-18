
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/react";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Search, category and sorting state
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("latest");

    const navigate = useNavigate();
    const { userId, isSignedIn } = useAuth();

    const categories = [
        "All",
        "Books",
        "Electronics",
        "Clothing",
        "Stationery",
        "Furniture",
        "Others"
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/products"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();
                setProducts(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter and sort products
    const filteredProducts = products
        .filter((product) => {
            const search = searchTerm.trim().toLowerCase();

            const matchesSearch =
                (product.title || "").toLowerCase().includes(search) ||
                (product.description || "").toLowerCase().includes(search) ||
                (product.category || "").toLowerCase().includes(search);

            const matchesCategory =
                selectedCategory === "All" ||
                (product.category || "").toLowerCase() ===
                    selectedCategory.toLowerCase();

            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === "price-low") {
                return Number(a.price || 0) - Number(b.price || 0);
            }

            if (sortBy === "price-high") {
                return Number(b.price || 0) - Number(a.price || 0);
            }

            return (
                new Date(b.createdAt || 0).getTime() -
                new Date(a.createdAt || 0).getTime()
            );
        });

    if (loading) {
        return (
            <div className="products-page">
                <div className="products-loading">
                    <div className="loading-spinner"></div>
                    <h2>Finding great campus deals...</h2>
                    <p>Just a moment!</p>
                </div>
            </div>
        );
    }

    return (
        <main className="products-page">
            <header className="products-heading">
                <span className="section-eyebrow">
                    EXPLORE · BUY · SELL
                </span>

                <h1>
                    Browse <span className="gradient-text">Products</span>
                </h1>

                <p>Find great deals from your fellow students!</p>
            </header>

            <section className="product-toolbar">
                <div className="product-search">
                    <span className="search-icon">⌕</span>

                    <input
                        type="text"
                        placeholder="Search books, electronics, calculators..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="Search products"
                    />

                    {searchTerm && (
                        <button
                            type="button"
                            className="clear-search"
                            onClick={() => setSearchTerm("")}
                            aria-label="Clear search"
                        >
                            ×
                        </button>
                    )}
                </div>

                <div className="category-filters">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            className={
                                selectedCategory === category
                                    ? "category-chip active"
                                    : "category-chip"
                            }
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="product-toolbar-bottom">
                    <p className="results-count">
                        Showing <strong>{filteredProducts.length}</strong>{" "}
                        products
                    </p>

                    <select
                        className="product-sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        aria-label="Sort products"
                    >
                        <option value="latest">Latest first</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>
            </section>

            {filteredProducts.length === 0 ? (
                <div className="products-empty">
                    <span>🔎</span>
                    <h3>
                        {products.length === 0
                            ? "No products available yet"
                            : "No products found"}
                    </h3>
                    <p>
                        {products.length === 0
                            ? "Be the first to list something on Campus Market!"
                            : "Try another search or choose a different category."}
                    </p>

                    {(searchTerm || selectedCategory !== "All") && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("All");
                            }}
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            ) : (
                <section className="products-grid">
                    {filteredProducts.map((product) => (
                        <article
                            className="product-card"
                            key={product._id}
                        >
                            <div className="product-image-wrap">
                                {product.imageUrl ? (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.title}
                                        className="product-image"
                                    />
                                ) : (
                                    <div className="product-image-placeholder">
                                        <span>🛍️</span>
                                        <p>No image available</p>
                                    </div>
                                )}

                                <span className="product-condition">
                                    {product.condition || "Pre-loved"}
                                </span>
                            </div>

                            <div className="product-card-content">
                                <span className="product-category">
                                    {product.category || "Campus essential"}
                                </span>

                                <h3 className="product-title">
                                    {product.title}
                                </h3>

                                <p className="product-description">
                                    {product.description}
                                </p>

                                <div className="product-card-bottom">
                                    <div className="product-price">
                                        ₹
                                        {Number(
                                            product.price || 0
                                        ).toLocaleString("en-IN")}
                                    </div>

                                    <button
                                        className="product-view-button"
                                        type="button"
                                        onClick={() => {
                                            if (!isSignedIn) {
                                                alert(
                                                    "Please log in to contact the owner."
                                                );
                                                return;
                                            }

                                            if (product.ownerId === userId) {
                                                alert(
                                                    "This is your own product!"
                                                );
                                                return;
                                            }

                                            navigate(
                                                `/chat/${product._id}/${product.ownerId}`
                                            );
                                        }}
                                    >
                                        Contact Owner <span>↗</span>
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>
            )}
        </main>
    );
}

export default Products;
