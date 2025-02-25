"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

export function ThemeToggle({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { setTheme, theme } = useTheme();

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full p-2 transition-colors hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    >
      {theme === "light" ? (
        <Sun
          onClick={() => setTheme("dark")}
          className="h-6 w-6 cursor-pointer"
        />
      ) : (
        <Moon
          onClick={() => setTheme("light")}
          className="h-6 w-6 cursor-pointer"
        />
      )}
    </div>
  );
} 