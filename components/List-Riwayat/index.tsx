import { config } from '#/config/app';
import { toIDR } from '#/utils/convertCurrency';
import { EnvironmentFilled, HomeFilled } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import React from 'react';

function ListRiwayat({
  idTransaction,
  image,
  product_type,
  product_label,
  product_name,
  product_address,
  total_price,
  statusPembayaran,
}: any) {
  const imgProduct = (img: string) =>
    `${config.baseUrl}/images/photo-products/${img}`;
  return (
    <div className='border border-[#858585] rounded-[10px] p-5'>
      {statusPembayaran === 'pending' && <></>}
      {statusPembayaran === 'approve' && <></>}
      {statusPembayaran === 'reject' && <></>}
      <a href={`/detail-transaksi?id=${idTransaction}`} 
      className='hover:text-teks'>
        <div className='flex gap-x-[30px] pb-[30px] border-b border-[#858585]'>
          <div className='w-1/2 h-[190px]'>
            <img
              // src={imgProduct(datas?.product_photo)}
              // alt={`produk ${datas?.product_name}`}
              src={imgProduct(image)}
              alt='produk'
              className='object-cover object-center w-full h-full rounded-xl'
            />
          </div>
          <div className='w-1/2'>
            <div className='flex flex-col gap-y-3 w-[300px]'>
              <div className='flex gap-x-5'>
                <div className='rounded-[10px] flex justify-center items-center gap-x-2 p-1.5 border border-rstroke text-rstroke text-xl cursor-default'>
                  {product_type === 'kost' && (
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
                  )}
                </div>
                <div className='font-bold text-white text-xl'>
                  {product_label === 'pria' && (
                    <>
                      <p className='bg-primary py-1.5 px-5 rounded-md'>Pria</p>
                    </>
                  )}
                  {product_label === 'wanita' && (
                    <>
                      <p className='bg-labelWanita py-1.5 px-5 rounded-md'>
                        Wanita
                      </p>
                    </>
                  )}
                  {product_label === 'campur' && (
                    <>
                      <p className='bg-orange-400 py-1.5 px-5 rounded-md'>
                        Campur
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className='w-[230px] text-2xl font-semibold'>
                <p className='line-clamp-2'>{product_name}</p>
              </div>
              <div className='flex items-center gap-x-2 text-rstroke w-[230px]'>
                <EnvironmentFilled className='text-[26px]' />
                <p className='text-2xl truncate'>{product_address}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex font-bold justify-between text-3xl py-3'>
          <div>Total</div>
          <div>{toIDR(total_price)}</div>
        </div>
      </a>
    </div>
  );
}

export default ListRiwayat;
