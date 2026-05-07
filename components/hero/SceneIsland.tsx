'use client';

import dynamic from 'next/dynamic';

const SceneCanvas = dynamic(() => import('./SceneCanvas'), {
  ssr: false,
});

export function SceneIsland() {
  // Mounts on top of the static SceneFallback that's already rendered in the DOM.
  return <SceneCanvas />;
}
