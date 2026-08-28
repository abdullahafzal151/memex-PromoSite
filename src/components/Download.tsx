import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download as DownloadIcon, Command } from "lucide-react";
import { fetchLatestRelease, RELEASES_PAGE_URL, REPO_URL } from "../lib/github";
import type { ReleaseInfo } from "../lib/github";
import Logomark from "./Logomark";
import ThankYouModal from "./ThankYouModal"; // <-- Import the modal

function GithubMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.73 .5 .5 5.73 .5 12a11.5 11.5 0 0 0 7.86 10.94c.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.38.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.81 1.18 1.83 1.18 3.09 0 4.43-2.69 5.4-5.26 5.69.42.36.78 1.08.78 2.17v3.22c0 .31.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

export default function Download() {
  const [release, setRelease] = useState<ReleaseInfo | null | "loading">("loading");
  const [showModal, setShowModal] = useState(false); // <-- Modal state

  useEffect(() => {
    fetchLatestRelease().then(setRelease);
  }, []);

  const downloadHref =
    release && release !== "loading" ? release.msiUrl : RELEASES_PAGE_URL;

  const handleDownloadClick = () => setShowModal(true); // <-- Trigger modal

  return (
    <>
      <section id="download" className="relative py-32 md:py-44 px-6 overflow-hidden">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[820px] rounded-full bg-accent/[0.08] blur-[130px]" />

        <div className="relative max-w-page mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
          >
            <Logomark size={40} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl mt-7 leading-tight"
          >
            Ready to make your
            <br />
            knowledge useful?
          </motion.h2>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            href={downloadHref}
            onClick={handleDownloadClick} // <-- Attached handler
            // REMOVED target="_blank" so it doesn't open a new tab
            className="group mt-11 relative overflow-hidden flex items-center gap-2.5 bg-accent hover:bg-accent-muted text-white text-sm font-medium px-7 py-3.5 rounded-sm transition-colors active:scale-[0.97]"
          >
            <DownloadIcon size={16} strokeWidth={2} />
            Download for Windows
          </motion.a>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-4 text-xs text-ink-faint tracking-wide h-4"
          >
            {release === "loading" && "Checking latest release…"}
            {release === null && "Windows · .msi · see releases for the current build"}
            {release && release !== "loading" && (
              <span>
                v{release.version}
                {release.msiSizeMb ? ` · ${release.msiSizeMb} MB` : ""} · Windows
              </span>
            )}
          </motion.div>

          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors"
          >
            <GithubMark size={14} />
            View releases on GitHub
          </motion.a>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-14 flex items-center gap-1.5 text-xs text-ink-faint border border-border-subtle rounded-full px-3.5 py-1.5"
          >
            <Command size={12} strokeWidth={2} />
            <span>Open the command palette anytime with ⌘K</span>
          </motion.div>
        </div>
      </section>

      {/* Render the modal */}
      <ThankYouModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}