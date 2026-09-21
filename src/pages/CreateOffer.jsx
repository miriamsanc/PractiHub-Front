import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import api from '../services/api';

export default function CreateOffer() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estado del formulario con todos tus campos
  const [formData, setFormData] = useState({
    title: '',
    modality: '', 
    location: '',
    duration: '',
    remuneration: '',
    description: '',
    requirements: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Enviamos los datos a Laravel
      await api.post('/offers', formData);
      navigate('/dashboard'); // Ajusta esta ruta si es diferente, ej. '/dashboard-empresa'
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Ha ocurrido un error al publicar la oferta.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Botón de volver */}
      <Link to="/dashboard" className="inline-flex items-center text-text-secondary hover:text-violet-primary font-medium transition-colors">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver al panel
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text-primary">Publicar nueva oferta</h1>
        <p className="text-text-secondary mt-1">Completa los detalles para encontrar al candidato ideal para tu empresa.</p>
      </div>

      <Card>
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm font-medium">
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

          {/* Fila de detalles técnicos (Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-text-primary mb-1">Modalidad</label>
              <select 
                name="modality"
                required
                value={formData.modality}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:border-violet-primary focus:ring-1 focus:ring-violet-primary bg-surface text-text-primary transition-colors appearance-none"
              >
                <option value="">Selecciona modalidad...</option>
                <option value="remoto">100% Remoto</option>
                <option value="hibrido">Híbrido</option>
                <option value="presencial">Presencial</option>
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

            <div>
              <label className="block text-sm font-bold text-text-primary mb-1">Duración de las prácticas</label>
              <input 
                type="text" 
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Ej. 6 meses" 
                className="w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:border-violet-primary focus:ring-1 focus:ring-violet-primary bg-surface text-text-primary transition-colors" 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-text-primary mb-1">Ayuda económica (Remuneración)</label>
              <input 
                type="text" 
                name="remuneration"
                value={formData.remuneration}
                onChange={handleChange}
                placeholder="Ej. 600€/mes" 
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
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe las tareas, el equipo y lo que aprenderá el estudiante..." 
              className="w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:border-violet-primary focus:ring-1 focus:ring-violet-primary bg-surface text-text-primary transition-colors resize-none" 
            ></textarea>
          </div>

          {/* Requisitos */}
          <div>
            <label className="block text-sm font-bold text-text-primary mb-1">Requisitos (separados por guiones)</label>
            <textarea 
              name="requirements"
              rows="3"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="- Conocimientos en React&#10;- Ganas de aprender&#10;- Poder firmar convenio" 
              className="w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:border-violet-primary focus:ring-1 focus:ring-violet-primary bg-surface text-text-primary transition-colors resize-none" 
            ></textarea>
          </div>

          {/* Acciones */}
          <div className="pt-6 border-t border-border flex flex-col-reverse md:flex-row justify-end gap-4">
            <Link to="/dashboard" className="w-full md:w-auto">
              <Button type="button" variant="outline" className="w-full hover:!border-violet-primary hover:!text-violet-primary">
                Cancelar
              </Button>
            </Link>
            <Button 
              type="submit" 
              variant="secondary" 
              className="w-full md:w-auto"
              disabled={loading}
            >
              {loading ? 'Publicando...' : 'Publicar oferta'}
            </Button>
          </div>

        </form>
      </Card>
    </div>
  );
}