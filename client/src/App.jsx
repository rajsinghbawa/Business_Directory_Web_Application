import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import home from "./pages/home";
import UserDashboard from "./pages/UserDashboard";
import BusinessDashboard from "./pages/BusinessDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicOnlyRoute from "./routes/PublicOnlyRoute";
import BusinessProfileEditor from "./components/dashboard/business/ProfileEditor";
import BusinessProductManager from "./components/dashboard/business/Products";
import FinancialStats from "./components/dashboard/business/FinancialStats";
import BusinessProfilePage from "./components/dashboard/business/BusinessProfilePage";
import Navbar from "./components/dashboard/user/Navbar";
import BusinessSearch from "./components/dashboard/business/BusinessSearch";
import MessagingInbox from "./components/messages/MessagingInbox";

function App() {
  return (
    <Provider store={store}>
    
      <Router>
        <Routes>
          {/* ✅ Redirect root path to /user-auth or any desired default page */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<PublicOnlyRoute element={home} />} />
  <Route path="/signup" element={<PublicOnlyRoute element={Register} />} />
  <Route path="/signin" element={<PublicOnlyRoute element={Login} />} />
          <Route
            path="/dashboard/user"
            element={
              <ProtectedRoute element={UserDashboard} allowedRoles={["user"]} />
            }
          />
          <Route
            path="/dashboard/business"
            element={
              <ProtectedRoute
                element={BusinessDashboard}
                allowedRoles={["business"]}
              />
            }
          />

<Route
  path="/dashboard/business/profile"
  element={
    <ProtectedRoute
      allowedRoles={["business"]}
      element={BusinessProfileEditor}
    />
  }
/>

<Route
  path="/dashboard/business/products"
  element={
    <ProtectedRoute
      allowedRoles={["business"]}
      element={BusinessProductManager}
    />
  }
/>

<Route
  path="/dashboard/business/stats"
  element={
    <ProtectedRoute
      allowedRoles={["business"]}
      element={FinancialStats}
    />
  }
/>


<Route
  path="/business/:id"
  element={<BusinessProfilePage />}
/>

<Route
  path="/business/top"
  element={<BusinessSearch />}
/>

<Route path="/messages/inbox/:model/:id" element={<MessagingInbox />} />
<Route path="/messages/inbox" element={<MessagingInbox />} />






          {/* Optional fallback for unauthorized */}
          <Route
            path="/unauthorized"
            element={<h1 className="p-6 text-red-500">Unauthorized Access</h1>}
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
