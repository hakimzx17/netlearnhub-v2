type ProgressTrackProps = {
  value: number;
  max?: number;
  label: string;
  tone?: 'accent' | 'warning';
  className?: string;
};

function clampProgress(value: number, max: number) {
  if (max <= 0) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round((value / max) * 100)));
}

export function ProgressTrack({ value, max = 100, label, tone = 'accent', className }: ProgressTrackProps) {
  const percent = clampProgress(value, max);

  return (
    <div className={['progress-block', className].filter(Boolean).join(' ')}>
      <div className="progress-block__meta">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div
        className={['progress-track', `progress-track--${tone}`].join(' ')}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={Math.max(0, Math.min(max, value))}
      >
        <span className="progress-track__fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
