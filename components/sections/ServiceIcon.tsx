import type { Site } from '@/content/site';

type ServiceId = Site['services'][number]['id'];

const stroke = 'currentColor';
const props = {
  width: 22,
  height: 22,
  fill: 'none',
  stroke,
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function ServiceIcon({ id }: { id: ServiceId }) {
  switch (id) {
    case 'automation-systems':
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <path d="M3 12h6" />
          <path d="M15 12h6" />
          <circle cx="12" cy="12" r="2.4" />
          <path d="M12 4v3" />
          <path d="M12 17v3" />
        </svg>
      );
    case 'ai-agents':
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <circle cx="12" cy="9" r="4" />
          <path d="M5 21a7 7 0 0 1 14 0" />
        </svg>
      );
    case 'crm-lead-workflow':
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
          <path d="M11 8v6" />
          <path d="M8 11h6" />
        </svg>
      );
    case 'internal-knowledge-assistant':
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14H4z" />
          <path d="M4 19a2 2 0 0 0 2 2h12" />
          <path d="M9 7h6" />
          <path d="M9 11h6" />
        </svg>
      );
    case 'document-automation':
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v4h4" />
          <path d="M9 13h6" />
          <path d="M9 17h4" />
        </svg>
      );
    case 'custom-ai':
      return (
        <svg viewBox="0 0 24 24" {...props}>
          <rect x="3" y="3" width="7" height="9" rx="1.5" />
          <rect x="14" y="3" width="7" height="5" rx="1.5" />
          <rect x="14" y="12" width="7" height="9" rx="1.5" />
          <rect x="3" y="16" width="7" height="5" rx="1.5" />
        </svg>
      );
  }
}
