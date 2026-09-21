import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; 
import ProtectedRoute from './components/ProtectedRoute'; 
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import OfferDetail from './pages/OfferDetail';
import Dashboard from './pages/Dashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import OfferForm from './pages/OfferForm';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import OffersPage from './pages/OffersPage';
import RankingPage from './pages/RankingPage';

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

            {/* Rutas Privadas Generales (Para Estudiantes Y Empresas) */}
            {/* La API exige sesión también para /offers, /ofertas/:id, /categories y /ranking */}
            <Route element={<ProtectedRoute />}>
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/ofertas/:id" element={<OfferDetail />} />
              <Route path="/ranking" element={<RankingPage />} />
              <Route path="/perfil" element={<Profile />} />
            </Route>
            
            {/* Rutas Privadas para Estudiantes */}
            <Route element={<ProtectedRoute allowedRole="student" />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Rutas Privadas para Empresas */}
            <Route element={<ProtectedRoute allowedRole="company" />}>
              <Route path="/dashboard-empresa" element={<CompanyDashboard />} />
              <Route path="/nueva-oferta" element={<OfferForm />} />
              <Route path="/ofertas/:id/editar" element={<OfferForm />} />
            </Route>

          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
