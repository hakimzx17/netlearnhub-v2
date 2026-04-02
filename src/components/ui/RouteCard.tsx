import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type RouteCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  accent?: boolean;
  children?: ReactNode;
};

export function RouteCard({ eyebrow, title, description, accent = false, children }: RouteCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={['glass-widget', accent ? 'glass-widget--accent' : '', 'route-card']
        .filter(Boolean)
        .join(' ')}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="route-card__title">{title}</h1>
      <p className="route-card__description">{description}</p>
      {children}
    </motion.section>
  );
}
