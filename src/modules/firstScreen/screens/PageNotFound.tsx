import { Result } from 'antd';
import { useNavigate } from 'react-router';
import { LoginRoutesEnum } from '../../login/routes';
import { ButtonAntd } from '../../../shared/components/buttons/button/Button.styles';
import { ContainerPageNotFound } from '../styles/PageNotFound.styles';

const PageNotFound = () => {
  const navigate = useNavigate();
  const handleOnClickButton = () => {
    navigate(LoginRoutesEnum.LOGIN);
  };

  return (
    <ContainerPageNotFound>
      <Result
        status="404"
        title="404"
        subTitle="Desculpe, a página que você visitou não existe!"
        extra={
          <ButtonAntd onClick={handleOnClickButton} type="primary">
            Página de Login
          </ButtonAntd>
        }
      />
    </ContainerPageNotFound>
  );
};

export default PageNotFound;
