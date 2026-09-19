import { useParams, Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';

export default function OfferDetail() {
  const { id } = useParams();

  // Datos simulados (en el futuro haremos un fetch a /api/offers/${id})
  const offer = {
    id: id,
    title: 'Desarrollador Frontend Junior',
    company: 'Tech Innovators S.L.',
    location: 'Madrid / Remoto',
    modality: 'Híbrido',
    duration: '6 meses',
    salary: '600€ - 800€ / mes',
    description: 'Buscamos un estudiante apasionado por React y Tailwind CSS para unirse a nuestro equipo de producto. Tendrás un mentor dedicado, flexibilidad horaria y la oportunidad de trabajar en un proyecto que impacta a miles de usuarios. En tu día a día crearás componentes reutilizables, optimizarás el rendimiento y conectarás vistas con nuestra API REST.',
    requirements: [
      'Conocimientos sólidos en HTML, CSS y JavaScript moderno.',
      'Experiencia básica creando proyectos con React.js.',
      'Familiaridad con Git y control de versiones.',
      'Estar matriculado en un centro educativo para poder firmar convenio.'
    ],
    status: 'review',
    statusLabel: 'Nueva',
    postedAt: 'Hace 2 días'
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Botón de volver */}
      <Link to="/" className="inline-flex items-center text-text-secondary hover:text-sky-primary font-medium transition-colors">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver a ofertas
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Columna Principal (Descripción) */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">{offer.title}</h1>
                <p className="text-lg text-text-secondary font-medium">{offer.company}</p>
              </div>
              <Badge status={offer.status} label={offer.statusLabel} />
            </div>

            <div className="flex flex-wrap gap-4 mt-6 text-sm text-text-secondary border-t border-border pt-4">
              <span className="flex items-center">📍 {offer.location}</span>
              <span className="flex items-center">💻 {offer.modality}</span>
              <span className="flex items-center">⏱️ {offer.duration}</span>
              <span className="flex items-center">📅 Publicado {offer.postedAt}</span>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-text-primary mb-4">Descripción del puesto</h2>
            <p className="text-text-secondary leading-relaxed mb-8">
              {offer.description}
            </p>

            <h2 className="text-xl font-bold text-text-primary mb-4">Requisitos</h2>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              {offer.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Columna Lateral (Acciones y Resumen) */}
        <div className="space-y-6">
          <Card className="sticky top-24 border-sky-primary/20 shadow-md">
            <h3 className="font-bold text-text-primary mb-4">Resumen</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-text-muted">Remuneración</p>
                <p className="font-medium text-text-primary">{offer.salary}</p>
              </div>
              <div>
                <p className="text-sm text-text-muted">Jornada</p>
                <p className="font-medium text-text-primary">Media jornada (Mañanas)</p>
              </div>
            </div>

            <Button variant="primary" className="w-full mb-3 shadow-sm hover:shadow">
              Aplicar a la oferta
            </Button>
            <Button variant="outline" className="w-full">
              Guardar para luego
            </Button>
          </Card>
        </div>

      </div>
    </div>
  );
}