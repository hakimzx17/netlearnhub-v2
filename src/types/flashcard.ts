export type FlashcardData = {
  id: string;
  domainId: string;
  lessonId: string;
  front: string;
  back: string;
  tags: string[];
};

export type FlashcardRating = 'know' | 'unsure' | 'dont-know';

export type FlashcardReviewState = {
  rating: FlashcardRating | null;
  nextReview: number | null;
  reviewCount: number;
};
