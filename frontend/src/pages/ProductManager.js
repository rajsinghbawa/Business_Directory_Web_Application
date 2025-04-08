import React, { useEffect, useState } from 'react';
import API from '../api';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    available: true,
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch current business products
  const fetchProducts = async () => {
    try {
      const res = await API.get('/products/' + JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/products/${editingId}`, form);
      } else {
        await API.post('/products', form);
      }
      setForm({ name: '', description: '', price: '', available: true });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Product Manager</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" className="p-3 border rounded" required />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="p-3 border rounded" type="number" required />
          <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="p-3 border rounded col-span-2" />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded col-span-2 hover:bg-blue-700">
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
        </form>

        <div className="space-y-4">
          {products.map((product) => (
            <div key={product._id} className="bg-gray-50 border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h4 className="text-lg font-semibold">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-sm text-gray-700">Price: ${product.price}</p>
              </div>
              <div className="space-x-2">
                <button onClick={() => handleEdit(product)} className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500">
                  Edit
                </button>
                <button onClick={() => handleDelete(product._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <p className="text-center text-gray-500">No products yet. Add one above!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManager;
