import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Root from './routes/Root';
import StudentList from './routes/StudentList';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/student-list",
    element: <StudentList />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="h-full min-h-screen rounded-md flex flex-col items-center justify-center relative w-screen">
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);
