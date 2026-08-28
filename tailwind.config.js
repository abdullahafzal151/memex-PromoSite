/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate";

function withOpacity(variableName) {
  return ({ opacityValue }) =>
    opacityValue !== undefined
      ? `rgb(var(${variableName}) / ${opacityValue})`
      : `rgb(var(${variableName}))`;
}

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: withOpacity("--color-canvas"),
          raised: withOpacity("--color-canvas-raised"),
          surface: withOpacity("--color-canvas-surface"),
          overlay: withOpacity("--color-canvas-overlay"),
        },
        border: {
          DEFAULT: withOpacity("--color-border"),
          subtle: withOpacity("--color-border-subtle"),
        },
        ink: {
          DEFAULT: withOpacity("--color-ink"),
          muted: withOpacity("--color-ink-muted"),
          faint: withOpacity("--color-ink-faint"),
        },
        accent: {
          DEFAULT: withOpacity("--color-accent"),
          muted: withOpacity("--color-accent-muted"),
          soft: withOpacity("--color-accent-soft"),
        },
        success: withOpacity("--color-success"),
        warning: withOpacity("--color-warning"),
        danger: withOpacity("--color-danger"),
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Source Serif 4", "Georgia", "serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        card: "10px",
      },
      maxWidth: {
        page: "72rem",
        prose: "42rem",
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [animate],
};
