// Timestamp information for Tutti-Frutti
export const LAST_UPDATED = new Date().toISOString();
export const FORMATTED_DATE = new Date().toLocaleDateString('es-ES', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}); 