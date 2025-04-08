import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';
import { getUser } from '../auth';
import ReviewForm from '../components/ReviewForm';

const BusinessProfileView = () => {
    const { userId } = useParams();
    const [profile, setProfile] = useState(null);
    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [avg, setAvg] = useState(null);
    
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const res = await API.get(`/business/profile/${userId}`);
          setProfile(res.data);
          const resReviews = await API.get(`/reviews/${userId}`);
    setReviews(resReviews.data);
    
    const resAvg = await API.get(`/reviews/avg/${userId}`);
    setAvg(resAvg.data);
        } catch (err) {
          console.error('Error fetching profile:', err);
        }
      };
  
      const fetchProducts = async () => {
        try {
          const res = await API.get(`/products/${userId}`);
          setProducts(res.data);
        } catch (err) {
          console.error('Error fetching products:', err);
        }
      };
  
      fetchProfile();
      fetchProducts();
    }, [userId]);
  
    if (!profile) return <div className="text-center mt-10 text-gray-600">Loading profile...</div>;
  
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-6 flex justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl w-full">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">{profile.businessName}</h2>
          <p className="text-gray-600 mb-4"><strong>Type:</strong> {profile.incorporationType}</p>
          <p className="mb-6">{profile.description}</p>
  
          <div className="mb-6">
            <h4 className="font-semibold text-lg mb-2">Contact Info</h4>
            <ul className="text-gray-700 space-y-1">
              <li><strong>Email:</strong> {profile.contactInfo?.email}</li>
              <li><strong>Phone:</strong> {profile.contactInfo?.phone}</li>
              <li><strong>Website:</strong> <a href={profile.contactInfo?.website} className="text-blue-600" target="_blank" rel="noreferrer">{profile.contactInfo?.website}</a></li>
              <li><strong>Address:</strong> {profile.contactInfo?.address}</li>
            </ul>
          </div>
  
          <div className="mb-6">
            <h4 className="font-semibold text-lg mb-2">Offerings</h4>
            <ul className="list-disc list-inside text-gray-700">
              {profile.offerings.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
  
          {/* 🛍 Product Listing */}
          <div>
            <h4 className="font-semibold text-xl mb-3 text-blue-800">Products & Services</h4>
            {products.length === 0 ? (
              <p className="text-gray-500 italic">No products listed yet.</p>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product._id} className="p-4 bg-gray-50 rounded shadow-sm">
                    <h5 className="text-lg font-semibold">{product.name}</h5>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="text-green-700 font-medium mt-1">${product.price}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-8">
  <h4 className="text-xl font-bold text-gray-700 mb-2">Ratings & Reviews</h4>
  {avg && (
    <p className="text-sm text-gray-600 mb-3">
      ⭐ {avg.avgRating.toFixed(1)} average from {avg.count} review{avg.count !== 1 && 's'}
    </p>
  )}
  <ReviewForm businessId={profile.user._id} onReviewed={() => window.location.reload()} />
  <ul className="mt-4 space-y-3">
    {reviews.map((r) => (
      <li key={r._id} className="bg-gray-100 p-3 rounded">
        <p className="text-sm font-medium">{r.reviewer.name} rated {r.rating}⭐</p>
        <p className="text-sm text-gray-700">{r.comment}</p>
      </li>
    ))}
  </ul>
</div>
          {/* Show edit button if viewing own profile */}
          {getUser()?.id === profile.user._id && (
            <div className="mt-6 text-right">
              <Link to="/business-profile">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Edit My Profile
                </button>
              </Link>
            </div>
          )}
        </div>
        {getUser()?.id !== profile.user._id && (
  <div className="mt-6 text-right">
    <Link to={`/messages/${profile.user._id}`}>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
        Message {profile.businessName || 'User'}
      </button>
    </Link>
  </div>
)}
      </div>
    );
  };
  
  export default BusinessProfileView;
  