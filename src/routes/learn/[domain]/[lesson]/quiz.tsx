import lessonQuestions from '../../../../content/questions/domain-1.json';
import { Link, useParams } from 'react-router-dom';

import { RouteCard } from '../../../../components/ui/RouteCard';
import { getDomain, getLesson, getNextLesson } from '../../../../content/course';
import type { QuizQuestion } from '../../../../types/quiz';
import { useProgressStore } from '../../../../lib/stores/progressStore';

const typedQuestions = lessonQuestions as QuizQuestion[];

export default function LessonQuizRoute() {
  const { domainId, lessonId } = useParams();
  const domain = getDomain(domainId);
  const lesson = getLesson(domainId, lessonId);
  const nextLesson = getNextLesson(domainId, lessonId);
  const recordQuizScore = useProgressStore((state) => state.recordQuizScore);
  const lessonPool = typedQuestions.filter((question) => question.domainId === domainId && question.lessonId === lessonId);

  if (!domain || !lesson) {
    return (
      <section className="page-shell">
        <RouteCard eyebrow="Quiz" title="Quiz not found" description="Open a lesson from the course map first." />
      </section>
    );
  }

  return (
    <section className="page-shell page-stack">
      <RouteCard
        eyebrow={`${domain.title} / Quiz`}
        title="Adaptive quiz starter"
        description={`Seed data and the quiz route exist now. This lesson has ${lessonPool.length} starter questions to expand into the full 10-question lesson flow.`}
      >
        <div className="route-actions">
          <button type="button" className="btn-secondary" onClick={() => recordQuizScore(domain.id, lesson.id, 85)}>
            Record passing score
          </button>
          <button type="button" className="btn-ghost" onClick={() => recordQuizScore(domain.id, lesson.id, 60)}>
            Record retry state
          </button>
          {nextLesson ? (
            <Link className="btn-primary" to={`/learn/${domain.id}/${nextLesson.id}/theory`}>
              Open next lesson
            </Link>
          ) : (
            <Link className="btn-primary" to={`/domain-exam/${domain.id}`}>
              Go to domain exam
            </Link>
          )}
        </div>
      </RouteCard>

      <div className="question-stack">
        {lessonPool.map((question) => (
          <article key={question.id} className="glass-widget question-card">
            <p className="eyebrow">Difficulty {question.difficulty}</p>
            <h2 className="section-title">{question.stem}</h2>
            <ul className="option-list">
              {question.options.map((option) => (
                <li key={option} className="option-pill">
                  {option}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
