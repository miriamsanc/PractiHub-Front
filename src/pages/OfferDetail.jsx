import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

export default function OfferDetail() {
  const { id } = useParams();

  const { user } = useAuth();
  const navigate = useNavigate();

  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [needsLogin, setNeedsLogin] = useState(false);

  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState(null);
  const [applySuccess, setApplySuccess] = useState(false);

  useEffect(() => {
    loadOffer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadOffer = async () => {
    setLoading(true);
    setNotFound(false);
    setNeedsLogin(false);

    try {
      const response = await api.get(`/offers/${id}`);
      setOffer(response.data.data);

      // Si es estudiante, comprobamos si ya se ha inscrito a esta oferta
      if (user?.role === 'student') {
        try {
          const appsResponse = await api.get('/applications');
          const applied = appsResponse.data.data.some(
            (app) => app.offer?.id === Number(id)
          );
          setAlreadyApplied(applied);
        } catch {
          // Si esto falla no bloqueamos la vista de la oferta
        }
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setNeedsLogin(true);
      } else {
        setNotFound(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setApplyError(null);

    if (!cvFile) {
      setApplyError('Tienes que adjuntar tu CV en PDF para inscribirte.');
      return;
    }

    setApplying(true);
    try {
      const formData = new FormData();
      formData.append('cv', cvFile);

      await api.post(`/offers/${id}/applications`, formData);

      setApplySuccess(true);
      setAlreadyApplied(true);
    } catch (err) {
      const errors = err.response?.data?.errors;
      const firstError = errors ? Object.values(errors)[0]?.[0] : null;
      setApplyError(
        firstError || err.response?.data?.message || 'No se ha podido enviar tu candidatura.'
      );
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <p className="text-center text-text-secondary py-12">Cargando oferta...</p>;
  }

  if (needsLogin) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <p className="text-text-secondary mb-4">Inicia sesión para ver el detalle de esta oferta.</p>
        <Button variant="primary" onClick={() => navigate('/login')}>Iniciar sesión</Button>
      </div>
    );
  }

  if (notFound || !offer) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <p className="text-text-secondary mb-4">No se ha encontrado esta oferta.</p>
        <Link to="/"><Button variant="outline">Volver a ofertas</Button></Link>
      </div>
    );
  }

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
              <span className={`inline-flex items-center px-3 py-1 text-sm font-bold rounded-full ${
                offer.is_active ? 'bg-state-accepted-bg text-state-accepted-text' : 'bg-state-rejected-bg text-state-rejected-text'
              }`}>
                {offer.is_active ? 'Abierta' : 'Cerrada'}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 mt-6 text-sm text-text-secondary border-t border-border pt-4">
              <span className="flex items-center">📍 {offer.location}</span>
              <span className="flex items-center">🏷️ {offer.category}</span>
              {offer.published_at && <span className="flex items-center">📅 Publicado {offer.published_at}</span>}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-text-primary mb-4">Descripción del puesto</h2>
            <p className="text-text-secondary leading-relaxed">
              {offer.description}
            </p>
          </Card>
        </div>

        {/* Columna Lateral (Acciones) -- solo relevante para estudiantes */}
        {user?.role === 'student' && (
          <div className="space-y-6">
            <Card className="sticky top-24 border-sky-primary/20 shadow-md">
              <h3 className="font-bold text-text-primary mb-4">¿Te interesa?</h3>

              {!offer.is_active ? (
                <p className="text-sm text-text-secondary">Esta oferta ya no está abierta.</p>
              ) : alreadyApplied || applySuccess ? (
                <p className="text-sm text-state-accepted-text font-medium">
                  Ya te has inscrito a esta oferta. Consulta el estado en "Mis candidaturas".
                </p>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  {applyError && (
                    <div className="p-3 text-sm text-state-rejected-text bg-state-rejected-bg rounded-lg border border-red-200">
                      {applyError}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-bold text-text-primary mb-1">Tu CV (PDF, máx. 2MB)</label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setCvFile(e.target.files[0])}
                      className="w-full text-sm text-text-secondary file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-sky-50 file:text-sky-primary file:font-bold"
                    />
                  </div>
                  <Button variant="primary" className="w-full" type="submit" disabled={applying}>
                    {applying ? 'Enviando...' : 'Inscribirme'}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        )}

      </div>
    </div>
  );
}
