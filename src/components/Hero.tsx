import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, ChevronRight, Info, ArrowUpRight } from "lucide-react";
import Logomark from "./Logomark";
import tutorImg from "../assets/screens/tutor.png";
import { fetchLatestRelease, RELEASES_PAGE_URL } from "../lib/github";
import type { ReleaseInfo } from "../lib/github";
import ThankYouModal from "./ThankYouModal";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  const [release, setRelease] = useState<ReleaseInfo | null | "loading">(
    "loading"
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchLatestRelease().then(setRelease);
  }, []);

  const downloadHref =
    release && release !== "loading"
      ? release.msiUrl
      : RELEASES_PAGE_URL;

  const handleDownloadClick = () => {
    setShowModal(true);
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.55],
    [1, 0]
  );

  const textY = useTransform(
    scrollYProgress,
    [0, 0.55],
    [0, -45]
  );

  const uiRotateX = useTransform(
    scrollYProgress,
    [0, 0.35],
    [8, 0]
  );

  const uiScale = useTransform(
    scrollYProgress,
    [0, 0.35],
    [0.94, 1]
  );

  const uiY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 80]
  );

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

  return (
    <>
      <section
        ref={ref}
        className="
          relative
          min-h-[100svh]
          flex flex-col
          items-center
          justify-start
          overflow-hidden
          pt-28 sm:pt-32
          perspective-1000
        "
      >
        {/* ─────────────────────────────────────────
            BACKGROUND
        ───────────────────────────────────────── */}

        <div
          className="
            absolute inset-0
            pointer-events-none
            z-[-2]
            bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)]
            bg-[size:28px_28px]
          "
        />

        {/* Very subtle ambient light behind the hero */}
        <div
          className="
            absolute
            left-1/2
            top-24
            -translate-x-1/2
            w-[650px]
            h-[420px]
            rounded-full
            bg-accent/[0.035]
            blur-[120px]
            pointer-events-none
            z-[-1]
          "
        />

        {/* Fade the grid toward the product */}
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-[360px]
            bg-gradient-to-t
            from-canvas
            via-canvas/70
            to-transparent
            pointer-events-none
            z-[-1]
          "
        />

        {/* ─────────────────────────────────────────
            HERO COPY
        ───────────────────────────────────────── */}

        <motion.div
          style={{
            y: textY,
            opacity: textOpacity,
          }}
          className="
            relative z-10
            flex flex-col
            items-center
            text-center
            px-6
            w-full
            max-w-5xl
          "
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="mb-7"
          >
            <div
              className="
                inline-flex
                items-center
                gap-2
                px-3.5
                py-1.5
                rounded-full
                bg-accent-soft
                border border-accent/20
                text-accent
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.14em]
              "
            >
              <Logomark size={13} />
              Memex 1.0 — Now Live
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
            }}
            className="
              font-serif
              text-[3.2rem]
              leading-[0.98]
              sm:text-6xl
              md:text-7xl
              lg:text-[5rem]
              font-medium
              tracking-[-0.045em]
              max-w-4xl
            "
          >
            Everything you study.
            <br />
            <span className="text-ink-muted">
              Finally understood.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.12,
            }}
            className="
              mt-5
              max-w-2xl
              text-base
              sm:text-lg
              text-ink-muted
              leading-relaxed
            "
          >
            Drop in your PDFs, slides, and notes. Memex turns them
            into an AI-powered study workspace with tutoring, quizzes,
            flashcards, and exams grounded in your own material.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            className="
              mt-8
              flex flex-col
              sm:flex-row
              items-center
              gap-3
            "
          >
            {/* Primary */}
            <a
              href={downloadHref}
              onClick={handleDownloadClick}
              className="
                group
                flex
                items-center
                gap-2
                text-sm
                font-semibold
                bg-accent
                text-white
                px-6
                py-3.5
                rounded-lg
                transition-all
                active:scale-[0.98]
                hover:bg-accent-muted
                shadow-[0_8px_30px_rgb(var(--color-accent)/0.22)]
              "
            >
              <Download
                size={17}
                className="
                  transition-transform
                  group-hover:-translate-y-0.5
                "
              />

              Download for Windows

              <ArrowUpRight
                size={15}
                className="
                  opacity-60
                  transition-transform
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </a>

            {/* Secondary */}
            <button
              onClick={() => scrollTo("showcase")}
              className="
                group
                flex
                items-center
                gap-1.5
                text-sm
                font-semibold
                text-ink
                px-6
                py-3.5
                rounded-lg
                border
                border-border-subtle
                hover:border-border
                hover:bg-canvas-raised
                transition-all
                active:scale-[0.98]
              "
            >
              Explore Memex

              <ChevronRight
                size={16}
                className="
                  text-ink-muted
                  transition-all
                  group-hover:text-ink
                  group-hover:translate-x-0.5
                "
              />
            </button>
          </motion.div>

          {/* SmartScreen note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.35,
            }}
            className="
              mt-4
              flex
              items-center
              gap-2
              text-[11px]
              text-ink-faint
            "
          >
            <Info
              size={13}
              className="text-accent/80 shrink-0"
            />

            <span>
              Windows SmartScreen?
              <span className="text-ink-muted">
                {" "}Choose More info → Run anyway.
              </span>
            </span>
          </motion.div>

          {/* Product facts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.45,
            }}
            className="
              mt-4
              flex
              items-center
              text-[11px]
              text-ink-faint
              font-medium
              tracking-wide
            "
          >
            <span>Windows</span>

            <span className="mx-3 opacity-50">
              ·
            </span>

            <span>Free forever</span>

            <span className="mx-3 opacity-50">
              ·
            </span>

            <span>Local or cloud AI</span>
          </motion.div>
        </motion.div>

        {/* ─────────────────────────────────────────
            PRODUCT PREVIEW
        ───────────────────────────────────────── */}

        <motion.div
          style={{
            rotateX: uiRotateX,
            scale: uiScale,
            y: uiY,
          }}
          initial={{
            opacity: 0,
            y: 90,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 24,
            delay: 0.35,
          }}
          className="
            relative
            z-20
            mt-14
            w-full
            max-w-6xl
            px-5
            sm:px-8
            pb-16
            origin-top
          "
        >
          {/* Product glow */}
          <div
            className="
              absolute
              left-1/2
              top-10
              -translate-x-1/2
              w-[70%]
              h-[60%]
              rounded-full
              bg-accent/[0.07]
              blur-[90px]
              pointer-events-none
              z-[-1]
            "
          />

          {/* Memex application window */}
          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-border
              bg-canvas
              shadow-[0_35px_100px_-30px_rgba(0,0,0,0.75)]
            "
          >
            {/* Custom app title bar */}
            <div
              className="
                flex
                items-center
                justify-between
                h-11
                px-4
                bg-canvas-overlay
                border-b
                border-border
              "
            >
              <div className="flex items-center gap-2.5">
                <Logomark size={17} />

                <span className="text-xs font-medium text-ink-muted">
                  Memex
                </span>

                <span className="text-ink-faint text-xs">
                  /
                </span>

                <span className="text-xs text-ink-faint">
                  AI Tutor
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-ink-faint/30" />
                <span className="w-2 h-2 rounded-full bg-ink-faint/30" />
                <span className="w-2 h-2 rounded-full bg-ink-faint/30" />
              </div>
            </div>

            {/* Actual Memex UI */}
            <img
              src={tutorImg}
              alt="Memex AI Tutor interface"
              className="
                block
                w-full
                h-auto
                select-none
              "
            />
          </div>
        </motion.div>
      </section>

      <ThankYouModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}