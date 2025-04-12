import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewConversationModal = ({ onClose }) => {
  const { token } = useSelector((state) => state.auth);
  const [recipients, setRecipients] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [receiverModel, setReceiverModel] = useState("User");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          receiverModel === "User" ? "/api/users" : "/api/business",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRecipients(res.data);
      } catch (err) {
        console.error("Failed to load recipients", err);
      }
    };
    fetch();
  }, [receiverModel, token]);

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/messages",
        { receiver: receiverId, receiverModel, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onClose?.(); // Close modal
      navigate(`/messages/inbox/${receiverModel.toLowerCase()}/${receiverId}`);
    } catch (err) {
      alert("Failed to start conversation");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md border border-purple-100">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7209b7] to-[#f72585] mb-4">
          ✨ Start New Conversation
        </h2>

        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Recipient Type</label>
            <select
              value={receiverModel}
              onChange={(e) => setReceiverModel(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-black focus:ring-2 focus:ring-purple-500"
            >
              <option value="User">User</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Select Recipient</label>
            <select
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md text-black focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select recipient...</option>
              {recipients.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Message</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-2 border rounded-md text-black focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-700 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-sm px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-md hover:opacity-90"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewConversationModal;
