import { SectionHead } from "./section-head";

interface Row {
  k: string;
  v: React.ReactNode;
}

const rows: Row[] = [
  {
    k: "Email",
    v: (
      <a className="riso-link" href="mailto:kshitijghode@gmail.com">
        kshitijghode@gmail.com
      </a>
    ),
  },
  { k: "Phone", v: "+91 84259 69570" },
  {
    k: "GitHub",
    v: (
      <a
        className="riso-link"
        href="https://github.com/bobross-ui"
        target="_blank"
        rel="noopener noreferrer"
      >
        github.com/bobross-ui
      </a>
    ),
  },
  {
    k: "Live",
    v: (
      <a
        className="riso-link"
        href="https://exam-duel.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        exam-duel.com
      </a>
    ),
  },
  { k: "Posted", v: "Mumbai, IN" },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="border-b-2 border-ink py-[60px]"
      style={{ paddingBottom: "80px" }}
    >
      <div className="wrap">
        <SectionHead num="§ 05 / Hello" />
        <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-[1.4fr_1fr] md:gap-[56px]">
          <h2
            className="m-0 font-display text-[64px] font-bold uppercase leading-[0.82] tracking-[-0.045em] text-ink md:text-[96px] lg:text-[140px]"
            style={{
              textWrap: "balance",
            }}
          >
            say
            <br />
            <span
              className="bg-pink px-2 text-paper"
              style={{ mixBlendMode: "multiply" }}
            >
              hello
            </span>
            <br />
            to me
            <span
              className="bg-blue px-2 text-paper"
              style={{ mixBlendMode: "multiply" }}
            >
              .
            </span>
          </h2>

          <aside
            className="border-2 border-ink bg-paper-2 px-6 py-[22px] shadow-riso-blue"
          >
            <div className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-pink">
              ▸ Contact block · replies ≤ 24h
            </div>
            {rows.map((row, i) => (
              <div
                key={row.k}
                className="grid items-baseline py-2"
                style={{
                  gridTemplateColumns: "80px 1fr",
                  borderBottom:
                    i < rows.length - 1 ? "1.5px dashed var(--ink)" : "none",
                }}
              >
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-mute">
                  {row.k}
                </span>
                <span className="font-medium text-ink" style={{ fontSize: "15px" }}>
                  {row.v}
                </span>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
