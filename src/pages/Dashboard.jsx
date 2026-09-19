import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';

export default function Dashboard() {
  // Datos simulados (en el futuro vendrán de Laravel autenticando al usuario)
  const student = {
    name: 'María García',
    career: 'Desarrollo de Aplicaciones Web',
  };

  const stats = [
    { label: 'Candidaturas activas', value: 3, color: 'text-sky-primary' },
    { label: 'En revisión', value: 2, color: 'text-state-review-text' },
    { label: 'Entrevistas', value: 1, color: 'text-state-accepted-text' },
  ];

  const applications = [
    {
      id: 1,
      offerId: 1,
      role: 'Desarrollador Frontend Junior',
      company: 'Tech Innovators S.L.',
      appliedAt: 'Hace 3 días',
      status: 'review',
      statusLabel: 'En revisión'
    },
    {
      id: 2,
      offerId: 2,
      role: 'Prácticas en Marketing Digital',
      company: 'Growth Agency',
      appliedAt: 'Hace 1 semana',
      status: 'pending',
      statusLabel: 'Enviada'
    },
    {
      id: 3,
      offerId: 4,
      role: 'UI/UX Designer Trainee',
      company: 'Creative Studio',
      appliedAt: 'Hace 2 semanas',
      status: 'rejected',
      statusLabel: 'Rechazada'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Cabecera del Dashboard */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">
            ¡Hola, {student.name}! 👋
          </h1>
          <p className="text-text-secondary mt-1">{student.career}</p>
        </div>
        <Link to="/">
          <Button variant="primary">Buscar nuevas ofertas</Button>
        </Link>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <p className="text-text-secondary font-medium mb-2">{stat.label}</p>
            <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Listado de Candidaturas */}
      <div>
        <h2 className="text-xl font-bold text-text-primary mb-4">Mis candidaturas</h2>
        
        <Card className="!p-0 overflow-hidden">
          {/* Si no hay candidaturas, mostraríamos un estado vacío. Aquí mapeamos las que existen */}
          <div className="divide-y divide-border">
            {applications.map((app) => (
              <div key={app.id} className="p-6 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:bg-slate-50 transition-colors">
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text-primary">{app.role}</h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-text-secondary font-medium">
                    <span>{app.company}</span>
                    <span>•</span>
                    <span>Aplicado {app.appliedAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Badge status={app.status} label={app.statusLabel} />
                  <Link to={`/ofertas/${app.offerId}`}>
                    <Button variant="outline" className="!px-4 !py-2 text-sm">
                      Ver oferta
                    </Button>
                  </Link>
                </div>

              </div>
            ))}
          </div>
        </Card>
      </div>

    </div>
  );
}