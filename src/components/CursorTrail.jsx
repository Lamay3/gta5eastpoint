import { useEffect, useRef } from 'react';

export default function CursorTrail() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let raf;
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let tx = x, ty = y;
    const move = (e) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      if (ref.current) ref.current.style.transform = `translate(${x - 12}px, ${y - 12}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', move);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-6 w-6 rounded-full bg-accent-cyan/40 blur-lg mix-blend-screen md:block"
    />
  );
}