import { useState, useEffect } from "react";
import axios from "axios";

// Hook personnalisé pour récupérer les produits de l'utilisateur
const useUserProducts = (userId, token) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (userId && token) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/user/${userId}/products`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Ajouter l'URL de l'image à chaque produit
          const productsWithImages = await Promise.all(
            response.data.map(async (product) => {
              try {
                const imageResponse = await axios.get(
                  `http://localhost:8080/api/product/${product.id}/image`,
                  { responseType: "blob" } // Récupérer l'image comme blob
                );
                const imageUrl = URL.createObjectURL(imageResponse.data); // Créer une URL pour l'image
                return { ...product, imageUrl };
              } catch (error) {
                console.error(
                  "Erreur lors de la récupération de l'image",
                  error
                );
                return { ...product }; // Pas d'imageUrl si l'image ne charge pas
              }
            })
          );

          setProducts(productsWithImages);
          setIsLoading(false);
          setIsError(false);
        } catch (error) {
          console.error("Erreur lors de la récupération des produits:", error);
          setIsError(true);
          setIsLoading(false);
        }
      };

      fetchProducts();
    }
  }, [userId, token]);

  return { products, setProducts, isLoading, isError };
};

export default useUserProducts;
