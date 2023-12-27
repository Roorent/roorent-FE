import React from 'react';
import Button from '../Button';

function Step1({ onNext }: any) {
  return (
    <div className='grid gap-y-2 pb-10'>
      <div className=' pb-[50px] border-b border-slate-300'>
        <div className='text-2xl font-bold flex items-center mt-[30px] mb-[20px]'>
          <p>Informasi Penyewa :</p>
        </div>
        <div className='pl-5 grid gap-y-5'>
          <div className='flex text-xl justify-between'>
            <div className='font-bold'>Nama Penyewa</div>
            <div className='text-rstroke font-semibold'>M Danar Kahfi</div>
          </div>
          <div className='flex text-xl justify-between'>
            <div className='font-bold'>Nomor NIK</div>
            <div className='text-rstroke font-semibold'>3275083671050009</div>
          </div>
          <div className='flex text-xl justify-between'>
            <div className='font-bold'>Nomor HP</div>
            <div className='text-rstroke font-semibold'>087874588726</div>
          </div>
          <div className='flex text-xl justify-between'>
            <div className='font-bold'>Tanggal Lahir</div>
            <div className='text-rstroke font-semibold'>2023/11/26</div>
          </div>
          <div className='flex text-xl justify-between'>
            <div className='font-bold'>Jenis Kelamin</div>
            <div className='text-rstroke font-semibold'>Pria</div>
          </div>
          <div className='flex text-xl justify-between'>
            <div className='font-bold'>Alamat</div>
            <div className='w-[392px] text-right text-rstroke font-semibold'>
              Jl.Bintara 14 No.08 Rt.001/Rw.009 Kec.Bekasi Barat Kel.Bintara
              Jawa Barat
            </div>
          </div>
        </div>
      </div>
      <div className='grid gap-y-5 border-b border-slate-300 pb-[50px]'>
        <div>
          <div className='text-2xl font-bold flex items-center mt-[30px] '>
            <p>Biaya sewa</p>
          </div>
          <div className='text-rstroke text-xl font-semibold flex items-center mt-2'>
            <p>Pembayaran Penuh</p>
          </div>
        </div>
        <div className='text-xl font-bold flex items-center'>
          <p>Rp.600.000</p>
        </div>
      </div>
      <div className='grid gap-y-5 border-b border-slate-300 pb-[50px]'>
        <div className='grid gap-y-2'>
          <div className='text-2xl font-bold flex justify-between items-center mt-[30px] '>
            <p>Tanggal awal sewa</p>
            <p className='text-rstroke text-xl'>26 November 2023</p>
          </div>
          <div className='text-2xl font-bold flex justify-between items-center mt-[30px] '>
            <p>Tanggal akhir sewa</p>
            <p className='text-rstroke text-xl'>08 Februari 2024</p>
          </div>
        </div> 
        <div className='text-2xl font-bold flex justify-between items-center mt-[30px] '>
          <p>Durasi sewa</p>
          <p className='text-rstroke text-xl'>2 bulan</p>
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
