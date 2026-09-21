import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al cargar la app, comprobamos si ya hay una sesión guardada
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Función para guardar sesión (se llamará cuando Laravel nos responda OK)
  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // Actualiza los datos del usuario en memoria y localStorage sin tocar el token
  // (útil tras editar el perfil, donde la API no devuelve un token nuevo)
  const updateUser = (partialUserData) => {
    setUser((prev) => {
      const updated = { ...prev, ...partialUserData };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};