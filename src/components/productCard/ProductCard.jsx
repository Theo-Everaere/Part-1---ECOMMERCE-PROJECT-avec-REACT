import { Link } from "react-router-dom";
import "./productCard.css";
import PropTypes from "prop-types";

const ProductCard = ({
  id,
  name,
  description,
  price,
  available,
  imageUrl,
  onAddToCart,
}) => {
  return (
    <div className="product-card">
      {imageUrl ? (
        <img
          src={imageUrl || "../../assets/placeholder-image.jpg"}
          alt={name}
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
      ) : (
        <div className="no-image">Aucune image disponible</div>
      )}
      <h3>{name}</h3>
      <p>{description}</p>
      <p>Prix : {price} €</p>
      <p>{available ? "En stock" : "Indisponible"}</p>
      <button onClick={() => onAddToCart(id)}>Ajouter au panier</button>
      <Link to={`/product/${id}`} state={{ imageUrl: imageUrl }}>
        Détails
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  available: PropTypes.bool.isRequired,
  imageUrl: PropTypes.string,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
