import type { ElementType, ReactNode } from 'react';

type WidgetCardProps = {
  as?: ElementType;
  accent?: boolean;
  className?: string;
  children: ReactNode;
};

export function WidgetCard({ as: Component = 'article', accent = false, className, children }: WidgetCardProps) {
  return (
    <Component
      className={['glass-widget', 'widget-card', accent ? 'glass-widget--accent' : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Component>
  );
}
