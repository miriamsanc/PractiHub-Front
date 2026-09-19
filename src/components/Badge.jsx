export default function Badge({ status, label }) {
  const styles = {
    pending: "bg-state-pending-bg text-state-pending-text",
    review: "bg-state-review-bg text-state-review-text",
    accepted: "bg-state-accepted-bg text-state-accepted-text",
    rejected: "bg-state-rejected-bg text-state-rejected-text",
  };

  // Por si llega un estado no contemplado, usamos pending por defecto
  const appliedStyle = styles[status] || styles.pending;

  return (
    <span className={`inline-flex items-center px-3 py-1 text-sm font-bold rounded-full ${appliedStyle}`}>
      {label}
    </span>
  );
}