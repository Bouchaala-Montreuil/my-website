import { useEffect, useRef } from "react";

/**
 * "Le champ" — a mesh of ink filaments that behaves like a surface under tension.
 *
 * The pointer bends the mesh; where it is changes how:
 *   left third   — filaments are pushed away and bunch up (compression)
 *   middle third — they twist around the pointer (vortex)
 *   right third  — they are pulled into the pointer and steepen (lens)
 *
 * A click sends one of three different waves through the mesh, chosen by zone.
 * The whole thing is one canvas, a few hundred points, no library.
 */
export function InkField() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const INK = "32, 29, 29";
    const BLUE = "0, 4, 246";

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let gap = 22;
    let time = 0;
    let frame = 0;
    let visible = true;

    // displaced mesh, recomputed every frame
    let px: number[] = [];
    let py: number[] = [];
    let blue: number[] = [];

    const pointer = { x: -9999, y: -9999, vx: 0, vy: 0, active: false };
    const waves: { x: number; y: number; t: number; kind: string }[] = [];
    let last = { x: 0, y: 0, t: 0 };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      if (rect.width < 40) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gap = width < 380 ? 26 : 30;
      cols = Math.max(4, Math.round(width / gap));
      rows = Math.max(4, Math.round(height / gap));
      const n = (cols + 1) * (rows + 1);
      px = new Array(n).fill(0);
      py = new Array(n).fill(0);
      blue = new Array(n).fill(0);
    };

    const zoneOf = (x: number) => {
      const ratio = x / Math.max(width, 1);
      if (ratio < 0.34) return "push";
      if (ratio < 0.67) return "vortex";
      return "lens";
    };

    const at = (col: number, row: number) => row * (cols + 1) + col;

    const compute = () => {
      const speed = Math.min(1, Math.hypot(pointer.vx, pointer.vy) / 26);
      const zone = pointer.active ? zoneOf(pointer.x) : "idle";

      for (let row = 0; row <= rows; row += 1) {
        for (let col = 0; col <= cols; col += 1) {
          const i = at(col, row);
          const bx = (col / cols) * width;
          const by = (row / rows) * height;

          let x = bx;
          let y = by;
          let heat = 0;

          // the surface breathes: a standing wave on both axes
          const idle =
            Math.sin(col * 0.45 + time * 0.9) * 0.5 +
            Math.cos(row * 0.38 - time * 0.7) * 0.5;
          x += idle * 1.6;
          y += Math.cos(col * 0.3 + time * 0.6) * 1.4;

          if (pointer.active) {
            const dx = bx - pointer.x;
            const dy = by - pointer.y;
            const dist = Math.hypot(dx, dy) || 1;
            const radius = 210 + speed * 60;
            if (dist < radius) {
              const fall = 1 - dist / radius;
              const power = fall * fall;

              if (zone === "push") {
                const push = power * (26 + speed * 26);
                x += (dx / dist) * push;
                y += (dy / dist) * push;
              } else if (zone === "vortex") {
                const swing = power * (24 + speed * 26);
                x += (-dy / dist) * swing;
                y += (dx / dist) * swing;
              } else {
                const pull = power * (18 + speed * 22);
                x -= (dx / dist) * pull;
                y -= (dy / dist) * pull;
                // steepen towards the pointer: vertical compression
                y = pointer.y + (y - pointer.y) * (1 - power * 0.22);
              }
              heat = Math.max(heat, Math.max(0, 1 - dist / 120));
            }
          }

          for (const wave of waves) {
            const age = time - wave.t;
            const dx = bx - wave.x;
            const dy = by - wave.y;
            const dist = Math.hypot(dx, dy) || 1;
            let offset = 0;
            let strength = 0;

            if (wave.kind === "ring") {
              const radius = age * 260;
              const band = Math.abs(dist - radius);
              if (band < 40) {
                strength = (1 - band / 40) * Math.max(0, 1 - age / 2.2);
                offset = strength * 16;
                x += (dx / dist) * offset;
                y += (dy / dist) * offset;
              }
            } else if (wave.kind === "shear") {
              // a horizontal crease that travels down the mesh
              const crease = wave.y + age * 190;
              const band = Math.abs(by - crease);
              if (band < 52) {
                strength = (1 - band / 52) * Math.max(0, 1 - age / 2.4);
                x += strength * Math.sin((by - crease) * 0.12) * 22;
                y += strength * 9;
              }
            } else {
              // collapse: the mesh is drawn to the centre, then released.
              // The heat falls off with distance so the core glows and the
              // edges stay ink.
              const pull = Math.max(0, 1 - age / 0.7);
              const reach = Math.max(0, 1 - dist / (Math.max(width, height) * 0.75));
              strength = pull * reach;
              x += (wave.x - x) * pull * 0.3;
              y += (wave.y - y) * pull * 0.3;
            }

            heat = Math.max(heat, strength);
          }

          px[i] = x;
          py[i] = y;
          blue[i] = heat;
        }
      }

      while (waves.length && time - waves[0].t > 2.6) waves.shift();
    };

    const draw = () => {
      frame = 0;
      ctx.clearRect(0, 0, width, height);
      if (!reduced) time += 0.016;
      compute();

      // horizontal filaments first, then vertical, so crossings read as a weave
      for (let row = 0; row <= rows; row += 1) {
        ctx.beginPath();
        for (let col = 0; col <= cols; col += 1) {
          const i = at(col, row);
          const x = px[i];
          const y = py[i];
          if (col === 0) ctx.moveTo(x, y);
          else {
            const prev = at(col - 1, row);
            const cx = (px[prev] + x) / 2;
            ctx.quadraticCurveTo(cx, py[prev], x, y);
          }
        }
        ctx.strokeStyle = `rgba(${INK}, ${(0.16 + (row % 2 ? 0.05 : 0)).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let col = 0; col <= cols; col += 1) {
        ctx.beginPath();
        for (let row = 0; row <= rows; row += 1) {
          const i = at(col, row);
          const x = px[i];
          const y = py[i];
          if (row === 0) ctx.moveTo(x, y);
          else {
            const prev = at(col, row - 1);
            const cy = (py[prev] + y) / 2;
            ctx.quadraticCurveTo(px[i], cy, x, y);
          }
        }
        ctx.strokeStyle = `rgba(${INK}, 0.14)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // the hot zone is redrawn in blue, with nodes at the crossings
      for (let row = 0; row <= rows; row += 1) {
        for (let col = 0; col <= cols; col += 1) {
          const i = at(col, row);
          if (blue[i] < 0.06) continue;
          const a = Math.min(0.88, blue[i]);
          const r = 1.2 + blue[i] * 2.6;
          ctx.beginPath();
          ctx.arc(px[i], py[i], r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${BLUE}, ${a.toFixed(3)})`;
          ctx.fill();

          if (col < cols && row < rows) {
            const right = at(col + 1, row);
            if (blue[right] > 0.06) {
              ctx.beginPath();
              ctx.moveTo(px[i], py[i]);
              ctx.lineTo(px[right], py[right]);
              ctx.strokeStyle = `rgba(${BLUE}, ${(a * 0.7).toFixed(3)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }

      // the pointer's own knot
      if (pointer.active && !reduced) {
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${BLUE}, 0.85)`;
      }

      if (!reduced && visible && width > 0) frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!frame && visible && !reduced && width > 0) frame = requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const now = performance.now();
      const nx = event.clientX - rect.left;
      const ny = event.clientY - rect.top;
      const dt = Math.max(8, now - last.t);
      pointer.vx = ((nx - last.x) / dt) * 16;
      pointer.vy = ((ny - last.y) / dt) * 16;
      pointer.x = nx;
      pointer.y = ny;
      pointer.active = true;
      last = { x: nx, y: ny, t: now };
      host.dataset.zone = zoneOf(nx);
      start();
    };

    const onLeave = () => {
      pointer.active = false;
      pointer.vx = 0;
      pointer.vy = 0;
      host.dataset.zone = "idle";
    };

    const onDown = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const nx = event.clientX - rect.left;
      const ny = event.clientY - rect.top;
      const zone = zoneOf(nx);
      // three different waves, one per zone — never the same click twice
      const kind = zone === "push" ? "ring" : zone === "vortex" ? "shear" : "collapse";
      waves.push({ x: nx, y: ny, t: time, kind });
      host.dataset.wave = kind;
      host.classList.add("is-hit");
      window.setTimeout(() => host.classList.remove("is-hit"), 240);
      start();
    };

    resize();
    requestAnimationFrame(() => {
      resize();
      if (reduced) draw();
    });

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerdown", onDown);
    window.addEventListener("resize", resize);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible) start();
      },
      { rootMargin: "120px" },
    );
    io.observe(host);

    draw();

    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", resize);
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="ink-field" ref={hostRef} data-cursor="field" data-cursor-label="Champ">
      <canvas ref={canvasRef} aria-hidden="true" />
      <p className="ink-field__hint" aria-hidden="true">
        <span>Bougez</span>
        <span className="ink-field__sep">·</span>
        <span>cliquez</span>
      </p>
    </div>
  );
}
