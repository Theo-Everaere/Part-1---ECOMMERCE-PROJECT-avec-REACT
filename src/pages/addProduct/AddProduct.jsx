import { useState } from "react";
import axios from "axios";
import "./addProduct.css";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Token manquant. Veuillez vous connecter.");
      return;
    }

    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    axios
      .post("http://localhost:8080/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Produit ajouté avec succès:", response.data);
        alert("Produit ajouté avec succès");
        navigate("/products");
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du produit:", error);
        alert("Erreur lors de l'ajout du produit");
      });
  };

  return (
    <div className="addproduct-form-container">
      <h2 className="addproduct-title">Ajouter un Produit</h2>
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
            id="brand"
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
            id="description"
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
            id="price"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">
            <h6>Catégorie</h6>
          </label>
          <select
            className="form-control"
            value={product.category}
            onChange={handleInputChange}
            name="category"
            id="category"
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
            id="quantity"
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
            id="releaseDate"
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
              id="gridCheck"
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

export default AddProduct;
