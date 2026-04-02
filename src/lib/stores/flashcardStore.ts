import { get, set } from 'idb-keyval';
import { create } from 'zustand';

import type { FlashcardRating, FlashcardReviewState } from '../../types/flashcard';

type FlashcardStore = {
  cards: Record<string, FlashcardReviewState>;
  sessionQueue: string[];
  hydrated: boolean;
  hydrate: () => Promise<void>;
  startSession: (cardIds: string[]) => void;
  rateCard: (cardId: string, rating: FlashcardRating) => void;
  endSession: () => void;
};

const storageKey = 'netlearnhub.flashcards.v1';

function createReviewState(previousState: FlashcardReviewState | undefined, rating: FlashcardRating): FlashcardReviewState {
  const now = Date.now();

  if (rating === 'dont-know') {
    return {
      rating,
      nextReview: now,
      reviewCount: (previousState?.reviewCount ?? 0) + 1,
    };
  }

  return {
    rating,
    nextReview: now + (rating === 'know' ? 3 : 1) * 24 * 60 * 60 * 1000,
    reviewCount: (previousState?.reviewCount ?? 0) + 1,
  };
}

async function persistCards(cards: Record<string, FlashcardReviewState>) {
  await set(storageKey, cards);
}

export const useFlashcardStore = create<FlashcardStore>((setState, getState) => ({
  cards: {},
  sessionQueue: [],
  hydrated: false,
  hydrate: async () => {
    const storedCards = await get<Record<string, FlashcardReviewState>>(storageKey);
    setState({ cards: storedCards ?? {}, hydrated: true });
  },
  startSession: (cardIds) => {
    const now = Date.now();
    const dueCards = cardIds.filter((cardId) => {
      const cardState = getState().cards[cardId];
      return cardState?.nextReview === null || cardState?.nextReview === undefined || cardState.nextReview <= now;
    });

    setState({ sessionQueue: dueCards });
  },
  rateCard: (cardId, rating) => {
    const currentState = getState().cards[cardId];
    const updatedState = createReviewState(currentState, rating);
    const nextCards = { ...getState().cards, [cardId]: updatedState };
    const remainingQueue = getState().sessionQueue.filter((queuedId) => queuedId !== cardId);

    setState({
      cards: nextCards,
      sessionQueue: rating === 'dont-know' ? [...remainingQueue, cardId] : remainingQueue,
    });

    void persistCards(nextCards);
  },
  endSession: () => {
    setState({ sessionQueue: [] });
  },
}));
