import { Routes, Route, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ErrorPage from './pages/Error';
import Layout from './pages/Layout';
import Register from './pages/Register';
import Login from './pages/Login';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/register" />;
};

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
          <Route path="" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
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