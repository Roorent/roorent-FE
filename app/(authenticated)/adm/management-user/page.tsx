'use client';

import ListPengguna from '#/components/Pengguna';
import Searchs from '#/components/Search';
import TypeRadio from '#/components/TypeButton';
import { adminRepository } from '#/repository/adm';
import { Pagination } from 'antd';
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
  const { data, error, isLoading } = adminRepository.hooks.getAllUsers();
  
  if (!data) {
    return <div>Loading...</div>;
  }
  const datas = data?.data;
  console.log(data)
  
  const [typeFilter, setTypeFilter] = useState('owner');

  const filteredUsers = typeFilter
    ? datas.filter((user: any) => user.role === typeFilter)
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
          <TypeRadio
            value={typeFilter}
            onChange={handleChange}
            defaultValue='owner'
          />
        </div>
        <div>
          <Searchs placeholder={'Masukan nama'} />
        </div>
        <div className='grid gap-y-4'>
          {filteredUsers.map((user: any) => (
            <div key={user.id}>
              <ListPengguna
                role={user.role}
                namaPengguna={user.namaPengguna}
                status={user.status}
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
