import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import '../styles/ProductPage.css';


const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    axios.get("http://localhost:5000/products/all")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleSortChange = (e) => setSort(e.target.value);

  const filteredProducts = products.filter(product => {
    if (filter === "all") return true;
    return product.category?.toLowerCase() === filter.toLowerCase();
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "low-high") return a.price - b.price;
    if (sort === "high-low") return b.price - a.price;
    return 0;
  });

  return (
    <div className="product-page">
      <h2>All Products</h2>
      <div className="controls">
        <select onChange={handleFilterChange}>
          <option value="all">All Categories</option>
          <option value="Women">Women</option>
          <option value="Men">Men</option>
          <option value="Kids">Kids</option>
        </select>
        <select onChange={handleSortChange}>
          <option value="default">Sort</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>
      <div className="product-grid">
        {sortedProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
