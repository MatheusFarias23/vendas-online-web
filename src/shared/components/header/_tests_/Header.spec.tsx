import { fireEvent, render } from '@testing-library/react';
import Header from '../Header';
import { HeaderTestIdEnum } from '../enum/headerTestIdEnum';
import { logout } from '../../../functions/connection/auth';

jest.mock('react-router', () => ({
  //Substitui o módulo 'react-router' (no teste) por um mock.
  useNavigate: () => jest.fn(),
  //"useNavigate()" vira "jest.fn()" ou seja, ao chamar "useNavigate()" no componente. retorna a mock function (que normalmente é uma função vazia). Isso impede navegação real e permite inspecionar se 'navigate' foi passado pro 'input'.
}));

jest.mock('../../../functions/connection/auth', () => ({
  logout: jest.fn(),
}));

describe('Test Header', () => {
  it('should render container and logo', () => {
    const { getByTestId } = render(<Header />);
    expect(getByTestId(HeaderTestIdEnum.HEADER_CONTAINER)).toBeDefined();
    expect(getByTestId(HeaderTestIdEnum.HEADER_LOGO)).toBeDefined();
  });

  it('should render modal in click logo', () => {
    const { getByTestId, queryAllByTestId } = render(<Header />);

    const logo = getByTestId(HeaderTestIdEnum.HEADER_LOGO);
    expect(queryAllByTestId(HeaderTestIdEnum.HEADER_MODAL).length).toBe(0);
    fireEvent.click(logo);
    expect(queryAllByTestId(HeaderTestIdEnum.HEADER_MODAL).length).toBe(1);
  });

  it('should render modal in click logo and confirm logout', () => {
    const { getByTestId, getByText } = render(<Header />);

    const logo = getByTestId(HeaderTestIdEnum.HEADER_LOGO);
    fireEvent.click(logo);
    const confirmButton = getByText('Sim');
    fireEvent.click(confirmButton);
    expect(logout).toHaveBeenCalledWith(expect.any(Function));
    //"toHaveBeenClledWith(expect.any(Function))" foi usado para testar se o 'logout' foi chamado com o 'navigate'.
  });
});

/* 
3. queryAllByTestId vs getByTestId vs getByText

getBy* lança erro se não encontrar → use quando você espera que o elemento exista.

queryAllBy* retorna array vazio se não encontrar → ideal para checar ausência (length === 0).

getByText('Sim') procura pelo conteúdo textual (ótimo para botões que o usuário vê).
*/
