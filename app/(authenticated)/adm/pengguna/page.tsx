'use client';

import ListPengguna from '#/components/Pengguna';
import Searchs from '#/components/Search';
import { MASCOT_OWNER, MASCOT_RENTER } from '#/constants/images';
import { adminRepository } from '#/repository/adm';
import { Pagination, Radio, Spin } from 'antd';
import React, { useState } from 'react';

function ManagementUser() {
  const [typeFilter, setTypeFilter] = useState('owner');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = adminRepository.hooks.getAllUsers();

  if (!data) {
    return (
      <Spin
        size='large'
        className='w-full h-full flex items-center justify-center'
      />
    );
  }

  const datas = data?.userData;

  const filteredUsers = typeFilter
    ? datas.filter((user: any) => user?.role === typeFilter)
    : datas;

  const itemsPerPage = 10;
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleChange = (e: any) => {
    setTypeFilter(e.target.value);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers
    ?.sort((first: any, second: any) => {
      return (
        new Date(second.updatedAt).getTime() -
        new Date(first.updatedAt).getTime()
      );
    })
    .slice(indexOfFirstItem, indexOfLastItem);

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
          {currentItems?.map((user: any) => (
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
      <div className='w-full py-[20px] flex justify-end'>
        <Pagination
          current={currentPage}
          total={filteredUsers?.length}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          className='text-2xl font-semibold absolute bottom-5'
        />
      </div>
    </div>
  );
}

export default ManagementUser;
