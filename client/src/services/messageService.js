import axios from "../utils/axios";

export const getMessages = async (token) => {
  const res = await axios.get("/api/messages", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const sendMessage = async (message, token) => {
  const res = await axios.post("/api/messages", message, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const fetchUsers = async (token) => {
    const res = await axios.get("/api/users/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  };
  
  export const fetchBusinesses = async (token) => {
    const res = await axios.get("/api/business/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  };
  
