import type { RouteObject } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';

export const LoginRoutes: RouteObject[] = [
  //Criamos uma constante "LoginRoutes" e estamos dizendo que ela é um "array de objetos de rotas (RouteObject[])". Cada objeto dentro desse array representa uma rota do app.
  {
    path: '/login',
    //"path" define a URL (/login).
    element: <LoginScreen />,
    //"element" diz qual componente React será renderizado nessa rota (no caso, a "LoginScreen").
  },
];
