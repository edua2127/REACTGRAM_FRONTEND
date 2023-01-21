import './App.css';
// HOOKS
import { useAuth } from "./hooks/useAuth"

// ROUTER
import { BrowserRouter, Routes, Route, navigate, Navigate } from 'react-router-dom';

// PAGES
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// COMPONENTS

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
function App() {
  const { auth, loading } = useAuth();
  if (loading) {
    return <p>Loading...</p>
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={auth ? <Home /> : <Navigate to={"/login"} />} />
            <Route path="/login" element={auth ? <Navigate to={"/"} /> : <Login />} />
            <Route path="/register" element={auth ? <Navigate to={"/"} /> : <Register />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
