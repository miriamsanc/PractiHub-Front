import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import api from '../services/api';

export default function OffersPage() {
  // Estados de datos
  const [offers, setOffers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados de filtros (Solo Ubicación y Categoría, como permite la API)
  const [selectedCategory, setSelectedCategory] = useState('');
  const [locationSearch, setLocationSearch] = useState('');

  // 1. Cargar categorías al montar el componente (GET /categories)
  useEffect(() => {
    api
      .get('/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('Error al cargar categorías:', err));
  }, []);

  // 2. Cargar ofertas con filtros aplicados (GET /offers)
  const fetchOffers = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/offers', { params });
      setOffers(response.data.data || response.data);
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

  useEffect(() => {
    fetchOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchOffers({
      category_id: selectedCategory || undefined,
      location: locationSearch || undefined,
    });
  };

  return (
    <div className="space-y-8">
      {/* Cabecera y Buscador */}
      <Card>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
          Encuentra tus prácticas profesionales
        </h1>
        <p className="text-text-secondary mb-6 text-sm sm:text-base">
          Explora las oportunidades disponibles filtrando por categoría o ubicación.
        </p>

        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          {/* Filtro: Categoría */}
          <div className="sm:col-span-5">
            <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">
              Categoría
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-border-input bg-surface text-text-primary focus:outline-none focus:ring-1 focus:ring-sky-primary focus:border-sky-primary text-sm"
            >
              <option value="">Todas las categorías</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro: Ubicación */}
          <div className="sm:col-span-5">
            <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">
              Ubicación
            </label>
            <input
              type="text"
              placeholder="Ej. Madrid, Barcelona..."
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-border-input bg-surface text-text-primary focus:outline-none focus:ring-1 focus:ring-sky-primary focus:border-sky-primary text-sm placeholder:text-text-muted"
            />
          </div>

          {/* Botón Buscar */}
          <div className="sm:col-span-2 flex items-end">
            <Button type="submit" variant="primary" className="w-full h-11 !py-0 justify-center">
              Buscar
            </Button>
          </div>
        </form>
      </Card>

      {/* Listado de Ofertas */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-text-primary">
            {!loading && !error && `Ofertas disponibles (${offers.length})`}
          </h2>
        </div>

        {loading && (
          <p className="text-center text-text-secondary py-12">Cargando ofertas...</p>
        )}

        {error === 'login' && (
          <Card className="text-center py-12">
            <p className="text-text-secondary mb-4">Inicia sesión para ver las ofertas disponibles.</p>
            <Link to="/login">
              <Button variant="primary">Iniciar sesión</Button>
            </Link>
          </Card>
        )}

        {error === 'generic' && (
          <Card className="text-center py-12">
            <p className="text-state-rejected-text">
              No se han podido cargar las ofertas. Inténtalo de nuevo más tarde.
            </p>
          </Card>
        )}

        {!loading && !error && offers.length === 0 && (
          <Card className="text-center py-12 text-text-secondary">
            No se encontraron ofertas con estos filtros.
          </Card>
        )}

        {!loading && !error && offers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <Card
                key={offer.id}
                className="flex flex-col h-full hover:border-sky-primary transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-hover whitespace-nowrap">
                    {offer.category || 'General'}
                  </span>
                  {!offer.is_active && (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-state-rejected-bg text-state-rejected-text whitespace-nowrap">
                      Cerrada
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-text-primary leading-snug mb-1">
                  {offer.title}
                </h3>
                <p className="text-sm text-text-secondary font-medium mb-3">
                  {offer.company || 'Empresa confidencial'} • {offer.location}
                </p>

                <p className="text-text-secondary text-sm mb-6 line-clamp-3 flex-grow">
                  {offer.description}
                </p>

                <div className="pt-4 border-t border-border mt-auto">
                  <Link to={`/ofertas/${offer.id}`} className="w-full block">
                    <Button variant="outline" className="w-full">
                      Ver detalles
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
