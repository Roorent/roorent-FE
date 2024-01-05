'use client';

import ListRiwayat from '#/components/List-Riwayat';
import { TransactionRepository } from '#/repository/transaction';
import { parseJwt } from '#/utils/convert';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Pagination, Select, Spin } from 'antd';
import { Option } from 'antd/lib/mentions';
import React, { useEffect, useState } from 'react';

function RiwayatTransaksi() {
  // const [filterType, setFilterType] = useState('pending');
  const token = localStorage.getItem('access_token');
  let id: string = '';

  if (token) {
    id = parseJwt(token).id;
  }

  const { data, error, isLoading, mutate } =
    TransactionRepository.hooks.getListTransactionsByRenter(id);

  const datas = data?.transactionsData;

  const [filteredDatas, setFilteredDatas] = useState(datas);
  const [filterType, setFilterType] = useState('semua');

  useEffect(() => {
    setFilteredDatas(datas);
  }, [datas]);

  interface OptionTypeIO {
    value: string;
    label: string;
  }

  const options: OptionTypeIO[] = [
    { value: 'semua', label: 'Semua' },
    { value: 'pending', label: 'Belum Dikonfirmasi' },
    { value: 'approve', label: 'Dikonfirmasi' },
    { value: 'reject', label: 'Ditolak' },
  ];

  const handleChange = (value: string) => {
    setFilterType(value);

    if (value === 'semua') {
      setFilteredDatas(datas);
    } else {
      const filtered = datas?.filter(
        (item: any) => item.payment_status === value
      );
      setFilteredDatas(filtered);
    }
  };

  if (!datas) {
    return (
      <Spin
        size='large'
        className='w-full h-full flex items-center justify-center'
      />
    );
  }

  return (
    <div>
      <div className='w-full grid gap-y-[20px]'>
        <div className='w-full grid gap-y-[20px] grid-cols-1'>
          <a
            href='/home'
            className='w-fit hover:text-teks flex font-bold text-xl gap-3'
          >
            <div>
              <ArrowLeftOutlined />
            </div>
            <div>Kembali</div>
          </a>
        </div>
        <div className='grid gap-y-5'>
          <div className='produkOwner text-white text-4xl font-bold bg-primary rounded-[10px] px-5 py-3 flex justify-center items-center mb-[10px]'>
            <p>Riwayat Transaksi</p>
          </div>
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
        <div className='grid gap-10 grid-cols-3'>
          {filteredDatas?.map((riwayat: any) => (
            <div key={riwayat.id}>
              <ListRiwayat
                idTransaction={riwayat.id}
                image={riwayat.product_photo}
                product_type={riwayat.product_type}
                product_label={riwayat.product_gender}
                product_name={riwayat.product_name}
                product_address={riwayat.product_address}
                total_price={riwayat.total_price}
                statusPembayaran={riwayat.statusPembayaran}
              />
            </div>
          ))}
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
    </div>
  );
}

export default RiwayatTransaksi;
