import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import DesktopFrame from "./DesktopFrame";

import spacesImg from "../assets/screens/spaces.png";
import spaceDetailImg from "../assets/screens/space-detail.png";
import tutorImg from "../assets/screens/tutor.png";
import studyImg from "../assets/screens/study-mode.png";
import quizImg from "../assets/screens/quiz-play.png";
import examImg from "../assets/screens/exam-play.png";
import flashcardsImg from "../assets/screens/flashcards.png";
import progressImg from "../assets/screens/progress.png";

const scenes = [
  {
    eyebrow: "01 — Bring it in",
    title: "Your material, organized",
    copy: "Spaces group your documents by subject or semester — no folders to fight, no naming scheme to invent.",
    img: spacesImg,
    alt: "Memex Spaces screen showing subjects organized as cards",
    focus: "right top",
  },
  {
    eyebrow: "02 — Understood",
    title: "Read, chunked, indexed",
    copy: "Drop in a PDF and Memex extracts the text, breaks it into chunks, and embeds it — you can watch each document move from Extracting text to Indexed in real time.",
    img: spaceDetailImg,
    alt: "Memex document library showing live processing status per file",
    focus: "right top",
  },
  {
    eyebrow: "03 — Ask anything",
    title: "A tutor that cites its sources",
    copy: "Ask a question and get an answer grounded in your own documents — not the open internet. Pick a persona, adjust the depth from Quick to Deep Dive, and keep asking.",
    img: tutorImg,
    alt: "Memex AI Tutor conversation about binary trees with depth controls",
    focus: "75% top",
  },
  {
    eyebrow: "04 — Learn it",
    title: "Active recall, not passive reading",
    copy: "Study Mode flips the script: the AI teaches a concept, asks you a question, and grades your answer — so you're retrieving, not just re-reading.",
    img: studyImg,
    alt: "Memex Study Mode setup screen",
    focus: "60% top",
  },
  {
    eyebrow: "05 — Test yourself",
    title: "Quizzes from your own material",
    copy: "Multiple choice, true/false, short answer, conceptual, even code-output questions — generated straight from the documents you selected, graded instantly.",
    img: quizImg,
    alt: "Memex quiz question about binary tree traversal, graded incorrect with explanation",
    focus: "60% top",
  },
  {
    eyebrow: "06 — Simulate the real thing",
    title: "A timed exam, seriously enforced",
    copy: "Set a duration, get a countdown and a question navigator, flag anything to revisit — as close to exam-hall pressure as a laptop can get.",
    img: examImg,
    alt: "Memex Exam Simulator with a live countdown timer and question navigator",
    focus: "center top",
  },
  {
    eyebrow: "07 — Make it stick",
    title: "Spaced repetition, done properly",
    copy: "Flashcards use real SM-2 scheduling — grade a card Again, Hard, Good, or Easy, and Memex tells you exactly when you'll see it again.",
    img: flashcardsImg,
    alt: "Memex flashcard review screen with Again, Hard, Good, Easy grading buttons",
    focus: "55% top",
  },
  {
    eyebrow: "08 — Know where you stand",
    title: "Progress that points somewhere",
    copy: "Weak topics surface automatically from your quiz and exam history, so you always know what to study next. This is a real account early on — the numbers grow as you use it.",
    img: progressImg,
    alt: "Memex Progress and Analytics dashboard showing weak topics",
    focus: "right top",
  },
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.15", "end 0.85"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="showcase" className="relative py-24 md:py-32 px-6">
      <div className="max-w-page mx-auto">
        <div className="text-center mb-20 md:mb-28">
          <p className="text-xs font-medium tracking-[0.15em] text-accent uppercase mb-4">
            The product
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight max-w-2xl mx-auto">
            One continuous path from{" "}
            <span className="text-ink-muted">document to mastery.</span>
          </h2>
        </div>

        <div ref={containerRef} className="relative">
          {/* the living pipeline connector */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-border-subtle md:-translate-x-1/2" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-accent origin-top md:-translate-x-1/2"
          />

          <div className="flex flex-col gap-24 md:gap-32">
            {scenes.map((scene, i) => {
              const fromLeft = i % 2 === 0;
              return (
                <div
                  key={scene.title}
                  className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-center pl-10 md:pl-0"
                >
                  {/* node dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-[9px] md:left-1/2 top-1.5 h-3.5 w-3.5 rounded-full bg-accent md:-translate-x-1/2 ring-4 ring-canvas"
                  />

                  <motion.div
                    initial={{ opacity: 0, x: fromLeft ? -24 : 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`${fromLeft ? "md:order-1" : "md:order-2"}`}
                  >
                    <p className="text-xs font-medium tracking-[0.1em] text-ink-faint uppercase mb-3">
                      {scene.eyebrow}
                    </p>
                    <h3 className="font-serif text-2xl sm:text-3xl mb-3.5">
                      {scene.title}
                    </h3>
                    <p className="text-ink-muted leading-relaxed max-w-md">
                      {scene.copy}
                    </p>
                  </motion.div>

                  <div className={`${fromLeft ? "md:order-2" : "md:order-1"}`}>
                    <DesktopFrame src={scene.img} alt={scene.alt} focusPosition={scene.focus} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
