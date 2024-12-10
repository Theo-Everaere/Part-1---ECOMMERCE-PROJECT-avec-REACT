import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./editProduct.css";

const EditProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams(); // ID du produit passé en paramètre
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    releaseDate: "",
    available: false,
  });
  const [image, setImage] = useState(null);

  // Charger les données du produit à modifier
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/${productId}`)
      .then((response) => {
        const productData = response.data;

        // Convertir la date pour correspondre au format attendu par <input type="date">
        if (productData.releaseDate) {
          productData.releaseDate = productData.releaseDate.split("T")[0];
        }

        setProduct(productData);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du produit:", error);
      });
  }, [productId]);

  // Gérer les changements dans les champs de texte
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Gérer le changement d'image
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Soumettre le formulaire
  const submitHandler = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Token manquant. Veuillez vous connecter.");
      return;
    }

    const formData = new FormData();
    if (image) {
      formData.append("imageFile", image); // Ajouter l'image si elle est sélectionnée
    }
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    axios
      .put(`http://localhost:8080/api/products/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Produit mis à jour avec succès:", response.data);
        alert("Produit mis à jour avec succès");
        navigate("/products");
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du produit:", error);
        alert("Erreur lors de la mise à jour du produit");
      });
  };

  return (
    <div className="addproduct-form-container">
      <h2 className="addproduct-title">Modifier le Produit</h2>
      <form className="row g-3" onSubmit={submitHandler}>
        <div className="col-md-6">
          <label className="form-label">
            <h6>Nom du Produit</h6>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Nom du Produit"
            onChange={handleInputChange}
            value={product.name}
            name="name"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">
            <h6>Marque</h6>
          </label>
          <input
            type="text"
            name="brand"
            className="form-control"
            placeholder="Entrez la Marque"
            value={product.brand}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-12">
          <label className="form-label">
            <h6>Description</h6>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Ajouter une description du produit"
            value={product.description}
            name="description"
            onChange={handleInputChange}
          />
        </div>
        <div className="col-5">
          <label className="form-label">
            <h6>Prix</h6>
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Ex: 1000€"
            onChange={handleInputChange}
            value={product.price}
            name="price"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">
            <h6>Catégorie</h6>
          </label>
          <select
            className="form-select"
            value={product.category}
            onChange={handleInputChange}
            name="category"
          >
            <option value="">Sélectionner la catégorie</option>
            <option value="Laptop">Ordinateur portable</option>
            <option value="Headphone">Casque</option>
            <option value="Mobile">Téléphone mobile</option>
            <option value="Electronics">Électronique</option>
            <option value="Toys">Jouets</option>
            <option value="Fashion">Mode</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">
            <h6>Quantité en Stock</h6>
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Stock restant"
            onChange={handleInputChange}
            value={product.quantity}
            name="quantity"
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">
            <h6>Date de Lancement</h6>
          </label>
          <input
            type="date"
            className="form-control"
            value={product.releaseDate}
            name="releaseDate"
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">
            <h6>Image</h6>
          </label>
          <input
            className="form-control"
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="available"
              checked={product.available}
              onChange={(e) =>
                setProduct({ ...product, available: e.target.checked })
              }
            />
            <label className="form-check-label">Produit Disponible</label>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Soumettre
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
