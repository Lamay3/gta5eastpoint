import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useServerConfig } from '@/lib/useServerConfig';

const links = [
  { to: '/', label: 'HOME' },
  { to: '/aplicatii', label: 'APLICAȚII STAFF' },
  { to: '/regulament', label: 'REGULAMENT' },
  { to: '/panel', label: 'INFORMAȚII SERVER' },
];

export default function Navbar() {
  const { data: config } = useServerConfig();
  const [open, setOpen] = useState(false);
  const itemClass = ({ isActive }) =>
    `px-3 py-2 font-mono text-[11px] tracking-[0.2em] transition ${isActive ? 'text-accent-cyan neon-text' : 'text-muted-foreground hover:text-foreground'}`;
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="inline-flex h-7 w-10 -skew-x-6 items-center justify-center rounded-l-full rounded-r-[2px] bg-accent-ice font-heading text-[10px] font-bold tracking-tight text-background">
            NC
          </span>
          <span className="font-heading text-base font-bold tracking-tight md:text-lg">
            {config?.server_name || 'GTA5 Eastpoint'}
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={itemClass}>{l.label}</NavLink>
          ))}
        </nav>
        <button className="text-foreground md:hidden" onClick={() => setOpen(!open)} aria-label="Meniu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col border-t border-border/60 px-5 py-2 md:hidden">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setOpen(false)} className={itemClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}