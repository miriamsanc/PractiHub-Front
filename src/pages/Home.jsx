import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';

// Datos de prueba (más adelante vendrán de la API de Laravel)
const mockOffers = [
  {
    id: 1,
    title: 'Desarrollador Frontend Junior',
    company: 'Tech Innovators S.L.',
    location: 'Madrid / Remoto',
    description: 'Buscamos un estudiante apasionado por React y Tailwind CSS para unirse a nuestro equipo de producto. Tendrás un mentor dedicado y flexibilidad horaria.',
    status: 'review',
    statusLabel: 'Nueva'
  },
  {
    id: 2,
    title: 'Prácticas en Marketing Digital',
    company: 'Growth Agency',
    location: 'Barcelona',
    description: 'Aprende sobre SEO, SEM y gestión de campañas en redes sociales trabajando mano a mano con expertos del sector.',
    status: 'pending',
    statusLabel: 'Urgente'
  },
  {
    id: 3,
    title: 'Data Analyst Trainee',
    company: 'Fintech Solutions',
    location: '100% Remoto',
    description: 'Buscamos talento analítico para procesar bases de datos y crear dashboards interactivos con Python y PowerBI.',
    status: 'accepted',
    statusLabel: 'Destacada'
  }
];

export default function Home() {
  return (
    <div className="space-y-10">
      {/* Sección Hero */}
      <section className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
          Encuentra tus prácticas ideales
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Conecta con las mejores startups y empresas. Da el primer paso en tu carrera profesional con ofertas validadas y enfocadas en tu aprendizaje.
        </p>
        
        {/* Buscador visual (sin lógica de momento) */}
        <div className="mt-8 max-w-xl mx-auto flex gap-2">
          <input 
            type="text" 
            placeholder="Ej. React, Marketing, Diseño..." 
            className="w-full px-4 py-3 rounded-xl border border-border-input focus:outline-none focus:border-sky-primary focus:ring-1 focus:ring-sky-primary transition-colors bg-surface text-text-primary"
          />
          <Button variant="primary" className="!px-8">
            Buscar
          </Button>
        </div>
      </section>

      {/* Grid de Ofertas */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-text-primary">Ofertas recientes</h2>
          <span className="text-text-secondary font-medium">{mockOffers.length} resultados</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockOffers.map((offer) => (
            <Card key={offer.id} className="flex flex-col h-full hover:border-sky-primary transition-colors duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-text-primary leading-snug">{offer.title}</h3>
                  <p className="text-sm text-text-secondary font-medium mt-1">
                    {offer.company} • {offer.location}
                  </p>
                </div>
                <Badge status={offer.status} label={offer.statusLabel} />
              </div>
              
              <p className="text-text-secondary text-sm mb-6 line-clamp-3 flex-grow">
                {offer.description}
              </p>
              
              <div className="pt-4 border-t border-border mt-auto flex justify-between items-center">
                <Button variant="outline" className="w-full">
                  Ver detalles
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}