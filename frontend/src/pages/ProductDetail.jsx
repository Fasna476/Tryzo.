import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProductDetail.css';
import placeholder from '../assets/placeholder.svg';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [error, setError] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error("Error loading product:", err));
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) return setError("Please select a size.");
    setError("");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = cart.findIndex(item => item._id === product._id && item.selectedSize === selectedSize);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      const newItem = {
        _id: product._id,
        name: product.name,
        brand: product.brand,
        image: `http://localhost:5000/uploads/${product.image}` || placeholder,
        price: product.price,
        selectedSize: selectedSize,
        quantity: 1,
      };
      cart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setIsAdded(true);
    navigate("/cart");
  };

  const handleOrderNow = () => {
    if (!selectedSize) return setError("Please select a size.");
    setError("");
    console.log("Order now:", product.name, selectedSize);
    navigate("/checkout");
  };

  const handleTryOn = () => {
    console.log("Try On:", product.name);
    navigate(`/tryon/${product._id}`);
  };

  const handleWishlist = () => {
    console.log("Added to wishlist:", product.name);
  };

  return product ? (
    <div className="product-detail">
      <div className="image-section">
        <div className="image-wrapper">
        <img src={product.image ? `http://localhost:5000/uploads/${product.image}` : '/images/placeholder.jpg'} alt={product.name} />
       {/* <img src={product.tryOneImage ? `http://localhost:5000/uploads/tryone/${product.tryOneImage}`: '/images/placeholder.jpg' } alt={product.name} /> */}
        <button className="tryon-btn" onClick={handleTryOn}></button>
        </div>
      </div>
      

      <div className="details-section">
        <div className="title-row">
          <h2>{product.name}</h2>
          
          
          
        </div>

        <p className="mrp">MRP: ₹{product.price}</p>
        <p className="tax-note">Inclusive of all taxes</p>
        <p className="stock">{product.stock > 0 ? "In Stock" : "Out of Stock"}</p>
        <p className="brand">Brand: {product.brand}</p>
         <div className="delivery-info">
          <p>✔ Pay on delivery available</p>
          <p>✔ Easy 14 days return & exchange available</p>
         
        </div>

        <div className="size-select">
          <p>Select Size:</p>
          <div className="size-options">
            {["S", "M", "L", "XL", "XXL"].map(size => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
            
          </div>
          {error && <p className="error">{error}</p>}
        </div>

        <div className="action-buttons">
          <button onClick={handleAddToCart}>
            {isAdded ? "Go to Cart" : "Add to Cart"}
          </button>
          <button onClick={handleOrderNow}>Order Now</button>
          
        </div>

        <div >
          
          <p className="desc">{product.description}</p>
        </div>

        <div className="reviews">
          <h4>Ratings & Reviews</h4>
          <p>⭐ 4.5 (234 reviews)</p> {/* Placeholder for now */}
         
        </div>
      </div>
    </div>
  ) : <p>Loading product...</p>;
};

export default ProductDetailPage;
