import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PillButton from '@/components/home/PillButton';
import { Image } from '@/components/ui/image';
import { useServerConfig } from '@/lib/useServerConfig';

const HERO_BG = 'https://media.base44.com/images/public/6abebcbf8be1afb96d0b1c67/71ff3d511_image.png';
const HERO_CHARACTERS = 'https://media.base44.com/images/public/6abebcbf8be1afb96d0b1c67/f386de0b6_generated_image.png';

export default function HeroSection() {
  const { data: config } = useServerConfig();
  const name = config?.server_name || 'GTA5 Eastpoint';

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-16">
      <div className="absolute inset-0">
        <Image src={HERO_BG} alt="Eastpoint pe timp de furtună" fittingType="fill" className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
      </div>

      <motion.div
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-accent-ice/20 blur-3xl"
      />
      <motion.div
        animate={{ opacity: [0.6, 0.3, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="pointer-events-none absolute bottom-10 right-1/3 h-64 w-64 rounded-full bg-accent-violet/20 blur-3xl"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-6 px-5 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h1 className="font-heading text-[clamp(2.8rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-tight">
            {name}
          </h1>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            {config?.tagline || 'Un oraș viu, cu propriile reguli, propria economie și propriile povești.'}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            {config?.fivem_address ? (
              <PillButton href={config.fivem_address}>
                JOACĂ ACUM <ArrowRight size={16} />
              </PillButton>
            ) : (
              <PillButton to="/aplicatii">
                APLICĂ STAFF <ArrowRight size={16} />
              </PillButton>
            )}
            <Link
              to="/regulament"
              className="font-mono text-xs tracking-[0.25em] text-muted-foreground transition hover:text-accent-ice"
            >
              VEZI REGULAMENTUL →
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="hidden justify-center lg:flex"
        >
          <div className="animate-float">
            <Image
              src={HERO_CHARACTERS}
              alt="Personaje Eastpoint"
              fittingType="fill"
              className="h-[62vh] max-h-[560px] w-[46vw] max-w-[460px] rounded-2xl drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PillButton from '@/components/home/PillButton';
import { Image } from '@/components/ui/image';
import { useServerConfig } from '@/lib/useServerConfig';

const HERO_BG = 'https://media.base44.com/images/public/6abebcbf8be1afb96d0b1c67/71ff3d511_image.png';
const HERO_CHARACTERS = 'https://media.base44.com/images/public/6abebcbf8be1afb96d0b1c67/f386de0b6_generated_image.png';

export default function HeroSection() {
  const { data: config } = useServerConfig();
  const name = config?.server_name || 'GTA5 Eastpoint';

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-16">
      <div className="absolute inset-0">
        <Image src={HERO_BG} alt="Eastpoint pe timp de furtună" fittingType="fill" className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
      </div>

      <motion.div
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-accent-ice/20 blur-3xl"
      />
      <motion.div
        animate={{ opacity: [0.6, 0.3, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="pointer-events-none absolute bottom-10 right-1/3 h-64 w-64 rounded-full bg-accent-violet/20 blur-3xl"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-6 px-5 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h1 className="font-heading text-[clamp(2.8rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-tight">
            {name}
          </h1>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            {config?.tagline || 'Un oraș viu, cu propriile reguli, propria economie și propriile povești.'}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            {config?.fivem_address ? (
              <PillButton href={config.fivem_address}>
                JOACĂ ACUM <ArrowRight size={16} />
              </PillButton>
            ) : (
              <PillButton to="/aplicatii">
                APLICĂ STAFF <ArrowRight size={16} />
              </PillButton>
            )}
            <Link
              to="/regulament"
              className="font-mono text-xs tracking-[0.25em] text-muted-foreground transition hover:text-accent-ice"
            >
              VEZI REGULAMENTUL →
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="hidden justify-center lg:flex"
        >
          <div className="animate-float">
            <Image
              src={HERO_CHARACTERS}
              alt="Personaje Eastpoint"
              fittingType="fill"
              className="h-[62vh] max-h-[560px] w-[46vw] max-w-[460px] rounded-2xl drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}