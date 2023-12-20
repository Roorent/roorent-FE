'use client';

import React, { useEffect, useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import RegisOwner from '#/components/auth/regisOwner/regisOwner';
import RegisRenter from '#/components/auth/regisRenter/regisRenter';
import Owner from '#/components/auth/logo_owner';
import Renter from '#/components/auth/logo_renter';

function Register() {
  useEffect(() => {
    document.title = 'Register - Roorent';
  });

  const [tabActive, setTabActive] = useState<string>('owner');

  const itemsTab: TabsProps['items'] = [
    {
      key: 'owner',
      label: <Owner active={tabActive === 'owner'} />,
    },
    {
      key: 'renter',
      label: <Renter active={tabActive === 'renter'} />,
    },
  ];

  const onChangeTab = (key: string) => {
    setTabActive(key);
    console.log(key, 'ini key');
  };

  return (
    <div className='w-full min-h-screen flex justify-center relative'>
      <Tabs
        defaultActiveKey='owner'
        type='card'
        items={itemsTab}
        onChange={onChangeTab}
        activeKey={tabActive}
        style={{
          zIndex: 9999999,
          position: 'absolute',
          top: '50px',
          width: '434px',
          backgroundColor: 'white',
        }}
        className='rounded-[20px]'
      />
      {tabActive == 'owner' ? (
        <div className='absolute w-full h-full'>
          <RegisOwner />
        </div>
      ) : (
        <div className='absolute w-full h-full'>
          <RegisRenter />
        </div>
      )}
    </div>
  );
}

export default Register;
