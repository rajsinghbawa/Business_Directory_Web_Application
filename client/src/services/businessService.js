import axios from "../utils/axios";

const API = "https://biz-connect-ebcg.onrender.com/api";

export const getBusinessById = (id, token) => {
  return axios.get(`${API}/business/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateBusinessById = (id, data, token) => {
  return axios.put(`${API}/business/profile/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
