import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          {/* Ruta principal que carga la nueva página Home */}
          <Route path="/" element={<Home />} />

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
