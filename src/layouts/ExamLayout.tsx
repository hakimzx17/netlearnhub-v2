import { Outlet } from 'react-router-dom';

export function ExamLayout() {
  return (
    <main className="exam-layout">
      <div className="exam-layout__viewport">
        <Outlet />
      </div>
    </main>
  );
}
