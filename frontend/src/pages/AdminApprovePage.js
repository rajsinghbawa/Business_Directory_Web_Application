import React, { useEffect, useState } from 'react';
import API from '../api';

const AdminApprovePage = () => {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    API.get('/admin/pending-businesses')
      .then((res) => setPending(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleApprove = async (id) => {
    try {
      await API.post(`/admin/approve-business/${id}`);
      setPending(pending.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Pending Business Approvals</h2>
        {pending.length === 0 ? (
          <p className="text-gray-500 text-center">No pending approvals.</p>
        ) : (
          <ul className="space-y-4">
            {pending.map((b) => (
              <li key={b._id} className="flex justify-between items-center bg-gray-100 p-4 rounded">
                <div>
                  <p className="font-semibold">{b.businessName}</p>
                  <p className="text-sm text-gray-600">{b.incorporationType}</p>
                </div>
                <button onClick={() => handleApprove(b._id)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Approve
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminApprovePage;
