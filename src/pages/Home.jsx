import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

// Categorías de ejemplo solo para dar contexto visual en la landing.
// El listado real (con filtrado) vive en /offers, que requiere sesión.
const FEATURED_CATEGORIES = [
  { icon: '💻', name: 'Desarrollo Web' },
  { icon: '📢', name: 'Marketing' },
  { icon: '🎨', name: 'Diseño' },
  { icon: '⚙️', name: 'Ingeniería' },
  { icon: '💰', name: 'Administración y finanzas' },
  { icon: '🏥', name: 'Sanidad' },
];

const HOW_IT_WORKS = [
  {
    icon: '👤',
    color: 'bg-sky-primary/30 text-sky-hover',
    title: 'Crea tu cuenta',
    text: 'Regístrate como estudiante o como empresa en menos de un minuto.',
  },
  {
    icon: '🔎',
    color: 'bg-violet-primary/30 text-violet-hover',
    title: 'Encuentra oportunidades',
    text: 'Explora ofertas de prácticas filtradas por categoría y ubicación.',
  },
  {
    icon: '🚀',
    color: 'bg-state-accepted-bg text-state-accepted-text',
    title: 'Da el paso',
    text: 'Inscríbete con tu CV y haz seguimiento del estado de tu candidatura.',
  },
];

export default function Home() {
  const { user } = useAuth();

  // Adapta el CTA principal según si ya hay sesión iniciada
  const primaryCta = user
    ? {
        to: user.role === 'student' ? '/dashboard' : '/dashboard-empresa',
        label: user.role === 'student' ? 'Ver mis candidaturas' : 'Ir a mi panel',
      }
    : { to: '/login', label: 'Iniciar sesión' };

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="text-center py-8 md:py-12">
        <span className="inline-flex items-center px-4 py-2 rounded-full bg-state-accepted-bg text-state-accepted-text text-sm font-bold mb-6">
          🚀 Nuevas oportunidades cada semana
        </span>

        <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-4 max-w-3xl mx-auto">
          Encuentra tus primeras{' '}
          <span className="text-sky-hover">prácticas profesionales</span>
        </h1>

        <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
          Conecta con empresas, descubre oportunidades reales y da el primer
          paso en tu carrera. O, si eres una empresa, encuentra al talento
          que necesitas.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to={primaryCta.to}>
            <Button variant="primary" className="!px-8">
              {primaryCta.label}
            </Button>
          </Link>
          {!user && (
            <Link to="/register">
              <Button variant="outline" className="!px-8">
                Crear cuenta
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Categorías destacadas */}
      <section>
        <h2 className="text-2xl font-bold text-text-primary text-center mb-8">
          Prácticas en todo tipo de áreas
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {FEATURED_CATEGORIES.map((cat) => (
            <Card key={cat.name} className="text-center hover:-translate-y-1 transition-transform duration-200">
              <div className="text-3xl mb-2">{cat.icon}</div>
              <p className="text-sm font-bold text-text-primary">{cat.name}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section>
        <h2 className="text-2xl font-bold text-text-primary text-center mb-10">
          ¿Cómo funciona?
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {HOW_IT_WORKS.map((step) => (
            <div key={step.title} className="text-center">
              <div
                className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${step.color}`}
              >
                {step.icon}
              </div>
              <h3 className="font-bold text-text-primary mb-2">{step.title}</h3>
              <p className="text-text-secondary text-sm">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      {!user && (
        <section>
          <Card className="text-center bg-sky-primary/20 border-sky-primary/30 py-12">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              Tu primera oportunidad empieza aquí
            </h2>
            <p className="text-text-secondary mb-8 max-w-xl mx-auto">
              Únete a estudiantes y empresas que ya están conectando en PractiHub.
            </p>
            <Link to="/register">
              <Button variant="primary" className="!px-8">
                Crear cuenta gratis
              </Button>
            </Link>
          </Card>
        </section>
      )}
    </div>
  );
}