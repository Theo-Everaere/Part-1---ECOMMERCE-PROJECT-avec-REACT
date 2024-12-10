import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import useUserProducts from "../../hooks/useUserProducts";
import ProductList from "../productsList/ProductList";
import "./userProfile.css";
import axios from "axios";

const UserProfile = () => {
  const { user, logout, token } = useContext(UserContext);
  const navigate = useNavigate();

  // Utiliser le hook personnalisé pour récupérer les produits de l'utilisateur
  const { products, setProducts, isLoading, isError } = useUserProducts(
    user?.id,
    token
  );

  const handleLogout = () => {
    logout();
    navigate("/authentication");
  };

  const handleLogin = () => {
    navigate("/authentication");
  };

  const handleDeleteProduct = (productId) => {
    // Vérifier si l'ID est valide
    if (!productId) {
      console.log("ID du produit manquant");
      return;
    }

    // Effectuer la requête de suppression avec Axios
    axios
      .delete(`http://localhost:8080/api/product/${productId}`)
      .then((response) => {
        console.log("Produit supprimé avec succès:", response.data);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du produit:", error);
      });

    console.log("Suppression du produit avec ID:", productId);
  };

  const handleEditProduct = (productId) => {
    // Implémenter la logique de modification de produit ici
    console.log("Modifier le produit avec ID:", productId);
  };

  if (!user) {
    return (
      <div className="user-profile">
        <p className="error-message">
          Veuillez vous connecter pour accéder à votre profil.
        </p>
        <button onClick={handleLogin}>Se connecter</button>
      </div>
    );
  }

  const handleAddProduct = () => {
    navigate("/products/add");
  };

  const usernameWithCapitalLetter =
    user.username.charAt(0).toUpperCase() + user.username.slice(1);

  return (
    <div className="user-profile">
      <h1>Profil de {usernameWithCapitalLetter}</h1>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Se déconnecter</button>

      <div className="user-products">
        <h2>Mes Produits</h2>
        {isLoading && <p>Chargement des produits...</p>}
        {isError && (
          <p>Une erreur est survenue lors du chargement des produits.</p>
        )}
        {products.length > 0 ? (
          <ProductList
            products={products}
            onDelete={handleDeleteProduct}
            onEdit={handleEditProduct}
          />
        ) : (
          <>
            <p>Vous n&apos;avez pas de produits.</p>
            <button onClick={handleAddProduct}>Ajouter un produit</button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
