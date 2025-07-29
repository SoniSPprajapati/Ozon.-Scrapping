import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await fetch(
        "https://curly-fortnight-4jwwjvp4wxjqf5jp6-5000.app.github.dev/api/search?q=" +
          searchTerm
      );

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  return (
    <div>
      <h1>Ozon Best-Seller Tracker</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search best products..."
      />
      <button onClick={handleSearch}>Find Products</button>

      {products.length === 0 ? (
        <p>No products found yet.</p>
      ) : (
        <ul>
          {products.map((p, i) => (
            <li key={i}>{p.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
