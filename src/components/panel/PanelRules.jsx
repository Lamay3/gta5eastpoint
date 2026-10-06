import { useEffect, useState } from 'react';
import { Plus, Trash2, Pencil, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const categorii = ['Generale', 'Roleplay', 'Combat', 'Chat & Voice', 'Sancțiuni', 'Technical'];
const selectClass = 'w-full border border-input bg-background/60 px-3 py-2 font-mono text-sm focus:border-accent-cyan focus:outline-none';

const blank = { cod: '', titlu: '', continut: '', categorie: 'Generale', ordine: 0 };

export default function PanelRules() {
  const [rules, setRules] = useState([]);
  const [editing, setEditing] = useState(null);
  const load = () => base44.entities.Rule.list('ordine', 200).then(setRules).catch(() => {});
  useEffect(() => { load(); }, []);

  const startNew = () => setEditing({ ...blank });
  const startEdit = (r) => setEditing({ ...r });
  const setField = (k, v) => setEditing((e) => ({ ...e, [k]: v }));

  const save = async () => {
    if (!editing.titlu || !editing.cod) { alert('Cod și titlu obligatorii'); return; }
    if (editing.id) await base44.entities.Rule.update(editing.id, editing);
    else await base44.entities.Rule.create(editing);
    setEditing(null);
    load();
  };
  const del = async (id) => {
    if (!confirm('Ștergi regula?')) return;
    await base44.entities.Rule.delete(id);
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">// {rules.length} REGULI</div>
        <button onClick={startNew} className="flex items-center gap-2 border border-accent-cyan bg-accent-cyan/10 px-4 py-2 font-mono text-xs tracking-widest text-accent-cyan hover:neon-glow">
          <Plus size={14} /> ADAUGĂ
        </button>
      </div>

      {editing && (
        <div className="glass space-y-3 border-accent-cyan/40 p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] tracking-[0.2em] text-accent-cyan">{editing.id ? '// EDITEAZĂ' : '// NOU'}</span>
            <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground"><X size={16} /></button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label className="font-mono text-[11px] text-muted-foreground">COD</Label>
              <Input value={editing.cod} onChange={(e) => setField('cod', e.target.value)} className="border-input bg-background/60 font-mono" placeholder="RULE_01" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label className="font-mono text-[11px] text-muted-foreground">TITLU</Label>
              <Input value={editing.titlu} onChange={(e) => setField('titlu', e.target.value)} className="border-input bg-background/60 font-mono" />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="font-mono text-[11px] text-muted-foreground">CATEGORIE</Label>
              <select value={editing.categorie} onChange={(e) => setField('categorie', e.target.value)} className={selectClass}>
                {categorii.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="font-mono text-[11px] text-muted-foreground">ORDINE</Label>
              <Input type="number" value={editing.ordine ?? 0} onChange={(e) => setField('ordine', Number(e.target.value))} className="border-input bg-background/60 font-mono" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="font-mono text-[11px] text-muted-foreground">CONȚINUT</Label>
            <Textarea value={editing.continut} onChange={(e) => setField('continut', e.target.value)} rows={4} className="border-input bg-background/60 font-body leading-relaxed" />
          </div>
          <button onClick={save} className="border border-accent-cyan bg-accent-cyan/10 px-5 py-2 font-mono text-xs tracking-widest text-accent-cyan hover:neon-glow">SALVEAZĂ</button>
        </div>
      )}

      <div className="space-y-2">
        {rules.map((r) => (
          <div key={r.id} className="glass flex items-start justify-between gap-3 p-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-accent-violet">{r.cod}</span>
                <span className="font-heading font-bold">{r.titlu}</span>
                <span className="font-mono text-[10px] text-muted-foreground">[{r.categorie}]</span>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.continut}</p>
            </div>
            <div className="flex gap-1.5">
              <button onClick={() => startEdit(r)} className="text-muted-foreground hover:text-accent-cyan"><Pencil size={15} /></button>
              <button onClick={() => del(r.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
        {rules.length === 0 && <div className="glass p-4 font-mono text-sm text-muted-foreground">// FĂRĂ REGULI — adaugă prima.</div>}
      </div>
    </div>
  );
}