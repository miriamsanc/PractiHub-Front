import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* Contenedor principal con el color de fondo base del Design System */}
      <div className="min-h-screen bg-background text-text-primary font-sans">
        
        {/* Aquí irá el Navbar general más adelante */}
        <header className="p-4 border-b border-border bg-surface shadow-soft">
          <h1 className="text-xl font-bold text-text-primary">PractiHub</h1>
        </header>

        <main className="p-6">
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<h2 className="text-sky-primary font-semibold">Listado Público de Ofertas</h2>} />
            <Route path="/login" element={<h2>Página de Login</h2>} />
            <Route path="/register" element={<h2>Página de Registro</h2>} />

            {/* Rutas Privadas */}
            <Route path="/dashboard" element={<h2>Panel Principal</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
