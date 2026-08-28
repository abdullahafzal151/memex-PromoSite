import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function DesktopFrame({
  src,
  alt,
  title = "Memex",
  focusPosition = "right top",
  className = "",
  children,
  delay = 0,
}: {
  src: string;
  alt: string;
  title?: string;
  focusPosition?: string;
  className?: string;
  children?: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-xl overflow-hidden border border-border bg-canvas-raised shadow-[0_30px_80px_-20px_rgb(0,0,0/0.6)] ${className}`}
    >
      {/* window chrome */}
      <div className="flex items-center gap-1.5 h-9 px-3.5 bg-canvas-overlay border-b border-border">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[11px] text-ink-faint font-medium tracking-wide">
          {title}
        </span>
      </div>
      <div className="relative w-full overflow-hidden bg-canvas">
        {/* Mobile/tablet: fixed-height crop that zooms into the content
            pane and trims the sidebar, so UI text stays readable on a
            small screen instead of shrinking with the full frame. */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-60 sm:h-80 md:h-72 lg:h-auto object-cover lg:object-contain block"
          style={{ objectPosition: focusPosition }}
        />
        {children}
      </div>
    </motion.div>
  );
}
