import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api'; // Tu cliente de Axios

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // 1. Enviamos las credenciales a tu backend en Laravel
      const response = await api.post('/login', {
        email,
        password
      });

      // 2. Extraemos el usuario y el token de la respuesta de Laravel
      // (Asegúrate de que tu controlador de Laravel devuelve esta estructura)
      const { user, token } = response.data;

      // 3. Guardamos la sesión en el contexto global
      login(user, token);

      // 4. Redirigimos al panel correspondiente según el rol
      if (user.role === 'student') {
        navigate('/dashboard');
      } else {
        navigate('/dashboard-empresa');
      }
      
    } catch (err) {
      // Si Laravel devuelve error (401, 422, etc.), lo mostramos
      setError(
        err.response?.data?.message || 'Credenciales incorrectas. Inténtalo de nuevo.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 md:mt-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-text-primary">Bienvenido de nuevo</h2>
        <p className="text-text-secondary mt-2">Inicia sesión en tu cuenta de PractiHub</p>
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
            <label className="block text-sm font-bold text-text-primary mb-1">Correo electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com" 
              className="w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:border-sky-primary focus:ring-1 focus:ring-sky-primary bg-surface text-text-primary transition-colors" 
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
              className="w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:border-sky-primary focus:ring-1 focus:ring-sky-primary bg-surface text-text-primary transition-colors" 
            />
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center text-text-secondary cursor-pointer">
              <input type="checkbox" className="mr-2 rounded border-border-input text-sky-primary focus:ring-sky-primary" /> 
              Recordarme
            </label>
            <a href="#" className="text-sky-primary hover:text-sky-hover font-bold transition-colors">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          
          <Button 
            variant="primary" 
            className="w-full mt-2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
        </form>
      </Card>
      
      <p className="text-center text-text-secondary mt-6">
        ¿No tienes cuenta?{' '}
        <Link to="/register" className="text-sky-primary hover:text-sky-hover font-bold transition-colors">
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}