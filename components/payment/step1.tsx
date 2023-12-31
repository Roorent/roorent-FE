import React from 'react';
import Button from '../Button';
import { convertDate, convertTime } from '#/utils/convertTime';

function Step1({ onNext, datas }: any) {
  return (
    <div className='grid gap-y-2 pb-10'>
      <div className=' pb-[50px] border-b border-slate-300'>
        <div className='text-2xl font-bold flex items-center mt-[30px] mb-[20px]'>
          <p>Informasi Penyewa :</p>
        </div>
        <div className='pl-5 grid gap-y-5'>
          <div className='flex text-xl justify-between'>
            <div className='font-bold'>Nama Penyewa</div>
            <div className='text-rstroke font-semibold'>{datas?.user_name}</div>
          </div>
          <div className='flex text-xl justify-between'>
            <div className='font-bold'>Nomor NIK</div>
            <div className='text-rstroke font-semibold'>{datas?.user_nik}</div>
          </div>
          <div className='flex text-xl justify-between'>
            <div className='font-bold'>Nomor HP</div>
            <div className='text-rstroke font-semibold'>{datas?.user_hp}</div>
          </div>
          <div className='flex text-xl justify-between'>
            <div className='font-bold'>Tanggal Lahir</div>
            <div className='text-rstroke font-semibold'>
              {convertTime(datas?.user_birthday)}
            </div>
          </div>
          <div className='flex text-xl justify-between'>
            <div className='font-bold'>Jenis Kelamin</div>
            <div className='text-rstroke font-semibold'>
              {datas?.user_gender === 'pria' ? 'Pria' : 'Wanita'}
            </div>
          </div>
          <div className='flex text-xl justify-between'>
            <div className='font-bold'>Alamat</div>
            <div className='w-[392px] text-right text-rstroke font-semibold'>
              {datas?.user_address}
            </div>
          </div>
        </div>
      </div>
      <div className='grid gap-y-5 border-b border-slate-300 pb-[50px]'>
        <div className='grid gap-y-2'>
          <div className='text-2xl font-bold flex justify-between items-center mt-[30px] '>
            <p>Tanggal awal sewa</p>
            <p className='text-rstroke text-xl'>
              {convertDate(datas?.lease_start)}
            </p>
          </div>
          <div className='text-2xl font-bold flex justify-between items-center mt-[30px] '>
            <p>Tanggal akhir sewa</p>
            <p className='text-rstroke text-xl'>
              {convertDate(datas?.lease_expiration)}
            </p>
          </div>
        </div>
      </div>
      <div>
        <Button onClick={onNext} className='!font-bold !py-3 !text-2xl'>
          Ajukan Sewa
        </Button>
      </div>
    </div>
  );
}

export default Step1;
