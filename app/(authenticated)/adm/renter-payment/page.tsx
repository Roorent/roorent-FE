'use client';
import Button from '#/components/Button';
import ListPayment from '#/components/List-Payment';
import { TransactionRepository } from '#/repository/transaction';
import { Empty, Pagination, Select, Spin } from 'antd';
import { Option } from 'antd/es/mentions';
import React, { useState } from 'react';

function RenterPayment() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('pending');
  const [filteredDatas, setFilteredDatas] = useState([]);

  const limit = 8;
  const { data, error, isLoading, mutate } =
    TransactionRepository.hooks.getTransactionsRenter(filterType, currentPage,
      limit);

  if (!data) {
    return (
      <Spin
        size='large'
        className='w-full h-full flex items-center justify-center'
      />
    );
  }
  const datas = data?.transactionsData;

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleChange = (value: string) => {
    setFilterType(value);
    setCurrentPage(1);

    if (value === 'pending') {
      setFilteredDatas(datas);
    } else {
      const filtered = datas?.filter(
        (item: any) => item.payment_status === value
      );
      setFilteredDatas(filtered);
    }
  };

  interface OptionTypeIO {
    value: string;
    label: string;
  }

  const options: OptionTypeIO[] = [
    { value: 'pending', label: 'Belum Dikonfirmasi' },
    { value: 'approve', label: 'Dikonfirmasi' },
    { value: 'reject', label: 'Ditolak' },
  ];

  return (
    <div>
      <div className='w-full grid gap-y-[20px] grid-cols-1'>
        <div className='produkOwner text-4xl font-bold px-5 py-3 flex justify-center items-center border-b border-slate-300 pb-8'>
          <p>Pembayaran Renter</p>
        </div>
        <div className='grid gap-y-3'>
          <div className='transaksi w-full mb-[30px]'>
            <Select
              value={filterType}
              className='transaksi w-full'
              onChange={handleChange}
            >
              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        {datas?.length > 0 ? (
          <>
            <div className='grid gap-10 grid-cols-2'>
              {datas?.map((payment: any) => (
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
                    status={payment.payment_status}
                    mutate={mutate}
                  />
                </div>
              ))}
            </div>
            <div className='w-full py-[20px] flex justify-end'>
              <Pagination
                current={currentPage}
                total={data?.count}
                pageSize={limit}
                onChange={handlePageChange}
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
                Data tidak tersedia 
              </span>
            }
          >
          </Empty>
        )}
      </div>
    </div>
  );
}

export default RenterPayment;
