'use client';
import Button from '#/components/Button';
import ListPayment from '#/components/List-Payment';
import { Pagination } from 'antd';
import React from 'react';

const Payments = [
  {
    id: '1',
    tanggal: '30 Desember 2023',
    waktu: '18:14',
    buktiPembayaran: '/assets/images/BuktiPembayaran.png',
    renter: 'M Danar Kahfi',
    namaProduk:
      'Kost Singgahsini MnV Co-Living Tipe B Bendungan Hilir Jakarta Pusat',
    biayaSewa: '200000000',
    biayaAdmin: '20000',
    totalPembayaran: '200020000',
  },
  {
    id: '2',
    tanggal: '30 Desember 2023',
    waktu: '18:14',
    buktiPembayaran: '/assets/images/BuktiPembayaran.png',
    renter: 'Nazhwa Nur Syabrina',
    namaProduk: 'Kost Sunter Jaya Gabus Tipe A Tanjung Priok Jakarta Utara ',
    biayaSewa: '200000000',
    biayaAdmin: '20000',
    totalPembayaran: '200020000',
  },
];

function RenterPayment() {
  return (
    <div>
      <div className='w-full grid gap-y-[20px] grid-cols-1'>
        <div className='produkOwner text-white text-4xl font-bold bg-primary rounded-[10px] px-5 py-3 flex justify-center items-center'>
          <p>Pembayaran Renter</p>
        </div>
        <div className='grid gap-10 grid-cols-2'>
          {Payments.map((paymnet) => (
            <div key={paymnet.id}>
              <ListPayment
                tanggal={paymnet.tanggal}
                waktu={paymnet.waktu}
                buktiPembayaran={paymnet.buktiPembayaran}
                renter={paymnet.renter}
                namaProduk={paymnet.namaProduk}
                biayaSewa={paymnet.biayaSewa}
                biayaAdmin={paymnet.biayaAdmin}
                totalPembayaran={paymnet.totalPembayaran}
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
