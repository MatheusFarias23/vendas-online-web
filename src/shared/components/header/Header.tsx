import { logout } from '../../functions/connection/auth';
import { HeaderContainer, LogoExit } from './header.style';
import { useState } from 'react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router';

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
        title="Deseja sair da sua conta?"
        open={open}
        onOk={(() => logout(navigate))}
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
