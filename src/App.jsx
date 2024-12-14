import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/Error";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import AddPost from "./pages/RecruiterDashboard/JobPostings/AddPost";
import JobPostings from "./pages/RecruiterDashboard/JobPostings";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const storedUser = Cookies.get("user");
  const userData = JSON.parse(storedUser);
  return userData ? children : <Navigate to="/login" />;
};

function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route
          path="/recruiter"
          element={
            <ProtectedRoute>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
          errorElement={<ErrorPage />}
        >
          <Route path="" element={<JobPostings />} />
          <Route path="create-post" element={<AddPost />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        closeButton={true}
        pauseOnHover={false}
        draggable={false}
        theme="colored"
      />
    </div>
  );
}

export default App;
