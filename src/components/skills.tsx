import { SectionHead } from "./section-head";

interface SkillItem {
  name: string;
  years?: string;
}

interface SkillColumn {
  heading: string;
  items: SkillItem[];
}

const columns: SkillColumn[] = [
  {
    heading: "Backend",
    items: [
      { name: "Java", years: "4y" },
      { name: "Spring Boot", years: "3y" },
      { name: "Spring Security", years: "3y" },
      { name: "Spring Data JPA", years: "3y" },
      { name: "Microservices", years: "3y" },
      { name: "Apache Kafka", years: "2y" },
    ],
  },
  {
    heading: "Frontend / Mobile",
    items: [
      { name: "TypeScript", years: "3y" },
      { name: "Node.js", years: "3y" },
      { name: "React Native · Expo", years: "2y" },
      { name: "Next.js", years: "3y" },
      { name: "React", years: "3y" },
      { name: "JS / HTML / CSS", years: "5y" },
    ],
  },
  {
    heading: "Data / DevOps",
    items: [
      { name: "PostgreSQL", years: "4y" },
      { name: "Redis", years: "3y" },
      { name: "Oracle DB", years: "2y" },
      { name: "Docker", years: "3y" },
      { name: "GitLab CI / GH Actions", years: "3y" },
      { name: "Signoz · Sentry", years: "2y" },
    ],
  },
  {
    heading: "Concepts",
    items: [
      { name: "Microservice arch." },
      { name: "JWT auth" },
      { name: "Redis caching" },
      { name: "Rate limiting" },
      { name: "API gateway" },
      { name: "Workflow orchestration" },
      { name: "Elo rating" },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="border-b-2 border-ink py-[60px]">
      <div className="wrap">
        <SectionHead
          num="§ 04 / Stack"
          title={
            <>
              The toolkit,
              <br />
              annotated.
            </>
          }
        />

        <div className="grain relative border-2 border-ink bg-paper px-6 py-7 shadow-riso-pink-lg md:px-10 md:py-9">
          {/* blue triangle corner */}
          <div
            className="pointer-events-none absolute bg-blue"
            style={{
              top: "-1px",
              right: "-1px",
              width: "120px",
              height: "120px",
              clipPath: "polygon(100% 0, 0 0, 100% 100%)",
              mixBlendMode: "multiply",
            }}
          />
          {/* corner label */}
          <div
            className="absolute z-[2] font-mono uppercase text-paper"
            style={{
              top: "32px",
              right: "24px",
              fontSize: "11px",
              letterSpacing: "0.18em",
              transform: "rotate(45deg)",
              transformOrigin: "center",
            }}
          >
            № 04
          </div>

          <h3
            className="m-0 mb-1.5 font-display font-bold uppercase"
            style={{ fontSize: "42px", letterSpacing: "-0.025em" }}
          >
            Things I&apos;ve used.
          </h3>
          <div
            className="mb-7 font-mono uppercase text-ink-mute"
            style={{ fontSize: "12px", letterSpacing: "0.12em" }}
          >
            A printed inventory · Mumbai · MMXXVI
          </div>

          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ columnGap: "24px", rowGap: "18px" }}
          >
            {columns.map((col) => (
              <div key={col.heading}>
                <h4 className="m-0 mb-2.5 inline-block bg-ink px-2 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-paper">
                  {col.heading}
                </h4>
                <ul className="m-0 list-none p-0">
                  {col.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-baseline justify-between gap-2 py-1.5 font-display font-medium"
                      style={{
                        fontSize: "16px",
                        borderBottom: "1.5px dashed rgba(24,22,20,0.35)",
                      }}
                    >
                      <span>{item.name}</span>
                      {item.years ? (
                        <span
                          className="bg-yellow font-mono text-ink-mute"
                          style={{
                            fontSize: "10.5px",
                            padding: "1px 5px",
                          }}
                        >
                          {item.years}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
