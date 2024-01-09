'use client';

import React, { useEffect, useState } from 'react';
import { Pagination, Spin } from 'antd';
import Button from '#/components/Button';
import CardProduk from '#/components/Card';
import { productsRepository } from '#/repository/products';
import { parseJwt } from '#/utils/convert';
import TypeRadio from '#/components/TypeButton';

function ListProduct() {
  const [filterType, setFilterType] = useState('kost');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = 'List Product - Roorent';
  }, []);

  const token = localStorage.getItem('access_token');
  let id: string = '';

  if (token) {
    id = parseJwt(token).id;
  }

  const handleChange = (value: string) => {
    setFilterType(value);
    setCurrentPage(1);
  };

  const itemsPerPage = 9;
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const { data, error, isLoading, mutate } =
    productsRepository.hooks.getListProductByOwner(id, filterType);

  if (isLoading) {
    return (
      <Spin
        size='large'
        className='w-full h-full flex items-center justify-center'
      />
    );
  }
  const datas = data?.data;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = datas?.sort((first: any, second: any) => {
    return (
      new Date(second.updatedAt).getTime() -
      new Date(first.updatedAt).getTime()
    );
  }).slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div className='produkOwner text-4xl font-bold bg-primary rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
        <div className='w-full'>
          <p className='text-white w-full'>Daftar Produk </p>
        </div>
        <div className='flex gap-x-6 items-center'>
          <div className='w-full'>
            <Button
              type='primary'
              htmlType='submit'
              href='/create-product'
              className='hover:!text-primary hover:bg-white bg-tranparant border-2 border-white rounded-[10px] text-[20px] font-bold !mt-0 px-7'
            >
              Tambah
            </Button>
          </div>
        </div>
      </div>
      <div className='w-full mb-[30px]'>
        <TypeRadio
          defaultValue='kost'
          value={filterType}
          onChange={handleChange}
        />
      </div>
      <div className='grid gap-5 grid-cols-3'>
        {currentItems?.map((product: any) => (
          <div key={product.id}>
            <CardProduk
              idProducts={product.id}
              image={product.photo}
              label={product.type}
              title={product.name}
              address={product.address}
              mutate={mutate}
            />
          </div>
        ))}
      </div>

      <div className='w-full py-[20px] flex justify-end'>
        <Pagination
         current={currentPage}
         total={datas?.length}
         pageSize={itemsPerPage}
         onChange={handlePageChange}
          className='text-2xl font-semibold'
        />
      </div>
      {/* )} */}
    </div>
  );
}

export default ListProduct;
