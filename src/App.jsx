import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import OfferDetail from './pages/OfferDetail'; 
import Dashboard from './pages/Dashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import CreateOffer from './pages/CreateOffer';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/ofertas/:id" element={<OfferDetail />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard-empresa" element={<CompanyDashboard />} />

          <Route path="/nueva-oferta" element={<CreateOffer />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
