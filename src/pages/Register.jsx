import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import api from '../services/api';

export default function Register() {
  const [role, setRole] = useState('student'); // 'student' | 'company'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  // Estados para la UI
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Enviamos la petición al endpoint exacto 
      await api.post('/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        role
      });

      // Si va bien, redirigimos al login
      navigate('/login');
      
    } catch (err) {
      // Capturamos errores de validación (ej. email ya existe, contraseña corta)
      const errors = err.response?.data?.errors;
      const firstError = errors ? Object.values(errors)[0]?.[0] : null;

      setError(
        firstError || err.response?.data?.message || 'Error al crear la cuenta. Revisa los datos.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 md:mt-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-text-primary">Únete a PractiHub</h2>
        <p className="text-text-secondary mt-2">Crea tu cuenta para empezar</p>
      </div>
      
      {/* Selector de Rol (Estudiante vs Empresa) */}
      <div className="flex p-1 bg-border rounded-xl mb-6">
        <button 
          type="button"
          onClick={() => { setRole('student'); setError(null); }}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${
            role === 'student' 
              ? 'bg-surface text-sky-primary shadow-sm' 
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          🎓 Estudiante
        </button>
        <button 
          type="button"
          onClick={() => {setRole('company'); setError(null); }}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${
            role === 'company' 
              ? 'bg-surface text-violet-primary shadow-sm' 
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          🏢 Empresa
        </button>
      </div>

      <Card>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Alerta de Error */}
          {error && (
            <div className="p-3 text-sm text-state-rejected-text bg-state-rejected-bg rounded-lg border border-red-200">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-bold text-text-primary mb-1">
              {role === 'student' ? 'Nombre completo' : 'Nombre de la empresa'}
            </label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder={role === 'student' ? "Ej. María García" : "Ej. Tech Startup S.L."} 
              className={`w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:ring-1 bg-surface text-text-primary transition-colors ${
                role === 'student' ? 'focus:border-sky-primary focus:ring-sky-primary' : 'focus:border-violet-primary focus:ring-violet-primary'
              }`} 
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-text-primary mb-1">Correo electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com" 
              className={`w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:ring-1 bg-surface text-text-primary transition-colors ${
                role === 'student' ? 'focus:border-sky-primary focus:ring-sky-primary' : 'focus:border-violet-primary focus:ring-violet-primary'
              }`} 
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-text-primary mb-1">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••" 
              className={`w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:ring-1 bg-surface text-text-primary transition-colors ${
                role === 'student' ? 'focus:border-sky-primary focus:ring-sky-primary' : 'focus:border-violet-primary focus:ring-violet-primary'
              }`} 
            />
            <p className="text-xs text-text-muted mt-1">
              Mínimo 8 caracteres, con mayúsculas, minúsculas, números y algún símbolo.
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-text-primary mb-1">Confirmar contraseña</label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              placeholder="••••••••"
              className={`w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:ring-1 bg-surface text-text-primary transition-colors ${
                role === 'student' ? 'focus:border-sky-primary focus:ring-sky-primary' : 'focus:border-violet-primary focus:ring-violet-primary'
              }`}
            />
          </div>
          
          {/* El botón cambia de color según el rol seleccionado */}
          <Button 
            variant={role === 'student' ? 'primary' : 'secondary'} 
            className="w-full mt-2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
          </Button>
        </form>
      </Card>
      
      <p className="text-center text-text-secondary mt-6">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-sky-primary hover:text-sky-hover font-bold transition-colors">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}