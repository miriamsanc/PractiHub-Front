import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

// Traduce el status real de la API a lo que espera el componente Badge
const STATUS_MAP = {
  pending: { status: 'pending', label: 'Enviada' },
  read: { status: 'review', label: 'En revisión' },
  accepted: { status: 'accepted', label: 'Aceptada' },
  rejected: { status: 'rejected', label: 'Rechazada' },
};

export default function Dashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/applications')
      .then((response) => setApplications(response.data.data))
      .catch(() => setApplications([]))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    {
      label: 'Candidaturas activas',
      value: applications.filter((a) => a.status === 'pending' || a.status === 'read').length,
      color: 'text-sky-primary',
    },
    {
      label: 'En revisión',
      value: applications.filter((a) => a.status === 'read').length,
      color: 'text-state-review-text',
    },
    {
      label: 'Aceptadas',
      value: applications.filter((a) => a.status === 'accepted').length,
      color: 'text-state-accepted-text',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Cabecera del Dashboard */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">
            ¡Hola, {user?.name}! 👋
          </h1>
          <p className="text-text-secondary mt-1">Este es el resumen de tus candidaturas</p>
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

        {loading && <p className="text-text-secondary">Cargando...</p>}

        {!loading && applications.length === 0 && (
          <Card className="text-center text-text-secondary py-10">
            Todavía no te has inscrito a ninguna oferta.
          </Card>
        )}

        {!loading && applications.length > 0 && (
          <Card className="!p-0 overflow-hidden">
            <div className="divide-y divide-border">
              {applications.map((app) => {
                const badge = STATUS_MAP[app.status] || STATUS_MAP.pending;
                return (
                  <div key={app.id} className="p-6 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:bg-slate-50 transition-colors">

                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-text-primary">{app.offer?.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-text-secondary font-medium">
                        <span>{app.offer?.company}</span>
                        <span>•</span>
                        <span>Inscrito el {app.applied_at}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge status={badge.status} label={badge.label} />
                      {app.offer?.id && (
                        <Link to={`/ofertas/${app.offer.id}`}>
                          <Button variant="outline" className="!px-4 !py-2 text-sm">
                            Ver oferta
                          </Button>
                        </Link>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>

    </div>
  );
}
