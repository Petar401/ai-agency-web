'use client';

import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { HologramTabs } from './HologramTabs';

export default function SceneCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(true);
  const [compact, setCompact] = useState(false);

  // reduced-motion + viewport gating
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);

    const widthMql = window.matchMedia('(max-width: 480px)');
    const onWidth = () => setCompact(widthMql.matches);
    onWidth();
    widthMql.addEventListener('change', onWidth);

    return () => {
      mql.removeEventListener('change', onChange);
      widthMql.removeEventListener('change', onWidth);
    };
  }, []);

  // pause when off-screen
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setInView(e.isIntersecting);
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const frameloop = reducedMotion ? 'demand' : inView ? 'always' : 'never';

  return (
    <div ref={wrapperRef} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={frameloop}
      >
        <HologramTabs compact={compact} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
