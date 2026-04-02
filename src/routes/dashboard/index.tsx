import { ArrowRight, CheckCircle2, Clock3, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

import { DashboardTopNav } from '../../components/navigation/DashboardTopNav';
import { ProgressTrack } from '../../components/ui/ProgressTrack';
import { RouteCard } from '../../components/ui/RouteCard';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { StatusPill } from '../../components/ui/StatusPill';
import { WidgetCard } from '../../components/ui/WidgetCard';
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
  const nextDomain =
    courseManifest.find((domain) => domains[domain.id]?.unlocked && !domains[domain.id]?.examPassed) ??
    courseManifest.find((domain) => domains[domain.id]?.unlocked);
  const nextLesson =
    nextDomain?.lessons.find((lesson) => {
      const lessonProgress = domains[nextDomain.id]?.lessons[lesson.id];

      return lessonProgress?.unlocked && !lessonProgress.passed;
    }) ?? nextDomain?.lessons.find((lesson) => domains[nextDomain.id]?.lessons[lesson.id]?.unlocked);
  const lastExam = history.at(-1);
  const currentDomainPassedLessons = nextDomain
    ? nextDomain.lessons.filter((lesson) => domains[nextDomain.id]?.lessons[lesson.id]?.passed).length
    : completedLessons;
  const currentDomainLessonCount = nextDomain ? nextDomain.lessons.length : totalLessons;

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
            <StatusPill>
              <Clock3 size={16} />
              45-90 minute sessions
            </StatusPill>
          </div>
        </RouteCard>

        <WidgetCard as="section" className="orbit-panel">
          <SectionHeading eyebrow="Overall Progress" title="Milestone 1 shell" description="Design tokens, shell primitives, and browser persistence are now aligned around one visual baseline." compact />
          <div className="orbit-container">
            <div className="orbit-ring" />
            <div className="orbit-center">
              <span className="orbit-percent">{completionPercent}%</span>
              <p className="orbit-caption">Lessons passed</p>
            </div>
          </div>
          <ProgressTrack value={completedLessons} max={totalLessons} label={`${completedLessons} of ${totalLessons} lessons cleared`} className="orbit-panel__progress" />
        </WidgetCard>

        <RouteCard
          eyebrow="Current Domain"
          title={nextDomain?.title ?? 'All current domains complete'}
          description="The course map and gate logic are wired so MVP content can now be added lesson by lesson."
        >
          <ProgressTrack
            value={currentDomainPassedLessons}
            max={currentDomainLessonCount}
            label={nextDomain ? `${currentDomainPassedLessons} of ${currentDomainLessonCount} lessons passed` : 'All unlocked lessons completed'}
          />
          <div className="metric-row">
            <StatusPill>
              <Target size={16} />
              {nextDomain ? `${nextDomain.weight}% exam weight` : 'Ready for more content'}
            </StatusPill>
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
            <StatusPill tone={lastExam ? (lastExam.passed ? 'success' : 'warning') : 'accent'}>
              <CheckCircle2 size={16} />
              {lastExam ? (lastExam.passed ? 'Passed' : 'Needs review') : 'Ready to benchmark'}
            </StatusPill>
          </div>
        </RouteCard>
      </div>
    </section>
  );
}
