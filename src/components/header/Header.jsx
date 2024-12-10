import { NavLink } from "react-router-dom";
import { useUserContext } from "../../context/UserContext"; // Import du contexte
import "./header.css";

const Header = () => {
  const { user, logout } = useUserContext(); // Accès au contexte utilisateur

  return (
    <header className="header">
      <nav aria-label="Navigation principale">
        <ul className="header-nav">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Nos produits
            </NavLink>
          </li>

          {/* Afficher l'option pour ajouter un produit seulement si l'utilisateur est connecté */}
          {user && (
            <li>
              <NavLink
                to="/products/add"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Ajouter un produit
              </NavLink>
            </li>
          )}

          {user && (
            <li>
              <NavLink
                to="/user-profile"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Mon compte
              </NavLink>
            </li>
          )}

          {/* Si l'utilisateur est connecté, afficher un lien pour se déconnecter */}
          {user ? (
            <li>
              <button
                onClick={logout} // Déconnexion
                className="logout-button"
              >
                Se déconnecter
              </button>
            </li>
          ) : (
            // Sinon, afficher les liens pour l'inscription et la connexion
            <li>
              <NavLink
                to="/authentication"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                S&apos;inscrire/Se connecter
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
