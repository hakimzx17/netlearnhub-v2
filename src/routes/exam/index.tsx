import lessonQuestions from '../../content/questions/domain-1.json';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RouteCard } from '../../components/ui/RouteCard';
import { courseManifest } from '../../content/course';
import { useExamStore } from '../../lib/stores/examStore';
import type { ExamDifficultyMix, ExamQuestion } from '../../types/exam';
import type { QuizQuestion } from '../../types/quiz';

const starterPool = (lessonQuestions as QuizQuestion[]).map<ExamQuestion>((question) => ({
  ...question,
  type: question.type,
}));

export default function ExamIndexRoute() {
  const navigate = useNavigate();
  const startSession = useExamStore((state) => state.startSession);
  const [questionCount, setQuestionCount] = useState(30);
  const [includeLabs, setIncludeLabs] = useState(false);
  const [difficultyMix, setDifficultyMix] = useState<ExamDifficultyMix>('exam-realistic');

  const handleStart = () => {
    startSession(
      {
        domains: ['domain-1'],
        questionCount,
        timeLimitMinutes: questionCount,
        includeLabs,
        difficultyMix,
      },
      starterPool.slice(0, Math.min(questionCount, starterPool.length)),
    );

    void navigate('/exam/session');
  };

  return (
    <section className="page-shell page-stack exam-config-page">
      <RouteCard
        eyebrow="Exam Mode"
        title="Configurable mock sessions"
        description="The PRD exam flow is scaffolded with local session persistence, result history, and a dedicated full-screen session route."
      />

      <article className="glass-widget form-card">
        <label className="field-label" htmlFor="question-count">
          Question count
        </label>
        <input
          id="question-count"
          className="field-range"
          min="30"
          max="120"
          step="30"
          type="range"
          value={questionCount}
          onChange={(event) => setQuestionCount(Number(event.target.value))}
        />
        <p className="field-help">{questionCount} questions</p>

        <label className="field-label" htmlFor="difficulty-mix">
          Difficulty mix
        </label>
        <select
          id="difficulty-mix"
          className="field-input"
          value={difficultyMix}
          onChange={(event) => setDifficultyMix(event.target.value as ExamDifficultyMix)}
        >
          <option value="all">All</option>
          <option value="hard">Weighted toward Hard</option>
          <option value="exam-realistic">Exam-realistic distribution</option>
        </select>

        <label className="toggle-row" htmlFor="include-labs">
          <span>Include hands-on labs</span>
          <input
            id="include-labs"
            type="checkbox"
            checked={includeLabs}
            onChange={(event) => setIncludeLabs(event.target.checked)}
          />
        </label>

        <button type="button" className="btn-primary" onClick={handleStart}>
          Start starter exam session
        </button>
      </article>

      <article className="glass-widget">
        <p className="eyebrow">Available domains</p>
        <div className="metric-row">
          {courseManifest.map((domain) => (
            <span key={domain.id} className="metric-pill">
              {domain.title}
            </span>
          ))}
        </div>
      </article>
    </section>
  );
}
