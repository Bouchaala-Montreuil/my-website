import { useEffect, useRef } from "react";

/**
 * "Le champ" — the living field that fills the hero's open right side.
 *
 * A grid of ink cells behaves like a surface of liquid: the pointer bends it,
 * a click drops a ripple through it, and the character of the deformation
 * depends on where the pointer is:
 *
 *   left third   — the cells are pushed away from the pointer (repulsion)
 *   middle third — they turn around it (vortex)
 *   right third  — they are pulled in and rotate 45° (diamond lens)
 *
 * It is decorative: aria-hidden, pointer-events on the canvas only so the
 * page behind it keeps working, and a single static frame under reduced motion.
 */
export function InkField() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const INK = "32, 29, 29";
    const BLUE = "0, 4, 246";

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let cell = 18;

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
      cell = width < 380 ? 18 : 22;
      cols = Math.max(6, Math.ceil(width / cell));
      rows = Math.max(6, Math.ceil(height / cell));
    };

    resize();
    requestAnimationFrame(() => {
      resize();
      // Reduced motion paints exactly one frame: it must be painted after the
      // element has its final size, or the canvas stays empty.
      if (reduced) draw();
    });

    const pointer = { x: -999, y: -999, active: false };
    const ripples: { x: number; y: number; t: number }[] = [];
    let t = 0;
    let frame = 0;
    let visible = true;

    const zoneOf = (x: number) => {
      const ratio = x / Math.max(width, 1);
      if (ratio < 0.34) return "push";
      if (ratio < 0.67) return "vortex";
      return "lens";
    };

    const draw = () => {
      frame = 0;
      ctx.clearRect(0, 0, width, height);
      t += reduced ? 0 : 0.016;

      const zone = pointer.active ? zoneOf(pointer.x) : "idle";

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const cx = col * cell + cell / 2;
          const cy = row * cell + cell / 2;

          // idle surface: two slow crossing waves, kept very small
          let h =
            Math.sin(col * 0.33 + t * 1.05) * 0.34 +
            Math.cos(row * 0.27 - t * 0.82) * 0.3;

          // a single blue band drifts across the field, always one at a time
          const sweep = ((t * 0.16) % 1.9) - 0.45;
          const band = Math.abs(col / cols - (sweep + row * 0.004));

          let ox = 0;
          let oy = 0;
          let rot = 0;
          let blue = band < 0.035 ? 0.55 : 0;
          if (band < 0.035) h += 0.5;

          // pointer lens
          if (pointer.active) {
            const dx = cx - pointer.x;
            const dy = cy - pointer.y;
            const dist = Math.hypot(dx, dy);
            const radius = 230;
            if (dist < radius) {
              const fall = 1 - dist / radius;
              const power = fall * fall;
              h += power * 1.25;

              if (zone === "push") {
                const push = power * 16;
                ox = (dx / (dist || 1)) * push;
                oy = (dy / (dist || 1)) * push;
              } else if (zone === "vortex") {
                const swing = power * 15;
                ox = (-dy / (dist || 1)) * swing;
                oy = (dx / (dist || 1)) * swing;
              } else if (zone === "lens") {
                const pull = power * 13;
                ox = (-dx / (dist || 1)) * pull;
                oy = (-dy / (dist || 1)) * pull;
                rot = power * (Math.PI / 4);
              }

              blue = Math.max(blue, Math.max(0, 1 - dist / 90));
            }
          }

          // click ripples
          for (const ripple of ripples) {
            const age = (t - ripple.t) * 320;
            const radius = age;
            const dx = cx - ripple.x;
            const dy = cy - ripple.y;
            const dist = Math.hypot(dx, dy);
            const band = Math.abs(dist - radius);
            if (band < 46) {
              const power = (1 - band / 46) * Math.max(0, 1 - age / (Math.max(width, height) * 0.9));
              h += power * 1.6;
              const push = power * 9;
              ox += (dx / (dist || 1)) * push;
              oy += (dy / (dist || 1)) * push;
              blue = Math.max(blue, power * 0.9);
            }
          }

          const size = cell * (0.18 + Math.min(1.5, Math.abs(h)) * 0.78);
          const alpha = 0.24 + Math.min(0.7, Math.abs(h) * 0.5);
          const px = cx + ox;
          const py = cy + oy;

          ctx.save();
          ctx.translate(px, py);
          if (rot) ctx.rotate(rot);
          ctx.fillStyle = blue > 0.04 ? `rgba(${BLUE}, ${Math.min(0.95, alpha).toFixed(3)})` : `rgba(${INK}, ${alpha.toFixed(3)})`;
          ctx.fillRect(-size / 2, -size / 2, size, size);

          // a second, smaller square gives the grid a printed double-tone
          if (size > cell * 0.5) {
            ctx.fillStyle = `rgba(${INK}, 0.12)`;
            ctx.fillRect(-size / 4, -size / 4, size / 2, size / 2);
          }
          ctx.restore();
        }
      }

      while (ripples.length && t - ripples[0].t > 2.6) ripples.shift();

      if (!reduced && visible && width > 0) frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!frame && visible && !reduced) frame = requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
      host.dataset.zone = zoneOf(pointer.x);
      start();
    };
    const onLeave = () => {
      pointer.active = false;
      host.dataset.zone = "idle";
    };
    const onDown = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      ripples.push({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        t,
      });
      host.classList.add("is-hit");
      window.setTimeout(() => host.classList.remove("is-hit"), 220);
      start();
    };

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
