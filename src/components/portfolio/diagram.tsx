/**
 * The brand mark: a torii, drawn as hairlines so it belongs to the same family
 * as the rail.
 *
 * Five strokes and no fills — that is what keeps it legible at 16px. Every path
 * is `currentColor`, so one file serves both themes; set the colour on the
 * parent and never hardcode a hex here. `pathLength="1"` normalises each stroke
 * so `intro-mark` can draw all five from one keyframe.
 *
 * public/favicon.svg is the same five paths with the palette hardcoded, since a
 * favicon has no CSS context. Change one, change both.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      {/* kasagi — the top lintel */}
      <path pathLength="1" d="M3.2 5.3Q12 6.7 20.8 5.3" />
      {/* nuki — the tie beam */}
      <path pathLength="1" d="M5.8 10H18.2" />
      {/* gakuzuka — the strut */}
      <path pathLength="1" d="M12 6.3V10" />
      {/* hashira — the uprights */}
      <path pathLength="1" d="M7.5 6.1L6.5 20.9" />
      <path pathLength="1" d="M16.5 6.1L17.5 20.9" />
    </svg>
  );
}
