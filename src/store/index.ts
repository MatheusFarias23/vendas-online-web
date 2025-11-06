import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productReducer';
import categoryReducer from './reducers/categoryReducer';
import globalReducer from './reducers/globalReducer';

export const store = configureStore({
  reducer: {
    productReducer,
    categoryReducer,
    globalReducer,
  },
});

//"configureStore()" cria a 'store', que é o "grande banco de dados global" do Redux. Dentro dele, você passa um objeto 'reducer', que é como se fosse o 'mapa' de todos os pedaços do estado. No caso: o pedaço "productReducer" é responsavel pelos produtos.

export type RootState = ReturnType<typeof store.getState>;
//"RootState" é um tipo TypeScript que decreve o formato completo do estado global (tudo o que existe dentro da store).
//A "store" é como a caixa onde todos os contextos (reducers) vão ficar guardados.