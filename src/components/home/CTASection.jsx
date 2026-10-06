import { ArrowRight } from 'lucide-react';
import PillButton from '@/components/home/PillButton';

export default function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 text-center sm:py-28">
      <h2 className="font-heading text-3xl font-bold sm:text-5xl">Intră în rețea.</h2>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
        Aplică pentru staff sau consultă regulamentul orașului înainte de primul login.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <PillButton to="/aplicatii">
          APLICĂ STAFF <ArrowRight size={16} />
        </PillButton>
        <PillButton to="/regulament" variant="outline">
          REGULAMENT
        </PillButton>
      </div>
    </section>
  );
}