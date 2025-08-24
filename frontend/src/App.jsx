import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Exam from "./pages/Exam";
import Results from "./pages/Results";
import ExamDashboard from "./pages/ExamDashboard";
import ViewAllResults from "./pages/ViewAllResults";

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

        <Route
          path="/"
          element={
            <Protected>
              <ExamDashboard />
            </Protected>
          }
        />
        <Route
          path="/exam/start"
          element={
            <Protected>
              <Exam />
            </Protected>
          }
        />
        <Route
          path="/results"
          element={
            <Protected>
              <Results />
            </Protected>
          }
        />
        <Route
          path="/view-all-results"
          element={
            <Protected>
              <ViewAllResults />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
}
