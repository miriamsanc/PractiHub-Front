import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Login() {
  return (
    <div className="max-w-md mx-auto mt-8 md:mt-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-text-primary">Bienvenido de nuevo</h2>
        <p className="text-text-secondary mt-2">Inicia sesión en tu cuenta de PractiHub</p>
      </div>
      
      <Card>
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-text-primary mb-1">Correo electrónico</label>
            <input 
              type="email" 
              placeholder="tu@email.com" 
              className="w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:border-sky-primary focus:ring-1 focus:ring-sky-primary bg-surface text-text-primary transition-colors" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-text-primary mb-1">Contraseña</label>
            <input 
              type="password" 
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
          
          <Button variant="primary" className="w-full mt-2">
            Iniciar sesión
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