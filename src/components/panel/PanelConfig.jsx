import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const selectClass =
  'w-full border border-input bg-background/60 px-3 py-2 font-mono text-sm text-foreground focus:border-accent-cyan focus:outline-none';

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <Label className="font-mono text-[11px] tracking-[0.15em] text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

export default function PanelConfig() {
  const [cfg, setCfg] = useState(null);
  const [saving, setSaving] = useState(false);
  useEffect(() => { base44.entities.ServerConfig.list().then((l) => setCfg(l[0] || {})); }, []);
  const set = (k, v) => setCfg((c) => ({ ...c, [k]: v }));
  const save = async () => {
    setSaving(true);
    try {
      if (cfg.id) await base44.entities.ServerConfig.update(cfg.id, cfg);
      else await base44.entities.ServerConfig.create(cfg);
      alert('Configurație salvată');
    } catch (e) { alert(e.message); } finally { setSaving(false); }
  };
  if (!cfg) return <div className="font-mono text-sm text-muted-foreground">// LOADING...</div>;
  return (
    <div className="glass space-y-5 p-6">
      <div className="font-mono text-[11px] tracking-[0.2em] text-accent-cyan">// IDENTITATE</div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="NUME SERVER"><Input value={cfg.server_name || ''} onChange={(e) => set('server_name', e.target.value)} className="border-input bg-background/60 font-mono" /></Field>
        <Field label="SLOGAN"><Input value={cfg.tagline || ''} onChange={(e) => set('tagline', e.target.value)} className="border-input bg-background/60 font-mono" /></Field>
        <Field label="LOGO URL"><Input value={cfg.logo_url || ''} onChange={(e) => set('logo_url', e.target.value)} className="border-input bg-background/60 font-mono" placeholder="https://..." /></Field>
        <Field label="ADRESĂ CONECTARE FIVEM"><Input value={cfg.fivem_address || ''} onChange={(e) => set('fivem_address', e.target.value)} className="border-input bg-background/60 font-mono" placeholder="connect cfx.re/join/..." /></Field>
      </div>
      <div className="font-mono text-[11px] tracking-[0.2em] text-accent-cyan">// STATUS SERVER</div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="HOST STATUS (IP / domeniu)"><Input value={cfg.status_host || ''} onChange={(e) => set('status_host', e.target.value)} className="border-input bg-background/60 font-mono" placeholder="123.45.67.89" /></Field>
        <Field label="PORT STATUS"><Input value={cfg.status_port || ''} onChange={(e) => set('status_port', e.target.value)} className="border-input bg-background/60 font-mono" placeholder="30120" /></Field>
        <Field label="DATA PORNIRE SERVER"><Input type="datetime-local" value={cfg.started_at ? cfg.started_at.slice(0, 16) : ''} onChange={(e) => set('started_at', e.target.value ? new Date(e.target.value).toISOString() : '')} className="border-input bg-background/60 font-mono" /></Field>
        <Field label="URMĂTORUL RESTART"><Input type="datetime-local" value={cfg.next_restart_at ? cfg.next_restart_at.slice(0, 16) : ''} onChange={(e) => set('next_restart_at', e.target.value ? new Date(e.target.value).toISOString() : '')} className="border-input bg-background/60 font-mono" /></Field>
      </div>
      <div className="font-mono text-[11px] tracking-[0.2em] text-accent-cyan">// SOCIAL</div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="DISCORD URL"><Input value={cfg.discord_url || ''} onChange={(e) => set('discord_url', e.target.value)} className="border-input bg-background/60 font-mono" /></Field>
        <Field label="INSTAGRAM URL"><Input value={cfg.instagram_url || ''} onChange={(e) => set('instagram_url', e.target.value)} className="border-input bg-background/60 font-mono" /></Field>
        <Field label="YOUTUBE URL"><Input value={cfg.youtube_url || ''} onChange={(e) => set('youtube_url', e.target.value)} className="border-input bg-background/60 font-mono" /></Field>
        <Field label="TIKTOK URL"><Input value={cfg.tiktok_url || ''} onChange={(e) => set('tiktok_url', e.target.value)} className="border-input bg-background/60 font-mono" /></Field>
      </div>
      <button onClick={save} disabled={saving}
        className="flex items-center gap-2 border border-accent-cyan bg-accent-cyan/10 px-5 py-2.5 font-mono text-sm tracking-[0.15em] text-accent-cyan transition hover:neon-glow disabled:opacity-50">
        <Save size={16} /> {saving ? 'SALVARE...' : 'SALVEAZĂ CONFIG'}
      </button>
    </div>
  );
}