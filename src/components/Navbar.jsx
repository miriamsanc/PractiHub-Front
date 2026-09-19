import { Link } from 'react-router-dom';
import logo from '../assets/logo-practihub.jpg';
import Button from './Button';

export default function Navbar() {
    // sticky top-0 y backdrop-blur-md logran el efecto translúcido
    return (
    <nav className="sticky top-0 z-50 w-full bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo y Nombre */}
          <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="bg-sky-50 p-1 rounded-full border border-sky-100">
              <img src={logo} alt="PractiHub" className="h-10 w-10 object-contain rounded-full" />
            </div>
            <span className="font-bold text-xl tracking-tight text-text-primary">
              Practi<span className="text-sky-primary">Hub</span>
            </span>
          </Link>

          {/* Navegación Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/dashboard" 
              className="font-medium text-text-secondary hover:text-sky-primary transition-colors duration-200"
            >
              Mi Panel
            </Link>
            <div className="w-px h-6 bg-border mx-2"></div> {/* Separador visual */}
            <Link 
              to="/login" 
              className="font-medium text-text-secondary hover:text-sky-primary transition-colors duration-200"
            >
              Iniciar sesión
            </Link>
            <Link to="/register">
              <Button variant="primary" className="!px-5 !py-2 text-sm">
                Crear cuenta
              </Button>
            </Link>
          </div>

          {/* Botón Menú Móvil (Solo visual por ahora) */}
          <div className="md:hidden flex items-center">
            <button className="text-text-secondary hover:text-sky-primary p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}