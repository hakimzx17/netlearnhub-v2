import { ArrowRight, CheckCircle2, Clock3, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

import { DashboardTopNav } from '../../components/navigation/DashboardTopNav';
import { RouteCard } from '../../components/ui/RouteCard';
import { courseManifest } from '../../content/course';
import { useExamStore } from '../../lib/stores/examStore';
import { useProgressStore } from '../../lib/stores/progressStore';

export default function DashboardRoute() {
  const domains = useProgressStore((state) => state.domains);
  const history = useExamStore((state) => state.history);

  const totalLessons = courseManifest.reduce((total, domain) => total + domain.lessons.length, 0);
  const completedLessons = courseManifest.reduce(
    (total, domain) =>
      total + domain.lessons.filter((lesson) => domains[domain.id]?.lessons[lesson.id]?.passed).length,
    0,
  );
  const completionPercent = Math.round((completedLessons / totalLessons) * 100);
  const nextDomain = courseManifest.find((domain) => domains[domain.id]?.unlocked);
  const nextLesson = nextDomain?.lessons.find((lesson) => domains[nextDomain.id]?.lessons[lesson.id]?.unlocked);
  const lastExam = history.at(-1);

  return (
    <section className="dashboard-page page-shell">
      <DashboardTopNav />

      <div className="dashboard-grid">
        <RouteCard
          eyebrow="Study Time"
          title="Foundation sprint"
          description="The scaffold is ready for week-one work: routes, stores, content seeds, and local persistence are in place."
        >
          <div className="metric-row">
            <span className="metric-pill">
              <Clock3 size={16} />
              45-90 minute sessions
            </span>
          </div>
        </RouteCard>

        <section className="orbit-panel glass-widget">
          <p className="eyebrow">Overall Progress</p>
          <div className="orbit-container">
            <div className="orbit-ring" />
            <div className="orbit-center">
              <span className="orbit-percent">{completionPercent}%</span>
              <p className="orbit-caption">Lessons passed</p>
            </div>
          </div>
        </section>

        <RouteCard
          eyebrow="Current Domain"
          title={nextDomain?.title ?? 'All current domains complete'}
          description="The course map and gate logic are wired so MVP content can now be added lesson by lesson."
        >
          <div className="metric-row">
            <span className="metric-pill">
              <Target size={16} />
              {nextDomain ? `${nextDomain.weight}% exam weight` : 'Ready for more content'}
            </span>
          </div>
        </RouteCard>

        <RouteCard
          eyebrow="Next Lesson"
          title={nextLesson?.title ?? 'Course map ready'}
          description="Start with the sample lesson flow, then expand content, simulations, and labs from this baseline."
        >
          {nextDomain && nextLesson ? (
            <Link className="btn-primary" to={`/learn/${nextDomain.id}/${nextLesson.id}/theory`}>
              Resume lesson <ArrowRight size={16} />
            </Link>
          ) : null}
        </RouteCard>

        <RouteCard
          eyebrow="Exam History"
          title={lastExam ? `${lastExam.score.scaled}/1000` : 'No mock exams yet'}
          description={
            lastExam
              ? `Last attempt scored ${lastExam.score.percent.toFixed(1)}% across ${lastExam.config.questionCount} questions.`
              : 'The exam store and results route are wired. Start a mock session from Exam Mode.'
          }
          accent
        >
          <div className="metric-row">
            <span className="metric-pill">
              <CheckCircle2 size={16} />
              {lastExam ? (lastExam.passed ? 'Passed' : 'Needs review') : 'Ready to benchmark'}
            </span>
          </div>
        </RouteCard>
      </div>
    </section>
  );
}
