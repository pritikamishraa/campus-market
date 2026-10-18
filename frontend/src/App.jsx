
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import {
    Show,
    SignInButton,
    SignUpButton,
    UserButton
} from "@clerk/react";

import Products from "./pages/Products";
import Chat from "./pages/Chat";
import SellProduct from "./pages/SellProduct";
import Inbox from "./pages/inbox";


function Home() {
    return (
        <main className="home-page">
            <section className="hero-section">
                <div className="hero-copy">
                    <div className="hero-eyebrow">
                        <span className="eyebrow-dot"></span>
                        YOUR CAMPUS. YOUR MARKETPLACE.
                    </div>

                    <h1>
                        Your next great find
                        <span className="gradient-text">
                            {" "}is closer than you think.
                        </span>
                    </h1>

                    <p className="hero-description">
                        Buy what you need. Sell what you don't.
                        Find great deals from students on your campus,
                        all in one friendly marketplace.
                    </p>

                    <div className="hero-actions">
                        <Link to="/products" className="hero-primary-btn">
                            Explore Marketplace <span>→</span>
                        </Link>

                        <Link to="/sell" className="hero-secondary-btn">
                            Start Selling <span>↗</span>
                        </Link>
                    </div>

                    <div className="hero-trust">
                        <span className="trust-icon">✦</span>
                        Made for campus life, powered by students.
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="hero-orb orb-one"></div>
                    <div className="hero-orb orb-two"></div>

                    <div className="floating-label label-top">
                        <span>✨</span>
                        Smart student finds
                    </div>

                    <div className="showcase-card">
                        <div className="showcase-top">
                            <span className="showcase-pill">
                                CAMPUS PICKS
                            </span>
                            <span className="showcase-heart">♡</span>
                        </div>

                        <div className="showcase-products">
                            <div className="showcase-item item-books">
                                <span>📚</span>
                                <small>Books</small>
                            </div>

                            <div className="showcase-item item-tech">
                                <span>🎧</span>
                                <small>Tech</small>
                            </div>

                            <div className="showcase-item item-study">
                                <span>🧮</span>
                                <small>Study</small>
                            </div>

                            <div className="showcase-item item-living">
                                <span>🪴</span>
                                <small>Hostel</small>
                            </div>
                        </div>

                        <div className="showcase-bottom">
                            <div>
                                <strong>Little things.</strong>
                                <p>Big campus wins.</p>
                            </div>
                            <span className="showcase-arrow">↗</span>
                        </div>
                    </div>

                    <div className="floating-label label-bottom">
                        <span className="label-sparkle">✳</span>
                        Buy · Sell · Repeat
                    </div>

                    <div className="decorative-star star-one">✦</div>
                    <div className="decorative-star star-two">✧</div>
                </div>
            </section>

            <section className="benefits-section">
                <div className="benefit-card">
                    <span className="benefit-icon">🔎</span>
                    <div>
                        <h3>Discover</h3>
                        <p>Find useful things around campus.</p>
                    </div>
                </div>

                <div className="benefit-card">
                    <span className="benefit-icon">♻️</span>
                    <div>
                        <h3>Give things a second life</h3>
                        <p>Sell or pass on what you no longer need.</p>
                    </div>
                </div>

                <div className="benefit-card">
                    <span className="benefit-icon">💬</span>
                    <div>
                        <h3>Connect directly</h3>
                        <p>Chat with other students about items.</p>
                    </div>
                </div>
            </section>


           
<section className="category-section">
    <div className="section-heading">
        <div>
            <span className="section-eyebrow">EXPLORE THE CAMPUS</span>
            <h2>What are you looking for?</h2>
            <p>Find your next favorite thing without breaking the bank.</p>
        </div>

        <Link to="/products" className="category-view-all">
            View all products <span>→</span>
        </Link>
    </div>

    <div className="category-grid">
        <Link
            to="/products"
            className="category-card category-purple"
        >
            <span className="category-emoji">📚</span>
            <span className="category-card-title">Books & Notes</span>
            <span className="category-card-description">
                Learn more, spend less
            </span>
            <span className="category-card-arrow">↗</span>
        </Link>

        <Link
            to="/products"
            className="category-card category-blue"
        >
            <span className="category-emoji">🎧</span>
            <span className="category-card-title">Electronics</span>
            <span className="category-card-description">
                Tech worth discovering
            </span>
            <span className="category-card-arrow">↗</span>
        </Link>

        <Link
            to="/products"
            className="category-card category-orange"
        >
            <span className="category-emoji">🧮</span>
            <span className="category-card-title">Study Essentials</span>
            <span className="category-card-description">
                Ready for your next exam
            </span>
            <span className="category-card-arrow">↗</span>
        </Link>

        <Link
            to="/products"
            className="category-card category-green"
        >
            <span className="category-emoji">🪴</span>
            <span className="category-card-title">Hostel & Living</span>
            <span className="category-card-description">
                Make your room feel like home
            </span>
            <span className="category-card-arrow">↗</span>
        </Link>
    </div>
</section>




{/* HOW IT WORKS */}
<section className="cm-home-how">
    <div className="cm-home-heading">
        <span className="cm-home-eyebrow">SIMPLE. SOCIAL. SMART.</span>
        <h2>Good finds happen in <span>three easy steps.</span></h2>
        <p>Your campus marketplace, designed to make student life easier.</p>
    </div>

    <div className="cm-home-steps">
        <div className="cm-home-step">
            <div className="cm-home-step-icon cm-home-step-purple">🔎</div>
            <span className="cm-home-step-number">STEP 01</span>
            <h3>Discover your find</h3>
            <p>Explore books, electronics, study essentials, and other useful items listed by students.</p>
        </div>

        <div className="cm-home-step">
            <div className="cm-home-step-icon cm-home-step-pink">💬</div>
            <span className="cm-home-step-number">STEP 02</span>
            <h3>Connect with a student</h3>
            <p>Chat directly with the owner to ask questions and discuss the item before deciding.</p>
        </div>

        <div className="cm-home-step">
            <div className="cm-home-step-icon cm-home-step-green">🤝</div>
            <span className="cm-home-step-number">STEP 03</span>
            <h3>Make a campus deal</h3>
            <p>Buy, sell, or rent items and give useful things a second life around campus.</p>
        </div>
    </div>
</section>


{/* TRUSTED BY PEERS */}
<section className="cm-home-trust">
    <div className="cm-home-trust-content">
        <span className="cm-home-eyebrow">MADE FOR STUDENT LIFE</span>
        <h2>Trusted by peers.<br /><span>Powered by campus connections.</span></h2>
        <p>
            The best campus deals can start with a simple conversation.
            Find useful items, connect with fellow students, and make
            more of what you already have.
        </p>

        <div className="cm-home-trust-points">
            <div>
                <span>✓</span>
                <div>
                    <strong>Student-to-student connections</strong>
                    <p>Connect directly with item owners.</p>
                </div>
            </div>

            <div>
                <span>✓</span>
                <div>
                    <strong>Budget-friendly discoveries</strong>
                    <p>Explore options that suit student life.</p>
                </div>
            </div>

            <div>
                <span>✓</span>
                <div>
                    <strong>A more sustainable campus</strong>
                    <p>Help useful items find their next owner.</p>
                </div>
            </div>
        </div>

        <Link to="/products" className="cm-home-trust-button">
            Explore the marketplace <span>→</span>
        </Link>
    </div>

    <div className="cm-home-trust-visual">
        <div className="cm-home-trust-circle cm-home-trust-circle-one"></div>
        <div className="cm-home-trust-circle cm-home-trust-circle-two"></div>

        <div className="cm-home-trust-card">
            <span className="cm-home-trust-card-label">CAMPUS MARKETPLACE</span>
            <div className="cm-home-trust-emoji-grid">
                <span>📚</span>
                <span>🎧</span>
                <span>🧮</span>
                <span>🪴</span>
            </div>
            <h3>Less waste. More value.</h3>
            <p>Little exchanges can make campus life better.</p>
            <div className="cm-home-trust-card-footer">
                <span>💜</span> Made for students, by students
            </div>
        </div>
    </div>
</section>


{/* GET IN TOUCH */}
<section className="cm-home-contact" id="cm-home-contact">
    <div className="cm-home-contact-card">
        <div className="cm-home-contact-decoration">✦</div>
        <span className="cm-home-eyebrow">WE'D LOVE TO HEAR FROM YOU</span>
        <h2>Have an idea? <span>Let's talk.</span></h2>
        <p>
            Have feedback, a suggestion, or an idea to improve Campus Market?
            We'd love to hear what you think.
        </p>

        <div className="cm-home-contact-actions">
            <a
                href="mailto:campusmarket@example.com?subject=Campus%20Market%20Feedback"
                className="cm-home-contact-button"
            >
                Get in touch <span>↗</span>
            </a>

            <Link to="/products" className="cm-home-contact-link">
                Explore products →
            </Link>
        </div>
        <span className="cm-home-contact-note">
            Built around campus life, one connection at a time.
        </span>
    </div>
</section>


{/* FOOTER */}
<footer className="cm-home-footer">
    <div className="cm-home-footer-main">
        <div className="cm-home-footer-brand">
            <Link to="/" className="cm-home-footer-logo">
                Campus<span>Market</span><span className="cm-home-footer-heart">✦</span>
            </Link>
            <p>
                Your campus. Your community. Your marketplace.
                Buy, sell, and connect with fellow students.
            </p>
        </div>

        <div className="cm-home-footer-column">
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/products">Browse products</Link>
            <Link to="/sell">Sell an item</Link>
        </div>

        <div className="cm-home-footer-column">
            <h4>Your account</h4>
            <Link to="/inbox">Messages & inbox</Link>
            <Link to="/products">Discover items</Link>
            <Link to="/sell">List a product</Link>
        </div>

        <div className="cm-home-footer-column">
            <h4>Get in touch</h4>
            <a href="#cm-home-contact">Contact us</a>
            <a href="mailto:campusmarket@example.com">Send us an email</a>
        </div>
    </div>

    <div className="cm-home-footer-bottom">
        <span>© {new Date().getFullYear()} Campus Market. Made for campus life.</span>
        <span className="cm-home-footer-credit">Made by Pritika 💝</span>
        <a href="#top" className="cm-home-back-top">Back to top ↑</a>
    </div>
</footer>
        </main>
    );
}

function App() {
    return (
        <BrowserRouter>
            
<nav className="main-navbar">
    <Link to="/" className="brand">
        Campus<span>Market</span>
    </Link>

    <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Browse Products</Link>
        <Link to="/sell">Sell Product</Link>
        <Link to="/inbox">Inbox</Link>
    </div>

    <div className="nav-auth">
        <Show when="signed-out">
            <SignInButton>
                <button className="nav-button">Sign In</button>
            </SignInButton>
            <SignUpButton>
                <button className="nav-button nav-button-primary">
                    Join Now
                </button>
            </SignUpButton>
        </Show>

        <Show when="signed-in">
            <UserButton />
        </Show>
    </div>
</nav>


            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/sell"
                    element={<SellProduct />}
                />

                <Route
                    path="/products"
                    element={<Products />}
                />

                <Route
                    path="/chat/:productId/:ownerId"
                    element={<Chat />}
                />
                <Route path="/inbox" element={<Inbox />} />
                {" | "}
               
            </Routes>
        </BrowserRouter>
    );
}

export default App