import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, ChevronRight, Info } from "lucide-react"; // <-- Added Info icon
import Logomark from "./Logomark";
import tutorImg from "../assets/screens/tutor.png";
import { fetchLatestRelease, RELEASES_PAGE_URL } from "../lib/github";
import type { ReleaseInfo } from "../lib/github";
import ThankYouModal from "./ThankYouModal";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  
  const [release, setRelease] = useState<ReleaseInfo | null | "loading">("loading");
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    fetchLatestRelease().then(setRelease);
  }, []);

  const downloadHref =
    release && release !== "loading" ? release.msiUrl : RELEASES_PAGE_URL;

  const handleDownloadClick = () => {
    setShowModal(true);
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);
  const uiRotateX = useTransform(scrollYProgress, [0, 0.3], [12, 0]);
  const uiScale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);
  const uiY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <section
        ref={ref}
        className="relative min-h-[100svh] flex flex-col items-center justify-start overflow-hidden pt-32 perspective-1000"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-[-1]" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-canvas to-transparent pointer-events-none z-[-1]" />

        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-soft border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider mb-6">
              <Logomark size={14} />
              Memex 1.0 is live
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.1 }}
            className="font-serif text-[2.75rem] leading-[1.05] sm:text-6xl md:text-7xl font-medium tracking-tight"
          >
            Your knowledge.
            <br />
            <span className="text-ink-muted">Perfectly understood.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.2 }}
            className="mt-6 max-w-xl text-base sm:text-lg text-ink-muted leading-relaxed"
          >
            Turn your PDFs, slides, and notes into an AI-powered study workspace. 
            Generate quizzes, flashcards, and exams backed by verifiable citations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href={downloadHref}
              onClick={handleDownloadClick}
              className="flex items-center gap-2 text-sm font-semibold bg-accent text-white px-7 py-3.5 rounded-md transition-all active:scale-[0.98] hover:bg-accent-muted shadow-[0_4px_14px_0_rgb(var(--color-accent)/0.39)] hover:shadow-[0_6px_20px_rgba(var(--color-accent)/0.23)]"
            >
              <Download size={18} />
              Download for Windows
            </a>
            
            <button
              onClick={() => scrollTo("showcase")}
              className="group flex items-center gap-1 text-sm font-semibold text-ink px-7 py-3.5 rounded-md border border-border-subtle hover:border-border hover:bg-canvas-raised transition-all active:scale-[0.98]"
            >
              See how it works
              <ChevronRight size={16} className="text-ink-muted group-hover:text-ink transition-colors group-hover:translate-x-0.5" />
            </button>
          </motion.div>

          {/* SmartScreen Disclaimer Pill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-canvas-raised border border-border-subtle text-xs text-ink-muted max-w-md"
          >
            <Info size={14} className="text-accent shrink-0" />
            <span>
              If Windows SmartScreen appears: click <strong className="text-ink font-semibold">More info</strong> → <strong className="text-ink font-semibold">Run anyway</strong>.
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 text-xs text-ink-faint font-medium tracking-wide flex items-center justify-center gap-2"
          >
            <span>Windows</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>Free Forever</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>Local or Cloud AI</span>
          </motion.p>
        </motion.div>

        <motion.div
          style={{
            rotateX: uiRotateX,
            scale: uiScale,
            y: uiY,
          }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 25, delay: 0.4 }}
          className="relative z-20 mt-16 w-full max-w-5xl px-6 pb-20 origin-top"
        >
          <div className="relative rounded-xl overflow-hidden border border-border bg-canvas shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-1.5 h-10 px-4 bg-canvas-overlay border-b border-border">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e] border border-[#d89e24]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
            </div>
            <img
              src={tutorImg}
              alt="Memex AI Tutor interface"
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </section>

      <ThankYouModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}