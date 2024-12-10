import { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import FieldInput from "../../components/fieldInput/FieldInput";

import "./productDetails.css";

const categoryTranslations = {
  Laptop: "Ordinateur portable",
  Headphone: "Casque",
  Mobile: "Téléphone mobile",
  Electronics: "Électronique",
  Toys: "Jouets",
  Fashion: "Mode",
};

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const location = useLocation(); // Get image passed via state
  const imageUrl = location.state?.imageUrl;

  const [product, setProduct] = useState(null); // Product details state
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du produit");
        }
        const data = await response.json();

        const formattedReleaseDate = new Date(
          data.releaseDate
        ).toLocaleDateString("fr-FR");

        setProduct({
          ...data,
          imageUrl,
          releaseDate: formattedReleaseDate,
          category: categoryTranslations[data.category] || data.category,
        });
        setIsError(false);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, imageUrl]);

  if (isLoading) {
    return <p>Chargement des informations du produit...</p>;
  }

  if (isError || !product) {
    return <p>Une erreur est survenue lors du chargement du produit.</p>;
  }

  return (
    <div className="product-details">
      <div className="product-container">
        <div className="product-image-container">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-image"
            />
          ) : (
            <div className="product-no-image">Aucune image disponible</div>
          )}
        </div>
        <div className="product-info-container">
          <FieldInput label="Nom" value={product.name} disabled={true} />
          <FieldInput
            label="Description"
            value={product.description}
            disabled={true}
          />
          <FieldInput label="Prix" value={product.price} disabled={true} />
          <FieldInput label="Marque" value={product.brand} disabled={true} />
          <FieldInput
            label="Catégorie"
            value={product.category}
            disabled={true}
          />
          <FieldInput
            label="Date de sortie"
            value={product.releaseDate}
            disabled={true}
          />
          <FieldInput
            label="Disponible"
            value={product.available ? "Oui" : "Non"}
            disabled={true}
          />
          <FieldInput
            label="Quantité disponible"
            value={product.quantity}
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
