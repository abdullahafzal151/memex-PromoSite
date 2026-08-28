import { motion, AnimatePresence } from "framer-motion";
import { X, FileDown, MonitorPlay, Sparkles } from "lucide-react";

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThankYouModal({ isOpen, onClose }: ThankYouModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-canvas/80 backdrop-blur-sm"
        >
          {/* Click outside to close */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md bg-canvas-surface border border-border rounded-2xl shadow-2xl p-6 md:p-8 z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 text-ink-faint hover:text-ink bg-canvas-overlay hover:bg-border-subtle rounded-full transition-colors"
            >
              <X size={18} />
            </button>

            <div className="mb-6">
              <h3 className="font-serif text-2xl font-medium text-ink">
                Downloading Memex...
              </h3>
              <p className="text-sm text-ink-muted mt-2">
                Your download should start automatically. Here is how to get set up:
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-accent-soft text-accent">
                  <FileDown size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-ink">1. Open the installer</h4>
                  <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                    Once the download finishes, click the <span className="font-mono text-ink-faint bg-canvas px-1 rounded">.msi</span> file in your browser's download bar.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-canvas-overlay border border-border-subtle text-ink-muted">
                  <MonitorPlay size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-ink">2. Run the setup</h4>
                  <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                    Follow the standard Windows installation prompts. It only takes a few seconds.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-canvas-overlay border border-border-subtle text-ink-muted">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-ink">3. Start learning</h4>
                  <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                    Launch Memex from your Start menu, drop in your first PDF, and let the AI do the rest.
                  </p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="mt-8 w-full py-2.5 text-sm font-medium text-ink bg-canvas hover:bg-canvas-raised border border-border rounded-lg transition-colors"
            >
              Got it
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}