import { LockKeyhole } from 'lucide-react';

type LockedStateProps = {
  title?: string;
  description: string;
  compact?: boolean;
};

export function LockedState({ title = 'Locked', description, compact = false }: LockedStateProps) {
  return (
    <div className={['locked-state', compact ? 'locked-state--compact' : ''].filter(Boolean).join(' ')}>
      <span className="locked-state__icon" aria-hidden="true">
        <LockKeyhole size={16} />
      </span>
      <div className="locked-state__content">
        <span className="locked-state__title">{title}</span>
        <span className="locked-state__description">{description}</span>
      </div>
    </div>
  );
}
