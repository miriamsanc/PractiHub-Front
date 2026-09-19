import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';

export default function CompanyDashboard() {
  // Datos simulados (en el futuro vendrán de Laravel)
  const company = {
    name: 'Tech Innovators S.L.',
    sector: 'Desarrollo de Software',
  };

  const stats = [
    { label: 'Ofertas activas', value: 2, color: 'text-violet-primary' },
    { label: 'Candidatos pendientes', value: 12, color: 'text-state-pending-text' },
    { label: 'Entrevistas esta semana', value: 4, color: 'text-state-accepted-text' },
  ];

  const publishedOffers = [
    {
      id: 1,
      title: 'Desarrollador Frontend Junior',
      publishedAt: 'Hace 3 días',
      candidates: 8,
      status: 'review',
      statusLabel: 'Activa'
    },
    {
      id: 2,
      title: 'UI/UX Designer Trainee',
      publishedAt: 'Hace 1 semana',
      candidates: 4,
      status: 'review',
      statusLabel: 'Activa'
    },
    {
      id: 3,
      title: 'Prácticas en Marketing B2B',
      publishedAt: 'Hace 1 mes',
      candidates: 24,
      status: 'rejected', // Usamos este estado visualmente para ofertas cerradas
      statusLabel: 'Cerrada'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Cabecera del Dashboard */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">
            ¡Hola, {company.name}! 🏢
          </h1>
          <p className="text-text-secondary mt-1">{company.sector}</p>
        </div>
        <Link to="/nueva-oferta">
          {/* variant="secondary" aplica el bg-violet-primary del Design System */}
          <Button variant="secondary">Publicar nueva oferta</Button>
        </Link>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center border-t-4 border-t-transparent hover:border-t-violet-primary transition-all duration-300">
            <p className="text-text-secondary font-medium mb-2">{stat.label}</p>
            <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Listado de Ofertas Publicadas */}
      <div>
        <h2 className="text-xl font-bold text-text-primary mb-4">Tus ofertas recientes</h2>
        
        <Card className="!p-0 overflow-hidden">
          <div className="divide-y divide-border">
            {publishedOffers.map((offer) => (
              <div key={offer.id} className="p-6 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:bg-slate-50 transition-colors">
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text-primary">{offer.title}</h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-text-secondary font-medium">
                    <span>Publicado {offer.publishedAt}</span>
                    <span>•</span>
                    <span className="text-violet-primary font-bold">
                      {offer.candidates} candidatos
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Badge status={offer.status} label={offer.statusLabel} />
                  <Button variant="outline" className="!px-4 !py-2 text-sm hover:!border-violet-primary hover:!text-violet-primary">
                    Ver candidatos
                  </Button>
                </div>

              </div>
            ))}
          </div>
        </Card>
      </div>

    </div>
  );
}