import { logout } from '../../functions/connection/auth';
import { HeaderContainer, LogoExit } from './header.style';
import { useState } from 'react';
import { Modal } from 'antd';

const Header = () => {
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
        title="Deseja sair da sua conta?"
        open={open}
        onOk={logout}
        onCancel={hideModal}
        okText="Sim"
        cancelText="Não"
      >
      </Modal>
      <HeaderContainer>
        <LogoExit onClick={showModal} />
      </HeaderContainer>
    </>
  );
};

export default Header;
