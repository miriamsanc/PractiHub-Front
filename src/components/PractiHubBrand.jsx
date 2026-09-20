import logo from '../assets/logo-practihub.jpg';

export function PractiHubBrand({ onClick }) {
  return (
    <button 
      onClick={onClick} 
      className="flex items-center gap-2.5 group text-left focus:outline-none"
    >
      {/* Recorte limpio directamente sobre la imagen */}
      <div className="h-10 w-10 overflow-hidden rounded-xl shadow-sm border border-sky-100/50 transition group-hover:scale-105">
        <img 
          src={logo} 
          alt="PractiHub Logo" 
          className="h-full w-full object-cover"
        />
      </div>
      <span className="text-xl font-bold tracking-tight">
        <span className="text-text-primary">Practi</span>
        <span className="text-sky-primary">Hub</span>
      </span>
    </button>
  );
}