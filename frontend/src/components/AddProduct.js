import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const navigate = useNavigate();

  //form validation
  const [error, setError] = useState(false);

  const addProd = async () => {
    if (!name || !price || !company || !category) {
      setError(true);
      return false;
    }
    console.log(name, price, category, company);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
//     console.log(userId);

    let productData = await fetch("http://34.134.141.82:5000/api/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    productData = await productData.json();
    console.log(productData);
    navigate("/");
  };

  return (
    <div className="product">
      <h1> Add Product in the cart </h1>{" "}
      <input
        type="text"
        placeholder="Enter Product Name"
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />{" "}
      {/* / * invalid name * / */}
      {error && !name && (
        <span className="invalid-input"> Enter valid name </span>
      )}{" "}
      <input
        type="text"
        placeholder="Enter Product Price"
        className="inputBox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />{" "}
      {error && !price && (
        <span className="invalid-input"> Enter valid price </span>
      )}{" "}
      <input
        type="text"
        placeholder="Enter Product category"
        className="inputBox"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />{" "}
      {error && !category && (
        <span className="invalid-input"> Enter valid category </span>
      )}{" "}
      <input
        type="text"
        placeholder="Enter Product company"
        className="inputBox"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />{" "}
      {error && !company && (
        <span className="invalid-input"> Enter valid company </span>
      )}{" "}
      <button onClick={addProd} className="appButton">
        Add Product{" "}
      </button>{" "}
    </div>
  );
};

export default AddProduct;
