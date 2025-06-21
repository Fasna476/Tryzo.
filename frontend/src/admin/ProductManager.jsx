// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './ProductManager.css';

// const ProductManager = () => {
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({ name: '', price: '', description: '', category: '', sizes: '', brand: '', stock: '', image: '' });
//   const [search, setSearch] = useState('');
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => { fetchProducts(); }, []);

//   const fetchProducts = async () => {
//     const res = await axios.get('http://localhost:5000/products/all');
//     setProducts(res.data);
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editingId) {
//       await axios.put(`http://localhost:5000/products/update/${editingId}`, { ...form, sizes: form.sizes.split(',').map(s => s.trim()) });
//       setEditingId(null);
//     } else {
//       await axios.post('http://localhost:5000/products/add', { ...form, sizes: form.sizes.split(',').map(s => s.trim()) });
//     }
//     setForm({ name: '', price: '', description: '', category: '', sizes: '', brand: '', stock: '', image: '' });
//     fetchProducts();
//   };

//   const handleEdit = (product) => {
//     setForm({ ...product, sizes: product.sizes.join(', ') });
//     setEditingId(product._id);
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/products/delete/${id}`);
//     fetchProducts();
//   };

//   const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

//   return (
//     <div className="product-manager">
//       <h2>Manage Products</h2>

//       <form onSubmit={handleSubmit}>
//         <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
//         <input name="price" value={form.price} onChange={handleChange} placeholder="Price" required type="number" />
//         <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
//         <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
//         <input name="sizes" value={form.sizes} onChange={handleChange} placeholder="Sizes (comma separated)" />
//         <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" />
//         <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" />
//         <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
//         <button type="submit">{editingId ? 'Update' : 'Add'} Product</button>
//       </form>

//       <input className="search-input" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />

//       <div className="product-grid">
//         {filtered.map(product => (
//           <div key={product._id} className="product-card">
//             <img src={product.image || '/images/placeholder.jpg'} alt={product.name} />
//             <div>
//               <h4>{product.name}</h4>
//               <p>₹{product.price}</p>
//               <button onClick={() => handleEdit(product)}>Edit</button>
//               <button onClick={() => handleDelete(product._id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductManager;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductManager.css';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    sizes: '',
    brand: '',
    stock: '',
    image: null, // now storing File object instead of URL
  });
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/products/all');
    setProducts(res.data);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] }); // save File object
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('description', form.description);
    formData.append('category', form.category);
    formData.append('sizes', form.sizes);
    formData.append('brand', form.brand);
    formData.append('stock', form.stock);
    if (form.image) formData.append('image', form.image);

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/products/update/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/products/add', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      setForm({ name: '', price: '', description: '', category: '', sizes: '', brand: '', stock: '', image: null });
      fetchProducts();
    } catch (err) {
      console.error("Error submitting product:", err);
    }
  };

  const handleEdit = (product) => {
    setForm({ ...product, sizes: product.sizes.join(', '), image: null });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/products/delete/${id}`);
    fetchProducts();
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  

  return (
    <div className="product-manager">
      <h2>Manage Products</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" required type="number" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
        <input name="sizes" value={form.sizes} onChange={handleChange} placeholder="Sizes (comma separated)" />
        <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" />
        <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" />
        <input name="image" type="file" onChange={handleChange} />
        <button type="submit">{editingId ? 'Update' : 'Add'} Product</button>
      </form>

      <input
        className="search-input"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="product-grid">
        {filtered.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={product.image ? `http://localhost:5000/uploads/${product.image}` : '/images/placeholder.jpg'}
              alt={product.name}
            />
            <div>
              <h4>{product.name}</h4>
              <p>₹{product.price}</p>
              <button onClick={() => handleEdit(product)}>Edit</button>
              <button onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManager;

