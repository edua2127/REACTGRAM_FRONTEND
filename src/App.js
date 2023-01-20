import './App.css';


// ROUTER
import { BrowserRouter, Routes, Route, navigate } from 'react-router-dom';

// PAGES
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// COMPONENTS

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
