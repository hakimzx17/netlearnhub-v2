import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  ScrollText,
  UserRound,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navigationItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/learn', label: 'Learn', icon: GraduationCap },
  { to: '/exam', label: 'Exam Mode', icon: ClipboardList },
  { to: '/flashcards', label: 'Flashcards', icon: BookOpen },
  { to: '/vault', label: 'Vault', icon: ScrollText },
  { to: '/profile', label: 'Profile', icon: UserRound },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__brand-mark">N</span>
        <span className="sidebar-label sidebar__brand-text">NetLearnHub</span>
      </div>

      <nav className="sidebar__nav" aria-label="Primary navigation">
        {navigationItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              ['sidebar__link', isActive ? 'sidebar__link--active' : ''].filter(Boolean).join(' ')
            }
          >
            <span className="sidebar__icon-wrap" aria-hidden="true">
              <Icon size={18} />
            </span>
            <span className="sidebar-label">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
