'use client';
import Button from '#/components/Button';
import ListPayment from '#/components/List-Payment';
import { TransactionRepository } from '#/repository/transaction';
import { Pagination, Spin } from 'antd';
import React from 'react';

function RenterPayment() {
  const { data, error, isLoading, mutate } =
    TransactionRepository.hooks.getTransactionsRenter();

  if (!data) {
    return <Spin size="large"className='w-full h-full flex items-center justify-center' />;
  }
  const datas = data?.transactionsData;

  return (
    <div>
      <div className='w-full grid gap-y-[20px] grid-cols-1'>
        <div className='produkOwner text-white text-4xl font-bold bg-primary rounded-[10px] px-5 py-3 flex justify-center items-center'>
          <p>Pembayaran Renter</p>
        </div>
        <div className='grid gap-10 grid-cols-2'>
          {datas
            ?.sort((a: any, b: any) => {
              // Mengurutkan berdasarkan createdAt dari yang terbaru ke yang terlama
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            })
            .map((payment: any) => (
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
          // current={currentPage}
          // total={totalProducts}
          // pageSize={itemsPerPage}
          // onChange={handlePageChange}
          defaultCurrent={1}
          total={50}
          className='text-2xl font-semibold'
        />
      </div>
    </div>
  );
}

export default RenterPayment;
