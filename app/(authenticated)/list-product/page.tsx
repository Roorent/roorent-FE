'use client';

import React, { useEffect } from 'react';
import { Pagination, Select } from 'antd';
import Button from '#/components/Button';
import CardProduk from '#/components/Card';
import { productRepository } from '#/repository/product';
import { parseJwt } from '#/utils/convert';

function ListProduct() {
  useEffect(() => {
    document.title = 'List Product';
  }, []);

  const token = localStorage.getItem('access_token');
  let id: string = '';

  if (token) {
    id = parseJwt(token).id;
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const { data, error, isLoading } =
    productRepository.hooks.getListProductByOwner(id);

  return (
    <div>
      <div className='produkOwner text-4xl font-bold bg-primary rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
        <div className='w-full'>
          <p className='text-white w-full'>List Produk </p>
        </div>
        <div className='flex gap-x-6 items-center'>
          <div className='w-full'>
            <Select
              defaultValue='semua'
              style={{ width: 120 }}
              className='produkOwner'
              onChange={handleChange}
              options={[
                { value: 'semua', label: 'Semua' },
                { value: 'kost', label: 'Kost' },
                { value: 'gedung', label: 'Gedung' },
                { value: 'hotel', label: 'Hotel' },
              ]}
            />
          </div>
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
      <div className='grid gap-5 grid-cols-3'>
        {data?.data.map((product: any) => (
          <div key={product.id}>
            <CardProduk
              image={product.photo}
              label={product.type}
              title={product.name}
            />
          </div>
        ))}
      </div>
      <div className='w-full py-[20px] flex justify-end'>
        <Pagination
          defaultCurrent={1}
          total={50}
          className='text-2xl font-semibold'
        />
      </div>
    </div>
  );
}

export default ListProduct;
