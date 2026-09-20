import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PractiHubBrand } from './PractiHubBrand'; // Si se exportó con "export function PractiHubBrand"
import Button from './Button';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  // Enlaces de navegación según la ruta y el rol
  const renderNavLinks = (isMobile = false) => {
    const baseClass = isMobile 
      ? "block py-2 text-base font-medium transition-colors" 
      : "text-sm font-medium transition-colors";

    return (
      <>
        <Link
          to="/offers"
          onClick={() => setMobileMenuOpen(false)}
          className={`${baseClass} ${
            isActive('/offers') ? 'text-sky-primary font-bold' : 'text-text-secondary hover:text-sky-primary'
          }`}
        >
          Ofertas
        </Link>

        <Link
          to="/ranking"
          onClick={() => setMobileMenuOpen(false)}
          className={`${baseClass} ${
            isActive('/ranking') ? 'text-sky-primary font-bold' : 'text-text-secondary hover:text-sky-primary'
          }`}
        >
          Ranking Empresas
        </Link>

        {/* Enlaces específicos de Estudiante */}
        {user && user.role === 'student' && (
          <Link
            to="/applications"
            onClick={() => setMobileMenuOpen(false)}
            className={`${baseClass} ${
              isActive('/applications') ? 'text-sky-primary font-bold' : 'text-text-secondary hover:text-sky-primary'
            }`}
          >
            Mis Candidaturas
          </Link>
        )}

        {/* Enlaces específicos de Empresa */}
        {user && (user.role === 'company' || user.role === 'empresa') && (
          <Link
            to="/dashboard-empresa"
            onClick={() => setMobileMenuOpen(false)}
            className={`${baseClass} ${
              isActive('/dashboard-empresa') ? 'text-violet-primary font-bold' : 'text-text-secondary hover:text-violet-primary'
            }`}
          >
            Mis Ofertas
          </Link>
        )}
      </>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo y Nombre Reutilizable */}
          <PractiHubBrand onClick={() => navigate('/')} />

          {/* Navegación Inteligente Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {renderNavLinks()}

            <div className="w-px h-6 bg-border mx-1"></div>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-text-secondary">
                  {user.name}
                </span>
                <Button variant="outline" onClick={handleLogout} className="!px-4 !py-1.5 text-sm">
                  Salir
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to="/login" 
                  className="text-sm font-medium text-text-secondary hover:text-sky-primary transition-colors duration-200"
                >
                  Iniciar sesión
                </Link>
                <Link to="/register">
                  <Button variant="primary" className="!px-5 !py-2 text-sm">
                    Crear cuenta
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Botón Menú Móvil */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-text-secondary hover:text-sky-primary p-2 focus:outline-none"
              aria-label="Abrir menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-surface px-4 pt-2 pb-4 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {renderNavLinks(true)}
          </div>
          
          <div className="pt-3 border-t border-border">
            {user ? (
              <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-text-primary">
                  {user.name}
                </span>
                <Button variant="outline" onClick={handleLogout} className="w-full text-sm">
                  Cerrar sesión
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full text-sm">
                    Iniciar sesión
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full text-sm">
                    Crear cuenta
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}