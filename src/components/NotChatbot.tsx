import { motion } from "framer-motion";
import { ArrowDown, MessageCircle, X } from "lucide-react";

const genericSteps = ["Question", "Answer"];
const memexSteps = [
  "Your documents",
  "Context",
  "Citations",
  "Understanding",
  "Active recall",
  "Retention",
];

export default function NotChatbot() {
  return (
    <section className="relative py-28 md:py-36 px-6 bg-canvas-raised/40 border-y border-border-subtle">
      <div className="max-w-page mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-medium tracking-[0.15em] text-accent uppercase mb-4">
            Not another AI chatbot
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight max-w-2xl mx-auto">
            Memex isn't just where you ask questions.
            <br />
            <span className="text-ink-muted">It's where you learn.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="rounded-card border border-border-subtle p-8 flex flex-col items-center"
          >
            <div className="flex items-center gap-2 text-ink-faint mb-8">
              <MessageCircle size={15} strokeWidth={1.75} />
              <span className="text-xs font-medium uppercase tracking-wide">
                Generic AI chat
              </span>
            </div>
            {genericSteps.map((step, i) => (
              <div key={step} className="flex flex-col items-center">
                <div className="text-sm text-ink-muted border border-border-subtle rounded-full px-4 py-1.5">
                  {step}
                </div>
                {i < genericSteps.length - 1 && (
                  <ArrowDown size={14} className="my-2.5 text-ink-faint" strokeWidth={1.5} />
                )}
              </div>
            ))}
            <div className="mt-6 flex items-center gap-1.5 text-xs text-ink-faint">
              <X size={12} strokeWidth={2} />
              <span>Forgets everything next session</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-card border border-accent/30 bg-accent-soft/20 p-8 flex flex-col items-center"
          >
            <div className="flex items-center gap-2 text-accent mb-6">
              <span className="text-xs font-medium uppercase tracking-wide">
                Memex
              </span>
            </div>
            {memexSteps.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col items-center"
              >
                <div className="text-sm text-ink border border-accent/25 bg-canvas-raised rounded-full px-4 py-1.5">
                  {step}
                </div>
                {i < memexSteps.length - 1 && (
                  <ArrowDown size={14} className="my-2 text-accent/50" strokeWidth={1.5} />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
