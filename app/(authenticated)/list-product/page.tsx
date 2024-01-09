'use client';

import React, { useEffect, useState } from 'react';
import { Empty, Pagination, Spin } from 'antd';
import Button from '#/components/Button';
import CardProduk from '#/components/Card';
import { productsRepository } from '#/repository/products';
import { parseJwt } from '#/utils/convert';
import TypeRadio from '#/components/TypeButton';

function ListProduct() {
  const [filterType, setFilterType] = useState('kost');

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
  };

  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 9;

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
  console.log(datas);
  

  return (
    <div>
      <div className='produkOwner text-4xl font-bold bg-primary rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
        <div className='w-full'>
          <p className='text-white w-full'>Daftar Produk </p>
        </div>
        {datas.length > 0 && (
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
        )}
      </div>
      {datas.length > 0 ? (
        <>
          <div className='w-full mb-[30px]'>
            <TypeRadio
              defaultValue='kost'
              value={filterType}
              onChange={handleChange}
            />
          </div>
          <div className='grid gap-5 grid-cols-3'>
            {datas?.map((product: any) => (
              <div key={product.id}>
                <CardProduk
                  idProducts={product.id}
                  image={product.photo}
                  label={product.type}
                  title={product.name}
                  address={product.address}
                  // disini tambah mutate
                  mutate={mutate}
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
        </>
      ) : (
        <Empty
          image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
          imageStyle={{
            display: 'flex',
            justifyContent: 'center',
            height: '100%',
          }}
          description={
            <span className='font-semibold text-2xl text-[#C0C0C0]'>
              Belum mempunyai produk
            </span>
          }
        >
          <div className='w-full flex justify-center'>
            <Button
              type='primary'
              href='/create-product'
              className='!font-bold !p-3 !w-[10%] !mt-2'
            >
              Tambah
            </Button>
          </div>
        </Empty>
      )}
      {/* )} */}
    </div>
  );
}

export default ListProduct;
