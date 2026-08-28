import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Logomark from "./Logomark";
import { fetchLatestRelease, RELEASES_PAGE_URL } from "../lib/github";
import type { ReleaseInfo } from "../lib/github";
import ThankYouModal from "./ThankYouModal"; // <-- Import the modal

const NAV_LINKS = [
  { label: "Product", id: "showcase" },
  { label: "Privacy", id: "privacy" },
  { label: "Tour", id: "tour" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); // <-- Modal state

  const [release, setRelease] = useState<ReleaseInfo | null | "loading">("loading");
  
  useEffect(() => {
    fetchLatestRelease().then(setRelease);
  }, []);

  const downloadHref =
    release && release !== "loading" ? release.msiUrl : RELEASES_PAGE_URL;

  const handleDownloadClick = () => setShowModal(true); // <-- Trigger modal

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled || mobileMenuOpen
            ? "bg-canvas/70 backdrop-blur-xl border-b border-border shadow-[0_4px_30px_rgb(0,0,0/0.1)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-page mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 group relative z-10"
          >
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Logomark size={26} />
            </motion.div>
            <span className="font-serif text-[17px] font-medium tracking-tight transition-colors group-hover:text-ink-muted">
              Memex
            </span>
          </button>

          <nav 
            className="hidden md:flex items-center p-1.5 rounded-full border border-transparent transition-colors"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                onMouseEnter={() => setHoveredLink(link.id)}
                className="relative px-4 py-1.5 text-sm transition-colors rounded-full"
              >
                <span className={`relative z-10 transition-colors duration-300 ${
                  hoveredLink === link.id ? "text-ink" : "text-ink-muted"
                }`}>
                  {link.label}
                </span>
                {hoveredLink === link.id && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 bg-canvas-raised rounded-full border border-border/50 shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
            <a
              href="https://github.com/abdullahafzal151/memex-releases"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setHoveredLink("github")}
              className="relative px-4 py-1.5 text-sm transition-colors rounded-full"
            >
               <span className={`relative z-10 transition-colors duration-300 ${
                  hoveredLink === "github" ? "text-ink" : "text-ink-muted"
                }`}>
                  GitHub
                </span>
                {hoveredLink === "github" && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 bg-canvas-raised rounded-full border border-border/50 shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
            </a>
          </nav>

          <div className="flex items-center gap-4 z-10">
            <a
              href={downloadHref}
              onClick={handleDownloadClick} // <-- Attached handler
              className="group flex items-center justify-center gap-2 text-sm font-medium bg-accent hover:bg-accent-muted text-white px-5 py-2 rounded-full transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgb(0,0,0/0.1)] hover:shadow-[0_0_25px_rgb(255,255,255/0.15)]"
            >
              <span>Download</span>
              <ArrowRight 
                size={14} 
                className="opacity-70 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all duration-300" 
              />
            </a>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-ink-muted hover:text-ink transition-colors rounded-full hover:bg-canvas-raised"
              aria-label="Toggle mobile menu"
            >
              <motion.div
                initial={false}
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden border-b border-border bg-canvas/95 backdrop-blur-xl"
            >
              <nav className="flex flex-col px-6 py-6 gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    onClick={() => scrollTo(link.id)}
                    className="text-left py-3 px-4 text-lg font-medium text-ink-muted hover:text-ink hover:bg-canvas-raised rounded-xl transition-all"
                  >
                    {link.label}
                  </motion.button>
                ))}
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: NAV_LINKS.length * 0.05, duration: 0.3 }}
                  href="https://github.com/abdullahafzal151/memex-releases"
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 text-lg font-medium text-ink-muted hover:text-ink hover:bg-canvas-raised rounded-xl transition-all mt-2 border-t border-border-subtle"
                >
                  GitHub
                </motion.a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      
      {/* Render the modal */}
      <ThankYouModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}