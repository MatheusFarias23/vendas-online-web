import './main.css';
import { createRoot } from 'react-dom/client';
import App from './App';
import { GlobalProvider } from './shared/hooks/useGlobalContext';
import { DataProvider } from './shared/hooks/useDataContext';
import { store }  from './store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <GlobalProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </GlobalProvider>
  </Provider>,
);
