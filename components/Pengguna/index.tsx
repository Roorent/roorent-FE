import React, { useState } from 'react';
import Photo from '#/components/Photo';
import {
  CheckCircleFilled,
  ClockCircleFilled,
  CloseCircleFilled,
  PauseCircleFilled,
} from '@ant-design/icons';

function ListPengguna({ image, namaPengguna, status, idUsers }: any) {

  return (
    <div>
      <a href={`/adm/detail-pengguna?id=${idUsers}`}>
        <div className='flex items-center gap-x-[24px] px-5 py-2.5 rounded-[10px] border border-rstroke'>
          <div>
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
