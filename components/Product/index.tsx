import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { HomeFilled, StarFilled } from '@ant-design/icons';
import { imgProduct } from '#/constants/general';
import { toIDR } from '#/utils/convertCurrency';

function Product({
  image,
  isType,
  isgender,
  rating,
  namaProduk,
  idProducts,
  kota,
  stok,
  hargaPerbulan,
  hargaPerhari,
}: any) {
  const [type, setType] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    setType(isType);
    setGender(isgender);
  }, [isType, isgender]);

  return (
    <div className='w-[290px]'>
      <a href={`/detail-product?id=${idProducts}`}>
        <div className='w-full h-[180px]'>
          <img
            src={imgProduct(image)}
            alt='produk'
            className='object-cover object-center w-full h-full rounded-xl'
          />
        </div>
        <div className='w-full mt-3'>
          <div className='text-slate-600'>
            <div className='flex gap-x-2 items-center mb-2'>
              {type === 'kost' && (
                <>
                  <div className='font-semibold p-2 border border-slate-700 rounded-md flex gap-2 items-center'>
                    <HomeFilled />
                    <p>Kost</p>
                  </div>
                </>
              )}
              {type === 'gedung' && (
                <>
                  <div className='font-semibold p-2 border border-slate-700 rounded-md flex gap-2 items-center'>
                    <Icon fontSize={20} icon='mingcute:building-1-fill' />
                    <p>Gedung</p>
                  </div>
                </>
              )}
              {type === 'hotel' && (
                <>
                  <div className='font-semibold p-2 border border-slate-700 rounded-md flex gap-2 items-center'>
                    <Icon fontSize={20} icon='fa6-solid:hotel' />
                    <p>Hotel</p>
                  </div>
                </>
              )}
              <div className='font-bold text-white'>
                {gender === 'pria' && (
                  <p className='bg-primary py-2 px-5 rounded-md'>Pria</p>
                )}
                {gender === 'wanita' && (
                  <p className='bg-labelWanita p-2 px-5 rounded-md'>Wanita</p>
                )}
                {gender === 'campur' && (
                  <p className='bg-orange-400 p-2 px-5 rounded-md'>Campur</p>
                )}
              </div>
              <div className='flex items-center gap-x-2'>
                <StarFilled className='text-[#FFCC00] text-[26px]' />
                <p className='font-bold text-xl text-rstroke'>{rating}</p>
              </div>
            </div>
            <div className='text-[#DA3438] font-semibold text-lg'>
              {type === 'kost' && (
                <>
                  <div>
                    <p>
                      sisa <span className='font-bold'>{stok}</span> kamar
                    </p>
                  </div>
                </>
              )}
              {type === 'hotel' && (
                <>
                  <div>
                    <p>
                      sisa <span className='font-bold'>{stok}</span> kamar
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className='text-xl '>
              <p className='w-[300px] overflow-hidden truncate'>{namaProduk}</p>
            </div>
            <div className='text-xl font-bold'>
              <p className='w-[300px] overflow-hidden truncate'>{kota}</p>
            </div>
            <div className='text-xl flex '>
              {type === 'kost' && (
                <div className='flex gap-x-1'>
                  <p className='font-bold'>{toIDR(hargaPerbulan)}</p>
                  <p className='text-lg'>(Bulan pertama)</p>
                </div>
              )}
              {type === 'gedung' && (
                <div className='flex gap-x-1'>
                  <p className='font-bold'>{toIDR(hargaPerhari)}</p>
                  <p className='text-lg'>(Hari pertama)</p>
                </div>
              )}
              {type === 'hotel' && (
                <div className='flex gap-x-1'>
                  <p className='font-bold'>{toIDR(hargaPerhari)}</p>
                  <p className='text-lg'>(Hari pertama)</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Product;
