import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

// Traduce el status real de la API a lo que espera el componente Badge
const STATUS_BADGE_MAP = {
  pending: { status: 'pending', label: 'Pendiente' },
  read: { status: 'review', label: 'En revisión' },
  accepted: { status: 'accepted', label: 'Aceptado' },
  rejected: { status: 'rejected', label: 'Rechazado' },
};

export default function CompanyDashboard() {
  const { user } = useAuth();
  
  const [offers, setOffers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estado para controlar qué oferta estamos inspeccionando
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    loadDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Hacemos las dos peticiones en paralelo para que cargue más rápido
      const [offersRes, appsRes] = await Promise.all([
        api.get('/offers'),
        api.get('/applications')
      ]);

      // Filtramos para quedarnos solo con las ofertas de esta empresa
      const allOffers = offersRes.data.data || offersRes.data;
      const myOffers = allOffers.filter(offer => offer.user_id === user?.id);
      
      const allApps = appsRes.data.data || appsRes.data;

      setOffers(myOffers);
      setApplications(allApps);
    } catch (error) {
      console.error('Error cargando el dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (applicationId, newStatus) => {
    setActionLoading(applicationId);
    try {
      const response = await api.put(`/applications/${applicationId}`, { status: newStatus });
      // Actualizamos el estado local sin recargar la página
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: response.data.application?.status || newStatus } : app
        )
      );
    } catch (error) {
      alert(error.response?.data?.message || 'Hubo un error al actualizar la candidatura.');
    } finally {
      setActionLoading(null);
    }
  };

  // Abre el CV en una pestaña nueva usando el endpoint autenticado.
  // Abrimos la pestaña en blanco de forma síncrona (antes del await) para que
  // el navegador no la trate como un pop-up bloqueado, y la redirigimos
  // cuando el PDF esté listo. La API marca la candidatura como "read" la
  // primera vez que se abre el CV, así que reflejamos ese cambio localmente.
  const handleViewCv = async (app) => {
    const newTab = window.open('', '_blank');
    setActionLoading(`cv-${app.id}`);
    try {
      const response = await api.get(`/applications/${app.id}/cv`, { responseType: 'blob' });
      const blobUrl = window.URL.createObjectURL(response.data);
      if (newTab) {
        newTab.location.href = blobUrl;
      }

      if (app.status === 'pending') {
        setApplications((prev) =>
          prev.map((a) => (a.id === app.id ? { ...a, status: 'read' } : a))
        );
      }
    } catch (error) {
      if (newTab) newTab.close();
      let message = 'No se ha podido abrir el CV.';
      // Con responseType: 'blob', axios también devuelve los errores como blob,
      // así que hay que leer el texto para recuperar el mensaje real de la API.
      if (error.response?.data instanceof Blob) {
        try {
          const text = await error.response.data.text();
          message = JSON.parse(text).message || message;
        } catch {
          // Si no se puede parsear, nos quedamos con el mensaje genérico
        }
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      alert(message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteOffer = async (offerId) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta oferta? Esta acción no se puede deshacer.')) {
      return;
    }
    setActionLoading(`offer-${offerId}`);
    try {
      await api.delete(`/offers/${offerId}`);
      setOffers((prev) => prev.filter((o) => o.id !== offerId));
      if (selectedOfferId === offerId) {
        setSelectedOfferId(null);
      }
    } catch (error) {
      alert('Hubo un error al eliminar la oferta.');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return <div className="text-center text-text-secondary py-12">Cargando tu panel de control...</div>;
  }

  // --- CÁLCULO DE ESTADÍSTICAS REALES ---
  const activeOffersCount = offers.filter(o => o.is_active || o.status === 'open').length;
  const pendingAppsCount = applications.filter(a => a.status === 'pending').length;
  const acceptedAppsCount = applications.filter(a => a.status === 'accepted').length;

  const stats = [
    { label: 'Ofertas activas', value: activeOffersCount, color: 'text-violet-primary' },
    { label: 'Candidatos pendientes', value: pendingAppsCount, color: 'text-state-pending-text' },
    { label: 'Candidatos aceptados', value: acceptedAppsCount, color: 'text-state-accepted-text' }, // Sustituye a las entrevistas
  ];

  // Filtramos los candidatos que se van a mostrar en la tabla (todos, o solo los de la oferta seleccionada)
  const displayedApplications = selectedOfferId 
    ? applications.filter(app => app.offer_id === selectedOfferId || app.offer?.id === selectedOfferId)
    : applications;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Cabecera del Dashboard */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">
            ¡Hola, {user?.name || 'Empresa'}! 🏢
          </h1>
          <p className="text-text-secondary mt-1">Gestiona tus ofertas y descubre talento.</p>
        </div>
        <Link to="/nueva-oferta">
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
        
        {offers.length === 0 ? (
          <Card className="text-center py-12 text-text-secondary">
            Aún no has publicado ninguna oferta.
          </Card>
        ) : (
          <Card className="!p-0 overflow-hidden">
            <div className="divide-y divide-border">
              {offers.map((offer) => {
                // Contar cuántas candidaturas tiene esta oferta específica
                const offerCandidates = applications.filter(app => app.offer_id === offer.id || app.offer?.id === offer.id).length;
                const isSelected = selectedOfferId === offer.id;

                return (
                  <div key={offer.id} className={`p-6 flex flex-col md:flex-row justify-between md:items-center gap-4 transition-colors ${isSelected ? 'bg-slate-50 border-l-4 border-l-violet-primary' : 'hover:bg-slate-50/50'}`}>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-text-primary">{offer.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-text-secondary font-medium">
                        <span>📍 {offer.location}</span>
                        <span>•</span>
                        <span className="text-violet-primary font-bold">
                          {offerCandidates} {offerCandidates === 1 ? 'candidato' : 'candidatos'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap justify-end">
                      {/* Ajusta el status según lo que espere tu componente Badge */}
                      <Badge 
                        status={offer.is_active ? 'accepted' : 'rejected'} 
                        label={offer.is_active ? 'Activa' : 'Cerrada'} 
                      />
                      <Link to={`/ofertas/${offer.id}/editar`}>
                        <Button variant="outline" className="!px-4 !py-2 text-sm hover:!border-violet-primary hover:!text-violet-primary">
                          Editar
                        </Button>
                      </Link>
                      <button
                        onClick={() => handleDeleteOffer(offer.id)}
                        disabled={actionLoading === `offer-${offer.id}`}
                        className="px-4 py-2 text-sm font-bold rounded-xl bg-state-rejected-bg text-state-rejected-text hover:opacity-80 transition-opacity disabled:opacity-50"
                      >
                        {actionLoading === `offer-${offer.id}` ? 'Eliminando...' : 'Eliminar'}
                      </button>
                      <Button 
                        variant={isSelected ? 'primary' : 'outline'}
                        onClick={() => setSelectedOfferId(isSelected ? null : offer.id)}
                        className={`!px-4 !py-2 text-sm ${!isSelected && 'hover:!border-violet-primary hover:!text-violet-primary'}`}
                      >
                        {isSelected ? 'Cerrar candidatos' : 'Ver candidatos'}
                      </Button>
                    </div>

                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>

      {/* Tabla Dinámica de Candidatos */}
      {(selectedOfferId || applications.length > 0) && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-text-primary">
              {selectedOfferId ? 'Candidatos de la oferta seleccionada' : 'Últimos candidatos'}
            </h2>
            {selectedOfferId && (
              <button 
                onClick={() => setSelectedOfferId(null)}
                className="text-sm font-medium text-text-secondary hover:text-violet-primary underline"
              >
                Ver todos
              </button>
            )}
          </div>

          <Card className="!p-0 overflow-hidden">
            {displayedApplications.length === 0 ? (
              <div className="p-8 text-center text-text-secondary">
                No hay candidatos para mostrar aquí.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-text-secondary">
                  <thead className="text-xs uppercase bg-slate-50 border-b border-border text-text-primary">
                    <tr>
                      <th className="px-6 py-4 font-bold">Estudiante</th>
                      <th className="px-6 py-4 font-bold">Oferta</th>
                      <th className="px-6 py-4 font-bold">CV</th>
                      <th className="px-6 py-4 font-bold">Estado</th>
                      <th className="px-6 py-4 font-bold text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {displayedApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-text-primary">{app.student?.name}</p>
                          <p className="text-xs">{app.student?.email}</p>
                        </td>
                        <td className="px-6 py-4 font-medium">
                          {app.offer?.title}
                        </td>
                        <td className="px-6 py-4">
                          {app.cv_link ? (
                            <button
                              onClick={() => handleViewCv(app)}
                              disabled={actionLoading === `cv-${app.id}`}
                              className="text-sky-hover hover:opacity-80 font-bold underline disabled:opacity-50"
                            >
                              {actionLoading === `cv-${app.id}` ? 'Abriendo...' : 'Ver CV'}
                            </button>
                          ) : (
                            <span className="italic">Sin CV</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            status={(STATUS_BADGE_MAP[app.status] || STATUS_BADGE_MAP.pending).status}
                            label={(STATUS_BADGE_MAP[app.status] || STATUS_BADGE_MAP.pending).label}
                          />
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          {app.status === 'read' && (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(app.id, 'accepted')}
                                disabled={actionLoading === app.id}
                                className="px-3 py-1 text-xs font-bold rounded-lg bg-state-accepted-bg text-state-accepted-text hover:opacity-80 transition-opacity disabled:opacity-50"
                              >
                                Aceptar
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(app.id, 'rejected')}
                                disabled={actionLoading === app.id}
                                className="px-3 py-1 text-xs font-bold rounded-lg bg-state-rejected-bg text-state-rejected-text hover:opacity-80 transition-opacity disabled:opacity-50"
                              >
                                Rechazar
                              </button>
                            </>
                          )}
                          {app.status === 'pending' && (
                            <span className="text-xs text-text-muted italic">Abre el CV para poder decidir</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      )}

    </div>
  );
}