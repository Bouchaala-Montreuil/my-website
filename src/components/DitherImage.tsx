import { useEffect, useRef } from "react";

/**
 * The case study image, rendered as an ordered-dither engraving with a hole
 * that follows the pointer to reveal the photograph underneath. This is the one
 * playful gesture in the site — a nod to the dithered covers used on the
 * reference, rebuilt from scratch with a canvas and a 4×4 Bayer matrix.
 *
 * Progressive: without JavaScript, or with reduced motion, the plain image
 * stays visible; the canvas only appears once it has been drawn.
 */
export function DitherImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = host.querySelector("canvas");
    if (!canvas) return;

    const image = new Image();
    image.src = src;

    let disposed = false;

    const draw = () => {
      if (disposed) return;
      const w = 440;
      const h = Math.max(1, Math.round((w * height) / width));
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(image, 0, 0, w, h);

      let frame: ImageData;
      try {
        frame = ctx.getImageData(0, 0, w, h);
      } catch {
        return; // tainted canvas: keep the plain image
      }

      const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
      const data = frame.data;
      for (let y = 0; y < h; y += 1) {
        for (let x = 0; x < w; x += 1) {
          const i = (y * w + x) * 4;
          const luma = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
          const threshold = ((bayer[(y % 4) * 4 + (x % 4)] + 0.5) / 16) * 255;
          if (luma > threshold) {
            data[i] = 244;
            data[i + 1] = 236;
            data[i + 2] = 220;
          } else {
            data[i] = 27;
            data[i + 1] = 32;
            data[i + 2] = 38;
          }
        }
      }
      ctx.putImageData(frame, 0, 0);
      host.classList.add("dither--ready");
    };

    if (image.decode) {
      image.decode().then(draw).catch(() => undefined);
    } else {
      image.onload = draw;
    }

    let raf = 0;
    const onMove = (event: PointerEvent) => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const rect = host.getBoundingClientRect();
        host.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        host.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    };
    const onLeave = () => {
      host.style.setProperty("--mx", "-30%");
      host.style.setProperty("--my", "-30%");
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      disposed = true;
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [src, width, height]);

  return (
    <div className="dither" ref={hostRef}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />
      <canvas aria-hidden="true" />
    </div>
  );
}
