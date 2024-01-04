'use client';
import Button from '#/components/Button';
import Review from '#/components/Review';
import {
  ArrowLeftOutlined,
  ClockCircleFilled,
  DeliveredProcedureOutlined,
  EnvironmentFilled,
  HomeFilled,
} from '@ant-design/icons';
import { Image } from 'antd';
import React from 'react';

function DetailTransaksi() {
  return (
    <div>
      <div className='w-full grid gap-y-[20px]'>
        <div className='w-full grid gap-y-[20px] grid-cols-1'>
          <a
            href='/riwayat-transaksi'
            className='w-fit hover:text-teks flex font-bold text-xl gap-3'
          >
            <div>
              <ArrowLeftOutlined />
            </div>
            <div>Kembali</div>
          </a>
        </div>
        <div className='grid gap-y-5'>
          <div className='produkOwner text-white text-4xl font-bold bg-primary rounded-[10px] px-5 py-3 flex justify-center items-center mb-[10px]'>
            <p>Detail Riwayat Transaksi</p>
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
                    {/* {trans?.payment_code} */}
                    090909
                  </p>
                </div>
                <div className='flex font-[650] gap-x-3 text-xl'>
                  <p className=''>Tanggal :</p>
                  <p className='font-semibold text-rstroke'>
                    {/* {convertDate(datas?.createdAt)} */}
                    22 januari 2024
                  </p>
                </div>
              </div>
              <div className='grid gap-y-5 pb-5 border-b border-slate-300'>
                <div className='flex font-[650] gap-x-3 text-xl'>
                  <p className='w-1/2 '>Nama penyewa</p>
                  <div className='w-1/2 flex font-semibold'>
                    <p className='font-[650] mr-2'>:</p>
                    <p className='text-rstroke'>
                      {/* {datas?.user_name} */}M Danar Kahfi
                    </p>
                  </div>
                </div>
                <div className='flex font-[650] gap-x-3 text-xl'>
                  <p className='w-1/2 '>Tipe sewa</p>
                  <div className='w-1/2 flex font-semibold'>
                    <p className='font-[650] mr-2'>:</p>
                    <p className='text-rstroke'>
                      {/* {datas?.rental_type === 'harian' ? 'Harian' : 'Bulanan'} */}
                      Bulanan
                    </p>
                  </div>
                </div>
                <div className='flex font-[650] gap-x-3 text-xl'>
                  <p className='w-1/2 '>
                    Nama
                    {/* {datas?.product_type} */} Kost
                  </p>
                  <div className='w-1/2 flex font-semibold'>
                    <p className='font-[650] mr-2'>:</p>
                    <p className='text-rstroke'>
                      {/* {datas?.product_name} */}
                      vaduyfusyduwegduegd
                    </p>
                  </div>
                </div>
                <div className='flex font-[650] gap-x-3 text-xl'>
                  <p className='w-1/2 '>
                    Alamat
                    {/* {datas?.product_type} */} Kost
                  </p>
                  <div className='w-1/2 flex font-semibold'>
                    <p className='font-[650] mr-2'>:</p>
                    <p className='text-rstroke'>
                      {/* {datas?.product_address ? datas?.product_address : '-'} */}
                      fhiwehfiheiufhiweehfiuuw
                    </p>
                  </div>
                </div>
                <div className='flex font-[650] gap-x-3 text-xl'>
                  <p className='w-1/2 '>Tanggal awal sewa</p>
                  <div className='w-1/2 flex font-semibold'>
                    <p className='font-[650] mr-2'>:</p>
                    <p className='text-rstroke'>
                      {/* {convertDate(datas?.lease_start)} */}
                      22 januari 2023
                    </p>
                  </div>
                </div>
                <div className='flex font-[650] gap-x-3 text-xl'>
                  <p className='w-1/2 '>Tanggal akhir sewa</p>
                  <div className='w-1/2 flex font-semibold'>
                    <p className='font-[650] mr-2'>:</p>
                    <p className='text-rstroke'>
                      {/* {convertDate(datas?.lease_expiration)} */}
                      22 januari 2024
                    </p>
                  </div>
                </div>
                <div className='flex font-[650] gap-x-3 text-xl'>
                  <p className='w-1/2 '>Durasi sewa</p>
                  <div className='w-1/2 flex font-semibold'>
                    <p className='font-[650] mr-2'>:</p>
                    <p className='text-rstroke flex gap-2'>
                      {/* <p>{datas?.amount}</p>
                    {datas?.rental_type === 'bulanan' ? (
                      <p>bulan</p>
                    ) : (
                      <p>hari</p>
                    )} */}
                      <p>2 bulan</p>
                    </p>
                  </div>
                </div>
                <div className='flex font-[650] gap-x-3 text-xl'>
                  <p className='w-1/2'>Catatan</p>
                  <div className='w-1/2 flex font-semibold'>
                    <p className='font-[650] mr-2'>:</p>
                    {/* {trans?.payment_status === 'reject' ? (
                    <p className='text-rstroke'>{trans?.reason}</p>
                  ) : (
                    <p className='text-rstroke'>-</p>
                  )} */}
                    <p>-</p>
                  </div>
                </div>
              </div>
              <div className='flex items-center font-bold justify-between text-3xl'>
                <div>
                  {/* {toIDR(datas?.total_price)} */}
                  2000000
                </div>
                {/* sementara */}
                <div className='text-xl bg-[#FFCC00] text-white font-bold rounded-[10px] px-3 py-2 flex items-center'>
                  <div className='mr-5'>
                    <ClockCircleFilled className='text-3xl' />
                  </div>
                  <p>Menunggu</p>
                </div>

                {/* {trans?.payment_status === 'pending' && (
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
              )} */}
              </div>
            </div>
            <div>
              <Button
                // onClick={onFinish}
                className='!flex !font-bold !py-3 !text-2xl'
              >
                <DeliveredProcedureOutlined className='mr-3' />
                Ekspor PDF
              </Button>
            </div>
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
                  src='/assets/images/BuktiPembayaran.png'
                  alt='Riwayat Transaksi'
                  className='object-cover object-center !h-[200px] rounded-xl'
                />
              </div>
              <div className='w-2/5'>
                <div className='flex flex-col gap-y-3 w-[300px]'>
                  <div className='flex gap-x-5'>
                    <div className='rounded-[10px] flex justify-center items-center gap-x-2 p-1.5 border border-rstroke text-rstroke text-xl cursor-default'>
                      <HomeFilled />
                      <p className='font-semibold'>Kost</p>
                      {/* {product_type === 'kost' && (
                        <>
                          <HomeFilled />
                          <p className='font-semibold'>Kost</p>
                        </>
                      )}
                      {product_type === 'gedung' && (
                        <>
                          <Icon fontSize={25} icon='mingcute:building-1-fill' />
                          <p className='font-semibold'>Gedung</p>
                        </>
                      )}
                      {product_type === 'hotel' && (
                        <>
                          <Icon fontSize={20} icon='fa6-solid:hotel' />
                          <p className='font-semibold'>Hotel</p>
                        </>
                      )} */}
                    </div>
                    <div className='font-bold text-white text-xl'>
                      <p className='bg-primary py-1.5 px-5 rounded-md'>Pria</p>
                      {/* {product_label === 'pria' && (
                        <>
                          <p className='bg-primary py-1.5 px-5 rounded-md'>
                            Pria
                          </p>
                        </>
                      )}
                      {product_label === 'wanita' && (
                        <>
                          <p className='bg-labelWanita py-1.5 px-5 rounded-md'>
                            Wanita
                          </p>
                        </>
                      )}
                      {product_label === 'campuran' && (
                        <>
                          <p className='bg-orange-400 py-1.5 px-5 rounded-md'>
                            Campuran
                          </p>
                        </>
                      )} */}
                    </div>
                  </div>
                  <div className='flex items-center gap-x-2 text-rstroke w-[300px]'>
                    <EnvironmentFilled className='text-[26px]' />
                    <p className='text-2xl truncate'>wneddjwediowjefijweio ksdhfiuhsfh hdfihsaih hfifhwihw hiqhiuweh </p>
                  </div>
                  <div className='w-[325px] text-2xl font-semibold'>
                    <p className='line-clamp-2'>
                      asdikhaidhi wegudrgwe wheiuwheiuheiruh hqiuryeiwu sgdjag daqguidhqw hdiqwiwdqw
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex font-bold justify-between text-3xl py-5'>
              <div>Total</div>
              <div>2000000</div>
            </div>
            <div>
              <Review />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailTransaksi;
