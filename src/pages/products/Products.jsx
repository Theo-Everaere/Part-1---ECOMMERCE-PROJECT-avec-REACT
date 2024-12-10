import { useState } from "react";
import useProducts from "../../hooks/useProducts"; // Import du hook personnalisé
import ProductCard from "../../components/productCard/ProductCard";
import Cart from "../../components/cart/Cart";
import "./products.css";

const Products = () => {
  const [cart, setCart] = useState([]);

  // Utilisation du hook personnalisé
  const { products, isLoading, isError } = useProducts(
    "http://localhost:8080/api/products"
  );

  const handleAddToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const existingItem = cart.find((item) => item.id === productId);
      if (existingItem) {
        setCart(
          cart.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCart([
          ...cart,
          {
            id: productId,
            name: product.name,
            price: product.price,
            quantity: 1,
          },
        ]);
      }
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const handleIncreaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setCart(
      cart
        .map((item) =>
          item.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="products-page">
      <div className="products-main">
        <h1>Nos Produits</h1>
        {isLoading && <p>Chargement des produits...</p>}
        {isError && (
          <p>Une erreur est survenue lors du chargement des produits.</p>
        )}
        <div className="products-grid">
          {!isLoading &&
            !isError &&
            products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                available={product.available}
                imageUrl={product.imageUrl}
                onAddToCart={handleAddToCart}
              />
            ))}
        </div>
      </div>

      <div className="cart-side">
        <Cart
          cartItems={cart}
          onRemoveFromCart={handleRemoveFromCart}
          onIncreaseQuantity={handleIncreaseQuantity}
          onDecreaseQuantity={handleDecreaseQuantity}
        />
      </div>
    </div>
  );
};

export default Products;
