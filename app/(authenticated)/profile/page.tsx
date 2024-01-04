import { ArrowLeftOutlined } from '@ant-design/icons';
import React from 'react';

function Profile() {
  return (
    <div>
      <div className='w-full grid gap-y-[20px]'>
        <div className='w-full grid gap-y-[20px] grid-cols-1'>
          <a
            href='/home'
            className='w-fit hover:text-teks flex font-bold text-xl gap-3'
          >
            <div>
              <ArrowLeftOutlined />
            </div>
            <div>Kembali</div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Profile;
