import flashcards from '../../content/flashcards/domain-1.json';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { EmptyState } from '../../components/ui/EmptyState';
import { RouteCard } from '../../components/ui/RouteCard';
import { StatusPill } from '../../components/ui/StatusPill';
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

  const domainCards = typedFlashcards.filter((card) => card.domainId === domainId);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (hydrated) {
      startSession(typedFlashcards.filter((card) => card.domainId === domainId).map((card) => card.id));
    }
  }, [domainId, hydrated, startSession]);

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
            <StatusPill>
              Reviewed {cards[currentCard.id]?.reviewCount ?? 0} time(s)
            </StatusPill>
          </div>
        ) : null}
      </RouteCard>

      {currentCard ? (
        <button
          type="button"
          className="glass-widget flashcard-shell"
          aria-pressed={isCurrentCardRevealed}
          aria-label={
            isCurrentCardRevealed
              ? `Hide answer for flashcard: ${currentCard.front}`
              : `Reveal answer for flashcard: ${currentCard.front}`
          }
          onClick={() => {
            setRevealedCardId((value) => (value === currentCard.id ? null : currentCard.id));
          }}
        >
          <p className="eyebrow">Click card to flip</p>
          <h2 className="flashcard-shell__content">{isCurrentCardRevealed ? currentCard.back : currentCard.front}</h2>
        </button>
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
      ) : (
        <EmptyState
          eyebrow={`${domain.title} / Flashcards`}
          title="No due flashcards"
          description="This deck is clear for now. New review outcomes are persisted in IndexedDB and will surface here again when cards become due."
        />
      )}
    </section>
  );
}
