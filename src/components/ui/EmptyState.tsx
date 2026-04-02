import type { ReactNode } from 'react';

import { SectionHeading } from './SectionHeading';
import { WidgetCard } from './WidgetCard';

type EmptyStateProps = {
  eyebrow?: string;
  title: string;
  description: ReactNode;
  action?: ReactNode;
};

export function EmptyState({ eyebrow, title, description, action }: EmptyStateProps) {
  return (
    <WidgetCard as="section" className="empty-state">
      <SectionHeading {...(eyebrow ? { eyebrow } : {})} title={title} description={description} />
      {action ? <div className="empty-state__action">{action}</div> : null}
    </WidgetCard>
  );
}
