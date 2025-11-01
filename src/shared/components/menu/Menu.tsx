import { ContainerLogoName, ContainerMenu, LogoMenu, NameCompany } from './menu.style';
import { useState } from 'react';
import {
  HomeOutlined,
  LaptopOutlined,
  ProfileOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu as MenuAntd } from 'antd';
import { useNavigate } from 'react-router';
import { ProductRoutesEnum } from '../../../modules/product/routes';
import { CategoryRoutesEnum } from '../../../modules/category/routes';

type MenuItem = Required<MenuProps>['items'][number];

const Menu = () => {
  const [current, setCurrent] = useState('products_view');
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const items: MenuItem[] = [
    {
      key: 'home',
      label: 'Principal',
      icon: <HomeOutlined />,
    },
    {
      key: 'products',
      label: 'Produtos',
      icon: <LaptopOutlined />,
      children: [
        {
          key: 'products_view',
          label: 'Visualizar',
          onClick: () => navigate(ProductRoutesEnum.PRODUCT),
        },
        {
          key: 'products_insert',
          label: 'Inserir',
          onClick: () => navigate(ProductRoutesEnum.PRODUCT_INSERT),
        },
      ],
    },
    {
      key: 'category',
      label: 'Categorias',
      icon: <ProfileOutlined />,
      children: [
        { key: 'category_view', label: 'Visualizar', onClick: () => navigate(CategoryRoutesEnum.CATEGORY) },
        { key: 'category_insert', label: 'Inserir', onClick: () => navigate(CategoryRoutesEnum.CATEGORY_INSERT) },
      ],
    },
    {
      key: 'order',
      label: 'Pedidos',
      icon: <SafetyCertificateOutlined />,
      children: [
        { key: '3', label: 'Opção 3', onClick: () => null },
        { key: '4', label: 'Opção 4', onClick: () => null },
      ],
    },
    {
      key: 'user',
      label: 'Clientes',
      icon: <UserOutlined />,
      children: [
        { key: '5', label: 'Opção 5', onClick: () => null },
        { key: '6', label: 'Opção 6', onClick: () => null },
      ],
    },
  ];

  return (
    <ContainerMenu>
      <ContainerLogoName>
        <LogoMenu />
        <NameCompany>Vendas Online</NameCompany>
      </ContainerLogoName>
      <MenuAntd
        theme="dark"
        onClick={onClick}
        style={{ width: 250 }}
        defaultOpenKeys={['']}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </ContainerMenu>
  );
};

export default Menu;
