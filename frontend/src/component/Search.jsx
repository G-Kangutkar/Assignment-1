import React, { useState } from "react";
import './Search.css'

export default function Search() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        q,
        category,
        minPrice,
        maxPrice,
      });

      const res = await fetch(`http://localhost:6800/search?${params}`);
      const data = await res.json();

      setResults(data.data || []);
    } catch (err) {
      console.error(err);
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Inventory Search</h2>

      {/* Search Input */}
      <div className="inputs">
      <input
      className="input"
        type="text"
        placeholder="Search by name"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      {/* Category Dropdown */}
      <select value={category} className="input" onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="books">Books</option>
      </select>

      {/* Price Range */}
      <input
      className="input"
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
      className="input"
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <button className="button" onClick={fetchData}>Search</button>
    </div>
      {/* Results */}
      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No results found</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
