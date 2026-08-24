import { useEffect, useRef, useState, useCallback } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const dot = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [label, setLabel] = useState('');
  const [isMobile, setIsMobile] = useState(true);

  // Detect mobile once
  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // The core render loop — runs every frame, no GSAP, no React state
  const render = useCallback(() => {
    const dotEl = dotRef.current;
    const ringEl = ringRef.current;
    if (!dotEl || !ringEl) {
      raf.current = requestAnimationFrame(render);
      return;
    }

    // Dot follows mouse almost instantly (lerp 0.8 = very fast)
    dot.current.x += (mouse.current.x - dot.current.x) * 0.8;
    dot.current.y += (mouse.current.y - dot.current.y) * 0.8;

    // Ring follows with soft delay (lerp 0.12 = smooth trail)
    ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
    ring.current.y += (mouse.current.y - ring.current.y) * 0.12;

    // Write directly to transform — no React re-render, no GSAP overhead
    dotEl.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0)`;
    ringEl.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;

    raf.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Start render loop
    raf.current = requestAnimationFrame(render);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      setHidden(false);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], [data-cursor], input, textarea, select');
      if (interactive) {
        setHovering(true);
        const cursorAttr = (interactive as HTMLElement).getAttribute('data-cursor');
        setLabel(cursorAttr && cursorAttr !== 'true' ? cursorAttr : '');
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], [data-cursor], input, textarea, select');
      if (interactive) {
        setHovering(false);
        setLabel('');
      }
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [isMobile, render]);

  if (isMobile) return null;

  const dotSize = hovering ? 14 : 8;
  const ringSize = hovering ? (label ? 90 : 55) : 36;

  return (
    <>
      {/* Dot — near-instant, mix-blend for visibility on any bg */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          borderRadius: '50%',
          background: '#fff',
          opacity: hidden ? 0 : 1,
          transition: 'width 0.25s, height 0.25s, margin 0.25s, opacity 0.25s',
          willChange: 'transform',
        }}
      />

      {/* Ring — smooth trailing follow */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center"
        style={{
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          borderRadius: '50%',
          border: hovering
            ? '1.5px solid rgba(232, 93, 74, 0.9)'
            : '1px solid rgba(255, 255, 255, 0.25)',
          background: hovering && label
            ? 'rgba(232, 93, 74, 0.85)'
            : 'transparent',
          opacity: hidden ? 0 : 1,
          transition: 'width 0.35s cubic-bezier(.2,1,.3,1), height 0.35s cubic-bezier(.2,1,.3,1), margin 0.35s cubic-bezier(.2,1,.3,1), border 0.3s, background 0.3s, opacity 0.25s',
          willChange: 'transform',
        }}
      >
        {label && hovering && (
          <span
            className="text-white text-[10px] font-semibold tracking-wider uppercase select-none"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  );
}
