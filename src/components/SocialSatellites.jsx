import { MessageCircle, Instagram, Youtube, Music2 } from 'lucide-react';
import { useServerConfig } from '@/lib/useServerConfig';

export default function SocialSatellites() {
  const { data: config } = useServerConfig();
  const items = [
    { url: config?.discord_url, icon: MessageCircle, label: 'DISCORD', sub: 'Comunitate' },
    { url: config?.instagram_url, icon: Instagram, label: 'INSTAGRAM', sub: 'Media' },
    { url: config?.youtube_url, icon: Youtube, label: 'YOUTUBE', sub: 'Streams' },
    { url: config?.tiktok_url, icon: Music2, label: 'TIKTOK', sub: 'Clips' },
  ].filter((i) => i.url);
  if (items.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {items.map(({ url, icon: Icon, label, sub }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-3 border border-border bg-surface/80 px-4 py-3 backdrop-blur transition hover:border-accent-cyan/60 hover:neon-glow"
        >
          <Icon className="text-accent-cyan transition group-hover:scale-110" size={20} />
          <div>
            <div className="font-mono text-xs tracking-[0.2em] text-foreground">{label}</div>
            <div className="text-[10px] text-muted-foreground transition group-hover:text-accent-cyan">{sub}</div>
          </div>
        </a>
      ))}
    </div>
  );
}