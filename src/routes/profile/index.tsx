import { RouteCard } from '../../components/ui/RouteCard';
import { StatusPill } from '../../components/ui/StatusPill';
import { WidgetCard } from '../../components/ui/WidgetCard';
import { AdminUnlockDialog } from '../../components/profile/AdminUnlockDialog';
import { useExamStore } from '../../lib/stores/examStore';
import { useProgressStore } from '../../lib/stores/progressStore';

export default function ProfileRoute() {
  const adminUnlocked = useProgressStore((state) => state.adminUnlocked);
  const domains = useProgressStore((state) => state.domains);
  const history = useExamStore((state) => state.history);

  const passedLessons = Object.values(domains).reduce(
    (total, domain) => total + Object.values(domain.lessons).filter((lesson) => lesson.passed).length,
    0,
  );

  return (
    <section className="page-shell page-stack">
      <RouteCard
        eyebrow="Profile"
        title="Local progression snapshot"
        description="Progress, admin bypass state, and exam history are already persisted locally so feature work can continue against stable browser state."
      >
        <div className="metric-row">
          <StatusPill>Passed lessons: {passedLessons}</StatusPill>
          <StatusPill>Exam attempts: {history.length}</StatusPill>
          <StatusPill tone={adminUnlocked ? 'success' : 'neutral'}>Admin unlock: {adminUnlocked ? 'Enabled' : 'Disabled'}</StatusPill>
        </div>
      </RouteCard>

      <WidgetCard className="compact-card">
        <p className="eyebrow">Admin bypass</p>
        <p>This is intentionally local-only and mirrors the PRD security note that it is not real access control.</p>
        <AdminUnlockDialog />
      </WidgetCard>
    </section>
  );
}
