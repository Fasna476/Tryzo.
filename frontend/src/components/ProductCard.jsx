// import React from 'react'; 
// import './ProductCard.css';
// import placeholder from '../assets/placeholder.svg';
// import { useNavigate } from 'react-router-dom';

// const ProductCard = ({ product }) => {
//   const navigate = useNavigate();
//   const handleCardClick = () => {
//     navigate(`/product/${product._id}`);
//   };

//   return (
//     <div className="product-card" onClick={handleCardClick}>
//       <div className="card-image">
//         <img
//           src={product.image ? `http://localhost:5000/uploads/${product.image}` : placeholder}
//           alt={product.name}
//         />
//         <span className="wishlist">♥</span>
//       </div>
//       <div className="card-details">
//         <h3>{product.name}</h3>
//         <p>₹{product.price}</p>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;


import React from 'react'; 
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="simple-product-card" onClick={() => navigate(`/product/${product._id}`)}>
      {product.image && (
        <img
          src={`http://localhost:5000/uploads/${product.image}`}
          alt={product.name}
          className="product-image"
        />
      )}
      <div className="product-info">
        <h4>{product.name}</h4>
        <p>₹{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
