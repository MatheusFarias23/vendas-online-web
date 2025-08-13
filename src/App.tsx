import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { useNotification } from './shared/hooks/useNotification';

import { LoginRoutes } from './modules/login/routes';
import { firstScreenRoutes } from './modules/firstScreen/routes';
import { productScreens } from './modules/product/routes';


const router = createBrowserRouter([...firstScreenRoutes, ...LoginRoutes, ...productScreens]);

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
