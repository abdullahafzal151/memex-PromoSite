import { motion } from "framer-motion";

const scattered = ["Lecture slides", "Textbook PDFs", "Handwritten notes", "Past papers", "Assignment briefs"];

export default function Problem() {
  return (
    <section className="relative py-28 md:py-36 px-6">
      <div className="max-w-page mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {scattered.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="text-xs text-ink-faint border border-border-subtle rounded-full px-3.5 py-1.5"
            >
              {item}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-center max-w-3xl mx-auto leading-tight text-ink"
        >
          Every semester scatters your knowledge across a dozen files and{" "}
          <span className="text-ink-faint">just as many tabs.</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-center text-ink-muted max-w-xl mx-auto"
        >
          Memex brings it into one workspace — organized by subject, understood
          by an AI that's actually read it, and turned into the quizzes, exams,
          and flashcards that make it stick.
        </motion.p>
      </div>
    </section>
  );
}
