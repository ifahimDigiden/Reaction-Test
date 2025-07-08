import React, { useEffect, useState } from "react";
import Mouseevent from "react";

export default function ListGroup() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://inkspirebackend.vercel.app/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleClick = (event)=> {console.log(event.target.innerHTML)};
  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li className="w-xl px-4 py-2 border-b border-gray-200 rounded-t-lg"
            key={product._id} onClick={(event)=>{console.log(event.target.innerHTML)}}
          >
            {product.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
