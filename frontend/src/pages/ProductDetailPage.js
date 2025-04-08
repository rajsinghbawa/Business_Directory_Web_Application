import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/detail/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        alert('Error loading product');
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) return <div className="text-center mt-10 text-gray-600">Loading product...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl w-full">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">{product.name}</h2>
        <p className="text-green-600 font-semibold mb-3 text-lg">${product.price}</p>
        <p className="text-gray-700 mb-6">{product.description}</p>

        <div className="border-t pt-4 mt-6">
          <h4 className="text-gray-500 text-sm">Offered by:</h4>
          <Link to={`/profile/${product.business._id}`} className="text-blue-600 font-semibold hover:underline">
            {product.business.name}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
