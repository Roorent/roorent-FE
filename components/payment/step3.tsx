// Step3.jsx
import {
  CheckCircleFilled,
  ClockCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons';
import React from 'react';
import Button from '../Button';
import { useSearchParams } from 'next/navigation';
import { convertDate } from '#/utils/convertTime';
import { toIDR } from '#/utils/convertCurrency';
import { TransactionRepository } from '#/repository/transaction';

const Step3 = ({ onFinish, datas }: any) => {
  const searchParams = useSearchParams();
  const rentAppId: any = searchParams?.get('id');

  const { data, error, isLoading } =
    TransactionRepository.hooks.getDetailRenter(rentAppId);
  const trans = data?.data;

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
            <p className='font-semibold text-rstroke'>{trans?.payment_code}</p>
          </div>
          <div className='flex font-[650] gap-x-3 text-xl'>
            <p className=''>Tanggal :</p>
            <p className='font-semibold text-rstroke'>
              {convertDate(datas?.createdAt)}
            </p>
          </div>
        </div>
        <div className='grid gap-y-5 pb-5 border-b border-slate-300'>
          <div className='flex font-[650] gap-x-3 text-xl'>
            <p className='w-1/2 '>Nama penyewa</p>
            <div className='w-1/2 flex font-semibold'>
              <p className='font-[650] mr-2'>:</p>
              <p className='text-rstroke'>{datas?.user_name}</p>
            </div>
          </div>
          <div className='flex font-[650] gap-x-3 text-xl'>
            <p className='w-1/2 '>Tipe sewa</p>
            <div className='w-1/2 flex font-semibold'>
              <p className='font-[650] mr-2'>:</p>
              <p className='text-rstroke'>
                {datas?.rental_type === 'harian' ? 'Harian' : 'Bulanan'}
              </p>
            </div>
          </div>
          <div className='flex font-[650] gap-x-3 text-xl'>
            <p className='w-1/2 '>Nama {datas?.product_type}</p>
            <div className='w-1/2 flex font-semibold'>
              <p className='font-[650] mr-2'>:</p>
              <p className='text-rstroke'>{datas?.product_name}</p>
            </div>
          </div>
          <div className='flex font-[650] gap-x-3 text-xl'>
            <p className='w-1/2 '>Alamat {datas?.product_type}</p>
            <div className='w-1/2 flex font-semibold'>
              <p className='font-[650] mr-2'>:</p>
              <p className='text-rstroke'>{datas?.product_address}</p>
            </div>
          </div>
          <div className='flex font-[650] gap-x-3 text-xl'>
            <p className='w-1/2 '>Tanggal awal sewa</p>
            <div className='w-1/2 flex font-semibold'>
              <p className='font-[650] mr-2'>:</p>
              <p className='text-rstroke'>{convertDate(datas?.lease_start)}</p>
            </div>
          </div>
          <div className='flex font-[650] gap-x-3 text-xl'>
            <p className='w-1/2 '>Tanggal akhir sewa</p>
            <div className='w-1/2 flex font-semibold'>
              <p className='font-[650] mr-2'>:</p>
              <p className='text-rstroke'>
                {convertDate(datas?.lease_expiration)}
              </p>
            </div>
          </div>
          <div className='flex font-[650] gap-x-3 text-xl'>
            <p className='w-1/2 '>Durasi sewa</p>
            <div className='w-1/2 flex font-semibold'>
              <p className='font-[650] mr-2'>:</p>
              <p className='text-rstroke flex gap-2'>
                <p>{datas?.amount}</p>
                {datas?.rental_type === 'bulanan' ? <p>bulan</p> : <p>hari</p>}
              </p>
            </div>
          </div>
          <div className='flex font-[650] gap-x-3 text-xl'>
            <p className='w-1/2'>Catatan</p>
            <div className='w-1/2 flex font-semibold'>
              <p className='font-[650] mr-2'>:</p>
              {trans?.payment_status === 'reject' ? (
                <p className='text-rstroke'>{trans?.reason}</p>
              ) : (
                <p className='text-rstroke'>-</p>
              )}
            </div>
          </div>
        </div>
        <div className='flex items-center font-bold justify-between text-3xl'>
          <div>{toIDR(datas?.total_price)}</div>
          {trans?.payment_status === 'pending' && (
            <div className='text-xl bg-[#FFCC00] text-white font-bold rounded-[10px] px-3 py-2 flex items-center'>
              <div className='mr-5'>
                <ClockCircleFilled className='text-3xl' />
              </div>
              <p>Menunggu</p>
            </div>
          )}
          {trans?.payment_status === 'approve' && (
            <div className='text-xl bg-primary text-white font-bold rounded-[10px] px-2 py-2.5 flex items-center'>
              <div className='mr-5'>
                <CheckCircleFilled className='text-3xl' />
              </div>
              <p>Terkonfirmasi</p>
            </div>
          )}
          {trans?.payment_status === 'reject' && (
            <div className='text-xl bg-merah text-white font-bold rounded-[10px] px-3 py-2.5 flex items-center'>
              <div className='mr-5'>
                <CloseCircleFilled className='text-3xl' />
              </div>
              <p>Ditolak</p>
            </div>
          )}
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
