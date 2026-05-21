import { SectionHead } from "./section-head";
import { Stamp } from "./stamp";

export function About() {
  return (
    <section id="about" className="border-b-2 border-ink py-[60px]">
      <div className="wrap">
        <SectionHead num="§ 01 / About" />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.4fr] md:gap-[60px]">
          <Portrait />
          <AboutText />
        </div>
      </div>
    </section>
  );
}

function Portrait() {
  return (
    <div
      className="grain relative overflow-hidden border-2 border-ink bg-paper-2"
      style={{ aspectRatio: "4 / 5" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(var(--blue) 20%, transparent 22%)",
          backgroundSize: "6px 6px",
          mixBlendMode: "multiply",
          opacity: 0.12,
        }}
      />

      <span
        className="absolute left-1/2 top-1/2 rounded-full bg-pink"
        style={{
          width: "78%",
          aspectRatio: "1",
          transform: "translate(-58%, -52%)",
          mixBlendMode: "multiply",
        }}
      />
      <span
        className="absolute left-1/2 top-1/2 rounded-full bg-blue"
        style={{
          width: "78%",
          aspectRatio: "1",
          transform: "translate(-42%, -48%)",
          mixBlendMode: "multiply",
        }}
      />

      <div
        className="absolute z-[2] rounded-full bg-paper"
        style={{
          left: "50%",
          top: "52%",
          width: "56%",
          aspectRatio: "1",
          transform: "translate(-50%, -50%)",
          border: "2.5px solid var(--ink)",
        }}
      >
        <span
          className="absolute rounded-full bg-ink"
          style={{ width: "9%", height: "9%", top: "38%", left: "30%" }}
        />
        <span
          className="absolute rounded-full bg-ink"
          style={{ width: "9%", height: "9%", top: "38%", right: "30%" }}
        />
        <div
          className="absolute"
          style={{
            left: "50%",
            top: "65%",
            width: "36%",
            height: "18%",
            transform: "translate(-50%, -50%)",
            border: "2.5px solid var(--ink)",
            borderTop: 0,
            borderRadius: "0 0 200px 200px",
          }}
        />
      </div>

      <div
        className="absolute z-[3] font-mono uppercase text-ink"
        style={{
          bottom: "12px",
          left: "12px",
          fontSize: "10px",
          letterSpacing: "0.18em",
          background: "var(--paper)",
          padding: "4px 8px",
          border: "1.5px solid var(--ink)",
        }}
      >
        PLATE I — K. GHODE
      </div>

      <div
        className="absolute z-[3] font-mono"
        style={{
          top: "12px",
          right: "12px",
          fontSize: "10px",
          letterSpacing: "0.18em",
          background: "var(--yellow)",
          color: "var(--ink)",
          padding: "4px 8px",
          border: "1.5px solid var(--ink)",
          transform: "rotate(7deg)",
        }}
      >
        № 01/14
      </div>
    </div>
  );
}

function AboutText() {
  return (
    <div>
      <h3
        className="m-0 mb-[18px] font-display font-semibold"
        style={{
          fontSize: "44px",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          textWrap: "balance",
        }}
      >
        I build{" "}
        <span className="bg-ink px-2 text-pink">backends</span> that survive
        the 3am page.
      </h3>
      <p
        className="m-0 mb-3.5 max-w-[56ch] text-ink-soft"
        style={{ fontSize: "17px", lineHeight: 1.7 }}
      >
        I&apos;m a backend engineer who likes the unglamorous parts of
        distributed systems —{" "}
        <strong className="bg-yellow px-1 font-semibold text-ink">
          two-phase locks, retry semantics, cache invalidation
        </strong>{" "}
        — the decisions that quietly decide whether a feature ships or wakes
        someone up at three in the morning.
      </p>
      <p
        className="m-0 mb-3.5 max-w-[56ch] text-ink-soft"
        style={{ fontSize: "17px", lineHeight: 1.7 }}
      >
        Two and a half years at Profinch building the backbone of a low-code
        banking platform — a Spring Boot fleet of 10+ microservices, Camunda
        workflows, GitLab CI all the way down. Now solo-building{" "}
        <strong className="bg-yellow px-1 font-semibold text-ink">
          exam-duel.com
        </strong>
        , a real-time 1v1 CAT exam-prep app on Node + Socket.IO + Postgres +
        Redis, shipping to iOS, Android &amp; web from a single TypeScript
        monorepo.
      </p>
      <p
        className="m-0 mb-3.5 max-w-[56ch] text-ink-soft"
        style={{ fontSize: "17px", lineHeight: 1.7 }}
      >
        I write Java, TypeScript, and SQL with roughly equal comfort. I&apos;d
        rather ship a small idea end-to-end than over-architect a perfect one.
      </p>
      <div className="mt-[22px] flex flex-wrap gap-2.5">
        <Stamp variant="pink">B.Tech · NIT Trichy &apos;21</Stamp>
        <Stamp variant="blue">3+ yrs production</Stamp>
        <Stamp variant="yellow">replies ≤ 24h</Stamp>
      </div>
    </div>
  );
}
