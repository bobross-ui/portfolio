import { SectionHead } from "./section-head";

export function Projects() {
  return (
    <section id="projects" className="border-b-2 border-ink py-[60px]">
      <div className="wrap">
        <SectionHead
          num="§ 03 / Press"
          title={
            <>
              Three things
              <br />
              I&nbsp;shipped.
            </>
          }
        />

        <ProjectBlock
          plate={<DuelPlate />}
          isFirst
          pn={
            <>
              <span className="font-semibold text-pink">● LIVE</span>
              <span>·</span>
              <span>2024 →</span>
              <span>·</span>
              <a
                className="riso-link"
                href="https://exam-duel.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                exam-duel.com ↗
              </a>
            </>
          }
          title={
            <>
              CAT-<span className="text-pink">Duel</span>
            </>
          }
          lede="A live 1v1 CAT exam-prep arena — Elo matchmaking, Socket.IO realtime, shipped to three platforms from one monorepo."
          body={
            <>
              <p
                className="m-0 mb-2.5 max-w-[60ch] text-ink-soft"
                style={{ fontSize: "15.5px", lineHeight: 1.7 }}
              >
                Refactored the original game-lock — which stranded both
                players on any device failure — into a{" "}
                <strong className="font-semibold text-ink">
                  pending_match → active_game
                </strong>{" "}
                two-phase machine, with Redis NX locks closing
                double-countdown and double-end races. Result payloads are
                written to Redis <em>pre-broadcast</em> so reconnecting
                players get results replayed.
              </p>
              <p
                className="m-0 mb-2.5 max-w-[60ch] text-ink-soft"
                style={{ fontSize: "15.5px", lineHeight: 1.7 }}
              >
                Two-layer Redis question pool — a sorted set of IDs filtered
                by Elo window plus a 24-hour content cache — means{" "}
                <strong className="font-semibold text-ink">
                  zero DB reads at match time
                </strong>
                ; hot-row writes batch-flush every 30 seconds.
              </p>
            </>
          }
          stats={[
            {
              k: "Auth p99",
              v: (
                <>
                  <span className="text-pink">~5</span>ms
                </>
              ),
            },
            {
              k: "Saved / call",
              v: (
                <>
                  ~<span className="text-blue">120</span>ms
                </>
              ),
            },
            {
              k: "DB / match",
              v: <span className="text-pink">0</span>,
            },
          ]}
          tags={[
            "TypeScript",
            "Node",
            "Socket.IO",
            "PostgreSQL",
            "Redis",
            "React Native (Expo)",
            "Firebase",
            "Sentry",
          ]}
        />

        <ProjectBlock
          plate={<FlowPlate />}
          pn={
            <>
              <span>OPEN SOURCE</span>
              <span>·</span>
              <span>2024</span>
              <span>·</span>
              <a className="riso-link" href="#">
                github ↗
              </a>
            </>
          }
          title={
            <>
              Dev<span className="text-blue">Flow</span>
            </>
          }
          lede="A production-grade developer session tracker — a state machine, dressed as an API."
          body={
            <>
              <p
                className="m-0 mb-2.5 max-w-[60ch] text-ink-soft"
                style={{ fontSize: "15.5px", lineHeight: 1.7 }}
              >
                Strict session state machine —{" "}
                <code className="font-mono">
                  ACTIVE → PAUSED → ACTIVE → COMPLETED
                </code>{" "}
                — returning{" "}
                <strong className="font-semibold text-ink">
                  409 on invalid transitions
                </strong>
                . Stateless JWT auth with 15-min access tokens and 7-day
                refresh rotation stored as SHA-256 hashes. Composable JPA
                Specification filtering covers all 8 filter combinations from
                one query method.
              </p>
              <p
                className="m-0 mb-2.5 max-w-[60ch] text-ink-soft"
                style={{ fontSize: "15.5px", lineHeight: 1.7 }}
              >
                GIN trigram indexes cut search latency{" "}
                <strong className="font-semibold text-ink">
                  ~4× on 15k rows
                </strong>{" "}
                (11.5ms → 2.9ms). Plus token-bucket rate limiting, HMAC-signed
                webhooks with exponential backoff, STOMP/SockJS timer, and a
                streaming CSV export.
              </p>
            </>
          }
          stats={[
            {
              k: "Latency drop",
              v: <span className="text-blue">4×</span>,
            },
            {
              k: "From → to",
              v: (
                <>
                  <span className="text-pink">11.5</span> → 3
                </>
              ),
            },
            { k: "Filter combos", v: "8" },
          ]}
          tags={[
            "Java 17",
            "Spring Boot 3",
            "PostgreSQL",
            "Redis",
            "WebSocket",
            "STOMP",
            "Docker",
          ]}
        />

        <ProjectBlock
          plate={<AiPlate />}
          pn={
            <>
              <span>SIDE PROJECT</span>
              <span>·</span>
              <span>2024</span>
              <span>·</span>
              <a className="riso-link" href="#">
                github ↗
              </a>
            </>
          }
          title={
            <>
              AI <span className="text-pink">Email</span> Reply
            </>
          }
          lede="A tiny brain in your Gmail inbox, drafting replies with five tones and three lengths."
          body={
            <p
              className="m-0 mb-2.5 max-w-[60ch] text-ink-soft"
              style={{ fontSize: "15.5px", lineHeight: 1.7 }}
            >
              Chrome extension that injects into Gmail&apos;s DOM, reads
              thread context, and routes it through Gemini.{" "}
              <strong className="font-semibold text-ink">
                5 tone modes, 3 length presets
              </strong>
              , secure API-key storage via{" "}
              <code className="font-mono">chrome.storage</code>, and the
              classic Manifest V3 split — background service worker, content
              script, popup UI.
            </p>
          }
          stats={[
            { k: "Tones", v: <span className="text-pink">5</span> },
            { k: "Lengths", v: <span className="text-blue">3</span> },
            {
              k: "Manifest",
              v: (
                <>
                  V<span className="text-pink">3</span>
                </>
              ),
            },
          ]}
          tags={["JavaScript", "Chrome Extension", "Manifest V3", "Gemini API"]}
        />
      </div>
    </section>
  );
}

interface StatCell {
  k: string;
  v: React.ReactNode;
}

interface ProjectBlockProps {
  plate: React.ReactNode;
  pn: React.ReactNode;
  title: React.ReactNode;
  lede: string;
  body: React.ReactNode;
  stats: StatCell[];
  tags: string[];
  isFirst?: boolean;
}

function ProjectBlock({
  plate,
  pn,
  title,
  lede,
  body,
  stats,
  tags,
  isFirst,
}: ProjectBlockProps) {
  return (
    <article
      className={`grid grid-cols-1 items-start gap-10 py-[38px] md:grid-cols-[1fr_1.4fr] md:gap-[56px] ${
        isFirst ? "pt-0" : "border-t-2 border-ink"
      }`}
    >
      {plate}
      <div>
        <div className="mb-2.5 flex flex-wrap items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
          {pn}
        </div>
        <h3
          className="m-0 mb-[18px] font-display text-[48px] font-bold uppercase leading-[0.92] tracking-[-0.035em] text-ink lg:text-[64px]"
        >
          {title}
        </h3>
        <p
          className="m-0 mb-3.5 max-w-[50ch] font-medium text-ink"
          style={{ fontSize: "19px", lineHeight: 1.45, textWrap: "pretty" }}
        >
          {lede}
        </p>
        {body}
        <div className="mt-5 grid grid-cols-3 border-2 border-ink bg-paper">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`flex min-h-[88px] flex-col justify-between px-4 py-3.5 ${
                i < stats.length - 1 ? "border-r-2 border-ink" : ""
              }`}
            >
              <div className="font-mono text-[10px] uppercase leading-tight tracking-[0.2em] text-ink-mute">
                {s.k}
              </div>
              <div className="whitespace-nowrap text-left font-display text-[20px] font-bold leading-none tabular-nums text-ink md:text-[22px] lg:text-[26px]">
                {s.v}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 font-mono text-[11px] text-ink-mute">
          {tags.map((tag, i) => (
            <span key={i}>
              {tag}
              {i < tags.length - 1 ? <span className="text-ink"> · </span> : null}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function PlateShell({
  children,
  number,
  color,
  slug,
  extraClass,
}: {
  children: React.ReactNode;
  number: string;
  color: string;
  slug: string;
  extraClass?: string;
}) {
  return (
    <div
      className={`grain relative overflow-hidden border-2 border-ink bg-paper-2 ${
        extraClass ?? ""
      }`}
      style={{ aspectRatio: "1 / 1" }}
    >
      {children}
      <div className="absolute left-2 top-2 z-[5] font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
        {number}
      </div>
      <div className="absolute right-2 top-2 z-[5] font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
        {color}
      </div>
      <div className="absolute bottom-2 left-2 z-[5] font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
        {slug}
      </div>
    </div>
  );
}

function DuelPlate() {
  return (
    <PlateShell number="PLATE 01" color="PINK / BLUE" slug="CAT-DUEL">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(var(--blue) 18%, transparent 19%)",
          backgroundSize: "8px 8px",
          mixBlendMode: "multiply",
          opacity: 0.55,
        }}
      />
      <div
        className="absolute rounded-full bg-pink"
        style={{
          width: "55%",
          aspectRatio: "1",
          left: "8%",
          top: "22%",
          mixBlendMode: "multiply",
        }}
      />
      <div
        className="absolute rounded-full bg-blue"
        style={{
          width: "55%",
          aspectRatio: "1",
          right: "6%",
          top: "26%",
          mixBlendMode: "multiply",
        }}
      />
      <div
        className="absolute z-[4] font-display font-bold uppercase text-paper text-stroke-ink"
        style={{
          left: "50%",
          top: "52%",
          transform: "translate(-50%, -50%) rotate(-6deg)",
          fontSize: "96px",
          letterSpacing: "-0.05em",
        }}
      >
        1v1
      </div>
    </PlateShell>
  );
}

function FlowPlate() {
  return (
    <PlateShell number="PLATE 02" color="3-COLOR" slug="DEVFLOW">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(24,22,20,.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(24,22,20,.18) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="absolute bg-pink"
        style={{
          width: "38%",
          aspectRatio: "1",
          left: "8%",
          top: "14%",
          border: "2.5px solid var(--ink)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        className="absolute bg-blue"
        style={{
          width: "38%",
          aspectRatio: "1",
          left: "36%",
          top: "32%",
          border: "2.5px solid var(--ink)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        className="absolute bg-yellow"
        style={{
          width: "38%",
          aspectRatio: "1",
          left: "54%",
          top: "50%",
          border: "2.5px solid var(--ink)",
          mixBlendMode: "multiply",
        }}
      />
      <svg
        className="absolute inset-0 z-[4]"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <marker
            id="arr-r"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 Z" fill="#181614" />
          </marker>
        </defs>
        <path
          d="M 130 130 L 200 200"
          stroke="#181614"
          strokeWidth="3"
          markerEnd="url(#arr-r)"
        />
        <path
          d="M 230 230 L 290 290"
          stroke="#181614"
          strokeWidth="3"
          markerEnd="url(#arr-r)"
        />
      </svg>
    </PlateShell>
  );
}

function AiPlate() {
  return (
    <PlateShell number="PLATE 03" color="3-COLOR" slug="AI EMAIL REPLY">
      <div
        className="absolute bg-pink"
        style={{
          left: "12%",
          top: "20%",
          width: "76%",
          aspectRatio: "1.4",
          border: "2.5px solid var(--ink)",
          mixBlendMode: "multiply",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        <div
          className="absolute inset-0 bg-blue"
          style={{
            clipPath: "polygon(0 0, 50% 60%, 100% 0)",
            mixBlendMode: "multiply",
          }}
        />
      </div>
      <div
        className="absolute z-[3] rounded-full bg-yellow"
        style={{
          width: "22%",
          aspectRatio: "1",
          left: "39%",
          top: "36%",
          border: "2.5px solid var(--ink)",
          mixBlendMode: "multiply",
        }}
      />
    </PlateShell>
  );
}
