import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user || null,
    token: token || null,
    role: role || null,
    error: null,
  },
  reducers: {
    setAuth(state, action) {
      const { user, token, role } = action.payload;
      state.user = user;
      state.token = token;
      state.role = role;
      state.error = null;

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.role = null;
      state.error = null;

      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
    setAuthError(state, action) {
      state.error = action.payload;
    }
  },
});

export const { setAuth, logout, setAuthError } = authSlice.actions;
export default authSlice.reducer;