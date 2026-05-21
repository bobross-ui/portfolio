interface SectionHeadProps {
  num: string;
  title?: React.ReactNode;
}

export function SectionHead({ num, title }: SectionHeadProps) {
  return (
    <div className="mb-[38px] flex flex-wrap items-end gap-6">
      <div className="w-20 border-t-2 border-ink py-1.5 font-mono text-[12px] uppercase tracking-[0.2em] text-ink-mute">
        {num}
      </div>
      {title ? (
        <h2 className="m-0 font-display text-[56px] font-bold uppercase leading-[0.9] tracking-[-0.03em] text-ink lg:text-[72px]">
          {title}
        </h2>
      ) : null}
    </div>
  );
}
