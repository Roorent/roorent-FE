'use client';

import Button from '#/components/Button';
import Searchs from '#/components/Search';
import { HomeFilled } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { Empty, Radio, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import Product from '#/components/Product';
import { productsRepository } from '#/repository/products';
import { cityRepository } from '#/repository/city';
import { parseJwt } from '#/utils/convert';
import { useRouter } from 'next/navigation';

function Home() {
  const router = useRouter();

  const token = localStorage.getItem('access_token');
  let role: string = '';
  if (token) {
    role = parseJwt(token).role;
  }
  if (role === 'renter') {
    router.push('/home');
  }
  if (role === 'owner') {
    router.push('/list-product');
  }
  if (role === 'admin') {
    router.push('/adm/dashboard');
  }

  const [typeFilter, setTypeFilter] = useState('kost');
  const [cityFilter, setCityFilter] = useState('Pilih Kota');
  useEffect(() => {
    document.title = 'Home - Roorent';
  }, []);
  const { data, error, isLoading } =
    productsRepository.hooks.getAllProduct(typeFilter);
  const { data: dataCity } = cityRepository.hooks.allCity();

  if (!data) {
    return (
      <Spin
        size='large'
        className='w-full h-full flex items-center justify-center'
      />
    );
  }
  const datas = data?.data;

  const productsInSetsOfFour = [];
  for (let i = 0; i < datas?.length; i += 4) {
    productsInSetsOfFour.push(datas?.slice(i, i + 4));
  }

  const handleChange = (e: any) => {
    setTypeFilter(e.target.value);
  };

  const filterProductsCity = (products: any, type: any, city: any) => {
    let filtered = products.filter((product: any) => product.type === type);
    if (city && city !== 'Pilih Kota') {
      filtered = filtered.filter((product: any) => product.city === city);
    }
    return filtered;
  };

  const handleChangeCity = (value: any) => {
    setCityFilter(value); // Update nilai kota saat terjadi perubahan pada Select
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

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
                <a href='/search'>
                  <Searchs placeholder={'Masukan nama/kota/alamat'} />
                </a>
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
          <Radio.Group
            defaultValue='kost'
            buttonStyle='solid'
            value={typeFilter}
            onChange={handleChange}
            className='flex gap-x-28'
          >
            <div>
              <Radio.Button
                value='kost'
                className='w-[166px] py-[20px] h-max font-bold flex justify-center text-2xl text-primary'
              >
                <div className='w-full flex items-center'>
                  <HomeFilled className='mr-2' />
                  Kost
                </div>
              </Radio.Button>
            </div>
            <div className='flex'>
              <Radio.Button
                value='gedung'
                className='w-[166px] py-[20px] h-max font-bold flex justify-center text-2xl text-primary'
              >
                <div className='w-full flex items-center'>
                  <Icon icon='mingcute:building-1-fill' className='mr-2' />{' '}
                  Gedung
                </div>
              </Radio.Button>
            </div>
            <div>
              <Radio.Button
                value='hotel'
                className='w-[166px] py-[20px] h-max font-bold flex justify-center text-2xl text-primary'
              >
                <div className='w-full flex items-center'>
                  <Icon icon='fa6-solid:hotel' className='mr-2' />
                  Hotel
                </div>
              </Radio.Button>
            </div>
          </Radio.Group>
        </div>
        {typeFilter === 'kost' && (
          <div className='flex items-center py-10 mt-[25px] mb-20'>
            <div className='w-full text-4xl font-bold'>Kost Populer</div>
            <div
              className='flex bg-white rounded-[10px]'
              style={{ boxShadow: '0 1px 8px rgba(36, 36, 36, 0.14)' }}
            >
              <Button
                type='primary'
                htmlType='submit'
                href={`/search?type=${typeFilter}`}
                className='w-max hover:!text-white hover:!bg-primary !bg-white !text-primary border-2 border-white hover:!border-primary rounded-[10px] text-[20px] !font-bold !mt-0 px-7'
              >
                Lihat Semua
              </Button>
            </div>
          </div>
        )}
        {typeFilter === 'gedung' && (
          <div className='flex items-center py-10 mt-[25px] mb-20'>
            <div className='w-full text-4xl font-bold'>Gedung Populer</div>
            <div
              className='flex bg-white rounded-[10px]'
              style={{ boxShadow: '0 1px 8px rgba(36, 36, 36, 0.14)' }}
            >
              <Button
                type='primary'
                htmlType='submit'
                href={`/search?type=${typeFilter}`}
                className='w-max hover:!text-white hover:!bg-primary !bg-white !text-primary border-2 border-white hover:!border-primary rounded-[10px] text-[20px] !font-bold !mt-0 px-7'
              >
                Lihat Semua
              </Button>
            </div>
          </div>
        )}
        {typeFilter === 'hotel' && (
          <div className='flex items-center py-10 mt-[25px] mb-20'>
            <div className='w-full text-4xl font-bold'>Hotel Populer</div>
            <div
              className='flex bg-white rounded-[10px]'
              style={{ boxShadow: '0 1px 8px rgba(36, 36, 36, 0.14)' }}
            >
              <Button
                type='primary'
                htmlType='submit'
                href={`/search?type=${typeFilter}`}
                className='w-max hover:!text-white hover:!bg-primary !bg-white !text-primary border-2 border-white hover:!border-primary rounded-[10px] text-[20px] font-bold !mt-0 px-7'
              >
                Lihat Semua
              </Button>
            </div>
          </div>
        )}
        <div>
          <Swiper navigation={true} modules={[Navigation]} className='mySwiper'>
            {productsInSetsOfFour.map((productSet, index) => (
              <SwiperSlide key={index}>
                <div className='flex justify-stretch gap-x-10 px-32'>
                  {productSet.map((product: any) => (
                    <Product
                      idProducts={product.id}
                      image={product.photoProducts[0]?.photo}
                      isType={product.type}
                      isgender={product.gender}
                      namaProduk={product.name}
                      kota={product.city}
                      stok={product.stock}
                      hargaPerbulan={product.monthly_price}
                      hargaPerhari={product.daily_price}
                    />
                  ))}
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
                  showSearch
                  placeholder='Pilih Kota'
                  style={{ width: 'max-content', alignItems: 'center' }}
                  bordered={false}
                  filterOption={filterOption}
                  value={cityFilter}
                  options={dataCity?.data.map((val: any) => {
                    return {
                      value: val.name,
                      label: val.name,
                    };
                  })}
                  onChange={handleChangeCity}
                />
              </div>
            </div>
            <div className='flex items-center py-10 mt-[25px]'>
              <div
                className='flex bg-white rounded-[10px]'
                style={{ boxShadow: '0 1px 8px rgba(36, 36, 36, 0.14)' }}
              >
                <Button
                  type='primary'
                  htmlType='submit'
                  href={`/search?type=${typeFilter}`}
                  className='w-max hover:!text-white hover:!bg-primary !bg-white !text-primary border-2 border-white hover:!border-primary rounded-[10px] text-[20px] font-bold !mt-0 px-7'
                >
                  Lihat Semua
                </Button>
              </div>
            </div>
          </div>
        )}
        {typeFilter === 'gedung' && (
          <div className='flex items-center py-10 mt-[50px]'>
            <div className='flex w-full items-center'>
              <div className='text-4xl font-bold'>Rekomendasi Gedung di</div>
              <div className='font-bold home-produk items-center'>
                <Select
                  showSearch
                  placeholder='Pilih Kota'
                  style={{ width: 'max-content', alignItems: 'center' }}
                  bordered={false}
                  filterOption={filterOption}
                  value={cityFilter}
                  options={dataCity?.data.map((val: any) => {
                    return {
                      value: val.name,
                      label: val.name,
                    };
                  })}
                  onChange={handleChangeCity}
                />
              </div>
            </div>
            <div className='flex items-center py-10 mt-[25px]'>
              <div
                className='flex bg-white rounded-[10px]'
                style={{ boxShadow: '0 1px 8px rgba(36, 36, 36, 0.14)' }}
              >
                <Button
                  type='primary'
                  htmlType='submit'
                  href={`/search?type=${typeFilter}`}
                  className='w-max hover:!text-white hover:!bg-primary !bg-white !text-primary border-2 border-white hover:!border-primary rounded-[10px] text-[20px] font-bold !mt-0 px-7'
                >
                  Lihat Semua
                </Button>
              </div>
            </div>
          </div>
        )}
        {typeFilter === 'hotel' && (
          <div className='flex items-center py-10 mt-[25px]'>
            <div className='flex w-full items-center'>
              <div className='text-4xl font-bold'>Rekomendasi Hotel di</div>
              <div className='font-bold home-produk items-center'>
                <Select
                  showSearch
                  placeholder='Pilih Kota'
                  style={{ width: 'max-content', alignItems: 'center' }}
                  bordered={false}
                  filterOption={filterOption}
                  value={cityFilter}
                  options={dataCity?.data.map((val: any) => {
                    return {
                      value: val.name,
                      label: val.name,
                    };
                  })}
                  onChange={handleChangeCity}
                />
              </div>
            </div>
            <div className='flex items-center py-10 mt-[25px]'>
              <div
                className='flex bg-white rounded-[10px]'
                style={{ boxShadow: '0 1px 8px rgba(36, 36, 36, 0.14)' }}
              >
                <Button
                  type='primary'
                  htmlType='submit'
                  href={`/search?type=${typeFilter}`}
                  className='w-max hover:!text-white hover:!bg-primary !bg-white !text-primary border-2 border-white hover:!border-primary rounded-[10px] text-[20px] font-bold !mt-0 px-7'
                >
                  Lihat Semua
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className='mt-[45px]'>
          {filterProductsCity(datas, typeFilter, cityFilter).length > 0 ? (
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className='mySwiper'
            >
              {filterProductsCity(datas, typeFilter, cityFilter).map(
                (product: any, index: number) =>
                  index % 4 === 0 && (
                    <SwiperSlide key={index}>
                      <div className='flex justify-stretch gap-x-10 px-32'>
                        {filterProductsCity(datas, typeFilter, cityFilter)
                          .slice(index, index + 4)
                          .map((product: any) => (
                            <div key={product.id}>
                              <Product
                                idProducts={product.id}
                                image={product.photoProducts[0]?.photo}
                                isType={product.type}
                                isgender={product.gender}
                                namaProduk={product.name}
                                kota={product.city}
                                stok={product.stock}
                                hargaPerbulan={product.monthly_price}
                                hargaPerhari={product.daily_price}
                              />
                            </div>
                          ))}
                      </div>
                    </SwiperSlide>
                  )
              )}
            </Swiper>
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
                  {typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)} di{' '}
                  {cityFilter.toLowerCase()} tidak tersedia
                </span>
              }
            ></Empty>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
