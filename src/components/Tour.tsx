import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Layers,
  MessageCircle,
  ListChecks,
  Timer,
  Layers3,
  TrendingUp,
  GraduationCap,
} from "lucide-react";

import dashboardImg from "../assets/screens/dashboard.png";
import spacesImg from "../assets/screens/spaces.png";
import tutorImg from "../assets/screens/tutor.png";
import studyImg from "../assets/screens/study-mode.png";
import quizImg from "../assets/screens/quiz-play.png";
import examImg from "../assets/screens/exam-play.png";
import flashcardsImg from "../assets/screens/flashcards.png";
import progressImg from "../assets/screens/progress.png";

const items = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    img: dashboardImg,
    alt: "Memex Dashboard",
  },
  { label: "Spaces", icon: Layers, img: spacesImg, alt: "Memex Spaces" },
  {
    label: "Study Mode",
    icon: GraduationCap,
    img: studyImg,
    alt: "Memex Study Mode",
  },
  {
    label: "AI Tutor",
    icon: MessageCircle,
    img: tutorImg,
    alt: "Memex AI Tutor",
  },
  { label: "Quiz", icon: ListChecks, img: quizImg, alt: "Memex Quiz" },
  {
    label: "Exam Simulator",
    icon: Timer,
    img: examImg,
    alt: "Memex Exam Simulator",
  },
  {
    label: "Flashcards",
    icon: Layers3,
    img: flashcardsImg,
    alt: "Memex Flashcards",
  },
  {
    label: "Progress",
    icon: TrendingUp,
    img: progressImg,
    alt: "Memex Progress",
  },
];

export default function Tour() {
  const [active, setActive] = useState(0);

  return (
    <section id="tour" className="relative py-28 md:py-36 px-6">
      <div className="max-w-page mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-medium tracking-[0.15em] text-accent uppercase mb-4">
            Try it, no install required
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight">
            Click around. This is the real thing.
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="rounded-xl border border-border bg-canvas-raised overflow-clip shadow-[0_40px_100px_-30px_rgb(0,0,0/0.7)]"
        >
          {/* window chrome */}
          <div className="flex items-center gap-1.5 h-9 px-3.5 bg-canvas-overlay border-b border-border">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 text-[11px] text-ink-faint font-medium">
              Memex
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:h-[450px] lg:h-[550px]">
            {/* real sidebar, clickable */}
            <div className="hidden sm:flex flex-col w-40 shrink-0 border-r border-border p-3 gap-1">
              {items.map((item, i) => {
                const Icon = item.icon;
                const isActive = i === active;
                return (
                  <button
                    key={item.label}
                    onClick={() => setActive(i)}
                    className={`flex items-center gap-2.5 text-sm px-3 py-2 rounded-sm text-left transition-colors ${
                      isActive
                        ? "bg-accent-soft text-accent"
                        : "text-ink-muted hover:text-ink hover:bg-canvas-overlay"
                    }`}
                  >
                    <Icon size={15} strokeWidth={2} className="shrink-0" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* mobile tab strip */}
            <div className="sm:hidden flex overflow-x-auto gap-1 p-2 border-b border-border w-full">
              {items.map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => setActive(i)}
                  className={`shrink-0 text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                    i === active
                      ? "bg-accent-soft text-accent"
                      : "text-ink-faint border border-border-subtle"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="relative flex-1 h-64 sm:h-auto overflow-clip bg-canvas-overlay pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.img
                  key={items[active].label}
                  src={items[active].img}
                  alt={items[active].alt}
                  initial={{ opacity: 0, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full object-cover object-top"
                />
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
