import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await fetch(
        "https://curly-fortnight-4jwwjvp4wxjqf5jp6-5000.app.github.dev/api/ozon/scrape",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ keyword: query }),
        }
      );

      const result = await res.json();
      setProducts(result.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      alert("Failed to fetch data.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>🛍️ Ozon Best-Seller Tracker</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search best products..."
        style={{ padding: "0.5rem", marginRight: "0.5rem", width: "300px" }}
      />
      <button onClick={handleSearch}>Find Products</button>

      {products.length === 0 ? (
        <p style={{ marginTop: "1rem" }}>No products found yet.</p>
      ) : (
        <ul style={{ marginTop: "1rem" }}>
          {products.map((p, i) => (
            <li key={i} style={{ marginBottom: "1rem" }}>
              <strong>{p.title}</strong> — {p.price} <br />
              <img src={p.image} alt={p.title} width={100} />
              <br />
              <a href={p.link} target="_blank" rel="noopener noreferrer">
                View Product
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
