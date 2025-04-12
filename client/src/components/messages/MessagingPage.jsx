import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getMessages,
  sendMessage,
  fetchUsers,
  fetchBusinesses,
} from "../../services/messageService";
import Navbar from "../dashboard/business/Navbar";
import UserNavbar from "../dashboard/user/Navbar";

const MessagingPage = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [receiverModel, setReceiverModel] = useState("User");
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getMessages(token);
        setMessages(data);
        const u = await fetchUsers(token);
        const b = await fetchBusinesses(token);
        setUsers(u);
        setBusinesses(b);
      } catch (err) {
        console.error("Failed to fetch messages or receivers", err);
      }
    };
    fetch();
  }, [token]);

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const message = {
        receiver: receiverId,
        receiverModel,
        content,
      };
      await sendMessage(message, token);
      setContent("");
      const updated = await getMessages(token);
      setMessages(updated);
    } catch (err) {
      alert("Message send failed");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-[#f8f9ff] to-white text-gray-800">
      {/* Sidebar */}
      <div className="w-60 fixed top-0 left-0 h-full z-50">
        {user?.role === "business" ? <Navbar /> : <UserNavbar />}
      </div>

      {/* Main content */}
      <div className="ml-60 w-[calc(100%-15rem)] px-8 py-10">
        <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7209b7] to-[#f72585] mb-6">
          ✉️ Send a Direct Message
        </div>

        <form
          onSubmit={handleSend}
          className="space-y-4 bg-white shadow-lg p-6 rounded-2xl border border-purple-100 mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Send To</label>
              <select
                value={receiverModel}
                onChange={(e) => {
                  setReceiverModel(e.target.value);
                  setReceiverId("");
                }}
                className="w-full px-4 py-2 border rounded-md text-black focus:ring-2 focus:ring-purple-500"
              >
                <option value="User">User</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Select Receiver</label>
              <select
                value={receiverId}
                onChange={(e) => setReceiverId(e.target.value)}
                className="w-full px-4 py-2 border rounded-md text-black focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select</option>
                {(receiverModel === "User" ? users : businesses).map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-2 border rounded-md text-black focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-md font-medium hover:opacity-90 transition"
          >
            Send
          </button>
        </form>

        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white p-4 rounded-xl shadow border border-gray-100 hover:border-purple-300 transition"
            >
              <p className="text-sm text-gray-800 font-semibold">
                {msg.sender?.name} → {msg.receiver?.name}
              </p>
              <p className="text-gray-700 my-1">{msg.content}</p>
              <p className="text-xs text-gray-500">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
