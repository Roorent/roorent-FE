'use client';

import Button from '#/components/Button';
import Searchs from '#/components/Search';
import { Select } from 'antd';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import Product from '#/components/Product';
import Footer from '#/components/Footer';
import { productsRepository } from '#/repository/products';
import TypeRadio from '#/components/TypeButton';

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
    hargaPerbulan: '',
    hargaPerhari: '2.175.000',
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
    hargaPerbulan: '3.175.000',
    hargaPerhari: '2.175.000',
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
    hargaPerbulan: '',
    hargaPerhari: '2.175.000',
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
    hargaPerbulan: '',
    hargaPerhari: '2.175.000',
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
    hargaPerbulan: '',
    hargaPerhari: '2.175.000',
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
    hargaPerbulan: '3.175.000',
    hargaPerhari: '2.175.000',
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
    hargaPerbulan: '3.175.000',
    hargaPerhari: '2.175.000',
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
    hargaPerbulan: '3.175.000',
    hargaPerhari: '2.175.000',
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
    hargaPerbulan: '3.175.000',
    hargaPerhari: '2.175.000',
  },
];

function Home() {
  const [typeFilter, setTypeFilter] = useState('kost');
  const [cityFilter, setCityFilter] = useState('Pilih Kota');

  const { data, error, isLoading } = productsRepository.hooks.getAllKos();

  if (!data) {
    return <div>Loading...</div>;
  }

  const datas = data?.data;

  const filterProducts = (products: any, filter: any) => {
    return products.filter((product: any) => product.type === filter);
  };
  const filterProductsCity = (products: any, type: any, city: any) => {
    let filtered = products.filter((product: any) => product.type === type);
    if (city && city !== 'Pilih Kota') {
      filtered = filtered.filter(
        (product: any) => product.cities?.name === city
      );
    }
    return filtered;
  };

  const handleChangeCity = (value: any) => {
    setCityFilter(value); // Update nilai kota saat terjadi perubahan pada Select
  };

  const filteredProducts = typeFilter
    ? filterProducts(datas, typeFilter)
    : datas;

  const handleChange = (e: any) => {
    setTypeFilter(e);
  };

  interface OptionType {
    value: string;
    label: string;
  }

  const items: OptionType[] = [
    {
      value: 'Kota Bekasi',
      label: 'Kota Bekasi',
    },
    {
      value: 'Kota Jakarta Pusat',
      label: 'Kota Jakarta Pusat',
    },
    {
      value: 'Kota Tegal',
      label: 'Kota Tegal',
    },
  ];
  return (
    <div>
      <div className='-z-9999 px-[190px]'>
        <div className='flex'>
          <div className='w-1/2 flex items-center'>
            <div>
              <div className='text-6xl font-semibold mb-5'>Mau cari apa?</div>
              <div className='text-4xl mb-20'>
                Dapatkan informasi dan lakukan penyewaan
              </div>
              <div>
                <Searchs
                  placeholder={'Masukan nama lokasi/kota/alamat/produk'}
                />
              </div>
            </div>
          </div>
          <div className='w-1/2'>
            <img
              src='/assets/images/Home.svg'
              alt='Roorent'
              className='w-11/12'
            />
          </div>
        </div>
        <div className='flex justify-center mt-[54px]'>
          <TypeRadio
            value={typeFilter}
            onChange={handleChange}
            defaultValue='kost'
          />
        </div>
        {typeFilter === 'kost' && (
          <div className='flex items-center py-10 mt-[25px]'>
            <div className='w-full text-4xl font-bold'>Kost Populer</div>
            <div className='flex'>
              <Button
                type='primary'
                htmlType='submit'
                href='#'
                className='w-max hover:!text-white hover:!bg-primary !bg-white !text-primary border-2 border-primary rounded-[10px] text-[20px] font-bold !mt-0 px-7 shadow-md shadow-primary hover:!shadow-lg'
              >
                Lihat Semua
              </Button>
            </div>
          </div>
        )}
        {typeFilter === 'gedung' && (
          <div className='flex items-center py-10 mt-[25px]'>
            <div className='w-full text-4xl font-bold'>Gedung Populer</div>
            <div className='flex'>
              <Button
                type='primary'
                htmlType='submit'
                href='#'
                className='w-max hover:!text-white hover:!bg-primary !bg-white !text-primary border-2 border-primary rounded-[10px] text-[20px] font-bold !mt-0 px-7 shadow-md shadow-primary hover:!shadow-lg'
              >
                Lihat Semua
              </Button>
            </div>
          </div>
        )}
        {typeFilter === 'hotel' && (
          <div className='flex items-center py-10 mt-[25px]'>
            <div className='w-full text-4xl font-bold'>Hotel Populer</div>
            <div className='flex'>
              <Button
                type='primary'
                htmlType='submit'
                href='#'
                className='w-max hover:!text-white hover:!bg-primary !bg-white !text-primary border-2 border-primary rounded-[10px] text-[20px] font-bold !mt-0 px-7 shadow-md shadow-primary hover:!shadow-lg'
              >
                Lihat Semua
              </Button>
            </div>
          </div>
        )}
        <div className='mt-[45px]'>
          <Swiper
            navigation={true}
            slidesPerView={4}
            modules={[Navigation]}
            className='mySwiper'
          >
            {filteredProducts.map((product: any) => (
              <SwiperSlide>
                {/* <div className='flex justify-center'> */}
                <div className='flex justify-start px-[135px] gap-x-8 grid-cols-4'>
                  <div key={product.id}>
                    <Product
                      idProducts={product.id}
                      image={product.photoProducts[0]?.photo}
                      isType={product.type}
                      isgender={product.specialRules?.gender}
                      rating={product.rating}
                      namaProduk={product.name}
                      kota={product.cities?.name}
                      stok={product.stock}
                      hargaPerbulan={product.monthly_price}
                      hargaPerhari={product.daily_price}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {typeFilter === 'kost' && (
          <div className='flex items-center py-10 mt-[25px]'>
            <div className='flex w-full items-center'>
              <div className='text-4xl font-bold'>Rekomendasi Kost di</div>
              <div className='font-bold home-produk items-center'>
                <Select
                  placeholder='Pilih Kota'
                  style={{ width: 'max-content', alignItems: 'center' }}
                  bordered={false}
                  options={items}
                  value={cityFilter}
                  onChange={handleChangeCity}
                />
              </div>
            </div>
            <div className='flex'>
              <Button
                type='primary'
                htmlType='submit'
                href='#'
                className='w-max hover:!text-white hover:!bg-primary !bg-white !text-primary border-2 border-primary rounded-[10px] text-[20px] font-bold !mt-0 px-7 shadow-md shadow-primary hover:!shadow-lg'
              >
                Lihat Semua
              </Button>
            </div>
          </div>
        )}
        {typeFilter === 'gedung' && (
          <div className='flex items-center py-10 mt-[25px]'>
            <div className='flex w-full items-center'>
              <div className='text-4xl font-bold'>Rekomendasi Gedung di</div>
              <div className='font-bold home-produk items-center'>
                <Select
                  placeholder='Pilih Kota'
                  style={{ width: 'max-content', alignItems: 'center' }}
                  bordered={false}
                  options={items}
                  value={cityFilter}
                  onChange={handleChangeCity}
                />
              </div>
            </div>
            <div className='flex'>
              <Button
                type='primary'
                htmlType='submit'
                href='#'
                className='w-max hover:!text-white hover:!bg-primary !bg-white !text-primary border-2 border-primary rounded-[10px] text-[20px] font-bold !mt-0 px-7 shadow-md shadow-primary hover:!shadow-lg'
              >
                Lihat Semua
              </Button>
            </div>
          </div>
        )}
        {typeFilter === 'hotel' && (
          <div className='flex items-center py-10 mt-[25px]'>
            <div className='flex w-full items-center'>
              <div className='text-4xl font-bold'>Rekomendasi Hotel di</div>
              <div className='font-bold home-produk items-center'>
                <Select
                  style={{ width: 'max-content', alignItems: 'center' }}
                  bordered={false}
                  options={items}
                  placeholder='Pilih Kota'
                  value={cityFilter}
                  onChange={handleChangeCity}
                />
              </div>
            </div>
            <div className='flex'>
              <Button
                type='primary'
                htmlType='submit'
                href='#'
                className='w-max hover:!text-white hover:!bg-primary !bg-white !text-primary border-2 border-primary rounded-[10px] text-[20px] font-bold !mt-0 px-7 shadow-md shadow-primary hover:!shadow-lg'
              >
                Lihat Semua
              </Button>
            </div>
          </div>
        )}
        <div className='mt-[45px]'>
          <Swiper
            navigation={true}
            slidesPerView={4}
            modules={[Navigation]}
            className='mySwiper'
          >
            {filterProductsCity(filteredProducts, typeFilter, cityFilter).map(
              (product: any) => (
                <SwiperSlide>
                  <div className='flex justify-center'>
                    <div key={product.id}>
                      <Product
                        idProducts={product.id}
                        image={product.photoProducts[0]?.photo}
                        isType={product.type}
                        isgender={product.specialRules?.gender}
                        rating={product.rating}
                        namaProduk={product.name}
                        kota={product.cities?.name}
                        stok={product.stock}
                        hargaPerbulan={product.monthly_price}
                        hargaPerhari={product.daily_price}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Home;
