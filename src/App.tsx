import { useEffect } from "react";
import Lenis from "lenis";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Journey from "./components/Journey";
import NotChatbot from "./components/NotChatbot";
import Privacy from "./components/Privacy";
import Tour from "./components/Tour";
import Download from "./components/Download";
import Contact from "./components/Contact"; // <-- Import it here
import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative">
      <div className="grain-overlay" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Journey />
        <NotChatbot />
        <Privacy />
        <Tour />
        <Download />
        <Contact /> {/* <-- Place it right before the footer! */}
      </main>
      <Footer />
    </div>
  );
}