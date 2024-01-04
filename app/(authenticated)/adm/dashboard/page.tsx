'use client';

import React, { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Product from '#/components/Product';

const products = [
  {
    id: '1',
    image: '/assets/images/Gedung.png',
    isType: 'hotel',
    isgender: 'pria',
    rating: '4.5',
    namaProduk:
      'Kost Singgahsini MnV Co-Living Tipe B Bendungan Hilir Jakarta Pusat',
    kota: 'Bekasi',
    stok: '5',
    hargaPerbulan: 0,
    hargaPerhari: 2175000,
  },
  {
    id: '2',
    image: '/assets/images/Gedung.png',
    isType: 'kost',
    isgender: 'pria',
    rating: '4.5',
    namaProduk:
      'Kost Singgahsini MnV Co-Living Tipe B Bendungan Hilir Jakarta Pusat',
    kota: 'Bekasi',
    stok: '5',
    hargaPerbulan: 3175000,
    hargaPerhari: 2175000,
  },
  {
    id: '3',
    image: '/assets/images/Gedung.png',
    isType: 'hotel',
    isgender: 'pria',
    rating: '4.5',
    namaProduk:
      'Kost Singgahsini MnV Co-Living Tipe B Bendungan Hilir Jakarta Pusat',
    kota: 'Bekasi',
    stok: '5',
    hargaPerbulan: 0,
    hargaPerhari: 2175000,
  },
  {
    id: '4',
    image: '/assets/images/Gedung.png',
    isType: 'gedung',
    isgender: 'pria',
    rating: '4.5',
    namaProduk:
      'Kost Singgahsini MnV Co-Living Tipe B Bendungan Hilir Jakarta Pusat',
    kota: 'Bekasi',
    stok: '5',
    hargaPerbulan: 0,
    hargaPerhari: 2175000,
  },
  {
    id: '5',
    image: '/assets/images/Gedung.png',
    isType: 'hotel',
    isgender: 'pria',
    rating: '4.5',
    namaProduk:
      'Kost Singgahsini MnV Co-Living Tipe B Bendungan Hilir Jakarta Pusat',
    kota: 'Bekasi',
    stok: '5',
    hargaPerbulan: 0,
    hargaPerhari: 2175000,
  },
  {
    id: '6',
    image: '/assets/images/Gedung.png',
    isType: 'kost',
    isgender: 'pria',
    rating: '4.5',
    namaProduk:
      'Kost Singgahsini MnV Co-Living Tipe B Bendungan Hilir Jakarta Pusat',
    kota: 'Bekasi',
    stok: '5',
    hargaPerbulan: 3175000,
    hargaPerhari: 2175000,
  },
  {
    id: '7',
    image: '/assets/images/Gedung.png',
    isType: 'kost',
    isgender: 'wanita',
    rating: '4.5',
    namaProduk:
      'Kost Singgahsini MnV Co-Living Tipe B Bendungan Hilir Jakarta Pusat',
    kota: 'Bekasi',
    stok: '5',
    hargaPerbulan: 3175000,
    hargaPerhari: 2175000,
  },
  {
    id: '8',
    image: '/assets/images/Gedung.png',
    isType: 'kost',
    isgender: 'wanita',
    rating: '4.5',
    namaProduk:
      'Kost Singgahsini MnV Co-Living Tipe B Bendungan Hilir Jakarta Pusat',
    kota: 'Bekasi',
    stok: '5',
    hargaPerbulan: 3175000,
    hargaPerhari: 2175000,
  },
  {
    id: '9',
    image: '/assets/images/Gedung.png',
    isType: 'kost',
    isgender: 'campur',
    rating: '4.5',
    namaProduk:
      'Kost Singgahsini MnV Co-Living Tipe B Bendungan Hilir Jakarta Pusat',
    kota: 'Bekasi',
    stok: '5',
    hargaPerbulan: 3175000,
    hargaPerhari: 2175000,
  },
];

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  const chunkedProducts = [];
  for (let i = 0; i < products.length; i += 4) {
    chunkedProducts.push(products.slice(i, i + 4));
  }

  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className='mySwiper'>
        {chunkedProducts.map((chunk, index) => (
          <SwiperSlide key={index}>
            <div className='flex justify-start gap-x-10 px-[74px]'>
              {chunk.map((product) => (
                <Product
                  key={product.id}
                  idProducts={product.id}
                  image={product.image}
                  isType={product.isType}
                  isgender={product.isgender}
                  rating={product.rating}
                  namaProduk={product.namaProduk}
                  kota={product.kota}
                  stok={product.stok}
                  hargaPerbulan={product.hargaPerbulan}
                  hargaPerhari={product.hargaPerhari}
                />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Dashboard;
