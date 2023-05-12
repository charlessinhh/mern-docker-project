import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://34.67.206.143:5000/api/products", {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    setProducts(result);
  };

  // console.log(products);

  const deleteProduct = async (id) => {
    console.log(id);
    let result = await fetch(`http://34.67.206.143:5000/api/product/${id}`, {
      method: "delete",
    });
    result = await result.json();

    if (result) {
      alert("product deleted");
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    // console.log(key);
    if (key) {
      let result = await fetch(`http://34.67.206.143:5000/api/search/${key}`);
      result = await result.json();
      // console.log(result);
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        type=""
        className="search-product"
        placeholder="Search Product"
        onChange={searchHandle}
      />
      <ul>
        <li>S. No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>

            <li>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
              <Link to={"/update/" + item._id}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h3>No product found/enter correct search keywords</h3>
      )}
    </div>
  );
};

export default ProductList;
