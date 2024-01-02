import React, { useState } from 'react';
import Photo from '#/components/Photo';
import {
  CheckCircleFilled,
  ClockCircleFilled,
  CloseCircleFilled,
  PauseCircleFilled,
} from '@ant-design/icons';
import Button from '../Button';
import { adminRepository } from '#/repository/adm';
import { Input, Modal } from 'antd';

function ListPengguna({ image, namaPengguna, status, idUsers }: any) {
  const handleApprove = async () => {
    try {
      await adminRepository.manipulatedata.approveOwner(idUsers);
    } catch (error) {
      console.error('Error approving owner:', error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <a href={`/adm/detail-pengguna?id=${idUsers}`}>
        <div className='flex items-center gap-x-[24px] px-5 py-2.5 rounded-[10px] border border-rstroke'>
          <div>
            {/* <img
                src={`${imgProfile(image)}`}
                alt='produk'
                className='object-cover object-center w-full h-full rounded-xl'
              /> */}
            <Photo size={50} src={image} />
          </div>
          <div className='w-full text-xl font-bold'>{namaPengguna}</div>
          {status === 'pending' && (
            <div className='w-1/5 text-xl bg-[#FFCC00] text-white font-bold rounded-[10px] px-3 py-2 flex items-center'>
              <div className='mr-5'>
                <ClockCircleFilled className='text-3xl' />
              </div>
              <div className='w-full flex justify-center'>Menunggu</div>
            </div>
          )}
          {status === 'active' && (
            <div className='w-1/5 text-xl bg-primary text-white font-bold rounded-[10px] px-3 py-2.5 flex items-center'>
              <div className='mr-5'>
                <CheckCircleFilled className='text-3xl' />
              </div>
              <div className='w-full flex justify-center'>Terkonfirmasi</div>
            </div>
          )}
          {status === 'inactive' && (
            <div className='w-1/5 text-xl bg-[#828282] text-white font-bold rounded-[10px] px-3 py-2 flex items-center'>
              <div className='mr-5'>
                <PauseCircleFilled className='text-3xl' />
              </div>
              <div className='w-full flex justify-center'>Nonaktif</div>
            </div>
          )}
          {status === 'reject' && (
            <div className='w-1/5 text-xl bg-merah text-white font-bold rounded-[10px] px-3 py-2.5 flex items-center'>
              <div className='mr-5'>
                <CloseCircleFilled className='text-3xl' />
              </div>
              <div className='w-full flex justify-center'>Ditolak</div>
            </div>
          )}
        </div>
      </a>
    </div>
  );
}

export default ListPengguna;
