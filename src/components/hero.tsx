import { AsciiCanvas } from "./ascii-canvas";
import { Stamp } from "./stamp";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-paper">
      <div className="relative">
        <AsciiCanvas />

        {/* hint top-left */}
        <div className="pointer-events-none absolute left-[18px] top-[14px] font-mono text-[10.5px] uppercase tracking-[0.2em] text-pink/80">
          ▸ move cursor · click for a ripple
        </div>

        {/* stamps top-right */}
        <div
          className="pointer-events-none absolute right-[18px] top-[14px] flex gap-2"
          style={{ transform: "rotate(2deg)" }}
        >
          <Stamp variant="pink">v.04 / 2026</Stamp>
          <Stamp variant="blue">riso ed.</Stamp>
        </div>

        {/* big title bottom */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 grid items-end gap-4 p-6 md:gap-6 md:p-10"
          style={{ gridTemplateColumns: "1fr auto" }}
        >
          <h1
            className="m-0 font-display text-[64px] font-bold uppercase leading-[0.82] tracking-[-0.04em] text-paper md:text-[96px] lg:text-[132px]"
            style={{
              textShadow: "4px 4px 0 var(--blue), 8px 8px 0 var(--pink)",
            }}
          >
            Kshitij
            <br />
            Ghode<span className="text-yellow">.</span>
          </h1>
          <div
            className="text-right font-mono uppercase text-paper"
            style={{
              fontSize: "11.5px",
              letterSpacing: "0.2em",
              lineHeight: 1.6,
              textShadow:
                "1px 1px 0 var(--ink), -1px -1px 0 var(--ink), 1px -1px 0 var(--ink), -1px 1px 0 var(--ink)",
            }}
          >
            software engineer
            <br />
            <b className="text-pink">backend &amp; distributed</b>
            <br />
            systems · realtime
            <br />— based in mumbai, in
          </div>
        </div>
      </div>

      {/* hero stats strip */}
      <div className="grid grid-cols-2 gap-[2px] border-t-2 border-ink bg-ink md:grid-cols-4">
        <StatCell label="Discipline">
          <span className="text-pink">backend</span> &amp; ds
        </StatCell>
        <StatCell label="Shipped">
          <span className="text-blue">10+</span> services
        </StatCell>
        <StatCell label="Live work">
          exam-duel<span className="text-pink">.</span>com
        </StatCell>
        <StatCell label="Stack">java · ts · sql</StatCell>
      </div>
    </section>
  );
}

function StatCell({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[78px] flex-col justify-between bg-paper px-[22px] py-[18px]">
      <div className="font-mono text-[10.5px] uppercase leading-tight tracking-[0.2em] text-ink-mute">
        {label}
      </div>
      <div className="whitespace-nowrap text-left font-display text-[22px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-ink md:text-[28px]">
        {children}
      </div>
    </div>
  );
}
