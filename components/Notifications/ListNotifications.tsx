'use client';

import React, { useEffect, useState } from 'react';
import { Modal, ConfigProvider } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Button from '../Button';
import { parseJwt } from '#/utils/convert';
import { notifRepository } from '#/repository/notification';
import { convertTime } from '#/utils/convertTime';

function ListNotifications({ openNotification, isOpen }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [readable, setReadable] = useState(true);

  const closeModal = () => {
    openNotification('');
    setIsModalOpen(false);
  };

  const changeRadio = (e: RadioChangeEvent) => {
    setReadable(e.target.value);
  };

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const token = localStorage.getItem('access_token');
  let id: string = '';
  let role: string = '';

  if (token) {
    role = parseJwt(token).role;
    id = parseJwt(token).id;
  }

  const { data, error, isLoading } = notifRepository.hooks.getNotifByUser(id);
  if (!data) {
    return <div>Loading...</div>;
  }

  const datas = data?.data;
  

  return (
    <>
      <ConfigProvider
        modal={{
          styles: {
            content: {
              width: '80%',
              padding: '15px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)',
            },
          },
        }}
      >
        <Modal
          title={
            <div className='w-[380px]'>
              <div className='ml-2 text-2xl font-bold text-slate-800'>
                Notifikasi
              </div>
              <div className='border-slate-200 border-b-2 mt-2 mb-4'></div>
            </div>
          }
          mask={false}
          open={isModalOpen}
          onCancel={closeModal}
          className='absolute top-14 right-[250px]'
          closeIcon={
            <div onClick={closeModal} className='text-slate-800'>
              <CloseOutlined className='text-2xl' />
            </div>
          }
          footer={
            role === 'admin' ? (
              <Button
                className='w-[380px]'
                onClick={() => {
                  openNotification('create');
                  setIsModalOpen(false);
                }}
              >
                Buat Notifikasi
              </Button>
            ) : (
              <></>
            )
          }
        >
          <div className='w-[380px] flex justify-end'>
            <Radio.Group onChange={changeRadio} value={readable}>
              <Radio value={true}>Sudah Dibaca</Radio>
              <Radio value={false}>Belum Dibaca</Radio>
            </Radio.Group>
          </div>
          <div className='flex flex-col gap-4 my-2 w-[380px] h-[280px]'>
            {datas.statusCode == 404 ? (
              <div className='mt-6'>Belum ada notifikasi</div>
            ) : readable ? (
              <>
                {datas?.readable && (
                  <div>
                    <p className='font-bold text-[18px] mb-1 text-slate-800'>
                      25 November
                    </p>
                    <div className='p-1 px-2 relative border-2 border-slate-300 rounded-md'>
                      <p className='text-[15px] mb-4 text-slate-700'>
                        {datas?.title}
                      </p>
                      <p className='text-[10px] text-slate-700 absolute right-2 bottom-1'>
                        18:28
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                {!datas?.readable && (
                  <div className='font-bold'>
                    <p className='text-[18px] mb-1 text-slate-800'>
                      25 November
                    </p>
                    <div className='p-1 px-2 relative border-2 border-primary rounded-md'>
                      <p className='text-[15px] mb-4 text-slate-800'>
                        {datas?.content}
                      </p>
                      <p className='text-[10px] absolute text-slate-800 right-2 bottom-1'>
                        {convertTime(datas?.createdAt)}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
}

export default ListNotifications;
