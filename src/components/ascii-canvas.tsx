"use client";

import { useEffect, useRef, useState } from "react";

const RAMP_SOFT = " .·:;+oxX#@";
const RAMP_DENSE =
  " `.-':_,^=;><+?|][}{tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

const MODES = [
  { id: "flow", key: "1", label: "1 · flow", variant: "pink" },
  { id: "rings", key: "2", label: "2 · rings", variant: "blue" },
  { id: "rain", key: "3", label: "3 · rain", variant: "pink" },
  { id: "tunnel", key: "4", label: "4 · tunnel", variant: "blue" },
] as const;

type PatternMode = (typeof MODES)[number]["id"];

interface Impulse {
  x: number;
  y: number;
  t: number;
  amp: number;
}

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

function charFor(value: number, ramp: string) {
  return ramp[Math.floor(clamp(value) * (ramp.length - 1))];
}

function modeForKey(key: string): PatternMode | undefined {
  return MODES.find((item) => item.key === key)?.id;
}

function modeButtonClass({
  isActive,
  variant,
}: {
  isActive: boolean;
  variant: (typeof MODES)[number]["variant"];
}) {
  const color =
    variant === "pink"
      ? "bg-pink text-paper shadow-riso-blue-sm"
      : "bg-blue text-paper shadow-riso-pink-sm";

  return [
    "inline-flex min-w-0 items-center justify-center overflow-hidden whitespace-nowrap px-2 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.1em] md:px-3 md:text-[11px] md:tracking-[0.18em]",
    "transition",
    "w-full md:w-auto",
    color,
    isActive ? "opacity-100" : "opacity-70 hover:opacity-100",
  ].join(" ");
}

export function AsciiCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLPreElement>(null);
  const blueRef = useRef<HTMLPreElement>(null);
  const pinkRef = useRef<HTMLPreElement>(null);
  const whiteRef = useRef<HTMLPreElement>(null);
  const modeRef = useRef<PatternMode>("flow");
  const [mode, setMode] = useState<PatternMode>("flow");

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const host = hostRef.current;
    const bg = bgRef.current;
    const blue = blueRef.current;
    const pink = pinkRef.current;
    const white = whiteRef.current;
    if (!host || !bg || !blue || !pink || !white) return;

    let cols = 0;
    let rows = 0;
    let mx = 0.5;
    let my = 0.5;
    let tmx = 0.5;
    let tmy = 0.5;
    let t = 0;
    let frame = 0;
    let trailX = 0.5;
    let trailY = 0.5;
    let velocity = 0;
    let prevMouseX = 0.5;
    let prevMouseY = 0.5;
    let lastMouseTime = performance.now();
    const impulses: Impulse[] = [];

    let running = true;
    let rafId = 0;

    const CHAR_W = 7.2;
    const CHAR_H = 12;
    const PAD_X = 36;
    const PAD_Y = 28;

    const fit = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      cols = Math.max(1, Math.floor((w - PAD_X) / CHAR_W));
      rows = Math.max(1, Math.floor((h - PAD_Y) / CHAR_H));
    };

    const onMouseMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      const now = performance.now();
      const dt = Math.max(1, now - lastMouseTime);
      const dx = nx - prevMouseX;
      const dy = ny - prevMouseY;
      // normalized velocity per second; tuned later via the click scalar
      velocity = (Math.sqrt(dx * dx + dy * dy) / dt) * 1000;
      prevMouseX = nx;
      prevMouseY = ny;
      lastMouseTime = now;
      tmx = nx;
      tmy = ny;
    };

    const onMouseLeave = () => {
      tmx = 0.5;
      tmy = 0.4;
      velocity = 0;
    };

    const onClick = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      // fast slingshot click = bigger shockwave, clamped
      const amp = Math.max(1, Math.min(2.5, 1 + velocity * 0.6));
      impulses.push({ x, y, t: 0, amp });
      if (impulses.length > 12) impulses.shift();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;

      const nextMode = modeForKey(e.key);
      if (!nextMode) return;

      e.preventDefault();
      modeRef.current = nextMode;
      setMode(nextMode);
    };

    const field = (x: number, y: number) => {
      const nx = x / cols;
      const ny = y / rows;
      const aspect = (cols / Math.max(rows, 1)) * 0.5;
      const currentMode = modeRef.current;
      let v = 0;

      if (currentMode === "flow") {
        v =
          0.5 +
          0.3 * Math.sin(nx * 8 + t * 0.9) * Math.cos(ny * 6 - t * 0.6) +
          0.18 * Math.sin((nx + ny) * 14 + t * 1.4);

        const dx = (nx - mx) * aspect;
        const dy = ny - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        v += 0.55 * Math.cos(d * 30 - t * 4) * Math.exp(-d * 5.5);
      } else if (currentMode === "rings") {
        const dx = (nx - mx) * aspect;
        const dy = ny - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        v =
          0.5 +
          0.45 * Math.sin(d * 36 - t * 3.2) +
          0.18 * Math.sin(nx * 4 + ny * 4 + t);
      } else if (currentMode === "rain") {
        const col = Math.floor(nx * 80);
        const speed = 0.8 + ((col * 13) % 7) * 0.18;
        const phase = ((col * 7) % 9) / 9;
        const yshift = (ny + t * speed * 0.18 + phase) % 1;
        v = Math.pow(1 - yshift, 4) * 1.2;
        v += 0.1 * Math.sin(nx * 30 + t);
      } else {
        const dx = (nx - 0.5) * aspect;
        const dy = ny - 0.5;
        const d = Math.sqrt(dx * dx + dy * dy) + 1e-6;
        const a = Math.atan2(dy, dx);
        v = 0.5 + 0.45 * Math.sin((1 / d) * 1.6 - t * 2 + a * 4);

        const mdx = (nx - mx) * aspect;
        const mdy = ny - my;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        v += 0.3 * Math.exp(-md * 6) * Math.sin(t * 3);
      }

      for (let i = 0; i < impulses.length; i++) {
        const im = impulses[i];
        const idx = (nx - im.x) * aspect;
        const idy = ny - im.y;
        const id = Math.sqrt(idx * idx + idy * idy);
        const ring = im.t * 0.32;
        const amp = im.amp * Math.exp(-im.t * 0.9);
        v +=
          amp *
          Math.cos((id - ring) * 38) *
          Math.exp(-Math.pow(id - ring, 2) * 70);
      }

      return clamp(v);
    };

    const render = () => {
      if (!running) return;

      t += 0.045;
      frame++;
      // velocity decays each frame so a stale move doesn't keep boosting clicks
      velocity *= 0.85;
      mx += (tmx - mx) * 0.12;
      my += (tmy - my) * 0.12;

      // mouse-trail wake — every few frames, drop a tiny impulse if the cursor moved
      if (frame % 6 === 0) {
        const dxT = tmx - trailX;
        const dyT = tmy - trailY;
        if (dxT * dxT + dyT * dyT > 0.0006) {
          impulses.push({ x: tmx, y: tmy, t: 0, amp: 0.25 });
          if (impulses.length > 16) impulses.shift();
          trailX = tmx;
          trailY = tmy;
        }
      }

      let bgOut = "";
      let blueOut = "";
      let pinkOut = "";
      let whiteOut = "";

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const base = field(x, y);
          const blueValue = clamp(base - 0.08);
          const pinkValue = clamp(base + 0.1);

          bgOut += charFor(base * 0.9, RAMP_SOFT);
          blueOut += blueValue > 0.6 ? charFor(blueValue, RAMP_DENSE) : " ";
          pinkOut += pinkValue > 0.64 ? charFor(pinkValue, RAMP_DENSE) : " ";
          whiteOut += base > 0.92 ? "." : " ";
        }
        bgOut += "\n";
        blueOut += "\n";
        pinkOut += "\n";
        whiteOut += "\n";
      }

      bg.textContent = bgOut;
      blue.textContent = blueOut;
      pink.textContent = pinkOut;
      white.textContent = whiteOut;

      for (let i = impulses.length - 1; i >= 0; i--) {
        impulses[i].t += 0.06;
        if (impulses[i].t > 6) impulses.splice(i, 1);
      }

      rafId = requestAnimationFrame(render);
    };

    const onResize = () => fit();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!running) {
              running = true;
              rafId = requestAnimationFrame(render);
            }
          } else {
            running = false;
            cancelAnimationFrame(rafId);
          }
        }
      },
      { threshold: 0 }
    );

    fit();
    host.addEventListener("mousemove", onMouseMove);
    host.addEventListener("mouseleave", onMouseLeave);
    host.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    io.observe(host);

    rafId = requestAnimationFrame(() => {
      fit();
      render();
    });

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      host.removeEventListener("mousemove", onMouseMove);
      host.removeEventListener("mouseleave", onMouseLeave);
      host.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
      io.disconnect();
    };
  }, []);

  return (
    <div className="relative isolate pt-24 md:pt-4">
      <div
        ref={hostRef}
        id="hero-canvas"
        className="relative z-0 h-[560px] cursor-crosshair overflow-hidden bg-ink md:h-[620px]"
      >
        <pre
          ref={bgRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] m-0 select-none whitespace-pre font-mono text-paper/15"
          style={{
            padding: "14px 18px",
            fontSize: "12px",
            lineHeight: "12px",
            letterSpacing: 0,
          }}
        />
        <pre
          ref={blueRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] m-0 translate-x-0.5 translate-y-px select-none whitespace-pre font-mono text-blue opacity-[0.85] mix-blend-screen"
          style={{
            padding: "14px 18px",
            fontSize: "12px",
            lineHeight: "12px",
            letterSpacing: 0,
          }}
        />
        <pre
          ref={pinkRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[3] m-0 -translate-x-px -translate-y-px select-none whitespace-pre font-mono text-pink opacity-[0.92] mix-blend-screen"
          style={{
            padding: "14px 18px",
            fontSize: "12px",
            lineHeight: "12px",
            letterSpacing: 0,
          }}
        />
        <pre
          ref={whiteRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[4] m-0 select-none whitespace-pre font-mono text-paper opacity-90 mix-blend-screen"
          style={{
            padding: "14px 18px",
            fontSize: "12px",
            lineHeight: "12px",
            letterSpacing: 0,
          }}
        />
      </div>
      <div
        aria-label="Select ASCII pattern"
        className="absolute left-[18px] top-10 z-30 grid w-[calc(100%-36px)] grid-cols-2 gap-1.5 md:left-auto md:right-[18px] md:top-1 md:flex md:w-auto md:max-w-[calc(100%-36px)] md:gap-2"
        onClick={(event) => event.stopPropagation()}
      >
        {MODES.map((item) => {
          const isActive = mode === item.id;

          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={isActive}
              className={modeButtonClass({
                isActive,
                variant: item.variant,
              })}
              onClick={() => setMode(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="pointer-events-none absolute left-[18px] top-1 z-30 inline-flex w-[calc(100%-36px)] items-center justify-center overflow-hidden whitespace-nowrap bg-pink px-2 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-paper shadow-riso-blue-sm md:w-auto md:px-3 md:text-[11px] md:tracking-[0.18em]">
        ▸ move cursor · click for a ripple
      </div>
    </div>
  );
}
