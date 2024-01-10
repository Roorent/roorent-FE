'use client';

import React, { useEffect, useState } from 'react';
import { isRole } from '#/constants/general';
import type { MenuProps } from 'antd';
import { ConfigProvider, Layout, Menu, Modal, theme } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import MenuItem from 'antd/es/menu/MenuItem';
import {
  FileSyncOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Notifications from '#/components/Notifications';
import Photo from '#/components/Photo';
import { LOGO } from '#/constants/images';
import Chats from '#/components/Chats';
import { parseJwt } from '#/utils/convert';
import Favorite from '#/components/Favorite';
import Footer from '#/components/Footer';
import Button from '#/components/Button';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const cruProduk =
    pathname === '/create-product' ||
    pathname === '/edit-product' ||
    pathname === '/detail-product' ||
    pathname === '/payment' ||
    pathname === '/adm/detail-pengguna' ||
    pathname === '/riwayat-transaksi' ||
    pathname === '/detail-transaksi' ||
    pathname === '/profile' ||
    pathname === '/profile/setting';

  const search = pathname === '/search';

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const token = localStorage.getItem('access_token');
  let role: string = '';
  let firstName: string = '';
  let photo: string = '';
  let id: string = '';

  if (token) {
    id = parseJwt(token).id;
  }

  if (token) {
    role = parseJwt(token).role;
    firstName = parseJwt(token).firstname;
    photo = parseJwt(token).photo;
  }
  if (!token && pathname !== '/detail-product') {
    router.push('/');
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    router.push('/');
  };

  let items: MenuProps['items'];

  if (role === isRole.renter) {
    items = [
      {
        label: <Photo className='cursor-pointer' size={50} src={photo} />,
        key: 'Profil',
        children: [
          {
            label: (
              <a href='/profile' className='text-lg'>
                <UserOutlined className='mr-2 ' style={{ fontSize: '18px' }} />
                Profil
              </a>
            ),
            key: 'profil',
          },
          {
            label: (
              <a href='/riwayat-transaksi' className='text-lg'>
                <FileSyncOutlined
                  className='mr-2'
                  style={{ fontSize: '18px' }}
                />
                Riwayat Transaksi
              </a>
            ),
            key: 'riwayat',
          },
          {
            label: (
              <a onClick={handleLogout} className='text-lg'>
                <LogoutOutlined className='mr-2' style={{ fontSize: '18px' }} />
                Keluar
              </a>
            ),
            key: 'logout',
          },
        ],
      },
    ];
  } else if (role === isRole.owner) {
    items = [
      {
        label: <Photo className='cursor-pointer' size={50} src={photo} />,
        key: 'Profil',
        children: [
          {
            label: (
              <a href='/profile' className='text-lg'>
                <UserOutlined className='mr-2 ' style={{ fontSize: '18px' }} />
                Profil
              </a>
            ),
            key: 'profil',
          },
          {
            label: (
              <a onClick={handleLogout} className='text-lg'>
                <LogoutOutlined className='mr-2' style={{ fontSize: '18px' }} />
                Keluar
              </a>
            ),
            key: 'logout',
          },
        ],
      },
    ];
  } else {
    items = [];
  }

  const itemOwner: MenuItem[] = [
    getItem(
      'Produk',
      '/product',
      null,
      [getItem('Daftar Produk', '/list-product', null)],
      'group'
    ),
    {
      type: 'divider',
      style: {
        marginTop: '20px',
        marginBottom: '20px',
      },
    },
    getItem(
      'Riwayat Transaksi',
      '/riwayat-transaksi',
      null,
      [
        getItem('Transaksi Pending', '/trans-pending', null),
        { type: 'group' },
        getItem('Transaksi Berhasil', '/trans-success', null),
      ],
      'group'
    ),
    {
      type: 'divider',
      style: {
        marginTop: '20px',
        marginBottom: '20px',
      },
    },
    getItem(
      'Pembayaran',
      '/payment',
      null,
      [
        getItem('Akun Bank', '/bank-account', null),
        { type: 'group' },
        getItem('Laporan Transaksi', '/trans-report', null),
      ],
      'group'
    ),
  ];

  const itemAdmin: MenuItem[] = [
    getItem(
      'Utama',
      '/adm/utama',
      null,
      [getItem('Dashboard', '/adm/dashboard', null)],
      'group'
    ),
    {
      type: 'divider',
      style: {
        marginTop: '20px',
        marginBottom: '20px',
      },
    },
    getItem(
      'Manajemen',
      '/adm/manajemen',
      null,
      [
        getItem('Pengguna', '/adm/pengguna', null),
        { type: 'group' },
        getItem('Akun Bank', '/adm/bank-account', null),
      ],
      'group'
    ),
    {
      type: 'divider',
      style: {
        marginTop: '20px',
        marginBottom: '20px',
      },
    },
    getItem(
      'Pembayaran',
      '/adm/pembayaran',
      null,
      [
        getItem('Pembayaran Renter', '/adm/renter-payment', null),
        { type: 'group' },
        getItem('Pembayaran Owner', '/adm/owner-payment', null),
      ],
      'group'
    ),
  ];

  const pathName = usePathname();
  const [currAdmin, setCurrAdmin] = useState<any>(pathName);
  const [currOwner, setCurrOwner] = useState<any>(pathName);

  const onClickAdmin: MenuProps['onClick'] = (e: any) => {
    setCurrAdmin(e.key);
    router.push(e.key);
  };
  const onClickOwner: MenuProps['onClick'] = (e: any) => {
    setCurrOwner(e.key);
    router.push(e.key);
  };

  return (
    <Layout style={{ height: '100%' }}>
      {role !== isRole.renter && (
        <>
          {cruProduk || search ? (
            <></>
          ) : (
            <Sider
              width={300}
              style={{ background: colorBgContainer }}
              className='h-[100%] border-r-2 border-primary flex justify-center items-center'
            >
              <div className='py-5 flex justify-center items-center'>
                <a href='/'>
                  <LOGO className='!w-[190px]' />
                </a>
              </div>
              {role === isRole.admin ? (
                <>
                  <Menu
                    onClick={onClickAdmin}
                    mode='inline'
                    style={{ width: 298, borderRight: 0 }}
                    selectedKeys={[currAdmin]}
                    items={itemAdmin}
                    className='sidebar flex flex-col gap-1 justify-center px-8'
                  />
                  <div
                    onClick={handleLogout}
                    className='text-slate-600 text-2xl font-bold flex gap-4 justify-center items-center hover:text-primary absolute left-[25%] bottom-16 cursor-pointer'
                  >
                    <LogoutOutlined />
                    <p>Keluar</p>
                  </div>
                </>
              ) : (
                <Menu
                  onClick={onClickOwner}
                  mode='inline'
                  style={{ width: 298, borderRight: 0 }}
                  selectedKeys={[currOwner]}
                  items={itemOwner}
                  className='sidebar flex flex-col gap-1 justify-center px-8'
                />
              )}
            </Sider>
          )}
        </>
      )}
      <Layout>
        {role !== isRole.renter ? (
          <>
            {!cruProduk ? (
              <Header style={{ background: colorBgContainer }}>
                <Menu
                  mode='horizontal'
                  defaultSelectedKeys={[]}
                  style={{ borderBottomWidth: '2px' }}
                  className={
                    'absolute z-50 border-slate-200 left-[300px] w-[calc(100%-300px)] py-[12px] px-[120px] gap-10 justify-end items-center'
                  }
                >
                  <div className='flex gap-6 items-center'>
                    {role === isRole.admin ? (
                      <>
                        <Notifications />
                      </>
                    ) : (
                      <>
                        <Chats />
                        <Notifications />
                      </>
                    )}
                  </div>
                  {role === isRole.owner && (
                    <>
                      <div className='menu-profil flex items-center gap-2'>
                        <p className='text-xl font-bold flex w-max justify-end'>
                          Halo, {firstName}
                        </p>
                        <Menu
                          selectedKeys={['Profil']}
                          mode='horizontal'
                          items={items}
                          className='menu-profil'
                        />
                      </div>
                    </>
                  )}
                  {role === isRole.admin && (
                    <div className='flex items-center gap-8'>
                      <p className='text-xl font-bold flex w-max justify-end'>
                        Halo, {firstName}
                      </p>
                      <Photo size={50} src={photo} />
                    </div>
                  )}
                </Menu>
              </Header>
            ) : (
              <Header style={{ background: colorBgContainer }}>
                <Menu
                  mode='horizontal'
                  defaultSelectedKeys={[]}
                  style={{ borderBottomWidth: '2px' }}
                  className={
                    'absolute z-50 border-slate-200 flex justify-start py-[12px] px-[120px] gap-10 w-full -ml-14 items-center'
                  }
                >
                  <div className='w-full'>
                    <LOGO className='!w-[190px]' />
                  </div>
                  {!token ? (
                    <>
                      <div className='flex'>
                        <Button
                          type='primary'
                          htmlType='submit'
                          href='/auth/login'
                          className='w-max hover:!text-white hover:!bg-primary !bg-white !text-primary border-2 border-primary rounded-[10px] text-[20px] font-bold !mt-0 px-10 shadow-md shadow-primary hover:!shadow-lg'
                        >
                          Masuk
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='flex gap-6 items-center'>
                        {role === isRole.admin ? (
                          <>
                            <Notifications />
                          </>
                        ) : (
                          <>
                            <Chats />
                            <Notifications />
                          </>
                        )}
                      </div>
                      {role === isRole.admin ? (
                        <div className='flex items-center gap-6 w-fit'>
                          <div className='flex items-center gap-8'>
                            <p className='text-xl font-bold flex w-max justify-end'>
                              Halo, {firstName}
                            </p>
                            <Photo
                              className='cursor-pointer'
                              size={50}
                              src={photo}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className='menu-profil flex items-center gap-2'>
                          <p className='text-xl font-bold flex w-max justify-end'>
                            Halo, {firstName}
                          </p>
                          <Menu
                            selectedKeys={['Profil']}
                            mode='horizontal'
                            items={items}
                            className='menu-profil'
                          />
                        </div>
                      )}
                    </>
                  )}
                </Menu>
              </Header>
            )}
            {search && <></>}
          </>
        ) : (
          <>
            {!search ? (
              <Header style={{ background: colorBgContainer }}>
                <Menu
                  mode='horizontal'
                  defaultSelectedKeys={[]}
                  style={{ borderBottomWidth: '2px' }}
                  className={
                    'absolute z-50 border-slate-200 flex justify-start py-[12px] px-[150px] gap-10 w-full items-center -ml-[50px]'
                  }
                >
                  <div className='w-full'>
                    <LOGO className='!w-[190px]' />
                  </div>
                  <div className='flex gap-6 items-center'>
                    <Favorite />
                    <Chats />
                    <Notifications />
                  </div>
                  <div className='menu-profil flex items-center gap-2'>
                    <p className='text-xl font-bold flex w-max justify-end'>
                      Halo, {firstName}
                    </p>
                    <Menu
                      selectedKeys={['Profil']}
                      mode='horizontal'
                      items={items}
                      className='menu-profil'
                    />
                  </div>
                </Menu>
              </Header>
            ) : (
              <></>
            )}
          </>
        )}
        {role !== isRole.renter ? (
          <>
            {cruProduk ? (
              <Content
                style={{ margin: '10px 0 0 0' }}
                className='text-slate-800 bg-white'
              >
                <div
                  style={{
                    padding: '40px 150px 0 150px',
                    minHeight: 360,
                    height: '100%',
                    background: colorBgContainer,
                  }}
                  className='overflow-auto'
                >
                  {children}
                </div>
              </Content>
            ) : (
              <Content
                style={{ margin: '10px 0 0 0' }}
                className='text-slate-800 bg-white'
              >
                <div
                  style={{
                    padding: '40px 150px 0 50px',
                    minHeight: 360,
                    height: '100%',
                    background: colorBgContainer,
                  }}
                  className='overflow-auto'
                >
                  {children}
                </div>
              </Content>
            )}
          </>
        ) : (
          <>
            {cruProduk ? (
              <Content
                style={{ margin: '10px 0 0 0' }}
                className='text-slate-800 bg-white'
              >
                <div
                  style={{
                    padding: '40px 185px 0 185px',
                    minHeight: 360,
                    height: '100%',
                    background: colorBgContainer,
                  }}
                  className='overflow-auto'
                >
                  {children}
                </div>
              </Content>
            ) : (
              <>
                {!search ? (
                  <Content
                    style={{ margin: '10px 0 0 0' }}
                    className='text-slate-800 bg-white'
                  >
                    <div
                      style={{
                        padding: '40px 0 0 0',
                        minHeight: 360,
                        height: '100%',
                        background: colorBgContainer,
                      }}
                      className='overflow-auto'
                    >
                      {children}
                      <Footer />
                    </div>
                  </Content>
                ) : (
                  <Content
                    style={{ margin: '10px 0 0 0' }}
                    className='text-slate-800 bg-white'
                  >
                    <div
                      style={{
                        padding: '40px 500px 0 500px',
                        minHeight: 360,
                        height: '100%',
                        background: colorBgContainer,
                      }}
                      className='overflow-auto'
                    >
                      {children}
                    </div>
                  </Content>
                )}
              </>
            )}
          </>
        )}
      </Layout>
    </Layout>
  );
};

export default AuthenticatedLayout;
