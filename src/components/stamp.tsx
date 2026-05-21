import { cn } from "@/lib/utils";

type StampVariant = "pink" | "blue" | "yellow";

interface StampProps {
  children: React.ReactNode;
  variant?: StampVariant;
  className?: string;
}

const variantClass: Record<StampVariant, string> = {
  pink: "bg-pink text-paper shadow-riso-blue-sm",
  blue: "bg-blue text-paper shadow-riso-pink-sm",
  yellow: "bg-yellow text-ink shadow-riso-pink-sm",
};

export function Stamp({ children, variant = "pink", className }: StampProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.18em]",
        "[mix-blend-mode:multiply]",
        variantClass[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
