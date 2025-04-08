// MessagesPage.js (Updated with dropdown to select user to message)
import React, { useEffect, useState } from 'react';
import API from '../api';
import { getUser } from '../auth';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const MessagesPage = () => {
  const currentUser = getUser();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    socket.emit('join', currentUser.id);
    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off('receiveMessage');
    };
  }, [currentUser.id]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get('/users'); // you need a /users route that returns all users excluding the current user
        setUsers(res.data.filter(u => u._id !== currentUser.id));
      } catch (err) {
        console.error('Failed to load users:', err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;
      try {
        const res = await API.get(`/messages/conversation/${selectedUser}`);
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [selectedUser, currentUser.id]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedUser) return;
    try {
      const res = await API.post('/messages', {
        receiver: selectedUser,
        content: messageText
      });
      setMessages([...messages, res.data]);
      socket.emit('sendMessage', {
        receiverId: selectedUser,
        messageData: res.data
      });
      setMessageText('');
    } catch (err) {
      console.error('Send error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Messages</h2>

        {/* User Dropdown */}
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">Select user to chat with</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>{user.name}</option>
          ))}
        </select>

        {/* Messages */}
        <div className="max-h-80 overflow-y-auto mb-4 space-y-3">
          {messages.map((msg) => (
            <div key={msg._id} className={`p-3 rounded-lg max-w-xs ${msg.sender === currentUser.id ? 'bg-blue-100 self-end ml-auto' : 'bg-gray-100 mr-auto'}`}>
              <p className="text-sm">{msg.content}</p>
              <p className="text-xs text-gray-500 text-right mt-1">{new Date(msg.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* Send Message */}
        <form onSubmit={handleSend} className="flex space-x-2">
          <input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="flex-grow border p-2 rounded"
            placeholder="Type your message..."
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Send</button>
        </form>
      </div>
    </div>
  );
};

export default MessagesPage;
