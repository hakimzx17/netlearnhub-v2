import { Link, useParams } from 'react-router-dom';

import { RouteCard } from '../../../../components/ui/RouteCard';
import { getDomain, getLesson } from '../../../../content/course';
import { useLabStore } from '../../../../lib/stores/labStore';
import { useProgressStore } from '../../../../lib/stores/progressStore';

export default function LessonLabRoute() {
  const { domainId, lessonId } = useParams();
  const domain = getDomain(domainId);
  const lesson = getLesson(domainId, lessonId);
  const phase = useLabStore((state) => state.phase);
  const currentStep = useLabStore((state) => state.currentStep);
  const commandHistory = useLabStore((state) => state.commandHistory);
  const submitCommand = useLabStore((state) => state.submitCommand);
  const advanceStep = useLabStore((state) => state.advanceStep);
  const completePhase = useLabStore((state) => state.completePhase);
  const resetLab = useLabStore((state) => state.resetLab);
  const completeLabPhase = useProgressStore((state) => state.completeLabPhase);

  if (!domain || !lesson) {
    return (
      <section className="page-shell">
        <RouteCard eyebrow="Lab" title="Lab not found" description="Open a lesson from the course map first." />
      </section>
    );
  }

  return (
    <section className="page-shell page-stack">
      <RouteCard
        eyebrow={`${domain.title} / Lab`}
        title="Two-phase CLI starter"
        description="xterm.js is installed for the real terminal implementation. This starter route wires the lab store and unlock flow."
      >
        <div className="route-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              submitCommand('show ip interface brief');
              advanceStep();
            }}
          >
            Run sample command
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              completePhase();
              completeLabPhase(domain.id, lesson.id, phase);
            }}
          >
            Complete phase {phase}
          </button>
          <button type="button" className="btn-ghost" onClick={resetLab}>
            Reset lab state
          </button>
          <Link className="btn-primary" to={`/learn/${domain.id}/${lesson.id}/quiz`}>
            Continue to quiz
          </Link>
        </div>
      </RouteCard>

      <div className="split-grid">
        <article className="glass-widget">
          <p className="eyebrow">Guided panel</p>
          <h2 className="section-title">Phase {phase}</h2>
          <p>Current step: {currentStep + 1}</p>
          <p>
            Narrative context, validation logic, hints, and topology updates will hang off this shell as lesson-specific lab data is added.
          </p>
        </article>

        <article className="glass-widget terminal-card">
          <p className="eyebrow">CLI session</p>
          <pre>{commandHistory.length > 0 ? commandHistory.join('\n') : 'Switch# '}</pre>
        </article>
      </div>
    </section>
  );
}
