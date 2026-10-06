import { useState } from 'react';
import { Send, User, Hash, FileText, Clock, Shield } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const departamente = ['Staff', 'Moderator', 'Admin', 'Support', 'Developer'];
const disponibilitati = [
  'Dimineața (06:00-12:00)',
  'După-amiaza (12:00-18:00)',
  'Seara (18:00-00:00)',
  'Noaptea (00:00-06:00)',
  'Flexible / Oricând',
];

const selectClass =
  'w-full border border-input bg-background/60 px-3 py-2 font-mono text-sm text-foreground focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan';

function Field({ label, icon: Icon, children }) {
  return (
    <div className="space-y-1.5">
      <Label className="flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-muted-foreground">
        {Icon && <Icon size={12} className="text-accent-cyan" />}
        {label}
      </Label>
      {children}
    </div>
  );
}

export default function StaffApplicationForm() {
  const [form, setForm] = useState({
    alias: '', ore_jucate: '', server_id: '', motivatie: '',
    disponibilitate: '', departament: 'Staff',
  });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await base44.entities.StaffApplication.create({
        ...form,
        ore_jucate: Number(form.ore_jucate),
        status: 'pending',
      });
      setDone(true);
    } catch (err) {
      alert('Eroare la transmitere: ' + err.message);
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="glass p-8 text-center">
        <div className="mb-2 font-mono text-xs tracking-[0.2em] text-accent-cyan">// TRANSMISSION COMPLETE</div>
        <p className="font-heading text-xl">Dosarul tău a fost înregistrat în sistem.</p>
        <p className="mt-1 text-sm text-muted-foreground">Vei fi contactat pe Discord dacă profilul avansează.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass space-y-5 p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="ALIAS ÎN JOC" icon={User}>
          <Input value={form.alias} onChange={(e) => set('alias', e.target.value)} required
            className="border-input bg-background/60 font-mono" placeholder="ex. NightOwl" />
        </Field>
        <Field label="DEPARTAMENT DORIT" icon={Shield}>
          <select value={form.departament} onChange={(e) => set('departament', e.target.value)} className={selectClass}>
            {departamente.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </Field>
        <Field label="ORE JUCATE PE SERVER" icon={Clock}>
          <Input type="number" min="0" value={form.ore_jucate} onChange={(e) => set('ore_jucate', e.target.value)} required
            className="border-input bg-background/60 font-mono" placeholder="ex. 240" />
        </Field>
        <Field label="ID SERVER" icon={Hash}>
          <Input value={form.server_id} onChange={(e) => set('server_id', e.target.value)} required
            className="border-input bg-background/60 font-mono" placeholder="ex. 1024" />
        </Field>
      </div>
      <Field label="DISPONIBILITATE" icon={Clock}>
        <select value={form.disponibilitate} onChange={(e) => set('disponibilitate', e.target.value)} required className={selectClass}>
          <option value="">— Selectează fus orar —</option>
          {disponibilitati.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </Field>
      <Field label="MOTIVAȚIA ALĂTURĂRII DEPARTAMENTULUI" icon={FileText}>
        <Textarea value={form.motivatie} onChange={(e) => set('motivatie', e.target.value)} required rows={5}
          className="border-input bg-background/60 font-body leading-relaxed"
          placeholder="De ce vrei să faci parte din echipa noastră?" />
      </Field>
      <button
        type="submit"
        disabled={sending}
        className="group flex w-full items-center justify-center gap-2 border border-accent-cyan bg-accent-cyan/10 py-3 font-mono text-sm tracking-[0.2em] text-accent-cyan transition hover:neon-glow disabled:opacity-50"
      >
        <Send size={16} className="transition group-hover:translate-x-0.5" />
        {sending ? 'TRANSMITTING...' : 'TRANSMITE DOSAR'}
      </button>
    </form>
  );
}