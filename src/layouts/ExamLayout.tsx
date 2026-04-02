import { Outlet } from 'react-router-dom';

export function ExamLayout() {
  return (
    <main className="exam-layout">
      <Outlet />
    </main>
  );
}
