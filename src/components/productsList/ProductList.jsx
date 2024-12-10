import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./productList.css";
import { useEffect } from "react";

const ProductList = ({ products, onDelete, onEdit }) => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    onEdit(id);
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="product-item">
            {product.imageUrl ? (
              <img
                src={product.imageUrl || "../../assets/placeholder-image.jpg"}
                alt={product.name}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            ) : (
              <div className="no-image">Aucune image disponible</div>
            )}
            <div className="product-info">
              <strong>{product.name}</strong>
              <div>{product.description}</div>
              <div>Prix : {product.price} €</div>
              <div>{product.available ? "En stock" : "Indisponible"}</div>
            </div>
            <div className="product-actions">
              <button
                className="edit-button"
                onClick={() => handleEdit(product.id)}
              >
                Modifier
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(product.id)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Aucun produit à afficher.</p>
      )}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ProductList;
