import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './VirtualTryOn.css';

const VirtualTryOn = () => {
  const { id } = useParams(); // product ID
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    setUserImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async () => {
    if (!userImage) return alert('Please upload your photo');
    setLoading(true);

    const formData = new FormData();
    formData.append('userImage', userImage);
    formData.append('productId', id);
    console.log("hi",id) // backend will fetch product image from DB

    try {
      const response = await axios.post('http://localhost:5000/tryon/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(response);
      
      const product = response.data.product;
      navigate(`/tryon/result/${product._id}`);
    } catch (err) {
      console.error(err);
      alert('Try-on failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tryon-container">
      <h2>Virtual Try-On</h2>
      <label>
        Upload your photo:
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </label>
      {preview && <img src={preview} alt="User Preview" className="user-preview" />}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Processing...' : 'Try On'}
      </button>
    </div>
  );
};

export default VirtualTryOn;
