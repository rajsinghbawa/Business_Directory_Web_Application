import { jwtDecode } from 'jwt-decode';

export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUser = () => {
  const token = getToken();
  if (!token) return null;
  return jwtDecode(token);
};

export const logout = () => {
  localStorage.removeItem('token');
};
