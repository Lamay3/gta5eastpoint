import { Link } from 'react-router-dom';

const styles = {
  solid: 'bg-accent-ice text-background',
  outline: 'border border-accent-ice/40 text-accent-ice hover:bg-accent-ice/10',
};

export default function PillButton({ to, href, variant = 'solid', children, className = '' }) {
  const cls = `pill-slant group inline-flex items-center gap-2 px-8 py-3.5 font-heading text-sm font-bold uppercase tracking-widest ${styles[variant]} ${className}`;
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={cls}>
      {children}
    </Link>
  );
}