import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

const WOMAN_IMG = 'https://media.base44.com/images/public/6abebcbf8be1afb96d0b1c67/77befd70f_generated_image.png';
const MAN_IMG = 'https://media.base44.com/images/public/6abebcbf8be1afb96d0b1c67/3ccba6c20_generated_image.png';

export default function CitySection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface/40 via-background to-background" />
      <div className="relative mx-auto max-w-7xl px-5 text-center">
        <div className="font-mono text-[11px] tracking-[0.3em] text-accent-ice">// EASTPOINT</div>
        <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">Alege-ți drumul în oraș.</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Fiecare caracter are o poveste proprie — a ta începe acum.
        </p>

        <div className="mt-12 flex flex-wrap items-end justify-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="animate-float"
          >
            <Image src={WOMAN_IMG} alt="Personaj Eastpoint" fittingType="fill" className="h-[40vh] max-h-[380px] w-[220px] rounded-2xl" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="animate-float"
            style={{ animationDelay: '1.5s' }}
          >
            <Image src={MAN_IMG} alt="Personaj Eastpoint" fittingType="fill" className="h-[40vh] max-h-[380px] w-[220px] rounded-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}