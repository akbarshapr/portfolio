/**
 * The brand mark, and the only artwork left on the page.
 *
 * A torii — two uprights and two crossbeams, drawn as hairlines so it belongs
 * to the same family as the rail. It is a gateway, which is a fair description
 * of the work; and because `rail-slot` centres it, the mark sits on the SAME
 * vertical axis as the rail line. The line does not pass THROUGH the gate — it
 * starts at the hero's RailRow, below the header, so a deliberate gap sits
 * between the two. They share the axis, not the stroke.
 *
 * Five strokes, no fills, no second colour: that is the budget, and it is what
 * keeps the mark legible at 16px. Resist adding the shimaki, the kusabi, or a
 * plinth — they are correct on a real torii and turn to mush below 24px.
 *
 * Every path is `currentColor`, which is the whole trick: the mark takes its
 * colour from the text colour it sits in, so one file serves both themes with
 * no `.dark` variant and no second asset. Do not hardcode a hex here — a fixed
 * white vanishes on the light background and a fixed dark one vanishes at
 * night. Set the colour on the parent, which is `text-accent` in the nav.
 *
 * Each path carries pathLength="1", which normalises its length to a single
 * unit so `intro-mark` can draw all five with one shared stroke-dashoffset
 * regardless of how long each stroke actually is. It changes no geometry and
 * has no effect when the animation is not running, so the favicon does not
 * need it.
 *
 * `public/favicon.svg` is the same five paths with the palette hardcoded — a
 * favicon has no CSS context to read, so `currentColor` there resolves to the
 * browser default rather than ours. Change one, change both.
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
      {/* kasagi — the top lintel, lifted at the ends the way a myojin torii is */}
      <path pathLength="1" d="M3.2 5.3Q12 6.7 20.8 5.3" />
      {/* nuki — the tie beam, overhanging the uprights on both sides */}
      <path pathLength="1" d="M5.8 10H18.2" />
      {/* gakuzuka — the short strut. It is what stops the mark reading as a π. */}
      <path pathLength="1" d="M12 6.3V10" />
      {/* hashira — the uprights, splayed at the foot so the gate sits down */}
      <path pathLength="1" d="M7.5 6.1L6.5 20.9" />
      <path pathLength="1" d="M16.5 6.1L17.5 20.9" />
    </svg>
  );
}
