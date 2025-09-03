import './main.css';
import { createRoot } from 'react-dom/client';
import App from './App';
import { GlobalProvider } from './shared/hooks/useGlobalContext';
import { DataProvider } from './shared/hooks/useDataContext';

createRoot(document.getElementById('root')!).render(
  <GlobalProvider>
    <DataProvider>
      <App />
    </DataProvider>
  </GlobalProvider>,
);
