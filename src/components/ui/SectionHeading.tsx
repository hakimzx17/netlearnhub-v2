import type { ReactNode } from 'react';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  headingLevel?: 'h1' | 'h2' | 'h3';
  compact?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  headingLevel = 'h1',
  compact = false,
  className,
}: SectionHeadingProps) {
  const HeadingTag = headingLevel;

  return (
    <header className={['section-heading', compact ? 'section-heading--compact' : '', className].filter(Boolean).join(' ')}>
      {eyebrow ? <p className="eyebrow section-heading__eyebrow">{eyebrow}</p> : null}
      <HeadingTag className="section-heading__title">{title}</HeadingTag>
      {description ? <div className="section-heading__description">{description}</div> : null}
    </header>
  );
}
