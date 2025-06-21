import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductPage from './pages/ProductPage';

import AdminDashboard from './admin/AdminDashboard';
import ProductDetail from './pages/ProductDetail';
import Layout from './components/Layout';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import VirtualTryOn from './components/VirtualTryOn';
import TryOnResult from './components/TryOnResult';
import BackButton from './components/BackButton';
import HowItWorksSlider from './components/HowItWorksSlider';



function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/profile' element={<ProfilePage/>} />
        <Route path='/products' element={<ProductPage/>} />
        <Route path='/admin' element={<AdminDashboard/>} />
        <Route path='/product/:id' element={<ProductDetail/>} />
        <Route path='/cart' element={<CartPage/>} />
        <Route path='/checkout' element={<CheckoutPage/>} />
        <Route path="/tryon/:id" element={<VirtualTryOn />} />
        <Route path='/tryon/result/:id' element={<TryOnResult/>} />
        <Route path='/back' element={<BackButton/>} />
        <Route path='/mock' element={<HowItWorksSlider/>} />
        
        
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;
