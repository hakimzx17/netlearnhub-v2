import { NavLink } from 'react-router-dom';

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
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => ['nav-btn', isActive ? 'nav-btn--active' : ''].filter(Boolean).join(' ')}
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}
