import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorTrail from '@/components/CursorTrail';

export default function Layout() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-30" />
      <div className="pointer-events-none fixed inset-0 scanline opacity-40" />
      <CursorTrail />
      <Navbar />
      <main className="relative z-10 min-h-[calc(100vh-4rem)] pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}