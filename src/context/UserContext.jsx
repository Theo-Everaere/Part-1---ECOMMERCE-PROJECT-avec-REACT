import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Création du contexte utilisateur
export const UserContext = createContext(); // Export du contexte

export const useUserContext = () => useContext(UserContext); // Hook personnalisé

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stockage des informations utilisateur
  const [token, setToken] = useState(localStorage.getItem("token") || null); // Stockage du token
  const [loading, setLoading] = useState(true); // Indique si l'application vérifie l'état

  // Vérification du token à chaque démarrage de l'application
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      axios
        .get("http://localhost:8080/validate-token", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          if (response.data.isValid) {
            setToken(storedToken); // Stocker le token
            setUser(response.data.user); // Mettre à jour les infos utilisateur
          } else {
            logout();
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la validation du token", error);
          logout();
        })
        .finally(() => {
          setLoading(false); // Fin de la validation
        });
    } else {
      setLoading(false); // Pas de token, terminer le chargement
    }
  }, []);

  // Gestion de la connexion
  const login = (token, user) => {
    setToken(token); // Mise à jour du token dans l'état
    setUser(user); // Mise à jour de l'utilisateur dans l'état
    localStorage.setItem("token", token); // Sauvegarde du token dans le localStorage
  };

  // Gestion de la déconnexion
  const logout = () => {
    setUser(null); // Réinitialisation des informations utilisateur
    setToken(null); // Suppression du token
    localStorage.removeItem("token"); // Suppression du token du localStorage
  };

  if (loading) {
    return <div>Chargement...</div>; // Affichage temporaire pendant la vérification
  }

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
