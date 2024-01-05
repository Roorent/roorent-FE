'use client';

import { CloseOutlined } from '@ant-design/icons';
import { ConfigProvider, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import Photo from '../Photo';

function ListChats({ openChat, isOpen }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    openChat('');
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      <ConfigProvider
        modal={{
          styles: {
            content: {
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              right: 0,
              top: 0,
              width: '80%',
              height: '100vh',
              padding: '15px',
              boxShadow: '0 4px 8px rgba(0,0,0,.08), 0 -1px 4px rgba(0,0,0,.04)',
            },
          },
        }}
      >
        <Modal
          title={
            <div className='w-[380px]'>
              <div className='ml-2 text-2xl font-bold text-slate-800'>
                Pesan
              </div>
              <div className='border-slate-200 border-b-2 mt-2 mb-4'></div>
            </div>
          }
          mask={false}
          open={isModalOpen}
          onCancel={closeModal}
          className='absolute top-0 right-0'
          closeIcon={
            <div onClick={closeModal} className='text-slate-800'>
              <CloseOutlined className='text-2xl' />
            </div>
          }
          footer={false}
        >
          <div className='flex flex-col gap-4 my-2 w-[380px]'>
            <div className='flex items-center'>
              <div className='w-[18%]'>
                <Photo size={50}/>
              </div>
              <div
                className='w-[82%] py-1 border-b border-slate-200 cursor-pointer'
                onClick={() => {
                  openChat('create');
                  setIsModalOpen(false);
                }}
              >
                <div className='mb-1 flex justify-between items-center text-slate-800'>
                  <p className='font-bold text-xl'>Mola</p>
                  <p className='text-[10px] text-slate-700'>08:10</p>
                </div>
                <p className='text-[12px] text-slate-600 font-normal truncate'>
                  Halo kak, bagaimana kondisi lingkungan sekitar?
                </p>
              </div>
            </div>
            <div className='flex items-center'>
              <div className='w-[18%]'>
                <Photo size={50}/>
              </div>
              <div
                className='w-[82%] py-1 border-b border-slate-200 cursor-pointer'
                onClick={() => {
                  openChat('create');
                  setIsModalOpen(false);
                }}
              >
                <div className='mb-1 flex justify-between items-center text-slate-800'>
                  <p className='font-bold text-xl'>Dimas</p>
                  <p className='text-[10px] text-slate-700'>08:10</p>
                </div>
                <p className='text-[12px] text-slate-600 font-normal truncate'>
                  Halo kak, saya masih belum paham dengan deskripsi anda. tolong
                  buat deskripsi lebih jelas.
                </p>
              </div>
            </div>
            <div className='flex items-center'>
              <div className='w-[18%]'>
                <Photo size={50}/>
              </div>
              <div
                className='w-[82%] py-1 border-b border-slate-200 cursor-pointer'
                onClick={() => {
                  openChat('create');
                  setIsModalOpen(false);
                }}
              >
                <div className='mb-1 flex justify-between items-center text-slate-800'>
                  <p className='font-bold text-xl'>Catur</p>
                  <p className='text-[10px] text-slate-700'>08:10</p>
                </div>
                <p className='text-[12px] text-slate-600 truncate'>
                  Kenapa photo bagus tapi rating buruk?
                </p>
              </div>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
}

export default ListChats;
