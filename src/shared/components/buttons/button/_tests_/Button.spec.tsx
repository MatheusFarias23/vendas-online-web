import { render, screen } from '@testing-library/react';
//"render()" serve para 'renderizar' o componente React dentro de um ambiente de teste (ou seja, simular como ele apareceria na tela).
//"screen" serve para 'buscar elementos renderizados' (por texto, por data-testid, por role etc).
import Button from '../Button';

//Forma de criar dados falsos para testar se o componente está funcionando corretamente.
const TEXT_MOCK = 'TEXT_MOCK';
//O texto que o botão vai mostrar.
const TEST_ID = 'TEST_ID';
//O identificador de teste (data-testid).
const MARGIN = '23px';
//Um valor para o estilo.

describe('Test Button', () => {
  //"describe" serve para agrupar um conjunto de testes relacionados. Aqui estamos dizendo "esses testes são sobre o Button".
  beforeEach(() => {
    //"beforeEach" é uma função especial do Jest que roda antes de cada teste (it).
    render(<Button data-testid={TEST_ID} margin={MARGIN}>{TEXT_MOCK}</Button>);
    //Aqui ela garante que antes de cada teste, o botão será renderizado com as mesmas props: *data-testid={TEST-ID}; *margin={MARGIN} *({TEXT-MOCK}) o texto dentro do botão. Assim, cada teste começa com o componente "fresco", evitando interferencia entre eles.
    //"data-testid" é um atributo HTML personalizado usado só para testes.
  })

  it('should render', () => {
    expect(screen.getByText(TEXT_MOCK)).toBeDefined();
    //"screen.getByText(TEXT-MOCK)" busca na tela um elemento que contenha o texto "TEXT-MOCK".
    //"expect(...).toBeDefined()" verifica se esse elemento existe.
    //Esse teste garante que o botão renderizou e mostrou o txto corretamente.
  });

  it('should render with margin', () => {
    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('style', `margin: ${MARGIN};`);
    //Aqui ele pega o botão usando o 'data-testid' (screen.getByTestId(TEST-ID)).
    //Depois ele verifica o atributo 'style', para garantir que o botão está realmente com a margem aplicada.
  });
});
