'use client';

import React, { useEffect, useState } from 'react';
import { HomeFilled } from '@ant-design/icons';
import { Icon } from '@iconify/react';

function SummaryProducts({ isType, isLabel, address, image }: any) {
  const [type, setType] = useState('');
  const [label, setLabel] = useState('');

  useEffect(() => {
    setType(isType);
    setLabel(isLabel);
  }, [isType, isLabel]);

  return (
    <div className='flex gap-4 items-center mb-4'>
      <div className='w-[40%] bg-red-400 rounded-xl'>
        <img className='object-none rounded-xl' src={image} alt='Images' />
      </div>
      <div className='text-slate-600'>
        <div className='flex gap-2 items-center mb-3'>
          {type === 'Kos' && (
            <>
              <div className='border border-slate-700 px-2 rounded-md flex gap-2 items-center'>
                <HomeFilled />
                <p>Kos</p>
              </div>
            </>
          )}
          {type === 'Gedung' && (
            <>
              <div className='border border-slate-700 px-2 rounded-md flex gap-2 items-center'>
                <Icon fontSize={20} icon='mingcute:building-1-fill' />
                <p>Gedung</p>
              </div>
            </>
          )}
          {type === 'Hotel' && (
            <>
              <div className='border border-slate-700 px-2 rounded-md flex gap-2 items-center'>
                <Icon fontSize={20} icon='fa6-solid:hotel' />
                <p>Hotel</p>
              </div>
            </>
          )}
          <div className='text-white'>
            {label === 'pria' && (
              <p className='bg-primary px-2 rounded-md'>Pria</p>
            )}
            {label === 'wanita' && (
              <p className='bg-labelWanita px-2 rounded-md'>Wanita</p>
            )}
            {label === 'campuran' && (
              <p className='bg-orange-400 px-2 rounded-md'>Campuran</p>
            )}
          </div>
        </div>
        <div className='flex gap-1 items-center'>
          <Icon fontSize={20} icon='carbon:location-filled' />
          <p className='text-sm'>{address}</p>
        </div>
      </div>
    </div>
  );
}

export default SummaryProducts;
