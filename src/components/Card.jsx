export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-surface border border-border shadow-soft rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}