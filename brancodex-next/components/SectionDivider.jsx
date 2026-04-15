/**
 * components/SectionDivider.jsx
 *
 * Professional visual separator inserted between every homepage section.
 *
 * Usage:
 *   <SectionDivider />                          — dark-to-dark (default)
 *   <SectionDivider from="#0f172a" to="#f8fafc" /> — dark-to-light
 *   <SectionDivider from="#f8fafc" to="#0f172a" /> — light-to-dark
 *
 * The component renders a slim full-width band whose background transitions
 * from the bottom colour of the section above to the top colour of the
 * section below, with a centred glowing green diamond accent.
 */

export default function SectionDivider({
  from = "#0f172a",
  to = "#0f172a",
}) {
  const bg =
    from === to
      ? from
      : `linear-gradient(to bottom, ${from} 0%, ${to} 100%)`;

  return (
    <div className="section-sep" style={{ background: bg }} aria-hidden="true">
      <span className="section-sep-line" />
      <span className="section-sep-diamond" />
      <span className="section-sep-line" />
    </div>
  );
}
