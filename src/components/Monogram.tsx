/** The EC mark: a square that fills with the accent on hover of its parent `.group`. */
export function Monogram({ size = 36 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="relative grid place-items-center overflow-hidden rounded-[5px] border border-line-strong text-[0.8rem] font-extrabold tracking-[-0.02em] [font-stretch:125%] transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white"
    >
      EC
    </span>
  );
}
