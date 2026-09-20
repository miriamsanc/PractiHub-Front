import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import api from '../services/api';

export default function Home() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/offers', { params });
      setOffers(response.data.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('login');
      } else {
        setError('generic');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Buscamos tanto por categoría como por ubicación con el mismo texto,
    // ya que de momento solo tenemos un único campo de búsqueda visual.
    fetchOffers({ category_id: undefined, location: search });
  };

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
        
        <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Busca por ubicación (ej. Madrid, Barcelona...)"
            className="w-full px-4 py-3 rounded-xl border border-border-input focus:outline-none focus:border-sky-primary focus:ring-1 focus:ring-sky-primary transition-colors bg-surface text-text-primary"
          />
          <Button variant="primary" className="!px-8" type="submit">
            Buscar
          </Button>
        </form>
      </section>

      {/* Grid de Ofertas */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-text-primary">Ofertas recientes</h2>
          {!loading && <span className="text-text-secondary font-medium">{offers.length} resultados</span>}
        </div>

        {loading && (
          <p className="text-center text-text-secondary py-12">Cargando ofertas...</p>
        )}

        {error === 'login' && (
          <div className="text-center py-12">
            <p className="text-text-secondary mb-4">Inicia sesión para ver las ofertas disponibles.</p>
            <Link to="/login">
              <Button variant="primary">Iniciar sesión</Button>
            </Link>
          </div>
        )}

        {error === 'generic' && (
          <p className="text-center text-state-rejected-text py-12">
            No se han podido cargar las ofertas. Inténtalo de nuevo más tarde.
          </p>
        )}

        {!loading && !error && offers.length === 0 && (
          <p className="text-center text-text-secondary py-12">No hay ofertas disponibles ahora mismo.</p>
        )}

        {!loading && !error && offers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <Card key={offer.id} className="flex flex-col h-full hover:border-sky-primary transition-colors duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary leading-snug">{offer.title}</h3>
                    <p className="text-sm text-text-secondary font-medium mt-1">
                      {offer.company} • {offer.location}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 text-xs font-bold rounded-full bg-sky-50 text-sky-primary whitespace-nowrap">
                    {offer.category}
                  </span>
                </div>

                <p className="text-text-secondary text-sm mb-6 line-clamp-3 flex-grow">
                  {offer.description}
                </p>

                <div className="pt-4 border-t border-border mt-auto flex justify-between items-center">
                  <Link to={`/ofertas/${offer.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      Ver detalles
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}