import { useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  'data-cursor'?: string;
}

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  strength = 0.3,
  'data-cursor': dataCursor,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const button = buttonRef.current;
    const content = contentRef.current;
    if (!button || !content) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: 'power2.out',
    });

    gsap.to(content, {
      x: x * strength * 0.5,
      y: y * strength * 0.5,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const button = buttonRef.current;
    const content = contentRef.current;
    if (!button || !content) return;

    gsap.to([button, content], {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      ref={buttonRef as any}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      data-cursor={dataCursor}
    >
      <span ref={contentRef} className="flex items-center justify-center gap-3">
        {children}
      </span>
    </Tag>
  );
}
