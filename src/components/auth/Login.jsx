import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext"; // Import du UserContext
import "./login.css";

const Login = ({ onSuccess }) => {
  const [loginData, setLoginData] = useState({ username: "", password: "" }); // État pour les données de connexion
  const [responseMessage, setResponseMessage] = useState(""); // Message de retour pour affichage des erreurs ou succès
  const { login } = useContext(UserContext); // Utilisation du contexte pour la fonction login

  // Gestion des modifications dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Appel à l'API /login
      const response = await axios.post(
        "http://localhost:8080/login",
        loginData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { token, user } = response.data; // Extraction du token et des données utilisateur de la réponse
      login(token, user); // Mise à jour du contexte avec le token et l'utilisateur
      onSuccess(); // Redirection ou autre action après la connexion
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setResponseMessage(
        "Erreur lors de la connexion. Vérifiez vos identifiants."
      );
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d&apos;utilisateur:</label>
          <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default Login;
