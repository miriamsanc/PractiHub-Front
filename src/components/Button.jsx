export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles = "inline-flex justify-center items-center px-6 py-3 font-semibold rounded-xl transition-colors duration-200";
  
  const variants = {
    primary: "bg-sky-primary hover:bg-sky-hover text-text-primary",
    secondary: "bg-violet-primary hover:bg-violet-hover text-text-primary",
    outline: "border-2 border-border text-text-secondary hover:border-sky-primary hover:text-sky-primary bg-transparent",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}