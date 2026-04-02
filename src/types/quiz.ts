export type QuizQuestionType = 'single' | 'multi' | 'drag' | 'fill';

export type QuizQuestion = {
  id: string;
  domainId: string;
  lessonId: string;
  difficulty: number;
  type: QuizQuestionType;
  stem: string;
  options: string[];
  correct: number[];
  explanation: string;
};
