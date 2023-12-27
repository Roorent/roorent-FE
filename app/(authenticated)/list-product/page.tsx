'use client';

import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import Button from '#/components/Button';
import CardProduk from '#/components/Card';
import { productsRepository } from '#/repository/products';
import { parseJwt } from '#/utils/convert';
import TypeRadio from '#/components/TypeButton';

function ListProduct() {
  const [filterType, setFilterType] = useState('semua');

  useEffect(() => {
    document.title = 'List Product';
  }, []);

  const token = localStorage.getItem('access_token');
  let id: string = '';

  if (token) {
    id = parseJwt(token).id;
  }

  const handleChange = (value: string) => {
    setFilterType(value);
  };

  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 9;

  const { data, error, isLoading } =
    productsRepository.hooks.getListProductByOwner(id, filterType);

  // const totalProducts = data?.data?.length || 0;
  // const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // const handlePageChange = (pageNumber: any) => {
  //   setCurrentPage(pageNumber);
  // };

  // const renderProducts = () => {
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   const currentProducts = data?.data?.slice(startIndex, endIndex) || [];
  //   return currentProducts.map((product: any) => (
  //     {Array.isArray(data?.data) && data?.data?.map((product: any) => (
  //     <div key={product.id}>
  //       <CardProduk
  //         idProducts={product.id}
  //         image={product.photo}
  //         label={product.type}
  //         title={product.name}
  //       />
  //     </div>
  //     ))}
  //   ));
  // };
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
      <div className='w-full py-10'>
        <TypeRadio />
      </div>
      <div className='grid gap-5 grid-cols-3 mb-10'>
        {Array.isArray(data?.data) &&
          data?.data?.map((product: any) => (
            <div key={product.id}>
              <CardProduk
                idProducts={product.id}
                image={product.photo}
                label={product.type}
                title={product.name}
              />
            </div>
          ))}
      </div>

      {/* <div className='grid gap-5 grid-cols-3 mb-10'>{renderProducts()}</div>

      {totalPages > 1 && ( */}
      <div className='w-full py-[20px] flex justify-end'>
        <Pagination
          // current={currentPage}
          // total={totalProducts}
          // pageSize={itemsPerPage}
          // onChange={handlePageChange}
          defaultCurrent={1}
          total={50} 
          className='text-2xl font-semibold'
        />
      </div>
      {/* )} */}
    </div>
  );
}

export default ListProduct;
