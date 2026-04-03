import { AnimatePresence, motion } from 'motion/react';
import { ClipboardList, FlaskConical, Layers, PlayCircle } from 'lucide-react';

import { TheoryTab } from './TheoryTab';
import { QuizShell } from '../quiz/QuizShell';
import { getLessonQuiz } from '../../content/quizzes';
import type { LessonDefinition } from '../../content/types';

type TabId = 'theory' | 'simulation' | 'lab' | 'flashcards' | 'quiz';

type LessonTabContentProps = {
  activeTab: TabId;
  lesson: LessonDefinition;
  lessonId: string;
};

export function LessonTabContent({ activeTab, lesson, lessonId }: LessonTabContentProps) {
  const quizQuestions = getLessonQuiz(lessonId);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        initial={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.2 }}
        className="tab-panel"
        id={`tab-panel-${activeTab}`}
        role="tabpanel"
      >
        {activeTab === 'theory' && <TheoryTab lesson={lesson} lessonId={lessonId} />}
        {activeTab === 'simulation' && (
          <div className="tab-placeholder">
            <div className="tab-placeholder__icon"><PlayCircle size={32} /></div>
            <h2 className="tab-placeholder__title">Simulation</h2>
            <p className="tab-placeholder__description">
              An animated simulation for this lesson will appear here. Simulations require a desktop browser and are built per-lesson.
            </p>
          </div>
        )}
        {activeTab === 'lab' && (
          <div className="tab-placeholder">
            <div className="tab-placeholder__icon"><FlaskConical size={32} /></div>
            <h2 className="tab-placeholder__title">Practice Lab</h2>
            <p className="tab-placeholder__description">
              A hands-on CLI lab for this lesson will appear here. Labs require a desktop browser and provide a near-real terminal experience.
            </p>
          </div>
        )}
        {activeTab === 'flashcards' && (
          <div className="tab-placeholder">
            <div className="tab-placeholder__icon"><Layers size={32} /></div>
            <h2 className="tab-placeholder__title">Flash Cards</h2>
            <p className="tab-placeholder__description">
              Lesson-linked flashcard review will appear here. Cards are drawn from the domain deck and scheduled using spaced repetition.
            </p>
          </div>
        )}
        {activeTab === 'quiz' && (
          quizQuestions.length > 0 ? (
            <QuizShell
              lessonId={lessonId}
              domainId={lesson.domainId}
              questions={quizQuestions}
              onComplete={() => {
                // Return to theory tab after quiz
              }}
            />
          ) : (
            <div className="tab-placeholder">
              <div className="tab-placeholder__icon"><ClipboardList size={32} /></div>
              <h2 className="tab-placeholder__title">Lesson Quiz</h2>
              <p className="tab-placeholder__description">
                The lesson quiz (10 questions, 80% to pass) will appear here. Passing unlocks the next lesson in this domain.
              </p>
            </div>
          )
        )}
      </motion.div>
    </AnimatePresence>
  );
}
