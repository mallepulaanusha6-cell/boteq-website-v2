import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let targetX = -100;
    let targetY = -100;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: targetX, y: targetY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('.cursor-pointer'))
      ) {
        setIsHoveringInteractive(true);
      } else {
        setIsHoveringInteractive(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    let animId: number;
    let currentX = -100;
    let currentY = -100;

    const loop = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setTrailingPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Core Dot in Dusty Rose */}
      <div
        className="fixed pointer-events-none z-50 w-2 h-2 rounded-full bg-[#EBB8C0] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 hidden md:block shadow-[0_0_8px_#EBB8C0]"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      />
      {/* Imperial Rose Trailing Aura */}
      <div
        className={`fixed pointer-events-none z-50 rounded-full border -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color] duration-300 hidden md:block ${
          isHoveringInteractive
            ? 'w-10 h-10 border-[#EBB8C0] bg-[#731E1B]/25 backdrop-blur-[1px] shadow-[0_0_15px_rgba(235,184,192,0.6)]'
            : 'w-6 h-6 border-[#B96A73]/40 bg-transparent'
        }`}
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
        }}
      />
    </>
  );
};
