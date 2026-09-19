import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Button from './components/Button';
import Card from './components/Card';
import Badge from './components/Badge';

function App() {
  return (
    <Router>
      <Routes>
        {/* Todas las rutas dentro de este Route padre compartirán el Layout */}
        <Route element={<Layout />}>
          
          {/* Ruta principal temporal con las pruebas de UI */}
          <Route path="/" element={
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Explora ofertas de prácticas</h2>
                <p className="text-text-secondary">Encuentra tu primera experiencia profesional en las mejores startups.</p>
              </div>
              
              <Card>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">Desarrollador Frontend Junior</h3>
                    <p className="text-text-secondary font-medium mt-1">Empresa Tech S.L. • Madrid / Remoto</p>
                  </div>
                  <Badge status="review" label="Nueva" />
                </div>
                
                <p className="text-text-secondary mb-6 line-clamp-2">
                  Buscamos un estudiante apasionado por React y Tailwind CSS para unirse a nuestro equipo de producto. Tendrás un mentor dedicado y flexibilidad horaria.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Aplicar ahora</Button>
                  <Button variant="outline">Ver detalles</Button>
                </div>
              </Card>
            </div>
          } />

          {/* Futuras páginas */}
          <Route path="/login" element={<h2 className="text-2xl font-bold">Página de Login</h2>} />
          <Route path="/register" element={<h2 className="text-2xl font-bold">Página de Registro</h2>} />
          <Route path="/dashboard" element={<h2 className="text-2xl font-bold">Panel Principal</h2>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
