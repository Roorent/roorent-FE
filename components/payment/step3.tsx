// Step3.jsx
import {
  CheckCircleFilled,
  ClockCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons';
import React from 'react';
import Button from '../Button';

const Step3 = ({ onFinish }: any) => {
  return (
    <div className='pb-10'>
      <div
        className='grid gap-y-[25px] border border-slate-300 rounded-[10px] p-5 mt-[30px]'
        style={{
          boxShadow: '0 -1px 4px rgba(0,0,0,.04), 0 4px 8px rgba(0,0,0,.08)',
        }}
      >
        <div className='flex justify-between pb-5 border-b border-slate-300'>
          <div className='flex font-[650] gap-x-3 text-xl'>
            <p className=''>No :</p>
            <p className='font-semibold text-rstroke'>H86Kksdj7o2j9</p>
          </div>
          <div className='flex font-[650] gap-x-3 text-xl'>
            <p className=''>Tanggal :</p>
            <p className='font-semibold text-rstroke'>28 Desember 2023</p>
          </div>
        </div>
        <div className='grid gap-y-5 pb-5 border-b border-slate-300'>
          <div className='flex font-[650] gap-x-3 text-2xl'>
            <p className='w-1/2 '>Nama Penyewa</p>
            <div className='w-1/2 flex font-semibold'>
              <p className='font-[650] mr-2'>:</p>
              <p className='text-rstroke'>M Danar Kahfi</p>
            </div>
          </div>
          <div className='flex font-[650] gap-x-3 text-2xl'>
            <p className='w-1/2 '>Tipe Pembayaran</p>
            <div className='w-1/2 flex font-semibold'>
              <p className='font-[650] mr-2'>:</p>
              <p className='text-rstroke'>Perbulan</p>
            </div>
          </div>
          <div className='flex font-[650] gap-x-3 text-2xl'>
            <p className='w-1/2 '>Nama Produk</p>
            <div className='w-1/2 flex font-semibold'>
              <p className='font-[650] mr-2'>:</p>
              <p className='text-rstroke'>
                Kost Singgahsini Griya Athaya Tipe A Kartasura Sukoharjo
              </p>
            </div>
          </div>
          <div className='flex font-[650] gap-x-3 text-2xl'>
            <p className='w-1/2 '>Tanggal Awal Sewa</p>
            <div className='w-1/2 flex font-semibold'>
              <p className='font-[650] mr-2'>:</p>
              <p className='text-rstroke'>26 November 2023</p>
            </div>
          </div>
          <div className='flex font-[650] gap-x-3 text-2xl'>
            <p className='w-1/2 '>Tanggal Akhir Sewa</p>
            <div className='w-1/2 flex font-semibold'>
              <p className='font-[650] mr-2'>:</p>
              <p className='text-rstroke'>08 Februari 2024</p>
            </div>
          </div>
          <div className='flex font-[650] gap-x-3 text-2xl'>
            <p className='w-1/2 '>Durasi Sewa</p>
            <div className='w-1/2 flex font-semibold'>
              <p className='font-[650] mr-2'>:</p>
              <p className='text-rstroke'>2 bulan</p>
            </div>
          </div>
          <div className='flex font-[650] gap-x-3 text-2xl'>
            <p className='w-1/2'>Catatan</p>
            {/* ksih kondisi kalo masih pending isiny "-" intinya selain reject "-" */}
            <div className='w-1/2 flex font-semibold'>
              <p className='font-[650] mr-2'>:</p>
              <p className='text-rstroke'>-</p>
            </div>
          </div>
        </div>
        <div className='flex items-center font-bold justify-between text-3xl'>
          <div>Rp. 630.000</div>
          {/* kasih kondisi jika berhasil akan tampil ini */}
          {/*<div className='w-1/5 text-xl bg-primary text-white font-bold rounded-[10px] px-2 py-2.5 flex items-center'>
            <div className='mr-5'>
              <CheckCircleFilled className='text-3xl' />
            </div>
            <div className='w-full flex justify-center'>Terkonfirmasi</div>
          </div> */}
          {/* kasih kondisi jika gagal akan tampil ini */}
          {/* <div className='w-1/5 text-xl bg-merah text-white font-bold rounded-[10px] px-3 py-2.5 flex items-center'>
            <div className='mr-5'>
              <CloseCircleFilled className='text-3xl' />
            </div>
            <div className='w-full flex justify-center'>Ditolak</div>
          </div> */}
          {/* kasih kondisi jika pending akan tampil ini */}
          <div className='w-1/5 text-xl bg-[#FFCC00] text-white font-bold rounded-[10px] px-3 py-2 flex items-center'>
            <div className='mr-5'>
              <ClockCircleFilled className='text-3xl' />
            </div>
            <div className='w-full flex justify-center'>Menunggu</div>
          </div>
        </div>
      </div>
      <div>
        <Button onClick={onFinish} className='!font-bold !py-3 !text-2xl'>
          Selesai
        </Button>
      </div>
    </div>
  );
};

export default Step3;
