import { Outlet } from 'react-router-dom';

import { Sidebar } from '../components/navigation/Sidebar';

export function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-layout__content">
        <div className="app-layout__viewport">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
