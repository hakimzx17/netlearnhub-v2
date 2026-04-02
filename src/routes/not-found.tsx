import { Link } from 'react-router-dom';

import { EmptyState } from '../components/ui/EmptyState';

export default function NotFoundRoute() {
  return (
    <section className="page-shell">
      <EmptyState
        eyebrow="404"
        title="Route not found"
        description="The scaffolded route tree follows the PRD structure. Use the course map or dashboard navigation to continue."
        action={
          <Link className="btn-primary" to="/">
            Back to dashboard
          </Link>
        }
      />
    </section>
  );
}
