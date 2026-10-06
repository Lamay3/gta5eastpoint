import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

export default function RulesCodex() {
  const [rules, setRules] = useState([]);
  const [active, setActive] = useState('all');

  useEffect(() => {
    base44.entities.Rule.list('ordine', 200).then(setRules).catch(() => {});
  }, []);

  const cats = ['all', ...Array.from(new Set(rules.map((r) => r.categorie).filter(Boolean)))];
  const filtered = active === 'all' ? rules : rules.filter((r) => r.categorie === active);

  return (
    <div className="grid gap-6 md:grid-cols-[200px_1fr]">
      <aside className="md:sticky md:top-24 md:self-start">
        <div className="mb-3 font-mono text-[10px] tracking-[0.2em] text-muted-foreground">// CATEGORII</div>
        <div className="flex flex-row flex-wrap gap-1.5 md:flex-col">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`border px-3 py-1.5 font-mono text-[11px] tracking-[0.15em] transition ${
                active === c
                  ? 'border-accent-cyan text-accent-cyan bg-accent-cyan/10'
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {c === 'all' ? 'TOATE' : c.toUpperCase()}
            </button>
          ))}
        </div>
      </aside>
      <div className="space-y-3">
        {filtered.map((r) => (
          <div key={r.id} className="glass p-5 transition hover:border-accent-cyan/40">
            <div className="mb-1.5 flex items-center gap-3">
              <span className="font-mono text-xs text-accent-violet">{r.cod}</span>
              <span className="font-heading text-lg font-bold">{r.titlu}</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{r.continut}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="glass p-5 font-mono text-sm text-muted-foreground">// Nu există încă reguli adăugate.</div>
        )}
      </div>
    </div>
  );
}