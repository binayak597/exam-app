import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";

function Protected({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="p-4 text-center">Checking authentication...</div>;
  }

  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
