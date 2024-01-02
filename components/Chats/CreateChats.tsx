'use client';

import { ArrowLeftOutlined, SendOutlined } from '@ant-design/icons';
import { ConfigProvider, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import Photo from '../Photo';

function CreateChats({ openChat, isOpen }: any) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    openChat('');
    setIsModalOpen(false);
  };
  const handleSubmit = () => {
    closeModal();
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
              right: 0,
              top: 0,
              width: '80%',
              height: '991px',
              padding: '15px',
              boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)',
            },
          },
        }}
      >
        <Modal
          title={
            <div>
              <div className='flex items-center gap-4'>
                <ArrowLeftOutlined
                  className='text-2xl'
                  onClick={() => {
                    openChat('list');
                  }}
                />
                <div className='flex items-center'>
                  <div>
                    <Photo size={50}/>
                  </div>
                  <div className='ml-4 py-1 text-slate-700'>
                    <p className='font-bold text-xl'>Catur</p>
                    <p className='mt-1 text-[11px] font-thin'>
                      Aktif 8 jam yang lalu
                    </p>
                  </div>
                </div>
              </div>
              <div className='border-slate-200 border-b-2 mt-2 mb-4'></div>
            </div>
          }
          mask={false}
          open={isModalOpen}
          onCancel={closeModal}
          className='absolute top-0 right-0'
          closeIcon={<p></p>}
          footer={false}
        >
          <div className='my-1 h-[835px]'>
            <div className='h-full px-4 flex flex-col gap-4 text-slate-800 drop-shadow-md overflow-auto'>
              <div className='flex'>
                <div className='bg-white text-slate-800 rounded-xl rounded-bl-none p-2 max-w-[80%] flex flex-col relative'>
                  <p className='min-w-[100px] mb-5'>
                    lawan Lorem ipsum, dolor sit amet consectetur adipisicing
                    elit. Enim maiores iusto quaerat sequi fuga ab ipsa
                    cupiditate illum neque quis. Consectetur, vel fugit eaque
                    asperiores, molestias ratione ad ut omnis suscipit tenetur
                    sed voluptate provident, repudiandae commodi expedita
                    mollitia aliquid odio natus et. Vero cum explicabo
                    voluptates corporis minus tempora.
                  </p>
                  <p className='text-[11px] font-thin absolute bottom-2 right-4'>
                    08:20
                  </p>
                </div>
              </div>
              <div className='flex'>
                <div className='bg-primary text-white rounded-xl rounded-br-none p-2 max-w-[80%] flex flex-col relative ml-auto border border-slate-200'>
                  <p className='min-w-[100px] mb-5'>saya</p>
                  <p className='text-[11px] font-thin absolute bottom-2 right-4'>
                    08:20
                  </p>
                </div>
              </div>
            </div>

            <div className='mt-2 flex justify-between items-center gap-2'>
              <input
                className='border border-slate-400 focus:border-primary rounded-md p-2 w-full'
                placeholder='Ketik Pesan Anda'
              />
              <button
                onClick={handleSubmit}
                className='bg-primary p-2 rounded-md flex justify-center items-center hover:bg-blue-400 cursor-pointer'
              >
                <SendOutlined className='text-2xl text-white' />
              </button>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
}

export default CreateChats;
