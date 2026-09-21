/**
 * Convierte una fecha ISO a un formato relativo en español (ej. "Hace 2 días")
 */
export const formatTimeAgo = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  const intervals = {
    año: 31536000,
    mes: 2592000,
    semana: 604800,
    día: 86400,
    hora: 3600,
    minuto: 60
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / secondsInUnit);
    if (interval >= 1) {
      return `Hace ${interval} ${unit}${interval === 1 ? '' : (unit === 'mes' ? 'es' : 's')}`;
    }
  }
  
  return 'Hace un momento';
};