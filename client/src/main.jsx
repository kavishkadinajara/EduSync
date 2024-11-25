import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Root from './routes/Root';
import StudentList from './routes/StudentList';
import StudentRegister from './routes/StudentRegister';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/student-list",
    element: <StudentList />,
  },
  {
    path: "/student-register",
    element: <StudentRegister />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="h-full min-h-screen rounded-md flex flex-col items-center justify-center relative w-screen z-50">
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);
