'use client';

import React, { useEffect } from 'react';
import { Button, Form, Input, message } from 'antd/lib/index';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { LOGIN, LOGO } from '#/constants/images';
import { useRouter } from 'next/navigation';
import { authRepository } from '#/repository/auth';
import { parseJwt } from '#/utils/convert';

const Login = () => {
  useEffect(() => {
    document.title = 'Login - Roorent';
  }, []);

  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      const data = {
        email: values?.email,
        password: values?.password,
      };

      const login = await authRepository.manipulatedata.login(data);

      localStorage.setItem('access_token', login?.body?.data?.access_token);
      setTimeout(message.success('Anda Telah Berhasil Login!'), 5000);

      const token = localStorage.getItem('access_token');
      let role: string = '';
      if (token) {
        role = parseJwt(token).role;
      }

      if (role === 'owner') {
        router.push('/list-product');
      }
      if (role === 'renter') {
        router.push('/home');
      }
    } catch (err: any) {
      message.error(err.response.body?.error);
    }
  };

  return (
    <div className='w-full h-full'>
      <div className='w-full h-full fixed bg-white flex justify-between'>
        <div className='w-1/2 relative'>
          <div className='px-28 py-48 w-[800px]'>
            <div className='w-full'>
              <Form name='login' className='login' onFinish={onFinish}>
                <div className='flex flex-col space-y-5 w-full'>
                  <div className='text-white text-5xl font-bold'>
                    <p>Masuk</p>
                  </div>
                  <div className='text-white text-xl'>
                    <p className='mb-2'>Jika kamu belum memiliki akun</p>
                    <p>
                      kamu bisa
                      <a
                        href='/auth/register'
                        className='ml-2 font-bold text-2xl no-underline hover:underline'
                      >
                        Daftar disini!
                      </a>
                    </p>
                  </div>
                  <div className='login'>
                    <p className='text-white text-3xl font-bold pb-3'>Email</p>
                    <div className='w-full login'>
                      <Form.Item
                        name='email'
                        rules={[
                          {
                            required: true,
                            message: 'Harap masukan email anda!',
                          },
                        ]}
                        className='login'
                      >
                        <Input
                          size='large'
                          placeholder='Masukan Email'
                          prefix={
                            <MailOutlined className='text-white text-3xl mr-5' />
                          }
                          className=' p-[10px] login bg-white bg-opacity-20 rounded-[10px] border border-white border-opacity-30  text-xl'
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div>
                    <p className='text-white text-3xl font-bold pb-3'>
                      Kata Sandi
                    </p>
                    <div className='w-full'>
                      <Form.Item
                        name='password'
                        rules={[
                          {
                            required: true,
                            message: 'Harap masukan kata sandi anda!',
                          },
                        ]}
                      >
                        <Input.Password
                          size='large'
                          placeholder='Masukan Kata Sandi'
                          prefix={
                            <LockOutlined className='text-white text-3xl mr-5' />
                          }
                          className=' p-[10px] bg-white bg-opacity-20 rounded-[10px] border border-white border-opacity-30 login text-xl'
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className='text-white text-xl font-bold'>
                    <a
                      href='/account/re-active'
                      className='font-bold no-underline hover:underline'
                    >
                      Aktifkan akun kembali!
                    </a>
                  </div>
                </div>
                <div className='w-full mt-10 login'>
                  <Form.Item>
                    <Button
                      type='primary'
                      htmlType='submit'
                      block
                      className=' bg-tranparant border border-white rounded-full text-2xl font-bold py-3 h-max'
                    >
                      Masuk
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
          <div className='w-[1258px] h-[1258px] bg-primary rounded-e-full -my-32 -ml-72 blur-[2px] absolute top-0 left-0  -z-50'></div>
        </div>
        <div className='w-1/2 relative grid justify-items-stretch'>
          <div className='justify-self-end p-8 mr-[100px] mb-[60px]'>
            <LOGO className='w-[300px]' />
          </div>
          <div className='grid justify-items-center'>
            <img src={LOGIN} alt='Mascot Login' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
