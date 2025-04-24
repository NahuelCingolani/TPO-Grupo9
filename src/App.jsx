import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Store from './pages/Store';
import ProductPage from './pages/ProductPage';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Home from './Components/Home';
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
      </Routes>
    </Router>
  );
}

export default App;