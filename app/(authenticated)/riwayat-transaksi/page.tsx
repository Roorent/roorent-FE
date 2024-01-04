'use client';

import ListRiwayat from '#/components/List-Riwayat';
import TypeRadio from '#/components/TypeButton';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Pagination, Select } from 'antd';
import React, { useState } from 'react';

const Riwayat = [
  {
    id: '1',
    imgProduct: '/assets/images/BuktiPembayaran.png',
    product_type: 'kost',
    product_label: 'pria',
    product_name: 'Kost Narra Marina Semarang Barat ',
    product_address: 'jln. km km jshdujs',
    total_price: '2.000.000',
    statusPembayaran: 'pending',
  },
  {
    id: '2',
    imgProduct: '/assets/images/BuktiPembayaran.png',
    product_type: 'kost',
    product_label: 'pria',
    product_name: 'Kost Narra Marina Semarang Barat ',
    product_address: 'jln. km km jshdujs hgasdgasgd vdjasvdjsav jsdjahgdjh',
    total_price: '2.000.000',
    statusPembayaran: 'approve',
  },
  {
    id: '3',
    imgProduct: '/assets/images/BuktiPembayaran.png',
    product_type: 'kost',
    product_label: 'pria',
    product_name: 'Kost Narra Marina Semarang Barat ',
    product_address: 'jln. km km jshdujs',
    total_price: '2.000.000',
    statusPembayaran: 'reject',
  },
];
function RiwayatTransaksi() {
  const [filterType, setFilterType] = useState('pending');

  const handleChange = (value: string) => {
    setFilterType(value);
  };
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
              defaultValue='semua'
              className='transaksi w-full'
              onChange={handleChange}
              options={[
                { value: 'semua', label: 'Semua' },
                { value: 'pending', label: 'Belum Dikonfirmasi' },
                { value: 'reject', label: 'Ditolak' },
                { value: 'approve', label: 'Dikonfirmasi' },
              ]}
            />
          </div>
        </div>
         <div className='grid gap-10 grid-cols-3'>
          {Riwayat.map((riwayat) => (
            <div key={riwayat.id}>
              <ListRiwayat
                imgProduct={riwayat.imgProduct}
                product_type={riwayat.product_type}
                product_label={riwayat.product_label}
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
