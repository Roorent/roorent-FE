'use client';

import ListPengguna from '#/components/Pengguna';
import Searchs from '#/components/Search';
import TypeRadio from '#/components/TypeButton';
import { MASCOT_OWNER, MASCOT_RENTER } from '#/constants/images';
import { adminRepository } from '#/repository/adm';
import { Pagination, Radio, Spin } from 'antd';
import React, { useState } from 'react';

const users = [
  {
    id: '1',
    role: 'owner',
    namaPengguna: 'M Danar Kahfi',
    status: 'active',
  },
  {
    id: '2',
    role: 'owner',
    namaPengguna: 'Cecilia Siregar',
    status: 'pending',
  },
  {
    id: '3',
    role: 'owner',
    namaPengguna: 'Nazhwa Nur Syabrina',
    status: 'inactive',
  },
  {
    id: '4',
    role: 'owner',
    namaPengguna: 'Reyner Wiliam Liongs',
    status: 'reject',
  },
  {
    id: '5',
    role: 'renter',
    namaPengguna: 'Fauzi Rahman Dhani',
    status: '',
  },
  {
    id: '6',
    role: 'renter',
    namaPengguna: 'Tyo Kuncoro',
    status: '',
  },
  {
    id: '7',
    role: 'renter',
    namaPengguna: 'Mohammad Wildan Maulana',
    status: '',
  },
];
function ManagementUser() {
  const [typeFilter, setTypeFilter] = useState('owner');

  const { data, error, isLoading } = adminRepository.hooks.getAllUsers();

  if (!data) {
    return <Spin size="large"className='w-full h-full flex items-center justify-center' />;
  }

  const datas = data?.data;

  const filteredUsers = typeFilter
    ? datas.filter((user: any) => user?.level?.name === typeFilter)
    : datas;

  const handleChange = (e: any) => {
    setTypeFilter(e.target.value);
  };

  return (
    <div>
      <div className='w-full grid gap-y-[20px] grid-cols-1'>
        <div className='produkOwner text-white text-4xl font-bold bg-primary rounded-[10px] px-5 py-3 flex justify-center items-center mb-[30px]'>
          <p>Pengguna</p>
        </div>
        <div>
          <Radio.Group
            buttonStyle='solid'
            onChange={handleChange}
            value={typeFilter}
            defaultValue={'owner'}
            className='w-full flex gap-x-5'
          >
            <div className='w-1/2'>
              <Radio.Button
                value='owner'
                className='h-max font-bold flex justify-center text-primary'
              >
                <div className='w-full flex items-center text-2xl'>
                  <img src={MASCOT_OWNER} alt='Mascot Owner' />
                  Pemilik
                </div>
              </Radio.Button>
            </div>
            <div className='w-1/2'>
              <Radio.Button
                value='renter'
                className='h-max font-bold flex justify-center text-primary'
              >
                <div className='w-full flex items-center text-2xl'>
                  <img src={MASCOT_RENTER} alt='Mascot Owner' />
                  Penyewa
                </div>
              </Radio.Button>
            </div>
          </Radio.Group>
        </div>
        <div>
          <Searchs placeholder={'Masukan nama'} />
        </div>
        <div className='grid gap-y-4'>
          {filteredUsers?.map((user: any) => (
            <div key={user.id}>
              <ListPengguna
                idUsers={user.id}
                image={user?.biodata?.photo_profile}
                role={user?.level?.name}
                namaPengguna={user?.biodata?.first_name}
                status={user?.biodata?.isActive}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='w-full py-[20px] flex justify-end'>
        <Pagination
          // current={currentPage}
          // total={totalProducts}
          // pageSize={itemsPerPage}
          // onChange={handlePageChange}
          defaultCurrent={1}
          total={50}
          className='text-2xl font-semibold absolute bottom-5'
        />
      </div>
    </div>
  );
}

export default ManagementUser;
