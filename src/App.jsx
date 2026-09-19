import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // <-- Añadido
import ProtectedRoute from './components/ProtectedRoute'; // <-- Añadido
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
    <AuthProvider> {/* <-- Envolvemos toda la aplicación */}
      <Router>
        <Routes>
          <Route element={<Layout />}>
            {/* Rutas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ofertas/:id" element={<OfferDetail />} />
            
            {/* Rutas Privadas para Estudiantes */}
            <Route element={<ProtectedRoute allowedRole="student" />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Rutas Privadas para Empresas */}
            <Route element={<ProtectedRoute allowedRole="company" />}>
              <Route path="/dashboard-empresa" element={<CompanyDashboard />} />
              <Route path="/nueva-oferta" element={<CreateOffer />} />
            </Route>

          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
