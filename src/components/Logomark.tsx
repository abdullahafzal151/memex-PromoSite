export default function Logomark({ size = 28 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-[28%] bg-accent shrink-0"
      style={{ width: size, height: size }}
    >
      <svg
        width={size * 0.52}
        height={size * 0.52}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M4 18V7.5L12 14.5L20 7.5V18"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
