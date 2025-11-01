import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';
import type { RootState } from './';


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//"useSelector" é o hook do Redux que permite acessar dados da Store. Mas o "useSelector" padrão não sabe o formato do estado Global (não tem timpagem). Então criamos o "useAppSelector" para dizer o formato do estado.
