"use client";

import { useEffect, useRef } from "react";

const chars = " .·:;+oxX#@";

interface Impulse {
  x: number;
  y: number;
  t: number;
  amp: number;
}

export function AsciiCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const el = preRef.current;
    if (!host || !el) return;

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
    let lastMouseTime = 0;
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

      let out = "";
      const aspect = (cols / Math.max(rows, 1)) * 0.5;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const nx = x / cols;
          const ny = y / rows;

          let v =
            0.5 +
            0.32 * Math.sin(nx * 8 + t * 0.9) * Math.cos(ny * 6 - t * 0.6) +
            0.18 * Math.sin((nx + ny) * 14 + t * 1.4);

          const dx = (nx - mx) * aspect;
          const dy = ny - my;
          const d = Math.sqrt(dx * dx + dy * dy);
          v += 0.6 * Math.cos(d * 32 - t * 4) * Math.exp(-d * 5.5);

          for (let i = 0; i < impulses.length; i++) {
            const im = impulses[i];
            const idx = (nx - im.x) * aspect;
            const idy = ny - im.y;
            const id = Math.sqrt(idx * idx + idy * idy);
            const ring = im.t * 0.35;
            const amp = im.amp * Math.exp(-im.t * 0.9);
            v +=
              amp *
              Math.cos((id - ring) * 40) *
              Math.exp(-Math.pow(id - ring, 2) * 60);
          }

          v = Math.max(0, Math.min(1, v));
          out += chars[Math.floor(v * (chars.length - 1))];
        }
        out += "\n";
      }

      el.textContent = out;

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
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      id="hero-canvas"
      className="relative h-[520px] overflow-hidden bg-ink text-pink cursor-crosshair"
    >
      <pre
        ref={preRef}
        aria-hidden="true"
        className="m-0 select-none pointer-events-none whitespace-pre font-mono text-pink opacity-[0.85]"
        style={{
          padding: "14px 18px",
          fontSize: "12px",
          lineHeight: 1,
          letterSpacing: 0,
          textShadow: "1px 0 var(--blue)",
        }}
      />
    </div>
  );
}
