// import React from 'react';
// import Slider from 'react-slick';
// import './HowItWorksSlide.css';

// const steps = [
//   {
//     title: 'Browse Products',
//     description: 'Explore a wide range of fashion items tailored just for you.',
//     image: '/images/step1.png',
//   },
//   {
//     title: 'Try It On',
//     description: 'Use our virtual try-on to see how the outfit suits you.',
//     image: '/assets/step2.png',
//   },
//   {
//     title: 'Add to Cart',
//     description: 'Select your size and style, then add to your cart easily.',
//     image: '/images/step3.png',
//   },
//   {
//     title: 'Checkout & Enjoy',
//     description: 'Secure checkout and fast delivery right to your doorstep.',
//     image: '/images/step4.png',
//   },
// ];

// const HowItWorksSlide = () => {
//   const settings = {
//     dots: true,
//     centerMode: true,
//     centerPadding: '60px',
//     infinite: true,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     speed: 800,
//     slidesToShow: 1,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           centerPadding: '20px',
//         },
//       },
//     ],
//   };

//   return (
//     <div className="how-it-works-container">
//       <h2 className="section-title">How It Works</h2>
//       <Slider {...settings}>
//         {steps.map((step, index) => (
//           <div key={index} className="slide">
//             <img src={step.image} alt={step.title} className="slide-image" />
//             <h3 className="slide-title">{step.title}</h3>
//             <p className="slide-description">{step.description}</p>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default HowItWorksSlide;
