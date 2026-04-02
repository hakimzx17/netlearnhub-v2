import { Link } from 'react-router-dom';

import { RouteCard } from '../components/ui/RouteCard';

export default function NotFoundRoute() {
  return (
    <section className="page-shell">
      <RouteCard
        eyebrow="404"
        title="Route not found"
        description="The scaffolded route tree follows the PRD structure. Use the course map or dashboard navigation to continue."
      >
        <Link className="btn-primary" to="/">
          Back to dashboard
        </Link>
      </RouteCard>
    </section>
  );
}
