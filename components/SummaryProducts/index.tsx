'use client';

import React, { useEffect, useState } from 'react';
import { HomeFilled } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { imgProduct } from '#/constants/general';

function SummaryProducts({ isType, isLabel, address, image, nameProduk }: any) {
  const [type, setType] = useState('');
  const [label, setLabel] = useState('');

  useEffect(() => {
    setType(isType);
    setLabel(isLabel);
  }, [isType, isLabel]);

  return (
    <div className='flex gap-4 items-center mb-4'>
      <div className='w-1/2 bg-red-400 rounded-xl'>
        <img
          className='object-none rounded-xl'
          src={imgProduct(image)}
          alt='Images'
        />
      </div>
      <div className='w-1/2 text-slate-600'>
        <div className='flex gap-3 items-center mb-3'>
          <div className='rounded-[10px] flex justify-center items-center gap-x-2 p-1.5 border border-rstroke text-rstroke text-xl cursor-default'>
            {type === 'kost' && (
              <>
                <HomeFilled />
                <p className='font-semibold'>Kost</p>
              </>
            )}
            {type === 'gedung' && (
              <>
                <Icon fontSize={25} icon='mingcute:building-1-fill' />
                <p className='font-semibold'>Gedung</p>
              </>
            )}
            {type === 'hotel' && (
              <>
                <Icon fontSize={20} icon='fa6-solid:hotel' />
                <p className='font-semibold'>Hotel</p>
              </>
            )}
          </div>
          <div className='text-white'>
            {label === 'pria' && (
              <>
                <p className='bg-primary py-1.5 px-5 rounded-md'>Pria</p>
              </>
            )}
            {label === 'wanita' && (
              <>
                <p className='bg-labelWanita py-1.5 px-5 rounded-md'>Wanita</p>
              </>
            )}
            {label === 'campuran' && (
              <>
                <p className='bg-orange-400 py-1.5 px-5 rounded-md'>Campuran</p>
              </>
            )}
          </div>
        </div>
        <div className='flex gap-1 items-center'>
          <Icon fontSize={20} icon='carbon:location-filled' />
          <p className='text-lg'>{address}</p>
        </div>
        <div className='w-[200px] flex gap-1 items-center'>
          <p className='text-lg line-clamp-2'>{nameProduk}</p>
        </div>
      </div>
    </div>
  );
}

export default SummaryProducts;
