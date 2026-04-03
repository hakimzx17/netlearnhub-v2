import type { ReactNode } from 'react';

import type { CalloutType } from '../../content/types';

const CALLOUT_CONFIG: Record<CalloutType, { icon: string; label: string }> = {
  'why-matters': { icon: '★', label: 'Why This Matters' },
  'exam-trap': { icon: '⚠', label: 'Exam Trap' },
  'remember': { icon: '◆', label: 'Remember This' },
  'real-world': { icon: '◈', label: 'Real World' },
  'analogy': { icon: '◎', label: 'Analogy' },
};

type CalloutBlockProps = {
  type: CalloutType;
  title?: string;
  children: ReactNode;
};

export function CalloutBlock({ type, title, children }: CalloutBlockProps) {
  const config = CALLOUT_CONFIG[type];

  return (
    <div className={`callout callout--${type}`} role="note">
      <span className="callout__icon">{config.icon} {config.label}</span>
      {title && <h3 className="callout__title">{title}</h3>}
      <p className="callout__body">{children}</p>
    </div>
  );
}
