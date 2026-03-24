import React, { useEffect, useState } from "react";
import API from "../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/get_products")
      .then(res => setProducts(res.data.products))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Products</h2>

      <div className="row">
        {products.map(p => (
          <div className="col-md-4 mb-4" key={p.id}>
            <div className="card shadow">
              <img
                src={`https://kus-kus.alwaysdata.net/${p.product_photo}`}
                className="card-img-top"
                alt=""
              />

              <div className="card-body">
                <h5>{p.product_name}</h5>
                <p>{p.product_description}</p>
                <h6 className="text-primary">KES {p.product_cost}</h6>

                <button className="btn btn-dark w-100">Pay with Mpesa</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;