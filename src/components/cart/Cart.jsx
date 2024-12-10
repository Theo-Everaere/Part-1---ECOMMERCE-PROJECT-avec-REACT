import PropTypes from "prop-types";
import "./cart.css";

const Cart = ({
  cartItems,
  onRemoveFromCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) => {
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Panier</h2>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>Prix unitaire : {item.price} €</p>
              <p>Quantité : {item.quantity}</p>
              <div className="cart-item-actions">
                <button onClick={() => onDecreaseQuantity(item.id)}>-</button>
                <button onClick={() => onIncreaseQuantity(item.id)}>+</button>
                <button onClick={() => onRemoveFromCart(item.id)}>
                  Supprimer
                </button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total : {total.toFixed(2)} €</h3>
          </div>
        </div>
      )}
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  onIncreaseQuantity: PropTypes.func.isRequired,
  onDecreaseQuantity: PropTypes.func.isRequired,
};

export default Cart;
