'use client';

import { Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

type TabSpec = {
  label: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
};

const tabsAll: ReadonlyArray<TabSpec> = [
  { label: 'Lead Gen Agent',  position: [ 1.55, 0.95,  0.4], rotation: [-0.04, -0.18, -0.06], scale: 1.0 },
  { label: 'CRM Workflow',    position: [ 1.85,-0.55,  0.0], rotation: [ 0.04, -0.22, -0.02], scale: 0.95 },
  { label: 'Support Agent',   position: [-1.45, 1.05, -0.3], rotation: [-0.06,  0.22,  0.05], scale: 0.92 },
  { label: 'Document Auto',   position: [-1.85,-0.45, -0.6], rotation: [ 0.05,  0.20,  0.03], scale: 0.88 },
  { label: 'Knowledge AI',    position: [ 0.10, 1.10, -1.1], rotation: [-0.03, -0.05,  0.0 ], scale: 0.78 },
  { label: 'Custom Build',    position: [ 0.05,-0.90, -0.9], rotation: [ 0.03,  0.04,  0.0 ], scale: 0.74 },
];

const tabsCompact = tabsAll.slice(0, 4);

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  uniform float uTime;
  uniform float uOpacity;

  // distance to nearest edge (square)
  float edgeMask(vec2 uv, float widthPx) {
    vec2 e = min(uv, 1.0 - uv);
    float d = min(e.x, e.y);
    return 1.0 - smoothstep(widthPx, widthPx * 1.4, d);
  }

  void main() {
    // base panel — extremely subtle
    float gradient = mix(0.04, 0.13, vUv.y);

    // Fresnel (rim glow)
    float fres = pow(1.0 - max(0.0, dot(vViewDir, vNormal)), 2.0);

    // Edge line
    float edge = edgeMask(vUv, 0.012);

    // Soft scanline shimmer
    float scan = 0.5 + 0.5 * sin(vUv.y * 80.0 - uTime * 1.4);
    scan = mix(0.94, 1.04, scan);

    // Top fade
    float top = smoothstep(0.0, 0.18, 1.0 - vUv.y);

    float a = (gradient + fres * 0.55 + edge * 0.85) * scan;
    a *= mix(0.7, 1.0, top);
    a = clamp(a, 0.0, 1.0);

    // Color stays neutral — matches the brand palette
    vec3 col = vec3(1.0);

    gl_FragColor = vec4(col, a * uOpacity);
  }
`;

function HoloTab({
  spec,
  index,
  reducedMotion,
}: {
  spec: TabSpec;
  index: number;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const baseY = spec.position[1];

  const { material, uTime } = useMemo(() => {
    const uTimeRef = { value: 0 };
    const uOpacityRef = { value: 0.85 };
    const m = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: {
        uTime: uTimeRef,
        uOpacity: uOpacityRef,
      },
    });
    return { material: m, uTime: uTimeRef };
  }, []);

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    const t = state.clock.getElapsedTime();
    uTime.value = t;
    if (reducedMotion) return;
    g.rotation.y = spec.rotation[1] + Math.sin(t * 0.35 + index) * 0.05;
    g.rotation.x = spec.rotation[0] + Math.cos(t * 0.28 + index * 1.4) * 0.03;
    g.position.y = baseY + Math.sin(t * 0.55 + index * 1.2) * 0.045;
  });

  return (
    <group
      ref={groupRef}
      position={spec.position}
      rotation={spec.rotation}
      scale={spec.scale}
    >
      {/* Panel */}
      <mesh material={material}>
        <planeGeometry args={[1.45, 0.85, 1, 1]} />
      </mesh>

      {/* Edge wireframe */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(1.45, 0.85)]} />
        <lineBasicMaterial color="#ffffff" transparent opacity={0.45} />
      </lineSegments>

      {/* Inner separator line */}
      <mesh position={[0, 0.18, 0.001]}>
        <planeGeometry args={[1.32, 0.005]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.25} depthWrite={false} />
      </mesh>

      {/* Service label — only SDF text per tab (keeps the look, less troika overhead) */}
      <Text
        position={[-0.66, 0.28, 0.002]}
        anchorX="left"
        anchorY="middle"
        fontSize={0.085}
        color="#ffffff"
        material-transparent
        material-opacity={0.95}
        letterSpacing={-0.01}
      >
        {spec.label}
      </Text>

      {/* Status dots, drawn as small instanced primitives instead of <Text> */}
      <group position={[0.62, 0.28, 0.002]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[i * 0.05, 0, 0]}>
            <circleGeometry args={[0.012, 12]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.55} />
          </mesh>
        ))}
      </group>

      {/* Status caption: tiny live-dot + thin line — no extra SDF text */}
      <group position={[-0.66, -0.27, 0.002]}>
        <mesh position={[0.018, 0, 0]}>
          <circleGeometry args={[0.018, 12]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
        <mesh position={[0.16, 0, 0]}>
          <planeGeometry args={[0.22, 0.005]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.35} depthWrite={false} />
        </mesh>
      </group>

      {/* Progress track */}
      <mesh position={[0, -0.05, 0.002]}>
        <planeGeometry args={[1.18, 0.025]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} depthWrite={false} />
      </mesh>
      {/* Progress fill */}
      <mesh position={[-0.295, -0.05, 0.003]}>
        <planeGeometry args={[0.59, 0.025]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.7} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Filaments({ specs }: { specs: ReadonlyArray<TabSpec> }) {
  const positions = useMemo(() => {
    // Connect each tab to the next in a soft chain — keeps "connected systems" metaphor
    const arr: number[] = [];
    for (let i = 0; i < specs.length - 1; i++) {
      const a = specs[i]!.position;
      const b = specs[i + 1]!.position;
      arr.push(a[0], a[1], a[2], b[0], b[1], b[2]);
    }
    return new Float32Array(arr);
  }, [specs]);

  const ref = useRef<THREE.LineSegments>(null);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  useFrame((s) => {
    const m = ref.current?.material as THREE.LineBasicMaterial | undefined;
    if (!m) return;
    const t = s.clock.getElapsedTime();
    m.opacity = 0.18 + 0.08 * (0.5 + 0.5 * Math.sin(t * 0.6));
  });

  return (
    <lineSegments ref={ref} geometry={geom}>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.2} />
    </lineSegments>
  );
}

function CameraDrift({ reducedMotion }: { reducedMotion: boolean }) {
  const target = useRef(new THREE.Vector2(0, 0));
  const { camera, pointer } = useThree();

  useFrame((s) => {
    if (reducedMotion) return;
    const t = s.clock.getElapsedTime();
    // damped pointer follow
    target.current.x += (pointer.x * 0.4 - target.current.x) * 0.04;
    target.current.y += (pointer.y * 0.25 - target.current.y) * 0.04;
    // lissajous drift
    camera.position.x = Math.sin(t * 0.16) * 0.28 + target.current.x;
    camera.position.y = Math.cos(t * 0.12) * 0.18 + target.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function HologramTabs({
  compact = false,
  reducedMotion = false,
}: {
  compact?: boolean;
  reducedMotion?: boolean;
}) {
  const list = compact ? tabsCompact : tabsAll;
  return (
    <>
      <hemisphereLight intensity={0.45} groundColor="#000" />
      <directionalLight position={[3, 4, 2]} intensity={0.55} />
      <CameraDrift reducedMotion={reducedMotion} />
      <Filaments specs={list} />
      {list.map((spec, i) => (
        <HoloTab key={spec.label} spec={spec} index={i} reducedMotion={reducedMotion} />
      ))}
    </>
  );
}
