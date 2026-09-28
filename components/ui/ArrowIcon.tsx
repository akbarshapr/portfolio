// Circled arrow used next to links. Decorative, so it is hidden from screen
// readers; the link text carries the meaning.
export default function ArrowIcon({
  className = "size-6",
  direction = "up-right",
}: {
  className?: string;
  direction?: "up-right" | "right";
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <circle cx="12" cy="12" r="10.5" />
      {direction === "up-right" ? (
        <path d="M9 15l6-6M10 9h5v5" />
      ) : (
        <path d="M7.5 12h9M13 8.5l3.5 3.5-3.5 3.5" />
      )}
    </svg>
  );
}
