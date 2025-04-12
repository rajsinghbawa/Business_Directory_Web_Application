import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import NewConversationModal from "./NewConversationModal";
import Navbar from "../dashboard/business/Navbar";
import UserNavbar from "../dashboard/user/Navbar";

const MessagingInbox = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [threads, setThreads] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeThread, setActiveThread] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchThreads = async () => {
      const res = await axios.get("/api/messages/threads", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setThreads(res.data);

      if (!params.id && res.data.length > 0) {
        const first = res.data[0];
        setActiveThread(first);
        navigate(`/messages/inbox/${first.participantModel.toLowerCase()}/${first.participantId}`);
      }
    };
    fetchThreads();
  }, [token]);

  useEffect(() => {
    if (params.id && params.model) {
      const selected = threads.find(
        (t) => t.participantId === params.id && t.participantModel.toLowerCase() === params.model
      );
      if (selected) setActiveThread(selected);

      const fetchMessages = async () => {
        const res = await axios.get(`/api/messages/thread/${params.model}/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      };
      fetchMessages();
    }
  }, [params, threads, token]);

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/messages",
        {
          receiver: activeThread.participantId,
          receiverModel: activeThread.participantModel,
          content,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContent("");
      const res = await axios.get(`/api/messages/thread/${params.model}/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch (err) {
      alert("Send failed");
    }
  };

  return (
    <div className="flex min-h-screen w-screen bg-gradient-to-br from-[#f8f9ff] to-white text-gray-800 overflow-hidden">
      <div className="w-60 h-screen fixed top-0 left-0 z-50">
        {user?.role === "business" ? <Navbar /> : <UserNavbar />}
      </div>

      <div className="ml-60 flex-grow px-8 py-10">
        <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7209b7] to-[#f72585] mb-6">
          📬 Messaging Center
        </div>

        <div className="flex h-[80vh] rounded-xl border border-purple-100 bg-white overflow-hidden shadow-lg">
          {/* Sidebar */}
          <aside className="w-1/3 border-r bg-white p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Inbox</h2>
              <button
                onClick={() => setShowNewModal(true)}
                className="text-sm bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded hover:opacity-90"
              >
                + New
              </button>
            </div>

            {showNewModal && <NewConversationModal onClose={() => setShowNewModal(false)} />}

            <div className="space-y-2">
              {threads.map((t) => (
                <div
                  key={t._id}
                  onClick={() =>
                    navigate(`/messages/inbox/${t.participantModel.toLowerCase()}/${t.participantId}`)
                  }
                  className={`cursor-pointer p-3 rounded-lg transition-all border ${
                    params.id === t.participantId
                      ? "bg-purple-50 border-purple-500 text-purple-700 shadow"
                      : "hover:bg-gray-100 border-transparent text-gray-800"
                  }`}
                >
                  <h3 className="font-semibold truncate">{t.participantName}</h3>
                  <p className="text-xs text-gray-500 truncate">{t.lastMessage}</p>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Chat Area */}
          <main className="flex-1 flex flex-col p-6">
            {activeThread ? (
              <>
                <div className="border-b pb-4 mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    💬 Chat with {activeThread.participantName}
                  </h2>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 px-2">
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`max-w-[75%] p-3 rounded-lg text-sm shadow-sm ${
                        msg.sender._id === user._id
                          ? "ml-auto bg-purple-100 text-right text-gray-900"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSend} className="mt-4 flex gap-2">
                  <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-800"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 text-sm font-medium"
                  >
                    Send
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p className="text-lg">💌 Start chatting by selecting a conversation</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MessagingInbox;