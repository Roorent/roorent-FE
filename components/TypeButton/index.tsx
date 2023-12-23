import { HomeFilled } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { Radio } from 'antd';
import React from 'react';

function TypeRadio({onChange, value, defaultValue}: any) {
  return (
    <div>
      <Radio.Group
        buttonStyle='solid'
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        className='w-full flex gap-x-5'
      >
        <div className='w-2/6'>
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
        <div className='w-2/6'>
          <Radio.Button
            value='gedung'
            className='py-[20px] h-max font-bold flex justify-center text-primary'
          >
            <div className='w-full flex items-center text-2xl'>
              <Icon icon='mingcute:building-1-fill' className='mr-2' /> Gedung
            </div>
          </Radio.Button>
        </div>
        <div className='w-2/6'>
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
    </div>
  );
}

export default TypeRadio;
