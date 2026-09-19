import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Button from './components/Button';
import Card from './components/Card';
import Badge from './components/Badge';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-text-primary font-sans">
        <header className="p-4 border-b border-border bg-surface shadow-soft">
          <h1 className="text-xl font-bold text-sky-primary">PractiHub</h1>
        </header>

        <main className="p-6 max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Prueba del Sistema de Diseño</h2>
                
                <Card>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-text-primary">Desarrollador Frontend Junior</h3>
                      <p className="text-text-secondary">Empresa Tech SL</p>
                    </div>
                    <Badge status="review" label="En revisión" />
                  </div>
                  
                  <div className="flex gap-4 mt-6">
                    <Button variant="primary">Aplicar ahora</Button>
                    <Button variant="secondary">Ver empresa</Button>
                    <Button variant="outline">Guardar</Button>
                  </div>
                </Card>
              </div>
            } />
            <Route path="/login" element={<h2>Página de Login</h2>} />
            <Route path="/register" element={<h2>Página de Registro</h2>} />
            <Route path="/dashboard" element={<h2>Panel Principal</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
