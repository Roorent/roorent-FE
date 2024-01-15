'use client';

import ListPengguna from '#/components/Pengguna';
import Searchs from '#/components/Search';
import { MASCOT_OWNER, MASCOT_RENTER } from '#/constants/images';
import { usersRepository } from '#/repository/users';
import { Pagination, Radio, Spin } from 'antd';
import React, { useState } from 'react';

function ManagementUser() {
  const [typeFilter, setTypeFilter] = useState('owner');
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 10;

  const { data, error, isLoading } = usersRepository.hooks.getAllUsers(typeFilter,currentPage, limit);

  if (!data) {
    return (
      <Spin
        size='large'
        className='w-full h-full flex items-center justify-center'
      />
    );
  }

  const datas = data?.data;

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleChange = (e: any) => {
    setTypeFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className='w-full grid gap-y-[20px] grid-cols-1'>
        <div className='produkOwner text-4xl font-bold px-5 py-3 flex justify-center items-center mb-3 pb-8 border-b border-slate-300'>
          <p>Daftar Pengguna</p>
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
          {datas?.map((user: any) => (
            <div key={user.id}>
              <ListPengguna
                idUsers={user.id}
                image={user?.photo_profile}
                role={user?.role}
                namaPengguna={user?.user_name}
                status={user?.isActive}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='w-full py-5 flex justify-end '>
        <Pagination
          current={currentPage}
          total={data?.count}
          pageSize={limit}
          onChange={handlePageChange}
          className='text-2xl font-semibold'
        />
      </div>
    </div>
  );
}

export default ManagementUser;
