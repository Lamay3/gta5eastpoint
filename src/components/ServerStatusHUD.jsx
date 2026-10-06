import { useEffect, useState } from 'react';
import { Users, Activity, Clock, RefreshCw } from 'lucide-react';
import { useServerStatus } from '@/lib/useServerStatus';

function useRolling(value) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    if (value === display) return;
    const start = display;
    const end = value;
    const dur = 600;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      setDisplay(Math.round(start + (end - start) * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return display;
}

function formatUptime(sec) {
  if (!sec) return '--';
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return `${d}z ${h}o ${m}m`;
}

function useCountdown(target) {
  const [left, setLeft] = useState(null);
  useEffect(() => {
    if (!target) return;
    const tick = () => setLeft(Math.max(0, (new Date(target).getTime() - Date.now()) / 1000));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  if (left == null) return '--';
  const h = Math.floor(left / 3600);
  const m = Math.floor((left % 3600) / 60);
  const s = Math.floor(left % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function Stat({ icon: Icon, label, value, accent }) {
  const color = accent === 'violet' ? 'text-accent-violet' : 'text-accent-ice';
  return (
    <div className="rounded-xl border border-border/50 bg-background/40 p-3">
      <Icon className={`${color} mb-2`} size={16} />
      <div className={`font-mono text-lg font-bold tabular-nums sm:text-xl ${color}`}>{value}</div>
      <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">{label}</div>
    </div>
  );
}

export default function ServerStatusHUD() {
  const { status, loading, reload } = useServerStatus();
  const players = useRolling(status?.players ?? 0);
  const countdown = useCountdown(status?.next_restart);
  const online = status?.online;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-surface/40 p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${online ? 'animate-pulse-glow bg-emerald-400' : 'bg-destructive'}`} />
          <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
            {loading && !status ? 'SYNCING...' : online ? 'SYSTEM ONLINE' : 'SYSTEM OFFLINE'}
          </span>
        </div>
        <button onClick={reload} className="text-muted-foreground transition hover:text-accent-ice" aria-label="Reîncarcă">
          <RefreshCw size={14} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Stat icon={Users} label="CETĂȚENI" value={players} accent="cyan" />
        <Stat icon={Activity} label="UPTIME" value={formatUptime(status?.uptime_seconds)} accent="violet" />
        <Stat icon={Clock} label="RESTART" value={countdown} accent="cyan" />
      </div>
      {!status?.configured && (
        <div className="mt-4 font-mono text-[10px] tracking-widest text-muted-foreground">
          // STATUS NECONFIGURAT — setează adresa server în Informații Server
        </div>
      )}
    </div>
  );
}