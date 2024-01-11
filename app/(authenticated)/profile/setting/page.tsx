'use client';

import Photo from '#/components/Photo';
import { usersRepository } from '#/repository/users';
import { parseJwt } from '#/utils/convert';
import {
  ArrowLeftOutlined,
  CheckCircleFilled,
  EyeInvisibleOutlined,
  EyeTwoTone,
  FileSyncOutlined,
  QuestionCircleFilled,
  RightOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Menu, MenuProps, Modal, message } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

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

function Setting() {
  const token = localStorage.getItem('access_token');
  let id: string = '';
  if (token) {
    id = parseJwt(token).id;
  }

  const pathname = usePathname();
  const router = useRouter();
  const [currSetting, setCurrSetting] = useState<any>(pathname);
  const { confirm } = Modal;

  const { data, error, isLoading } = usersRepository.hooks.getUserProfile(id);
  const datasUser = data?.data;

  const showNonactiveConfirm = () => {
    confirm({
      title: (
        <div className='text-3xl font-bold flex justify-center'>Nonaktifkan Akun</div>
      ),
      content: (
        <div className='text-xl font-semibold flex justify-center mb-[25px]'>
          Apakah anda yakin ingin menonaktifkan akun?
        </div>
      ),
      icon: (
        <div className='modal-hapus mb-[10px] flex justify-center'><QuestionCircleFilled /></div>
      ),
      async onOk() {
        await usersRepository.manipulateData.nonactiveAccount(id);
        Modal.success({
          icon: (
            <div className='modal-hapus mb-[10px] flex justify-center'>
              <CheckCircleFilled />
            </div>
          ),
          title: (
            <div className='text-3xl font-bold flex justify-center'>
              Nonaktifkan Akun
            </div>
          ),
          content: (
            <div className='text-xl font-semibold flex justify-center mb-[25px]'>
              Anda telah berhasil menonaktifkan akun
            </div>
          ),
        });
      },
      okText: (
        <div className='modal-hapus text-xl font-bold text-white'>Ya</div>
      ),
      cancelText: <div className='text-xl font-bold text-white'>Batal</div>,
    });
  };
  const setting: MenuItem[] = [
    getItem(
      null,
      null,
      null,
      [
        getItem('Pengaturan', '/profile/setting', <SettingOutlined />),
        getItem(
          'Riwayat Transaksi',
          '/riwayat-transaksi',
          <FileSyncOutlined />
        ),
      ],
      'group'
    ),
  ];

  const onClickSetting: MenuProps['onClick'] = (e: any) => {
    setCurrSetting(e.key);
    router.push(e.key);
  };

  const onFinish = async (values: any) => {
    try {
      const data = {
        password: values?.password,
      };
      await usersRepository.manipulateData.updatePassword(id, data);

      Modal.success({
        icon: (
          <div className='modal-hapus mb-[10px] flex justify-center'>
            <CheckCircleFilled />
          </div>
        ),
        title: (
          <div className='text-3xl font-bold flex justify-center'>
            Password Diubah
          </div>
        ),
        content: (
          <div className='text-xl font-semibold flex justify-center mb-[25px]'>
            Anda telah berhasil mengubah password
          </div>
        ),
      });
    } catch (err: any) {
      message.error(err.response.body?.error);
    }
  };

  return (
    <div>
      <div className='w-full grid gap-y-[20px]'>
        <div className='w-full flex items-center gap-x-[20px] grid-cols-1 mb-10'>
          <a
            href='/profile'
            className='w-fit hover:text-teks flex font-bold text-4xl gap-3'
          >
            <div>
              <ArrowLeftOutlined />
            </div>
          </a>
          <div className='w-full flex justify-center text-4xl font-bold'>
            Pengaturan
          </div>
        </div>
        <div className='w-full h-full flex gap-x-20 profile'>
          <div className='w-1/4 h-fit grid gap-y-8 profile sticky top-5'>
            <a href='/profile'>
              <div
                className='flex p-3 bg-white rounded-[10px] items-center hover:text-teks'
                style={{ boxShadow: '0 6px 16px #0000001f' }}
              >
                <div className='w-full flex items-center gap-x-3 text-teks'>
                  <div>
                    <Photo
                      className='cursor-pointer'
                      size={70}
                      src={datasUser?.photo}
                    />
                  </div>
                  <div className='text-xl font-bold'>{datasUser?.name}</div>
                </div>
                <div className='text-xl font-bold text-teks'>
                  <RightOutlined />
                </div>
              </div>
            </a>
            {/* ksih kondisi !!!! */}
            <div
              className='w-full flex justify-center text-primary text-xl font-semibold bg-white border border-primary rounded-[10px] py-2'
              style={{ boxShadow: '0 1px 8px rgba(36,36,36,.14)' }}
            >
              {datasUser?.role}
            </div>
            <Menu
              onClick={onClickSetting}
              mode='inline'
              style={{ width: '100%', borderRight: 0 }}
              selectedKeys={[currSetting]}
              items={setting}
              className='profile flex flex-col gap-1 justify-center text-rstroke'
            />
          </div>
          <div className='w-3/4 h-full '>
            <div className='grid gap-y-10'>
              <Form onFinish={onFinish}>
                <div className='pt-5 px-5 border border-slate-300 rounded-[10px]'>
                  <div className='grid gap-y-4 grid-cols-1'>
                    <div>
                      <p className='text-teks text-2xl font-bold'>Kata Sandi</p>
                    </div>
                    <div className='w-full'>
                      <Form.Item
                        name='password'
                        rules={[
                          {
                            required: true,
                            message: 'Harap masukkan kata sandi anda!',
                          },
                        ]}
                      >
                        <Input.Password
                          size='large'
                          placeholder='Masukkan kata sandi'
                          className='p-[10px] rounded-[10px] border border-rstroke regis text-xl'
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className='grid gap-y-4 grid-cols-1'>
                    <div>
                      <p className='text-teks text-2xl font-bold'>
                        Konfirmasi Kata Sandi
                      </p>
                    </div>
                    <div className='w-full'>
                      <Form.Item
                        name='confirm'
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'Harap konfirmasi kata sandi anda!',
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue('password') === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error(
                                  'Kata sandi yang Anda masukkan tidak cocok!'
                                )
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password
                          size='large'
                          placeholder='Masukkan kembali kata sandi'
                          className='p-[10px] rounded-[10px] border border-rstroke regis text-xl'
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className='w-full flex justify-end pt-5'>
                    <div className='w-1/5'>
                      <Form.Item>
                        <Button
                          type='primary'
                          htmlType='submit'
                          block
                          className='bg-primary border border-white !rounded-full text-2xl font-bold py-3 h-max'
                        >
                          Simpan
                        </Button>
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </Form>
              <Button
                type='primary'
                htmlType='submit'
                onClick={showNonactiveConfirm}
                block
                className='bg-white border border-merah !rounded-[10px] !text-merah text-2xl font-bold py-3 h-max hover:!bg-merah hover:!text-white'
              >
                Nonaktifkan Akun
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
