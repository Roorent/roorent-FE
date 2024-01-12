'use client';
import Button from '#/components/Button';
import Review from '#/components/Review';
import { imgProduct } from '#/constants/general';
import { TransactionRepository } from '#/repository/transaction';
import { toIDR } from '#/utils/convertCurrency';
import { convertDate } from '#/utils/convertTime';
import {
  ArrowLeftOutlined,
  CheckCircleFilled,
  ClockCircleFilled,
  CloseCircleFilled,
  DeliveredProcedureOutlined,
  EnvironmentFilled,
  HomeFilled,
} from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { Image, Spin } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

function DetailTransaksi() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idTransaction: any = searchParams?.get('id');

  const { data, error, isLoading } =
    TransactionRepository.hooks.getDetailTransactions(idTransaction);

  if (!data) {
    return (
      <Spin
        size='large'
        className='w-full h-full flex items-center justify-center'
      />
    );
  }

  const datas = data?.data;

  function redirectToDetail() {
    const ajukanKembali = `/detail-product?id=${datas?.product_id}`;
    window.location.href = ajukanKembali;
  }

  return (
    <div>
      <div className='w-full grid gap-y-[20px]'>
        <div className='w-full flex gap-x-5 items-center grid-cols-1 mb-10 border-b border-slate-300 pb-8'>
          <div className='w-fit grid gap-y-[20px] grid-cols-1'>
            <a
              href='/riwayat-transaksi'
              className='w-fit hover:text-teks flex font-bold text-xl gap-3'
            >
              <div className='text-3xl'>
                <ArrowLeftOutlined />
              </div>
            </a>
          </div>
          <div className='w-full flex justify-center text-4xl font-bold '>
            Detail Riwayat Transaksi
          </div>
        </div>
        <div className='flex gap-x-20'>
          <div className='w-3/5 pb-10 mt-[20px]'>
            <div
              className='grid gap-y-[25px] border border-slate-300 rounded-[10px] p-5 '
              style={{
                boxShadow:
                  '0 -1px 4px rgba(0,0,0,.04), 0 4px 8px rgba(0,0,0,.08)',
              }}
            >
              <div className='flex justify-between pb-5 border-b border-slate-300'>
                <div className='flex font-[650] gap-x-3 text-xl'>
                  <p className=''>No :</p>
                  <p className='font-semibold text-rstroke'>
                    {datas?.payment_code}
                  </p>
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
                  <p className='w-1/2 '>
                    Nama
                    {' ' + datas?.product_type}
                  </p>
                  <div className='w-1/2 flex font-semibold'>
                    <p className='font-[650] mr-2'>:</p>
                    <p className='text-rstroke'>{datas?.product_name}</p>
                  </div>
                </div>
                <div className='flex font-[650] gap-x-3 text-xl'>
                  <p className='w-1/2 '>
                    Alamat
                    {' ' + datas?.product_type}
                  </p>
                  <div className='w-1/2 flex font-semibold'>
                    <p className='font-[650] mr-2'>:</p>
                    <p className='text-rstroke'>
                      {datas?.product_address ? datas?.product_address : '-'}
                    </p>
                  </div>
                </div>
                <div className='flex font-[650] gap-x-3 text-xl'>
                  <p className='w-1/2 '>Tanggal awal sewa</p>
                  <div className='w-1/2 flex font-semibold'>
                    <p className='font-[650] mr-2'>:</p>
                    <p className='text-rstroke'>
                      {convertDate(datas?.lease_start)}
                    </p>
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
                      {datas?.rental_type === 'bulanan' ? (
                        <p>bulan</p>
                      ) : (
                        <p>hari</p>
                      )}
                    </p>
                  </div>
                </div>
                <div className='flex font-[650] gap-x-3 text-xl'>
                  <p className='w-1/2'>Catatan</p>
                  <div className='w-1/2 flex font-semibold'>
                    <p className='font-[650] mr-2'>:</p>
                    {datas?.payment_status === 'reject' ? (
                      <p className='text-rstroke'>{datas?.reason}</p>
                    ) : (
                      <p className='text-rstroke'>-</p>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex items-center font-bold justify-between text-3xl'>
                <div>{toIDR(datas?.total_price)}</div>
                {datas?.payment_status === 'pending' && (
                  <div className='text-xl bg-[#FFCC00] text-white font-bold rounded-[10px] px-3 py-2 flex items-center'>
                    <div className='mr-5'>
                      <ClockCircleFilled className='text-3xl' />
                    </div>
                    <p>Menunggu</p>
                  </div>
                )}
                {datas?.payment_status === 'approve' && (
                  <div className='text-xl bg-[#19B929] text-white font-bold rounded-[10px] px-2 py-2.5 flex items-center'>
                    <div className='mr-5'>
                      <CheckCircleFilled className='text-3xl' />
                    </div>
                    <p>Terkonfirmasi</p>
                  </div>
                )}
                {datas?.payment_status === 'reject' && (
                  <div className='text-xl bg-merah text-white font-bold rounded-[10px] px-3 py-2.5 flex items-center'>
                    <div className='mr-5'>
                      <CloseCircleFilled className='text-3xl' />
                    </div>
                    <p>Ditolak</p>
                  </div>
                )}
              </div>
            </div>
            {datas?.payment_status === 'approve' ? (
              <div>
                <Button
                  // onClick={onFinish}
                  className='!flex !font-bold !py-3 !text-2xl'
                >
                  <DeliveredProcedureOutlined className='mr-3' />
                  Ekspor PDF
                </Button>
              </div>
            ) : (
              <>
                {datas?.payment_status === 'reject' ? (
                  <div>
                    <Button
                      onClick={redirectToDetail}
                      className='!flex !font-bold !py-3 !text-2xl !bg-merah hover:opacity-85'
                    >
                      Ajukan Kembali
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
          <div
            className='w-1/2 h-fit mt-[20px] border border-slate-300 rounded-[10px] p-5'
            style={{
              boxShadow:
                '0 -1px 4px rgba(0,0,0,.04), 0 4px 8px rgba(0,0,0,.08)',
            }}
          >
            <div className='flex pb-[30px] border-b border-slate-300'>
              <div className='w-1/2 h-[200px]'>
                <Image
                  src={imgProduct(datas.product_photo)}
                  alt={`Produk ${datas.product_name}`}
                  className='object-cover object-center !h-[200px] rounded-xl'
                />
              </div>
              <div className='w-2/5'>
                <div className='flex flex-col gap-y-3 w-[300px]'>
                  <div className='flex gap-x-5'>
                    <div className='rounded-[10px] flex justify-center items-center gap-x-2 p-1.5 border border-rstroke text-rstroke text-xl cursor-default'>
                      {datas?.product_type === 'kost' && (
                        <>
                          <HomeFilled />
                          <p className='font-semibold'>Kost</p>
                        </>
                      )}
                      {datas?.product_type === 'gedung' && (
                        <>
                          <Icon fontSize={25} icon='mingcute:building-1-fill' />
                          <p className='font-semibold'>Gedung</p>
                        </>
                      )}
                      {datas?.product_type === 'hotel' && (
                        <>
                          <Icon fontSize={20} icon='fa6-solid:hotel' />
                          <p className='font-semibold'>Hotel</p>
                        </>
                      )}
                    </div>
                    <div className='font-bold text-white text-xl'>
                      {datas?.product_gender === 'pria' && (
                        <p className='bg-primary py-1.5 px-5 rounded-md'>
                          Pria
                        </p>
                      )}
                      {datas?.product_gender === 'wanita' && (
                        <p className='bg-labelWanita py-1.5 px-5 rounded-md'>
                          Wanita
                        </p>
                      )}
                      {datas?.product_gender === 'campuran' && (
                        <p className='bg-orange-400 py-1.5 px-5 rounded-md'>
                          Campuran
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='flex items-center gap-x-2 text-rstroke w-[300px]'>
                    <EnvironmentFilled className='text-[26px]' />
                    <p className='text-2xl truncate'>
                      {datas?.product_address}
                    </p>
                  </div>
                  <div className='w-[325px] text-2xl font-semibold'>
                    <p className='line-clamp-2'>{datas?.product_name}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex font-bold justify-between text-3xl py-5'>
              <div>Total</div>
              <div>{toIDR(datas?.total_price)}</div>
            </div>
            {datas?.payment_status === 'approve' && (
              <div className='flex gap-x-2 justify-end'>
                <div>
                  <Button
                    className='!font-bold !w-full !py-3 !text-xl !mt-0 !bg-transparent !border !border-primary !text-primary hover:!opacity-85'
                    // onClick={openModal}
                  >
                    Lepaskan Dana
                  </Button>
                </div>
                <div>
                  <Review
                    isType={datas?.product_type}
                    isLabel={datas?.product_gender}
                    address={datas?.product_address}
                    image={datas?.product_photo}
                    nameProduk={datas?.product_name}
                    idProducts={datas?.product_id}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailTransaksi;
