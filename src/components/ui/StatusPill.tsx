import type { ReactNode } from 'react';

type StatusPillTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';

type StatusPillProps = {
  children: ReactNode;
  tone?: StatusPillTone;
  className?: string;
};

export function StatusPill({ children, tone = 'neutral', className }: StatusPillProps) {
  return (
    <span className={['status-pill', `status-pill--${tone}`, className].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
}
