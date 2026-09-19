import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

export default function CreateOffer() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Botón de volver */}
      <Link to="/dashboard-empresa" className="inline-flex items-center text-text-secondary hover:text-violet-primary font-medium transition-colors">
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
        <form className="space-y-6">
          
          {/* Título de la oferta */}
          <div>
            <label className="block text-sm font-bold text-text-primary mb-1">Título del puesto</label>
            <input 
              type="text" 
              placeholder="Ej. Desarrollador Frontend Junior" 
              className="w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:border-violet-primary focus:ring-1 focus:ring-violet-primary bg-surface text-text-primary transition-colors" 
            />
          </div>

          {/* Fila de detalles técnicos (Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-text-primary mb-1">Modalidad</label>
              <select className="w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:border-violet-primary focus:ring-1 focus:ring-violet-primary bg-surface text-text-primary transition-colors appearance-none">
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
                placeholder="Ej. Madrid, España" 
                className="w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:border-violet-primary focus:ring-1 focus:ring-violet-primary bg-surface text-text-primary transition-colors" 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-text-primary mb-1">Duración de las prácticas</label>
              <input 
                type="text" 
                placeholder="Ej. 6 meses" 
                className="w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:border-violet-primary focus:ring-1 focus:ring-violet-primary bg-surface text-text-primary transition-colors" 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-text-primary mb-1">Ayuda económica (Remuneración)</label>
              <input 
                type="text" 
                placeholder="Ej. 600€/mes" 
                className="w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:border-violet-primary focus:ring-1 focus:ring-violet-primary bg-surface text-text-primary transition-colors" 
              />
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-bold text-text-primary mb-1">Descripción del puesto</label>
            <textarea 
              rows="4"
              placeholder="Describe las tareas, el equipo y lo que aprenderá el estudiante..." 
              className="w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:border-violet-primary focus:ring-1 focus:ring-violet-primary bg-surface text-text-primary transition-colors resize-none" 
            ></textarea>
          </div>

          {/* Requisitos */}
          <div>
            <label className="block text-sm font-bold text-text-primary mb-1">Requisitos (separados por guiones)</label>
            <textarea 
              rows="3"
              placeholder="- Conocimientos en React&#10;- Ganas de aprender&#10;- Poder firmar convenio" 
              className="w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:border-violet-primary focus:ring-1 focus:ring-violet-primary bg-surface text-text-primary transition-colors resize-none" 
            ></textarea>
          </div>

          {/* Acciones */}
          <div className="pt-6 border-t border-border flex flex-col-reverse md:flex-row justify-end gap-4">
            <Link to="/dashboard-empresa" className="w-full md:w-auto">
              <Button variant="outline" className="w-full hover:!border-violet-primary hover:!text-violet-primary">
                Cancelar
              </Button>
            </Link>
            {/* variant="secondary" para usar el color violeta */}
            <Button type="button" variant="secondary" className="w-full md:w-auto">
              Publicar oferta
            </Button>
          </div>

        </form>
      </Card>
    </div>
  );
}