import React, { useState, useEffect } from 'react';

import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import image2 from '../assets/image2.jpg'

import image3 from '../assets/image3.jpg';

import image6 from '../assets/image6.jpg';
import '../styles/HomePage.css';
import HowItWorksSlider from '../components/HowItWorksSlider.jsx'

// const dummyProducts = [
//   {
//     id: 1,
//     name: "Classic Tote Bag",
//     price: 499,
//     image: "/images/product-2.png"
//   },
//   {
//     id: 2,
//     name: "Trendy Canvas Tote",
//     price: 599,
//     image: "/images/product-2.png"
//   },
//   {
//     id: 3,
//     name: "Minimalist Bag",
//     price: 699,
//     image: "/images/product-3.png"
//   }
// ];

const heroImages = [ image2, image3, image6];

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % heroImages.length
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      
      <header className="hero">
      <div className="hero-content">
        <h1>Step Into Style with Tryzo</h1>
        <p>Try Before You Buy — The Future of Shopping</p>
        <a className="cta" href="/products">Shop Now</a>
        
        </div>
        <div className="hero-image">
        <img src={heroImages[currentImageIndex]} alt="Hero" />
        
        
      </div>
      
      
       
      </header>
      <div>
          {/* <HowItWorksSlider /> */}
      </div>


      

      
    </div>
  );
};

export default HomePage;
