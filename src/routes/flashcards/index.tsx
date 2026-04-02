import { Link } from 'react-router-dom';

import { RouteCard } from '../../components/ui/RouteCard';
import { courseManifest } from '../../content/course';

export default function FlashcardsIndexRoute() {
  return (
    <section className="page-shell page-stack">
      <RouteCard
        eyebrow="Flashcards"
        title="Domain deck entry points"
        description="Flashcard scheduling state is backed by IndexedDB via idb-keyval. Domain routes can now grow into full review sessions."
      />

      <div className="card-grid">
        {courseManifest.map((domain) => (
          <article key={domain.id} className="glass-widget compact-card">
            <p className="eyebrow">{domain.id.toUpperCase()}</p>
            <h2 className="section-title">{domain.title}</h2>
            <Link className="btn-primary" to={`/flashcards/${domain.id}`}>
              Open deck
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
