
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  changeQuantity,
  clearCart,
} from "./redux/cartSlice";
import "./styles/App.css";

const products = [
  {
    id: 1,
    name: "Douceur Rosée",
    category: "Bouquets",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=85",
    description: "Un bouquet délicat aux nuances de rose.",
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Jardin de Pivoines",
    category: "Bouquets",
    price: 6200,
    image:
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=85",
    description: "Des fleurs romantiques pour les beaux moments.",
    tag: "Coup de cœur",
  },
  {
    id: 3,
    name: "Élégance Blanche",
    category: "Compositions",
    price: 5500,
    image:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=85",
    description: "Une composition pure et intemporelle.",
    tag: "",
  },
  {
    id: 4,
    name: "Rêve Pastel",
    category: "Bouquets",
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1455659817273-f96807779a8a?auto=format&fit=crop&w=800&q=85",
    description: "Un mélange tendre et lumineux.",
    tag: "Nouveau",
  },
  {
    id: 5,
    name: "Fleurs de Bonheur",
    category: "Cadeaux",
    price: 7000,
    image:
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=800&q=85",
    description: "Une belle attention à offrir à quelqu'un.",
    tag: "",
  },
  {
    id: 6,
    name: "Romance Éternelle",
    category: "Compositions",
    price: 8500,
    image:
      "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=85",
    description: "Une création florale pleine de caractère.",
    tag: "Premium",
  },
];

const categories = ["Tout voir", "Bouquets", "Compositions", "Cadeaux"];

const formatPrice = (price) =>
  `${price.toLocaleString("fr-FR")} DA`;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [category, setCategory] = useState("Tout voir");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [email, setEmail] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "Tout voir" || product.category === category;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleAddToCart(product) {
    dispatch(addToCart(product));
    setToast(`${product.name} ajouté au panier`);
    window.setTimeout(() => setToast(""), 2500);
  }

  function handleNewsletter(event) {
    event.preventDefault();

    if (!email.trim()) return;

    setToast("Merci pour votre intérêt pour Roséline !");
    setEmail("");
    window.setTimeout(() => setToast(""), 3000);
  }

  return (
    <div className="app">
      {/* Barre d'annonce */}
      <div className="announcement">
        <span>✿</span> Des fleurs pour chaque émotion
        <span className="announcement-separator">|</span>
        Livraison disponible selon votre zone
      </div>

      {/* Navigation */}
      <header className="site-header">
        <a href="#accueil" className="brand">
          <span className="brand-flower">✿</span>
          <span className="brand-name">Roséline</span>
          <span className="brand-subtitle">FLEURS & ÉMOTIONS</span>
        </a>

        <nav className="navigation">
          <a href="#accueil">Accueil</a>
          <a href="#boutique">La boutique</a>
          <a href="#histoire">Notre histoire</a>
          <a href="#contact">Contact</a>
        </nav>

        <button
          className="cart-button"
          onClick={() => setCartOpen(true)}
          aria-label="Ouvrir le panier"
        >
          <span>♡</span> Panier
          <span className="cart-count">{cartCount}</span>
        </button>
      </header>

      <main>
        {/* Hero */}
        <section className="hero" id="accueil">
          <div className="hero-content">
            <p className="eyebrow">L'ART D'OFFRIR DES FLEURS</p>

            <h1>
              Des fleurs qui
              <br />
              parlent <em>au cœur.</em>
            </h1>

            <p className="hero-description">
              Des créations florales délicates pour célébrer les petits
              bonheurs et les grands moments de la vie.
            </p>

            <div className="hero-actions">
              <a href="#boutique" className="primary-button">
                Découvrir la collection <span>↗</span>
              </a>
              <a href="#histoire" className="text-button">
                Notre univers
              </a>
            </div>

            <div className="hero-note">
              <span className="hero-note-icon">✿</span>
              <span>
                <strong>Composé avec amour</strong>
                <small>Chaque bouquet raconte une histoire.</small>
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1100&q=90"
              alt="Bouquet de fleurs roses et pastel"
            />
            <div className="hero-floating-card">
              <span className="floating-flower">✿</span>
              <span>
                <strong>Une touche de douceur</strong>
                <small>Pour illuminer votre journée</small>
              </span>
            </div>
            <div className="hero-round-label">
              <span>FLEURS</span>
              <span>•</span>
              <span>AMOUR</span>
              <span>•</span>
              <span>ÉMOTIONS</span>
            </div>
          </div>

          <div className="hero-background-flower">✿</div>
        </section>

        {/* Avantages */}
        <section className="benefits">
          <div className="benefit">
            <span className="benefit-icon">✿</span>
            <div>
              <strong>Des fleurs sélectionnées</strong>
              <p>Une sélection pleine de fraîcheur</p>
            </div>
          </div>

          <div className="benefit">
            <span className="benefit-icon">♡</span>
            <div>
              <strong>Créations délicates</strong>
              <p>Des bouquets préparés avec soin</p>
            </div>
          </div>

          <div className="benefit">
            <span className="benefit-icon">✧</span>
            <div>
              <strong>Pour chaque occasion</strong>
              <p>Des attentions qui font plaisir</p>
            </div>
          </div>
        </section>

        {/* Catalogue */}
        <section className="shop-section" id="boutique">
          <div className="section-heading">
            <p className="eyebrow">NOTRE COLLECTION</p>
            <h2>Un bouquet, mille <em>émotions.</em></h2>
            <p>
              Trouvez la création qui exprimera parfaitement ce que vous
              ressentez.
            </p>
          </div>

          <div className="shop-toolbar">
            <div className="category-filters">
              {categories.map((item) => (
                <button
                  key={item}
                  className={`filter-button ${
                    category === item ? "active" : ""
                  }`}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <label className="search-box">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Rechercher un bouquet..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Rechercher un produit"
              />
            </label>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image-wrapper">
                  <img src={product.image} alt={product.name} loading="lazy" />

                  {product.tag && (
                    <span className="product-tag">{product.tag}</span>
                  )}

                  <button
                    className="quick-add"
                    onClick={() => handleAddToCart(product)}
                    aria-label={`Ajouter ${product.name} au panier`}
                    title="Ajouter au panier"
                  >
                    +
                  </button>
                </div>

                <div className="product-information">
                  <span className="product-category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>

                  <div className="product-bottom">
                    <strong className="product-price">
                      {formatPrice(product.price)}
                    </strong>

                    <button
                      className="add-button"
                      onClick={() => handleAddToCart(product)}
                    >
                      Ajouter <span>+</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-products">
              <span>✿</span>
              <h3>Aucun bouquet trouvé</h3>
              <p>Essayez un autre nom ou une autre catégorie.</p>
              <button
                className="primary-button"
                onClick={() => {
                  setSearch("");
                  setCategory("Tout voir");
                }}
              >
                Voir tous les bouquets
              </button>
            </div>
          )}

          <div className="catalogue-bottom">
            <span>Des fleurs choisies avec soin, pour vous.</span>
            <span>✿</span>
          </div>
        </section>

        {/* Histoire */}
        <section className="story-section" id="histoire">
          <div className="story-image">
            <img
              src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1000&q=85"
              alt="Composition florale délicate"
              loading="lazy"
            />
            <div className="story-stamp">
              <span>FAIT AVEC</span>
              <strong>♡</strong>
              <span>AMOUR</span>
            </div>
          </div>

          <div className="story-content">
            <p className="eyebrow">BIENVENUE CHEZ ROSÉLINE</p>
            <h2>
              La beauté des fleurs,
              <br />
              la magie des <em>instants.</em>
            </h2>

            <p>
              Chez Roséline, nous croyons qu'un bouquet est bien plus qu'un
              ensemble de fleurs. C'est un sourire, un souvenir, une façon
              de dire « je pense à toi » sans prononcer un mot.
            </p>

            <p>
              Notre univers célèbre la douceur, les détails et les petites
              attentions qui rendent chaque journée spéciale.
            </p>

            <a href="#boutique" className="story-link">
              Explorer nos créations <span>→</span>
            </a>
          </div>
        </section>

        {/* Newsletter / contact */}
        <section className="newsletter-section" id="contact">
          <div className="newsletter-decoration">✿</div>

          <p className="eyebrow">UNE NOTE DE DOUCEUR</p>
          <h2>Un peu de beauté dans votre boîte mail.</h2>
          <p>
            Découvrez nos nouveautés et laissez-vous inspirer par notre
            univers floral.
          </p>

          <form className="newsletter-form" onSubmit={handleNewsletter}>
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              aria-label="Votre adresse e-mail"
            />
            <button type="submit">Je m'inscris ↗</button>
          </form>

          <small>
            En vous inscrivant, vous acceptez de recevoir les actualités
            fictives de notre projet de démonstration.
          </small>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <a href="#accueil" className="footer-brand">
          <span>✿</span> Roséline
        </a>

        <p>Des fleurs pour dire ce que les mots ne peuvent exprimer.</p>

        <div className="footer-links">
          <a href="#accueil">Accueil</a>
          <a href="#boutique">Boutique</a>
          <a href="#histoire">Notre histoire</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Roséline. Projet pédagogique.</span>
          <a href="#accueil">Retour en haut ↑</a>
        </div>
      </footer>

      {/* Notification */}
      {toast && (
        <div className="toast" role="status">
          <span>✓</span> {toast}
        </div>
      )}

      {/* Panier latéral */}
      {cartOpen && (
        <div
          className="cart-overlay"
          onClick={() => setCartOpen(false)}
          role="presentation"
        >
          <aside
            className="cart-drawer"
            onClick={(event) => event.stopPropagation()}
            aria-label="Votre panier"
          >
            <div className="cart-header">
              <div>
                <p className="eyebrow">VOTRE SÉLECTION</p>
                <h2>Mon panier ({cartCount})</h2>
              </div>

              <button
                className="close-cart"
                onClick={() => setCartOpen(false)}
                aria-label="Fermer le panier"
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <span>♡</span>
                <h3>Votre panier est tout doux...</h3>
                <p>Ajoutez un bouquet pour commencer votre sélection.</p>
                <button
                  className="primary-button"
                  onClick={() => setCartOpen(false)}
                >
                  Découvrir les bouquets
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />

                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p>{formatPrice(item.price)}</p>

                        <div className="quantity-control">
                          <button
                            onClick={() =>
                              dispatch(
                                changeQuantity({
                                  id: item.id,
                                  delta: -1,
                                })
                              )
                            }
                            aria-label={`Diminuer la quantité de ${item.name}`}
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() =>
                              dispatch(
                                changeQuantity({
                                  id: item.id,
                                  delta: 1,
                                })
                              )
                            }
                            aria-label={`Augmenter la quantité de ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="cart-item-end">
                        <strong>
                          {formatPrice(item.price * item.quantity)}
                        </strong>

                        <button
                          className="remove-item"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="cart-total">
                    <span>Total estimé</span>
                    <strong>{formatPrice(cartTotal)}</strong>
                  </div>

                  <p>Les frais de livraison ne sont pas inclus.</p>

                  <button
                    className="checkout-button"
                    onClick={() =>
                      setToast(
                        "Démo : aucune commande ni aucun paiement n'a été effectué."
                      )
                    }
                  >
                    Continuer <span>→</span>
                  </button>

                  <button
                    className="clear-cart"
                    onClick={() => dispatch(clearCart())}
                  >
                    Vider le panier
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
