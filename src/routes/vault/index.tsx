import vaultEntries from '../../content/vault/vault-entries.json';

import { RouteCard } from '../../components/ui/RouteCard';
import type { VaultEntry } from '../../types/vault';

const typedEntries = vaultEntries as VaultEntry[];

export default function VaultRoute() {
  return (
    <section className="page-shell page-stack">
      <RouteCard
        eyebrow="Vault"
        title="Rapid reference starter"
        description="Seed vault entries are in place so category filters, search, and lesson links can be expanded from a real data shape."
      />

      <div className="card-grid">
        {typedEntries.map((entry) => (
          <article key={entry.id} className="glass-widget compact-card">
            <p className="eyebrow">{entry.category}</p>
            <h2 className="section-title">{entry.title}</h2>
            <p>{entry.summary}</p>
            <div className="metric-row">
              {entry.tags.map((tag) => (
                <span key={tag} className="option-pill">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
