import { HomeFilled } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { Radio, RadioChangeEvent } from 'antd';
import { usePathname } from 'next/navigation';
import React from 'react';

function TypeRadio({ onChange, value, defaultValue }: any) {
  const pathname = usePathname();

  const home = pathname === '/home';
  const cruProduct = pathname === '/list-product' || '/create-product';

  const handleChange = (e: RadioChangeEvent) => {
    onChange(e.target.value);
  };

  return (
    <div>
      {cruProduct && (
        <Radio.Group
          buttonStyle='solid'
          onChange={handleChange}
          value={value}
          defaultValue={defaultValue}
          className='w-full flex gap-x-5'
        >
          <div className='w-1/3'>
            <Radio.Button
              value='kost'
              className='py-[20px] h-max font-bold flex justify-center text-primary'
            >
              <div className='w-full flex items-center text-2xl'>
                <HomeFilled className='mr-2' />
                Kost
              </div>
            </Radio.Button>
          </div>
          <div className='w-1/3'>
            <Radio.Button
              value='gedung'
              className='py-[20px] h-max font-bold flex justify-center text-primary'
            >
              <div className='w-full flex items-center text-2xl'>
                <Icon icon='mingcute:building-1-fill' className='mr-2' />{' '}
                Gedung
              </div>
            </Radio.Button>
          </div>
          <div className='w-1/3'>
            <Radio.Button
              value='hotel'
              className='py-[20px] h-max font-bold flex justify-center text-primary'
            >
              <div className='w-full flex items-center text-2xl'>
                <Icon icon='fa6-solid:hotel' className='mr-2' />
                Hotel
              </div>
            </Radio.Button>
          </div>
        </Radio.Group>
      )}
      {home && (
        <Radio.Group
          buttonStyle='solid'
          onChange={handleChange}
          value={value}
          defaultValue={defaultValue}
          className='w-full flex gap-x-28'
        >
          <div>
            <Radio.Button
              value='kost'
              className='w-[166px] py-[20px] h-max font-bold flex justify-center text-2xl text-primary'
            >
              <div className='w-full flex items-center'>
                <HomeFilled className='mr-2' />
                Kost
              </div>
            </Radio.Button>
          </div>
          <div className='flex'>
            <Radio.Button
              value='gedung'
              className='w-[166px] py-[20px] h-max font-bold flex justify-center text-2xl text-primary'
            >
              <div className='w-full flex items-center'>
                <Icon icon='mingcute:building-1-fill' className='mr-2' /> Gedung
              </div>
            </Radio.Button>
          </div>
          <div>
            <Radio.Button
              value='hotel'
              className='w-[166px] py-[20px] h-max font-bold flex justify-center text-2xl text-primary'
            >
              <div className='w-full flex items-center'>
                <Icon icon='fa6-solid:hotel' className='mr-2' />
                Hotel
              </div>
            </Radio.Button>
          </div>
        </Radio.Group>
      )}
    </div>
  );
}

export default TypeRadio;
