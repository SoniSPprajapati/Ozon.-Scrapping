import React from "react";

function ProductCard({ product }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="mt-2 font-semibold">{product.name}</h2>
      <p className="text-gray-700">Price: {product.price}</p>
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        View Product
      </a>
    </div>
  );
}

export default ProductCard;
