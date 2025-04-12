import axios from "../utils/axios";

const API = "https://biz-connect-ebcg.onrender.com/api/auth";

const handleAuthResponse = (res) => {
  const { token, user } = res.data;
  localStorage.setItem("token", token);
  return { token, user };
};

export const register = (data) =>
  axios.post(API + "/register", data).then(handleAuthResponse);

export const login = (data) =>
  axios.post(`${API}/login`, data).then(handleAuthResponse);
