import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Store from './pages/Store';
import ProductPage from './pages/ProductPage';
import Login from './pages/Login';
import Registro from './pages/Registro';
import { UserProvider } from './context/UserContext'; // Asegurate que la ruta sea correcta
import Home from './Components/Home';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import AdminPage from './pages/AdminPage';
import AddProductPage from './pages/AddProductPage';
import ManageStockPage from './pages/ManageStockPage';
import EditarProductosLista from './pages/EditarProductosLista';
import EditarProductoPage from './pages/EditarProductoPage';


import Contacto from './pages/Contacto'; 

function App() {
  return (
    <UserProvider>      
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/store' element={<Store />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/products/add" element={<AddProductPage />} />
          <Route path="/admin/stock" element={<ManageStockPage />} />
          <Route path="/admin/products/edit" element={<EditarProductosLista />} />
          <Route path="/admin/products/edit/:id" element={<EditarProductoPage />} />

          <Route path="/contacto" element={<Contacto />} />

          
        </Routes>
      </Router>
      <Footer />
    </UserProvider>
  );
}

export default App;
