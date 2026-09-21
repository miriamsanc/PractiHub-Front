import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const isStudent = user?.role === 'student';

  // GET/PUT/DELETE van a /users/{id} para estudiantes y /companies/{id} para empresas
  const resourcePath = isStudent ? `/users/${user?.id}` : `/companies/${user?.id}`;

  const [formData, setFormData] = useState({ name: '', email: '' });
  const [hasCv, setHasCv] = useState(false);
  const [cvFile, setCvFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    if (!user) return;
    api
      .get(resourcePath)
      .then((res) => {
        const profile = res.data.data || res.data;
        setFormData({ name: profile.name || '', email: profile.email || '' });
        setHasCv(Boolean(profile.has_cv));
      })
      .catch(() => setError('No se ha podido cargar tu perfil.'))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      let response;
      if (isStudent && cvFile) {
        // Con archivo hay que enviarlo como multipart/form-data.
        // La API pide POST + _method=PUT para poder leer el fichero.
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('cv', cvFile);
        data.append('_method', 'PUT');
        response = await api.post(resourcePath, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        response = await api.put(resourcePath, {
          name: formData.name,
          email: formData.email,
        });
      }

      const profile = response.data.data || response.data;
      setHasCv(Boolean(profile.has_cv));
      setCvFile(null);
      updateUser({ name: profile.name, email: profile.email });
      setSuccess(true);
    } catch (err) {
      const errors = err.response?.data?.errors;
      const firstError = errors ? Object.values(errors)[0]?.[0] : null;
      setError(firstError || err.response?.data?.message || 'No se han podido guardar los cambios.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        'Esta acción eliminará tu cuenta de forma permanente y no se puede deshacer. ¿Quieres continuar?'
      )
    ) {
      return;
    }
    setDeleting(true);
    setDeleteError(null);
    try {
      await api.delete(resourcePath);
      logout();
      navigate('/');
    } catch (err) {
      setDeleteError(err.response?.data?.message || 'No se ha podido eliminar tu cuenta.');
      setDeleting(false);
    }
  };

  if (loading) {
    return <p className="text-center text-text-secondary py-12">Cargando tu perfil...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Mi perfil</h1>
        <p className="text-text-secondary mt-1">
          {isStudent ? 'Gestiona tus datos personales y tu CV.' : 'Gestiona los datos de tu empresa.'}
        </p>
      </div>

      <Card>
        {error && (
          <div className="mb-6 p-4 bg-state-rejected-bg text-state-rejected-text rounded-xl text-sm font-medium">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-state-accepted-bg text-state-accepted-text rounded-xl text-sm font-medium">
            Perfil actualizado correctamente.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-text-primary mb-1">
              {isStudent ? 'Nombre completo' : 'Nombre de la empresa'}
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:border-violet-primary focus:ring-1 focus:ring-violet-primary bg-surface text-text-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-text-primary mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-border-input focus:outline-none focus:border-violet-primary focus:ring-1 focus:ring-violet-primary bg-surface text-text-primary transition-colors"
            />
          </div>

          {isStudent && (
            <div>
              <label className="block text-sm font-bold text-text-primary mb-1">Tu CV</label>
              <p className="text-sm text-text-secondary mb-2">
                {hasCv ? '✅ Ya tienes un CV subido.' : 'Todavía no has subido tu CV.'}
              </p>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setCvFile(e.target.files[0])}
                className="w-full text-sm text-text-secondary file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-sky-50 file:text-sky-hover file:font-bold hover:file:bg-sky-100 transition-colors cursor-pointer"
              />
              <p className="text-xs text-text-muted mt-1">
                {hasCv
                  ? 'Sube un nuevo archivo para reemplazar el actual (PDF, máx. 2MB).'
                  : 'PDF, máx. 2MB. Este CV es tu perfil general, independiente del que adjuntas al inscribirte en cada oferta.'}
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-border flex justify-end">
            <Button type="submit" variant="secondary" disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </Button>
          </div>
        </form>
      </Card>

      {/* Zona peligrosa */}
      <Card className="border-state-rejected-text/20">
        <h2 className="font-bold text-text-primary mb-1">Eliminar cuenta</h2>
        <p className="text-sm text-text-secondary mb-4">
          Esta acción es permanente: se eliminará tu cuenta y no podrás recuperarla.
        </p>
        {deleteError && (
          <div className="mb-4 p-3 bg-state-rejected-bg text-state-rejected-text rounded-xl text-sm font-medium">
            {deleteError}
          </div>
        )}
        <button
          onClick={handleDeleteAccount}
          disabled={deleting}
          className="px-4 py-2 text-sm font-bold rounded-xl bg-state-rejected-bg text-state-rejected-text hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          {deleting ? 'Eliminando...' : 'Eliminar mi cuenta'}
        </button>
      </Card>
    </div>
  );
}
