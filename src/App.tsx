import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AppLayout } from './layouts/AppLayout';
import { ExamLayout } from './layouts/ExamLayout';
import DomainExamRoute from './routes/domain-exam/[domain]';
import DashboardRoute from './routes/dashboard';
import ExamIndexRoute from './routes/exam';
import ExamResultsRoute from './routes/exam/results/[sessionId]';
import ExamSessionRoute from './routes/exam/session';
import FlashcardsIndexRoute from './routes/flashcards';
import DomainFlashcardsRoute from './routes/flashcards/[domain]';
import LearnIndexRoute from './routes/learn';
import LessonLabRoute from './routes/learn/[domain]/[lesson]/lab';
import LessonQuizRoute from './routes/learn/[domain]/[lesson]/quiz';
import LessonSimulationRoute from './routes/learn/[domain]/[lesson]/simulation';
import LessonTheoryRoute from './routes/learn/[domain]/[lesson]/theory';
import NotFoundRoute from './routes/not-found';
import ProfileRoute from './routes/profile';
import VaultRoute from './routes/vault';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardRoute /> },
      { path: 'learn', element: <LearnIndexRoute /> },
      { path: 'learn/:domainId/:lessonId/theory', element: <LessonTheoryRoute /> },
      { path: 'learn/:domainId/:lessonId/simulation', element: <LessonSimulationRoute /> },
      { path: 'learn/:domainId/:lessonId/lab', element: <LessonLabRoute /> },
      { path: 'learn/:domainId/:lessonId/quiz', element: <LessonQuizRoute /> },
      { path: 'domain-exam/:domainId', element: <DomainExamRoute /> },
      { path: 'exam', element: <ExamIndexRoute /> },
      { path: 'exam/results/:sessionId', element: <ExamResultsRoute /> },
      { path: 'vault', element: <VaultRoute /> },
      { path: 'flashcards', element: <FlashcardsIndexRoute /> },
      { path: 'flashcards/:domainId', element: <DomainFlashcardsRoute /> },
      { path: 'profile', element: <ProfileRoute /> },
      { path: '*', element: <NotFoundRoute /> },
    ],
  },
  {
    path: '/exam/session',
    element: <ExamLayout />,
    children: [{ index: true, element: <ExamSessionRoute /> }],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
