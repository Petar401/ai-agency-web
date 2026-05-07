import { cn } from '@/lib/cn';

/**
 * Static, no-JS fallback for the 3D hologram-tabs scene.
 * Rendered server-side so it ships in the initial HTML and is what users see
 * before the R3F island hydrates (or permanently if WebGL is unavailable).
 */

type Tab = { label: string; icon: 'spark' | 'circuit' | 'inbox' | 'doc' | 'orbit' | 'lock' };

const tabs: ReadonlyArray<Tab> = [
  { label: 'Lead Gen Agent', icon: 'spark' },
  { label: 'CRM Workflow', icon: 'circuit' },
  { label: 'Support Agent', icon: 'inbox' },
  { label: 'Document Auto', icon: 'doc' },
  { label: 'Knowledge AI', icon: 'orbit' },
  { label: 'Custom Build', icon: 'lock' },
];

function Glyph({ kind }: { kind: Tab['icon'] }) {
  const stroke = 'currentColor';
  switch (kind) {
    case 'spark':
      return (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={stroke} strokeWidth="1.6">
          <path d="m12 3 2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
        </svg>
      );
    case 'circuit':
      return (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={stroke} strokeWidth="1.6">
          <path d="M4 12h6" /><path d="M14 12h6" /><circle cx="12" cy="12" r="2.2" />
        </svg>
      );
    case 'inbox':
      return (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={stroke} strokeWidth="1.6">
          <rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 13h5l1 2h6l1-2h5" />
        </svg>
      );
    case 'doc':
      return (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={stroke} strokeWidth="1.6">
          <path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4" />
        </svg>
      );
    case 'orbit':
      return (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={stroke} strokeWidth="1.6">
          <ellipse cx="12" cy="12" rx="9" ry="4" /><circle cx="12" cy="12" r="2.2" />
        </svg>
      );
    case 'lock':
      return (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={stroke} strokeWidth="1.6">
          <rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      );
  }
}

const positions = [
  // top-right cluster, foreground
  'top-[8%] right-[6%] rotate-[-6deg] scale-[1.05]',
  // mid-right, mid-depth
  'top-[34%] right-[18%] rotate-[3deg] scale-[0.92]',
  // bottom-right, foreground
  'bottom-[10%] right-[4%] rotate-[-3deg] scale-[1.02]',
  // upper-mid, deeper
  'top-[18%] right-[42%] rotate-[7deg] scale-[0.78] opacity-80',
  // mid, deeper
  'top-[48%] right-[36%] rotate-[-4deg] scale-[0.85] opacity-75',
  // lower mid, deepest
  'bottom-[24%] right-[28%] rotate-[5deg] scale-[0.7] opacity-60',
];

type SceneFallbackProps = {
  className?: string;
  /** Smaller layout for mobile — hides deeper tabs */
  compact?: boolean;
};

export function SceneFallback({ className, compact = false }: SceneFallbackProps) {
  const visible = compact ? tabs.slice(0, 3) : tabs;
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 select-none',
        className,
      )}
      aria-hidden
    >
      {visible.map((tab, i) => {
        const pos = positions[i] ?? positions[0];
        return (
          <div
            key={tab.label}
            className={cn(
              'absolute w-[220px] rounded-2xl border border-white/15 bg-white/[.045] p-4 text-white shadow-[0_18px_60px_-20px_rgba(255,255,255,0.18)] backdrop-blur-md',
              'before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/[.07] before:to-transparent',
              pos,
            )}
            style={{
              transform: `${'' /* CSS classes provide the rotate/scale */}`,
            }}
          >
            <div className="relative flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-md border border-white/15 bg-white/[.05] text-white/85">
                <Glyph kind={tab.icon} />
              </span>
              <span className="text-[12.5px] font-medium tracking-tight text-white/90">
                {tab.label}
              </span>
            </div>
            <div className="relative mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[62%] rounded-full bg-white/60" />
            </div>
            <div className="relative mt-2 flex items-center justify-between text-[10.5px] text-white/55">
              <span>active</span>
              <span>● ● ●</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
