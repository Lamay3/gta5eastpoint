import { ShieldCheck, Users, Zap } from 'lucide-react';
import ServerStatusHUD from '@/components/ServerStatusHUD';

const features = [
{ icon: Users, title: 'Comunitate activă', text: 'Sute de caractere, facțiuni și povești care se scriu zilnic.' },
{ icon: ShieldCheck, title: 'Staff dedicat', text: 'Echipă prezentă, reguli clare și suport rapid în orice situație.' },
{ icon: Zap, title: 'Economie vie', text: 'Joburi, business-uri și un oraș care reacționează la fiecare decizie.' }];


export default function AboutSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <ServerStatusHUD />

        <div>
          
          <h2 className="mt-3 font-heading text-3xl font-bold leading-tight sm:text-4xl">
            O jurisdicție digitală vie.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Nu e doar un server — e un oraș simulat în care fiecare alegere contează. Roleplay de înaltă fidelitate, fără compromisuri.
          </p>

          <div className="mt-9 space-y-4">
            {features.map(({ icon: Icon, title, text }) =>
            <div key={title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent-ice/30 text-accent-ice">
                  <Icon size={17} />
                </div>
                <div>
                  <div className="font-heading text-sm font-bold tracking-tight">{title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}