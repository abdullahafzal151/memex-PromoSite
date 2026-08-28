import { motion } from "framer-motion";
import { HardDrive, Cloud, Check, Zap, WifiOff, ShieldCheck } from "lucide-react";
import settingsImg from "../assets/screens/settings.png";
import DesktopFrame from "./DesktopFrame";

const desktopBenefits = [
  {
    icon: Zap,
    title: "A native interface, not a webpage",
    copy: "Memex is a real desktop app, not a browser tab. Switching spaces, opening a document, flipping a flashcard — it's instant, with no server round-trip for the interface itself.",
  },
  {
    icon: WifiOff,
    title: "Works when your Wi-Fi doesn't",
    copy: "Your documents and everything you've already generated — notes, quizzes, flashcards — live on disk and stay usable with no connection at all. Handy in a library basement or on a flight.",
  },
  {
    icon: ShieldCheck,
    title: "Nothing to breach",
    copy: "In Local mode, your material never touches a server Memex doesn't control — so there's no third-party database of your notes to worry about in the first place.",
  },
];

export default function Privacy() {
  return (
    <section id="privacy" className="relative py-28 md:py-36 px-6">
      <div className="max-w-page mx-auto grid md:grid-cols-2 gap-14 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-medium tracking-[0.15em] text-accent uppercase mb-4">
            Local-first
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            Your knowledge should belong to you.
          </h2>
          <p className="text-ink-muted leading-relaxed mb-8 max-w-md">
            Memex reads your documents straight off your disk — nothing is
            uploaded anywhere by default. Run entirely on a local Ollama
            model, or opt into a cloud provider of your choice. Either way,
            it's a decision you make, not one made for you.
          </p>

          <div className="space-y-4 max-w-md">
            <div className="flex items-start gap-3.5 rounded-card border border-border-subtle p-4">
              <div className="mt-0.5 h-8 w-8 rounded-sm bg-canvas-overlay flex items-center justify-center shrink-0">
                <HardDrive size={15} strokeWidth={1.75} className="text-ink-muted" />
              </div>
              <div>
                <p className="text-sm font-medium">Local by default</p>
                <p className="text-sm text-ink-faint mt-0.5">
                  Ollama runs on your machine — documents and conversations
                  never leave it.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5 rounded-card border border-border-subtle p-4">
              <div className="mt-0.5 h-8 w-8 rounded-sm bg-canvas-overlay flex items-center justify-center shrink-0">
                <Cloud size={15} strokeWidth={1.75} className="text-ink-muted" />
              </div>
              <div>
                <p className="text-sm font-medium">Cloud, if you want it</p>
                <p className="text-sm text-ink-faint mt-0.5">
                  Bring your own key for OpenAI-compatible providers — Gemini,
                  Mistral, Ollama Cloud, and more — swap anytime in Settings.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-ink-faint mt-6">
            <Check size={13} strokeWidth={2} className="text-success" />
            <span>You choose which mode is active — always visible in Settings.</span>
          </div>
        </motion.div>

        <DesktopFrame
          src={settingsImg}
          alt="Memex Settings screen showing Local Ollama and Cloud Providers toggle with AI Engine profiles"
          focusPosition="65% top"
          delay={0.15}
        />
      </div>

      <div className="max-w-page mx-auto mt-20 md:mt-28 pt-14 border-t border-border-subtle">
        <p className="text-center text-xs font-medium tracking-[0.1em] text-ink-faint uppercase mb-12">
          Why a desktop app, not another browser tab
        </p>
        <div className="grid sm:grid-cols-3 gap-8 md:gap-10">
          {desktopBenefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Icon size={18} strokeWidth={1.75} className="text-accent mb-4" />
                <p className="text-sm font-medium mb-2">{b.title}</p>
                <p className="text-sm text-ink-faint leading-relaxed">{b.copy}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
