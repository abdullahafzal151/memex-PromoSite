import Logomark from "./Logomark";
import { REPO_URL } from "../lib/github";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle py-10 px-6">
      <div className="max-w-page mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-2.5">
          <Logomark size={20} />
          <span className="font-serif text-sm">Memex</span>
        </div>

        {/* Added flex-wrap and justify-center to prevent horizontal overflow on tiny screens */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs text-ink-faint text-center">
          <a href={REPO_URL} target="_blank" rel="noreferrer" className="hover:text-ink-muted transition-colors">
            GitHub
          </a>
          <span>
            Made by <span className="text-ink-muted font-medium">Abdullah Afzal</span> ·
            CS Student, COMSATS
          </span>
        </div>
      </div>
    </footer>
  );
}