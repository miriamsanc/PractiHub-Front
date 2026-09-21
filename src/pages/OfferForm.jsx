import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import api from '../services/api';

export default function OfferForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [categories, setCategories] = useState([]);
  const [loadingOffer, setLoadingOffer] = useState(isEdit);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category_id: '',
    is_active: true,
  });

  // Cargamos las categorías reales para el selector
  useEffect(() => {
    api
      .get('/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('Error al cargar categorías:', err));
  }, []);

  // Si estamos editando, precargamos los datos de la oferta
  useEffect(() => {
    if (!isEdit) return;

    api
      .get(`/offers/${id}`)
      .then((res) => {
        const offer = res.data.data || res.data;
        setFormData({
          title: offer.title || '',
          description: offer.description || '',
          location: offer.location || '',
          category_id: offer.category_id || '',
          is_active: Boolean(offer.is_active),
        });
      })
      .catch(() => {
        setError('No se ha podido cargar la oferta para editarla.');
      })
      .finally(() => setLoadingOffer(false));
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // La API espera category_id como número
    const payload = {
      ...formData,
      category_id: formData.category_id ? Number(formData.category_id) : '',
    };

    try {
      if (isEdit) {
        await api.put(`/offers/${id}`, payload);
      } else {
        await api.post('/offers', payload);
      }
      navigate('/dashboard-empresa');
    } catch (err) {
      const errors = err.response?.data?.errors;
      const firstError = errors ? Object.values(errors)[0]?.[0] : null;
      setError(
        firstError || err.response?.data?.message || 'Ha ocurrido un error al guardar la oferta.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loadingOffer) {
    return <p className="text-center text-text-secondary py-12">Cargando oferta...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Botón de volver */}
      <Link
        to="/dashboard-empresa"
        className="inline-flex items-center text-text-secondary hover:text-violet-primary font-medium transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver al panel
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text-primary">
          {isEdit ? 'Editar oferta' : 'Publicar nueva oferta'}
        </h1>
        <p className="text-text-secondary mt-1">
          {isEdit
            ? 'Modifica los detalles de tu oferta de prácticas.'
            : 'Completa los detalles para encontrar al candidato ideal para tu empresa.'}
        </p>
      </div>

      <Card>
        {error && (
          <div className="mb-6 p-4 bg-state-rejected-bg text-state-rejected-text border border-state-rejected-text/20 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título de la oferta */}
          <div>
            <label className="block text-sm font-bold text-text-primary mb-1">Título del puesto</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="Ej. Desarrollador Frontend Junior"
              className="w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:border-violet-primary focus:ring-1 focus:ring-violet-primary bg-surface text-text-primary transition-colors"
            />
          </div>

          {/* Categoría y ubicación */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-text-primary mb-1">Categoría</label>
              <select
                name="category_id"
                required
                value={formData.category_id}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:border-violet-primary focus:ring-1 focus:ring-violet-primary bg-surface text-text-primary transition-colors"
              >
                <option value="">Selecciona categoría...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-primary mb-1">Ubicación</label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="Ej. Madrid, España"
                className="w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:border-violet-primary focus:ring-1 focus:ring-violet-primary bg-surface text-text-primary transition-colors"
              />
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-bold text-text-primary mb-1">Descripción del puesto</label>
            <textarea
              name="description"
              required
              rows="6"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe las tareas, el equipo, la duración, la remuneración y los requisitos del puesto..."
              className="w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:border-violet-primary focus:ring-1 focus:ring-violet-primary bg-surface text-text-primary transition-colors resize-none"
            ></textarea>
            <p className="text-xs text-text-muted mt-1">
              La API solo guarda un campo de descripción: es un buen lugar para incluir duración,
              remuneración y requisitos si quieres detallarlos.
            </p>
          </div>

          {/* Oferta activa */}
          <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="rounded border-border-input text-violet-primary focus:ring-violet-primary"
            />
            Oferta activa (visible para estudiantes)
          </label>

          {/* Acciones */}
          <div className="pt-6 border-t border-border flex flex-col-reverse md:flex-row justify-end gap-4">
            <Link to="/dashboard-empresa" className="w-full md:w-auto">
              <Button type="button" variant="outline" className="w-full hover:!border-violet-primary hover:!text-violet-primary">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" variant="secondary" className="w-full md:w-auto" disabled={loading}>
              {loading ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Publicar oferta'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
