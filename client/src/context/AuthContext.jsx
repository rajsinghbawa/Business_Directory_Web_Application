// import { createContext, useContext, useEffect, useState } from "react";
// import jwtDecode from "jwt-decode";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // { id, role, ... }

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setUser(decoded);
//       } catch (err) {
//         console.error("Invalid token");
//         localStorage.removeItem("token");
//       }
//     }
//   }, []);

//   const login = (token) => {
//     localStorage.setItem("token", token);
//     const decoded = jwtDecode(token);
//     setUser(decoded);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default  useAuth = () => useContext(AuthContext);
