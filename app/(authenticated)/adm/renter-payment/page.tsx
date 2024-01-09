'use client';
import Button from '#/components/Button';
import ListPayment from '#/components/List-Payment';
import { TransactionRepository } from '#/repository/transaction';
import { Pagination, Spin } from 'antd';
import React, { useState } from 'react';

function RenterPayment() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, mutate } =
    TransactionRepository.hooks.getTransactionsRenter();

  if (!data) {
    return (
      <Spin
        size='large'
        className='w-full h-full flex items-center justify-center'
      />
    );
  }
  const datas = data?.transactionsData;

  const itemsPerPage = 10;
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

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
      <div className='w-full grid gap-y-[20px] grid-cols-1'>
        <div className='produkOwner text-white text-4xl font-bold bg-primary rounded-[10px] px-5 py-3 flex justify-center items-center'>
          <p>Pembayaran Renter</p>
        </div>
        <div className='grid gap-10 grid-cols-2'>
          {currentItems?.map((payment: any) => (
              <div key={payment.id}>
                <ListPayment
                  idTransaction={payment.id}
                  tanggal={payment.createdAt}
                  waktu={payment.createdAt}
                  buktiPembayaran={payment.trans_proof}
                  renter={payment.user_name}
                  namaProduk={payment.product_name}
                  biayaSewa={payment.price}
                  lamaSewa={payment.amount}
                  totalPembayaran={payment.total_price}
                  mutate={mutate}
                />
              </div>
            ))}
        </div>
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
    </div>
  );
}

export default RenterPayment;
