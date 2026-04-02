import flashcards from '../../content/flashcards/domain-1.json';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { RouteCard } from '../../components/ui/RouteCard';
import { getDomain } from '../../content/course';
import { useFlashcardStore } from '../../lib/stores/flashcardStore';
import type { FlashcardData } from '../../types/flashcard';

const typedFlashcards = flashcards as FlashcardData[];

export default function DomainFlashcardsRoute() {
  const { domainId } = useParams();
  const domain = getDomain(domainId);
  const [revealedCardId, setRevealedCardId] = useState<string | null>(null);
  const cards = useFlashcardStore((state) => state.cards);
  const sessionQueue = useFlashcardStore((state) => state.sessionQueue);
  const hydrated = useFlashcardStore((state) => state.hydrated);
  const hydrate = useFlashcardStore((state) => state.hydrate);
  const startSession = useFlashcardStore((state) => state.startSession);
  const rateCard = useFlashcardStore((state) => state.rateCard);
  const endSession = useFlashcardStore((state) => state.endSession);

  const domainCards = useMemo(
    () => typedFlashcards.filter((card) => card.domainId === domainId),
    [domainId],
  );

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (hydrated) {
      startSession(domainCards.map((card) => card.id));
    }
  }, [domainCards, hydrated, startSession]);

  if (!domain) {
    return (
      <section className="page-shell">
        <RouteCard
          eyebrow="Flashcards"
          title="Deck not found"
          description="Open a valid domain deck from the flashcards index."
        />
      </section>
    );
  }

  const currentCard = domainCards.find((card) => card.id === sessionQueue[0]);
  const isCurrentCardRevealed = currentCard ? revealedCardId === currentCard.id : false;

  return (
    <section className="page-shell page-stack">
      <RouteCard
        eyebrow={`${domain.title} / Flashcards`}
        title={currentCard ? 'Spaced repetition starter' : 'No due cards'}
        description={
          currentCard
            ? `${sessionQueue.length} card(s) currently due for review in this local browser profile.`
            : 'Use this route to build the full flip-card session UI from the starter state engine.'
        }
      >
        {currentCard ? (
          <div className="metric-row">
            <span className="metric-pill">
              Reviewed {cards[currentCard.id]?.reviewCount ?? 0} time(s)
            </span>
          </div>
        ) : null}
      </RouteCard>

      {currentCard ? (
        <article
          className="glass-widget flashcard-shell"
          onClick={() => {
            setRevealedCardId((value) => (value === currentCard.id ? null : currentCard.id));
          }}
        >
          <p className="eyebrow">Click card to flip</p>
          <h2 className="flashcard-shell__content">{isCurrentCardRevealed ? currentCard.back : currentCard.front}</h2>
        </article>
      ) : null}

      {currentCard ? (
        <div className="route-actions">
          <button type="button" className="btn-primary" onClick={() => rateCard(currentCard.id, 'know')}>
            Know It
          </button>
          <button type="button" className="btn-secondary" onClick={() => rateCard(currentCard.id, 'unsure')}>
            Unsure
          </button>
          <button type="button" className="btn-ghost" onClick={() => rateCard(currentCard.id, 'dont-know')}>
            Don't Know
          </button>
          <button type="button" className="btn-ghost" onClick={endSession}>
            End session
          </button>
        </div>
      ) : null}
    </section>
  );
}
