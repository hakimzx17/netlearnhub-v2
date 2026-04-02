import { Link } from 'react-router-dom';

const topNavItems = [
  { to: '/learn', label: 'Course Map' },
  { to: '/exam', label: 'Exam Mode' },
  { to: '/flashcards', label: 'Flashcards' },
  { to: '/vault', label: 'Vault' },
];

export function DashboardTopNav() {
  return (
    <div className="top-nav" role="navigation" aria-label="Dashboard shortcuts">
      {topNavItems.map((item) => (
        <Link key={item.to} to={item.to} className="nav-btn">
          {item.label}
        </Link>
      ))}
    </div>
  );
}
