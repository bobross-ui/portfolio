const items = [
  { text: "● BACKEND ENGINEER", star: "pink" as const },
  { text: "DISTRIBUTED SYSTEMS", star: "blue" as const },
  { text: "REAL-TIME · WEBSOCKETS", star: "pink" as const },
  { text: "JAVA · SPRING BOOT", star: "blue" as const },
  { text: "TYPESCRIPT · NODE", star: "pink" as const },
  { text: "POSTGRES · REDIS", star: "blue" as const },
  { text: "EXAM-DUEL.COM", star: "pink" as const },
  { text: "OPEN TO WORK", star: "blue" as const },
];

const starColor: Record<"pink" | "blue", string> = {
  pink: "text-pink",
  blue: "text-blue",
};

export function Marquee() {
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden border-b-2 border-ink bg-ink py-2.5 font-mono text-[12px] uppercase tracking-[0.16em] text-paper">
      <div className="inline-block animate-marq whitespace-nowrap">
        {loop.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="px-[22px]">{item.text}</span>
            <span className={`px-[22px] ${starColor[item.star]}`}>★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
