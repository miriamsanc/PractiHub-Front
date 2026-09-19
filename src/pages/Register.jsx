import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Register() {
  const [role, setRole] = useState('student'); // 'student' | 'company'

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
          onClick={() => setRole('student')}
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
          onClick={() => setRole('company')}
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
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-text-primary mb-1">
              {role === 'student' ? 'Nombre completo' : 'Nombre de la empresa'}
            </label>
            <input 
              type="text" 
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
          >
            Crear cuenta
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