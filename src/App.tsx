import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import { useNotification } from './shared/hooks/useNotification';

import { LoginRoutes } from './modules/login/routes';
import { firstScreenRoutes } from './modules/firstScreen/routes';
import { productScreens } from './modules/product/routes';
import { useGlobalContext } from './shared/hooks/useGlobalContext';
import { verifyLoggedIn } from './shared/functions/connection/auth';

function App() {
  const { contextHolder } = useNotification();
  const { user, setUser } = useGlobalContext();

  const routes: RouteObject[] = [...LoginRoutes];
  const routesLoggedIn: RouteObject[] = [...productScreens, ...firstScreenRoutes].map((route) => ({
    //".map" vai percorrer cada objeto dentro do array 'productScreens'. Se tiver mais de um 'path' dentro do array 'productScreens' ou apenas um 'path' ele irá percorrer por todos. O parâmetro 'route' é cada objeto de rota (ex: path). Ou seja, se o 'productScreens' tiver 2 rotas. o '.map' vai chamar a função 2 vezes, uma vez para cada rota.
    ...route,
    //"...route" copia todas as propriedades originais da rota.
    loader: () => verifyLoggedIn(setUser, user),
    //Estão adicionando uma nova propriedade chamada 'loader' a cada rota. 'Loader'é uma função que é chamada antes de renderizar a rota. Nesse caso, a função chama 'verifyLoggedIn(setUser, user)', que faz a verificação se o suário está logado. Depois de verificar tudo ele renderiza o que foi aceito na logica do 'verifyLoggedIn'.
  }));

  const router = createBrowserRouter([...routes, ...routesLoggedIn]);

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
