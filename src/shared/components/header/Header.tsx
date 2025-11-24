import { logout } from '../../functions/connection/auth';
import { HeaderContainer, LogoExit } from './header.style';
import { useState } from 'react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router';
import { HeaderTestIdEnum } from './enum/headerTestIdEnum';

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        data-testid={HeaderTestIdEnum.HEADER_MODAL}
        title="Deseja sair da sua conta?"
        open={open}
        onOk={() => logout(navigate)}
        onCancel={hideModal}
        okText="Sim"
        cancelText="Não"
      ></Modal>
      <HeaderContainer data-testid={HeaderTestIdEnum.HEADER_CONTAINER}>
        <LogoExit onClick={showModal} data-testid={HeaderTestIdEnum.HEADER_LOGO} />
      </HeaderContainer>
    </>
  );
};

export default Header;
