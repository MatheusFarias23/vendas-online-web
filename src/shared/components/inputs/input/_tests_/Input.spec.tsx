import { render, screen } from '@testing-library/react';
import Input from '../Input';
import { InputTestIdEnum } from '../enum/inputTestIdEnum';

const TEST_ID = 'TEST_ID_INPUT';
const TITLE_MOCK = 'TEST_ID_INPUT';
const MARGIN = '23px';

describe('Test Input', () => {
  beforeEach(() => {
    render(<Input data-testid={TEST_ID} margin={MARGIN} />);
  });

  it('should render', () => {
    expect(screen.getByTestId(TEST_ID)).toBeDefined();
    expect(screen.getByTestId(InputTestIdEnum.BOX_INPUT)).toBeDefined();
    //Procura pela div que envolve o input (BoxInput), se existir  o componente será renderizado corretamente.
  });

  it('should hide title in title undefined', () => {
    const element = screen.queryAllByTestId(InputTestIdEnum.INPUT_TITLE);
    //"queryAllByTestId" busca elementos, mas não dá erro se não encontrar (ao contrario do getBy...).
    expect(element.length).toEqual(0);
    //Como o title não foi passado lá no 'beforeEach', o teste espera 0 elementos com o testid 'INPUT_TITLE'. Passa se nenhum titulo for renderizado.
  });

  it('should render title', () => {
    const { queryAllByTestId } = render(
      <Input title={TITLE_MOCK} data-testid={TEST_ID} margin={MARGIN} />,
    );
    //Renderiza o input novamente, mas dessa vez passando o 'title={TITLE_MOCK}'. O 'render()' devolve varias ferramentas e vem num objeto (ex: getByText, getByTestId, queryAllByTestId, etc), quando escrevemos "const { queryAllByTestId } = render(<Input title={TITLE_MOCK} data-testid={TEST_ID} margin={MARGIN} />);" estamos dizendo que queremos pegar só a função 'queryAllByTestId' de dentro do resultado que o 'render()' devolveu.
    const element = queryAllByTestId(InputTestIdEnum.INPUT_TITLE);
    //"queryAllByTestId" serve para procurar todos os elementos dentro desse HTML gerado que tenham um atributo 'data-testid' com o nome que for passado. Quando chamado ele vai devolver um array com todos os elementos que tenham 'data-testid="INPUT_TITLE"'. Depois guarda o resultado na variavel 'element', que é uma lista (array).
    expect(element.length).toEqual(1);
    //Verifica se o tamanho da lista é 1, ou seja: se existe exatemente um titulo renderizado.
  });

  it('should render title', () => {
    const { getByText } = render(
      <Input title={TITLE_MOCK} data-testid={TEST_ID} margin={MARGIN} />,
    );
    const element = getByText(TITLE_MOCK);
    //"getByText" busca pelo texto visivel no HTML. Procura o texto 'TEXT-MOCK' (ou seja, o titulo que passamos).
    expect(element).toBeDefined();
    //Verifica se o elemento existe, se sim ele passa no teste.
  });
});

/*
Obersevações e boas práticas

1 - "getBy..." lança erro se não encontrar. Use quando você espera que o elemento exista.
2 - "queryBy.../queryAllBy..." não lançam erro; retornam 'null' ou '[]' se não encontrar. Use quando quer checar ausencia ou contar elementos.
3 - "data-testeid" é ótimo para testes quando não há outra forma sem ambiguidade (roles, labels, placeholders). Mas prefira sempre selecionar por coisas que o usuario vê/interage (textos, labels) quando possivel, isso mantem testes mais robustos (Testing Library recomendo queries acessiveis primeiro: getByRole, getByLabelText, getByText).
*/
