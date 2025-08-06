import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import { LoginRoutes } from './modules/login/routes';
import { useNotification } from './shared/hooks/useNotification';

const MainRoutes: RouteObject[] = [
  {
    path: '/',
    element: <div>Tela Principal</div>,
    errorElement: <div>Página não encontrada.</div>,
  },
];

const router = createBrowserRouter([...MainRoutes, ...LoginRoutes]);

function App() {
  const { contextHolder } = useNotification();
  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>      
  );
}

export default App;
