import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import { useNotification } from './shared/hooks/useNotification';
import { LoginRoutes } from './modules/login/routes';
import { firstScreenRoutes } from './modules/firstScreen/routes';
import { productScreens } from './modules/product/routes';
import { getAuthorizationToken, verifyLoggedIn } from './shared/functions/connection/auth';
import { useRequests } from './shared/hooks/useRequests';
import { useEffect } from 'react';
import { URL_USER } from './shared/constants/urls';
import { MethodsEnum } from './shared/enums/methods.enums';
import { categoryScreens } from './modules/category/routes';
import { useGlobalReducer } from './store/reducers/globalReducer/useGlobalReducer';

const routes: RouteObject[] = [...LoginRoutes];
const routesLoggedIn: RouteObject[] = [...productScreens, ...categoryScreens, ...firstScreenRoutes].map((route) => ({
  //".map" vai percorrer cada objeto dentro do array 'productScreens'. Se tiver mais de um 'path' dentro do array 'productScreens' ou apenas um 'path' ele irá percorrer por todos. O parâmetro 'route' é cada objeto de rota (ex: path). Ou seja, se o 'productScreens' tiver 2 rotas. o '.map' vai chamar a função 2 vezes, uma vez para cada rota.
  ...route,
  //"...route" copia todas as propriedades originais da rota.
  loader: verifyLoggedIn,
  //Estão adicionando uma nova propriedade chamada 'loader' a cada rota. 'Loader'é uma função que é chamada antes de renderizar a rota. Nesse caso, a função chama 'verifyLoggedIn', que faz a verificação se o suário está logado. Depois de verificar tudo ele renderiza o que foi aceito na logica do 'verifyLoggedIn'.
}));

const router = createBrowserRouter([...routes, ...routesLoggedIn]);

function App() {
  const { contextHolder } = useNotification();
  const { setUser } = useGlobalReducer();
  const { request } = useRequests();

  useEffect(() => {
    const token = getAuthorizationToken();
    if (token) {
      request(URL_USER, MethodsEnum.GET, setUser);
    }
  }, []);

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
