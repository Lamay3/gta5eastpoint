import { Link } from 'react-router-dom';
import { useServerConfig } from '@/lib/useServerConfig';

export default function Footer() {
  const { data: config } = useServerConfig();
  return (
    <footer className="relative z-10 border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-8 md:flex-row">
        <div className="font-mono text-[11px] tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} {config?.server_name || 'GTA5 Eastpoint'}
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px] tracking-widest text-muted-foreground">
          <Link to="/regulament" className="hover:text-accent-cyan">REGULAMENT</Link>
          <Link to="/aplicatii" className="hover:text-accent-cyan">APLICAȚII STAFF</Link>
        </div>
      </div>
    </footer>
  );
}import { Link } from 'react-router-dom';
import { useServerConfig } from '@/lib/useServerConfig';

export default function Footer() {
  const { data: config } = useServerConfig();
  return (
    <footer className="relative z-10 border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-8 md:flex-row">
        <div className="font-mono text-[11px] tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} {config?.server_name || 'GTA5 Eastpoint'}
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px] tracking-widest text-muted-foreground">
          <Link to="/regulament" className="hover:text-accent-cyan">REGULAMENT</Link>
          <Link to="/aplicatii" className="hover:text-accent-cyan">APLICAȚII STAFF</Link>
        </div>
      </div>
    </footer>
  );
}