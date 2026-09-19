import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import OfferDetail from './pages/OfferDetail'; // <--- Añadir importación

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Nueva Ruta para las ofertas */}
          <Route path="/ofertas/:id" element={<OfferDetail />} />
          
          <Route path="/dashboard" element={<h2 className="text-2xl font-bold">Panel Principal</h2>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
