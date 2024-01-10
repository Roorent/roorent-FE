'use client';
import Photo from '#/components/Photo';
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  CameraOutlined,
  CheckCircleFilled,
  DownOutlined,
  FileSyncOutlined,
  LoadingOutlined,
  RightOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Menu,
  Modal,
  Select,
  Upload,
} from 'antd';
import type { MenuProps, UploadFile } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import { UploadChangeParam } from 'antd/es/upload';
import { UploadProps } from 'antd/lib';
import { RcFile } from 'antd/lib/upload';
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
function Profile() {
  const modal = async () => {
    Modal.success({
      icon: (
        <div className='modal-hapus mb-[10px] flex justify-center'>
          <CheckCircleFilled />
        </div>
      ),
      title: (
        <div className='text-3xl font-bold flex justify-center'>
          Profil Disimpan
        </div>
      ),
      content: (
        <div className='text-xl font-semibold flex justify-center mb-[25px]'>
          Anda telah berhasil menyimpan profil
        </div>
      ),
    });
  };

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <CameraOutlined className='text-4xl text-primary' />
      )}
      <div style={{ marginTop: 5 }} className='text-xl'>
        Masukan Foto
      </div>
    </button>
  );

  const { TextArea } = Input;

  const profile: MenuItem[] = [
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
  const pathname = usePathname();
  const router = useRouter();
  const [currProfile, setCurrProfile] = useState<any>(pathname);

  const onClickProfile: MenuProps['onClick'] = (e: any) => {
    setCurrProfile(e.key);
    router.push(e.key);
  };
  return (
    <div>
      <div className='w-full grid gap-y-[20px]'>
        <div className='w-full grid gap-y-[20px] grid-cols-1 mb-3'>
          <a
            href='/home'
            className='w-fit hover:text-teks flex font-bold text-xl gap-3'
          >
            <div>
              <ArrowLeftOutlined />
            </div>
            <div>Kembali</div>
          </a>
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
                      src={'/assets/images/profile.png'}
                    />
                  </div>
                  <div className='text-xl font-bold'>M Danar Kahfi</div>
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
              Penyewa
            </div>
            <Menu
              onClick={onClickProfile}
              mode='inline'
              style={{ width: '100%', borderRight: 0 }}
              selectedKeys={[currProfile]}
              items={profile}
              className='profile flex flex-col gap-1 justify-center text-rstroke'
            />
          </div>
          <div className='w-3/4 h-full '>
            <div
              className='w-full flex justify-center text-white text-4xl font-bold bg-primary rounded-[10px] p-2.5'
              style={{ boxShadow: '0 1px 8px rgba(36,36,36,.14)' }}
            >
              Informasi Pribadi
            </div>
            <Form>
              <div className='py-5'>
                <div className='w-full flex justify-center'>
                  <Form.Item name='profile_photo'>
                    <Upload
                      name='avatar'
                      listType='picture-circle'
                      className='avatar-uploader'
                      showUploadList={false}
                      action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
                      onChange={handleChange}
                    >
                      {imageUrl ? (
                        <div
                          style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            position: 'relative',
                          }}
                        >
                          <div className='absolute bottom-4 left-[30%] z-50 bg-slate-800/50 text-white font-bold text-xl px-6 py-3 rounded-[10px] border border-white'>
                            Edit
                          </div>
                          <img
                            src={imageUrl}
                            alt='avatar'
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </Form.Item>
                </div>
                <div>
                  <div className='flex gap-x-5'>
                    <div className='w-1/2 grid gap-y-4 grid-cols-1'>
                      <div>
                        <p className='text-teks text-2xl font-bold'>
                          Nama Depan
                        </p>
                      </div>
                      <div className='w-full'>
                        <Form.Item
                          name='first_name'
                          rules={[
                            {
                              required: true,
                              message: 'Harap masukan nama depan anda!',
                            },
                          ]}
                        >
                          <Input
                            size='large'
                            placeholder='Masukan nama depan'
                            className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl'
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className='w-1/2 grid gap-y-4 grid-cols-1'>
                      <div>
                        <p className='text-teks text-2xl font-bold'>
                          Nama Belakang
                        </p>
                      </div>
                      <div className='w-full regis'>
                        <Form.Item
                          name='last_name'
                          rules={[
                            {
                              required: true,
                              message: 'Harap masukan nama belakang anda!',
                            },
                          ]}
                        >
                          <Input
                            size='large'
                            placeholder='Masukan nama belakang'
                            className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl'
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className='mb-6 grid gap-y-4 grid-cols-1'>
                    <div>
                      <p className='text-teks text-2xl font-bold'> NIK</p>
                    </div>
                    <div className='w-full p-[10px] rounded-[10px] border border-rstroke regis text-xl'>
                      {/* {users.nik} */}
                      2739217491724971294798
                    </div>
                  </div>
                  <div className='grid gap-y-4 grid-cols-1'>
                    <div>
                      <p className='text-teks text-2xl font-bold'>No. Hp</p>
                    </div>
                    <div className='w-full'>
                      <Form.Item
                        name='phone'
                        rules={[
                          {
                            required: true,
                            message: 'Harap masukan no.HP anda!',
                          },
                        ]}
                      >
                        <Input
                          size='large'
                          placeholder='Masukan nomor telepon'
                          maxLength={11}
                          className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl'
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className='grid gap-y-4 grid-cols-1'>
                    <div>
                      <p className='text-teks text-2xl font-bold'>Email</p>
                    </div>
                    <div className='w-full'>
                      <Form.Item
                        name='email'
                        rules={[
                          {
                            required: true,
                            message: 'Harap masukan email anda!',
                          },
                        ]}
                      >
                        <Input
                          size='large'
                          placeholder='Masukan email'
                          className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl'
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className='w-full flex gap-x-5'>
                    <div className='w-1/2 grid gap-y-4 grid-cols-1'>
                      <div>
                        <p className='text-teks text-2xl font-bold'>
                          Tanggal Lahir
                        </p>
                      </div>
                      <div className='w-full p-[10px] rounded-[10px] border border-rstroke regis text-xl flex'>
                        <div className='w-full'>
                          {/* {convertDate(users.birthday)} */}
                          22 November 2005
                        </div>
                        <div>
                          <CalendarOutlined />
                        </div>
                      </div>
                    </div>
                    <div className='w-1/2 grid gap-y-4 grid-cols-1'>
                      <div>
                        <p className='text-teks text-2xl font-bold'>
                          Jenis Kelamin
                        </p>
                      </div>
                      <div className='w-full p-[10px] rounded-[10px] border border-rstroke regis text-xl flex'>
                        <div className='w-full'>
                          {/* {users.gender === 'pria' ? 'Pria' : 'Wanita'} */}
                          Pria
                        </div>
                        <div>
                          <DownOutlined />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='my-4'>
                    <p className='mb-4 text-teks text-2xl font-bold'>Alamat</p>
                    <div className='textarea-produk'>
                      <Form.Item
                        name='address'
                        rules={[
                          {
                            required: true,
                            message: 'Harap masukan alamat produk!',
                          },
                        ]}
                      >
                        <TextArea
                          showCount
                          maxLength={225}
                          placeholder='Masukan alamat produk'
                          style={{
                            height: 120,
                            resize: 'none',
                            fontSize: '20px',
                          }}
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
                          onClick={modal}
                          block
                          className='bg-primary border border-white !rounded-full text-2xl font-bold py-3 h-max'
                        >
                          Simpan
                        </Button>
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
