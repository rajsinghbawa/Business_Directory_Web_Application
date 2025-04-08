import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

const InboxPage = () => {
  const [inbox, setInbox] = useState([]);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const res = await API.get('/messages/inbox');
        const filtered = res.data.filter(item => item.user && item.user._id);
        setInbox(filtered);
      } catch (err) {
        console.error('Failed to load inbox:', err);
      }
    };
    fetchInbox();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">📥 My Inbox</h2>

        {inbox.length === 0 ? (
          <p className="text-gray-500">No conversations yet.</p>
        ) : (
          <ul className="space-y-4">
            {inbox.map((item, i) => {
              const user = item.user || { name: 'Unknown', _id: '' };
              return (
                <li key={i} className="flex justify-between items-center bg-gray-50 p-4 rounded shadow">
                  <div>
                    <h4 className="font-semibold text-blue-700">{user.name}</h4>
                    <p className="text-sm text-gray-600 truncate w-64">{item.lastMessage || 'No message'}</p>
                    <p className="text-xs text-gray-400">{new Date(item.timestamp).toLocaleString()}</p>
                  </div>
                  <Link to={`/messages/${user._id}`}>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Open Chat</button>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InboxPage;
