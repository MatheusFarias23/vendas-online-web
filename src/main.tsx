import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import { LoginRoutes } from './modules/login/routes';
import './main.css';
import { GlobalProvider } from './shared/hooks/useGlobalContext';

const MainRoutes: RouteObject[] = [
  {
    path: '/',
    element: <div>Tela Principal</div>,
    errorElement: <div>Página não encontrada.</div>,
  },
];

const router = createBrowserRouter([...MainRoutes, ...LoginRoutes]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </StrictMode>,
);
