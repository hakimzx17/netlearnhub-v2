import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

import { SectionHeading } from './SectionHeading';
import { WidgetCard } from './WidgetCard';

type RouteCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  accent?: boolean;
  children?: ReactNode;
};

export function RouteCard({ eyebrow, title, description, accent = false, children }: RouteCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.25, ease: 'easeOut' as const },
      };

  return (
    <motion.div {...motionProps}>
      <WidgetCard as="section" accent={accent} className="route-card">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        {children}
      </WidgetCard>
    </motion.div>
  );
}
