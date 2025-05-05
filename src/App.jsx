import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Store from './pages/Store';
import ProductPage from './pages/ProductPage';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Home from './Components/Home';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/store' element={<Store/>}/>
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} /> 
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;