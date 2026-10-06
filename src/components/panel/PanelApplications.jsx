import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

const STATUSES = ['pending', 'review', 'accepted', 'rejected'];
const statusColor = {
  pending: 'text-muted-foreground border-border',
  review: 'text-accent-cyan border-accent-cyan/50',
  accepted: 'text-green-400 border-green-400/50',
  rejected: 'text-destructive border-destructive/50',
};
const statusLabel = { pending: 'ÎN AȘTEPTARE', review: 'ÎN REVIZUIRE', accepted: 'ACCEPTAT', rejected: 'RESPINS' };

export default function PanelApplications() {
  const [apps, setApps] = useState([]);
  const load = () => base44.entities.StaffApplication.list('-created_date', 200).then(setApps).catch(() => {});
  useEffect(() => { load(); }, []);
  const setStatus = async (id, status) => { await base44.entities.StaffApplication.update(id, { status }); load(); };
  const del = async (id) => { if (confirm('Ștergi dosarul?')) { await base44.entities.StaffApplication.delete(id); load(); } };

  return (
    <div className="space-y-3">
      <div className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">// {apps.length} DOSARE</div>
      {apps.map((a) => (
        <div key={a.id} className="glass p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg font-bold">{a.alias}</span>
                <span className={`border px-2 py-0.5 font-mono text-[10px] tracking-widest ${statusColor[a.status]}`}>{statusLabel[a.status]}</span>
              </div>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
                <span>DEP: {a.departament}</span>
                <span>ORE: {a.ore_jucate}</span>
                <span>ID: {a.server_id}</span>
                <span>DISP: {a.disponibilitate}</span>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/80">{a.motivatie}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <select value={a.status} onChange={(e) => setStatus(a.id, e.target.value)} className="border border-input bg-background/60 px-2 py-1 font-mono text-xs focus:border-accent-cyan focus:outline-none">
                {STATUSES.map((s) => <option key={s} value={s}>{statusLabel[s]}</option>)}
              </select>
              <button onClick={() => del(a.id)} className="font-mono text-[10px] text-muted-foreground hover:text-destructive">ȘTERGE</button>
            </div>
          </div>
        </div>
      ))}
      {apps.length === 0 && <div className="glass p-4 font-mono text-sm text-muted-foreground">// FĂRĂ DOSARE.</div>}
    </div>
  );
}