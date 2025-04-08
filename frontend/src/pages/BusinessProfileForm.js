import React, { useEffect, useState } from 'react';
import API from '../api';
import { getUser } from '../auth';

const BusinessProfileForm = () => {
  const [form, setForm] = useState({
    businessName: '',
    incorporationType: '',
    description: '',
    contactInfo: {
      email: '',
      phone: '',
      website: '',
      address: ''
    },
    offerings: ''
  });

  const [loading, setLoading] = useState(true);

  // 🔄 Fetch existing profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get(`/business/profile/${getUser().id}`);
        const profile = res.data;

        setForm({
          businessName: profile.businessName || '',
          incorporationType: profile.incorporationType || '',
          description: profile.description || '',
          contactInfo: {
            email: profile.contactInfo?.email || '',
            phone: profile.contactInfo?.phone || '',
            website: profile.contactInfo?.website || '',
            address: profile.contactInfo?.address || ''
          },
          offerings: profile.offerings?.join(', ') || ''
        });
      } catch (err) {
        console.log('No existing profile found. Proceeding to create new.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in form.contactInfo) {
      setForm({ ...form, contactInfo: { ...form.contactInfo, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...form,
      offerings: form.offerings.split(',').map(item => item.trim())
    };

    try {
      await API.post('/business/profile', dataToSend);
      alert('Profile saved successfully!');
    } catch (err) {
      alert('Error saving profile.');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading profile...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-xl w-full max-w-2xl space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Business Profile</h2>

        <input
          name="businessName"
          placeholder="Business Name"
          value={form.businessName}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        <input
          name="incorporationType"
          placeholder="Incorporation Type"
          value={form.incorporationType}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          rows="3"
        />

        <div className="grid grid-cols-2 gap-4">
          <input name="email" placeholder="Email" value={form.contactInfo.email} onChange={handleChange}
            className="p-3 border rounded-lg" />
          <input name="phone" placeholder="Phone" value={form.contactInfo.phone} onChange={handleChange}
            className="p-3 border rounded-lg" />
          <input name="website" placeholder="Website" value={form.contactInfo.website} onChange={handleChange}
            className="p-3 border rounded-lg" />
          <input name="address" placeholder="Address" value={form.contactInfo.address} onChange={handleChange}
            className="p-3 border rounded-lg" />
        </div>

        <input
          name="offerings"
          placeholder="Offerings (comma separated)"
          value={form.offerings}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default BusinessProfileForm;
