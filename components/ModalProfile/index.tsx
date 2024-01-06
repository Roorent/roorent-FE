import {
  FileSyncOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { ConfigProvider, Modal } from 'antd';
import React, { useState } from 'react';

function ModalProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <ConfigProvider
        modal={{
          styles: {
            content: {
              width: '50%',
              padding: '15px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 8px #00000014, 0 -1px 4px #0000000a',
            },
          },
        }}
      >
        <Modal
          mask={false}
          open={isModalOpen}
          onCancel={closeModal}
          className='absolute top-15 -right-[60px]'
          closeIcon={<></>}
          footer={<></>}
        >
          <div className='grid hover:text-teks'>
            <a href='/profile' className='flex justify-start hover:text-teks'>
              <div className='w-full flex gap-x-3 text-xl hover:bg-slate-200 hover:rounded-md p-2 hover:text-teks'>
                <div>
                  <UserOutlined />
                </div>
                <div>Profil</div>
              </div>
            </a>
            <a href='#' className='flex justify-start hover:text-teks'>
              <div className='flex gap-x-3 text-xl w-full hover:bg-slate-200 hover:rounded-md p-2 hover:text-teks'>
                <div>
                  <SettingOutlined />
                </div>
                <div>Pengaturan</div>
              </div>
            </a>
            <a
              href='/riwayat-transaksi'
              className='flex justify-start hover:text-teks'
            >
              <div className='flex gap-x-3 text-xl w-full hover:bg-slate-200 hover:rounded-md p-2 hover:text-teks'>
                <div>
                  <FileSyncOutlined />
                </div>
                <div>Riwayat Transaksi</div>
              </div>
            </a>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
}

export default ModalProfile;
