import { SectionHead } from "./section-head";

interface XPItem {
  when: string;
  role: string;
  org: string;
  body: React.ReactNode;
  stack: string[];
  shadow: "pink" | "blue";
}

const items: XPItem[] = [
  {
    when: "Apr 2024 — Present",
    role: "Founder & Full-Stack Engineer",
    org: "exam-duel.com · solo",
    body: (
      <>
        Solo build of a real-time 1v1 CAT exam-prep app. Designed{" "}
        <strong className="font-semibold text-ink">
          Elo-based matchmaking
        </strong>
        , refactored the active-game lock into a two-phase state machine, and
        stood up a two-layer Redis question pool that eliminates DB reads at
        match time. Shipping iOS, Android &amp; web from one TypeScript
        monorepo.
      </>
    ),
    stack: [
      "TypeScript",
      "Node",
      "Socket.IO",
      "Postgres",
      "Redis",
      "RN / Expo",
      "Firebase",
    ],
    shadow: "pink",
  },
  {
    when: "Sep 2021 — Apr 2024",
    role: "Software Engineer",
    org: "Profinch Solutions · Atumverse",
    body: (
      <>
        Built and maintained{" "}
        <strong className="font-semibold text-ink">
          10+ Spring Boot microservices
        </strong>{" "}
        on a low-code banking platform. Designed Camunda workflow process
        definitions, extended the Partner System Gateway with configurable
        routing pipelines, deployed Signoz APM fleet-wide for distributed
        tracing, and automated GitLab CI/CD for every service and dependency.
      </>
    ),
    stack: [
      "Java",
      "Spring Boot",
      "Camunda",
      "Kafka",
      "Postgres",
      "Docker",
      "GitLab CI",
      "Signoz",
    ],
    shadow: "blue",
  },
];

export function Experience() {
  return (
    <section id="experience" className="border-b-2 border-ink py-[60px]">
      <div className="wrap">
        <SectionHead
          num="§ 02 / Work"
          title={
            <>
              A short
              <br />
              working history.
            </>
          }
        />
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          {items.map((item, i) => (
            <XPCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function XPCard({ item }: { item: XPItem }) {
  const shadowClass =
    item.shadow === "pink" ? "shadow-riso-pink" : "shadow-riso-blue";
  const orgColor = item.shadow === "pink" ? "text-blue" : "text-pink";
  return (
    <article
      className={`relative border-2 border-ink bg-paper px-6 py-[22px] ${shadowClass}`}
    >
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">
        {item.when}
      </div>
      <h3
        className="m-0 mb-1 font-display font-semibold"
        style={{ fontSize: "28px", lineHeight: 1.1, letterSpacing: "-0.015em" }}
      >
        {item.role}
      </h3>
      <div
        className={`mb-3 font-mono uppercase ${orgColor}`}
        style={{ fontSize: "12px", letterSpacing: "0.12em" }}
      >
        {item.org}
      </div>
      <p
        className="m-0 mb-3 text-ink-soft"
        style={{ fontSize: "14.5px", lineHeight: 1.65 }}
      >
        {item.body}
      </p>
      <div
        className="mt-3 border-t border-dashed border-ink pt-2.5 font-mono text-[11px] text-ink-mute"
        style={{ letterSpacing: "0.04em", borderTopWidth: "1.5px" }}
      >
        {item.stack.map((tag, i) => (
          <span key={i}>
            {tag}
            {i < item.stack.length - 1 ? (
              <span className="text-ink"> · </span>
            ) : null}
          </span>
        ))}
      </div>
    </article>
  );
}
