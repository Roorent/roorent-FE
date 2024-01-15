'use client';

import Button from '#/components/Button';
import ListSearch from '#/components/List-Search';
import Searchs from '#/components/Search';
import { PAYMENT_TYPE, PROD_TYPE, RANGE_PRICE } from '#/constants/general';
import { cityRepository } from '#/repository/city';
import { productsRepository } from '#/repository/products';
import { ReviewsRepository } from '#/repository/reviews';
import { toIDR } from '#/utils/convertCurrency';
import { ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';
import { Empty, Input, InputNumber, Pagination, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Search() {
  const token = localStorage.getItem('access_token');
  const { data: dataCity } = cityRepository.hooks.allCity();

  // /search?type=kost
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = `${pathname}?${searchParams}`;
  const params = new URLSearchParams(url);

  const router = useRouter();
  const paramType = useSearchParams();

  const { Search } = Input;

  const urlSearch: any = paramType?.get('q');
  const urlType: any = paramType?.get('type');
  const urlCity: any = paramType?.get('city');
  const urlPayment: any = paramType?.get('payment');
  const urlMin: any = paramType?.get('min');
  const urlMax: any = paramType?.get('max');

  const [searcher, setSearcher] = useState('');
  const [filterType, setFilterType] = useState(urlType);
  const [filterCity, setFilterCity] = useState('');
  const [filterPayment, setFilterPayment] = useState('');
  const [filterPrice, setFilterPrice] = useState<any>({ min: 1, max: 1000000 });
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 9;

  const { data: dataProduct } = productsRepository.hooks.searchProducts({
    search: searcher,
    type: filterType,
    city: filterCity,
    payment: filterPayment,
    min: filterPrice?.min,
    max: filterPrice?.max,
    page: currentPage,
    limit,
  });

  const datasProduct = dataProduct?.data;

  const handleSearch = (value: string) => {
    setSearcher(value);
    if (urlSearch) {
      setFilterType('');
    }
    router.push(`/search?q=${value}`);
  };

  const handleType = (value: string) => {
    const selectedProduct = PROD_TYPE.find((option) => option.name === value);
    setFilterType(selectedProduct?.name);
    setCurrentPage(1);
    if (urlType) {
      setSearcher('');
      router.push(`/search?type=${selectedProduct?.name}`);
    } else {
      router.push(`/search?type=${selectedProduct?.name}`);
    }
  };

  const handleCity = (value: string) => {
    setFilterCity(value);
    if (urlCity) {
      params.delete('city');
      params.append('city', value);
      const updatedURL = decodeURIComponent(params.toString());
      router.push(updatedURL);
    } else {
      router.push(url + `&city=${value}`);
    }
  };

  const handlePayment = (value: string) => {
    setFilterPayment(value);
    if (urlPayment) {
      params.delete('payment');
      params.append('payment', value);
      const updatedURL = decodeURIComponent(params.toString());
      router.push(updatedURL);
    } else {
      router.push(url + `&payment=${value}`);
    }
  };

  const handleRangePrice = (value: string) => {
    const selectedPrice = RANGE_PRICE.find((option) => option.name === value);
    setFilterPrice({ min: selectedPrice?.min, max: selectedPrice?.max });

    if (urlMin && urlMax) {
      params.delete('min');
      params.delete('max');
      const updatedURL = decodeURIComponent(params.toString());
      router.push(
        updatedURL + `&min=${selectedPrice?.min}&max=${selectedPrice?.max}`
      );
    } else {
      router.push(url + `&min=${selectedPrice?.min}&max=${selectedPrice?.max}`);
    }
  };

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const urlSearch: any = paramType?.get('q');
    const urlType: any = paramType?.get('type');
    const urlCity: any = paramType?.get('city');
    const urlPayment: any = paramType?.get('payment');
    const urlMin: any = paramType?.get('min');
    const urlMax: any = paramType?.get('max');

    setSearcher(urlSearch);
    setFilterType(urlType);
    setFilterCity(urlCity);
    setFilterPayment(urlPayment);
    setFilterPrice({ min: urlMin, max: urlMax });
  }, [paramType]);

  return (
    <div className='grid gap-y-8'>
      {/* <div className='flex text-2xl gap-x-2 border-l-4 pl-5 my-3 border-primary'>
        <div className='font-semibold'>Pencarian kost :</div>
        <div>Kost Mawar</div>
      </div> */}
      <div className='w-full flex gap-x-8 items-center'>
        {!token ? (
          <div>
            <a
              href='/'
              className='w-fit hover:text-teks flex font-bold text-3xl gap-3'
            >
              <div>
                <ArrowLeftOutlined />
              </div>
            </a>
          </div>
        ) : (
          <div>
            <a
              href='/home'
              className='w-fit hover:text-teks flex font-bold text-3xl gap-3'
            >
              <div>
                <ArrowLeftOutlined />
              </div>
            </a>
          </div>
        )}
        <div className='w-full'>
          <div className='search'>
            <Search
              className='search font-semibold'
              placeholder={'Masukan nama/kota/alamat'}
              prefix={<SearchOutlined className='text-3xl' />}
              allowClear
              enterButton='Cari'
              size='large'
              onSearch={handleSearch}
            />
          </div>
          {/* <Searchs
            onChange={handleSearch}
            placeholder={'Masukan nama/kota/alamat'}
          /> */}
        </div>
      </div>
      <div className='w-full flex gap-x-5 items-end'>
        <div className='w-full grid gap-y-4 grid-cols-1'>
          <div>
            <p className='text-teks text-xl font-bold'>Tipe</p>
          </div>
          <div className='w-full regis'>
            <Select
              value={filterType}
              onChange={handleType}
              placeholder='Tipe'
              className='w-full regis'
            >
              {PROD_TYPE.map((type: any, index: any) => (
                <Option key={index} value={type.name}>
                  {type.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className='w-full grid gap-y-4 grid-cols-1'>
          <div>
            <p className='text-teks text-xl font-bold'>Kota</p>
          </div>
          <div className='w-full regis'>
            <Select
              showSearch
              placeholder='Kota'
              className='w-full regis'
              onChange={handleCity}
              value={filterCity}
              options={dataCity?.data.map((val: any) => {
                return {
                  value: val.name,
                  label: val.name,
                };
              })}
            />
          </div>
        </div>
        <div className='w-full grid gap-y-4 grid-cols-2'>
          <div className='w-[calc(100%-100px)]'>
            <div className='grid gap-y-2'>
              <p className='text-teks text-xl font-bold'>Tipe Bayar</p>
            </div>
            <div className='w-full regis'>
              <Select
                value={filterPayment}
                onChange={handlePayment}
                placeholder='Tipe Bayar'
                className='w-full regis'
              >
                {PAYMENT_TYPE.map((val: any, i: any) => (
                  <Option value={val.name} key={i}>
                    {val.value}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className='w-[calc(100%+80px)] -ml-[80px]'>
            <div className='grid gap-y-2'>
              <p className='text-teks text-xl font-bold'>Harga</p>
            </div>
            <div className='w-full regis'>
              <Select
                // value={`${toIDR(filterRangePrice?.min)} - ${toIDR(
                //   filterRangePrice?.max
                // )}`}
                onChange={handleRangePrice}
                placeholder='Rentang harga'
                className='w-full regis'
              >
                {filterPayment &&
                  RANGE_PRICE.map((val: any, i: any) => (
                    <Option value={val.name} key={i}>
                      {`${toIDR(val.min)} - ${toIDR(val.max)}`}
                    </Option>
                  ))}
              </Select>
            </div>
          </div>
        </div>
        {/* <div className='w-2/5'>
          <Button
            type='primary'
            htmlType='submit'
            // onClick={onFinish}
            block
            className='bg-primary border border-white !rounded-[10px] text-2xl font-bold py-3 h-max'
          >
            Cari
          </Button>
        </div> */}
      </div>
      {datasProduct?.length > 0 ? (
        <div className='grid gap-3 grid-cols-3 pb-10'>
          {/* <div
          className='mt-5 rounded-[10px]'
          style={{ boxShadow: '0 1px 8px rgba(36,36,36,.14)' }}
        > */}
          {datasProduct?.map((product: any) => (
            <div key={product?.id}>
              <ListSearch
              idProducts={product?.id}
                image={product?.photoProducts[0]?.photo}
                type={product?.type}
                namaProduk={product?.name}
                gender={product?.gender}
                alamat={product?.address}
                stok={product?.stock}
                // totalRating={product?.totalRating}
                kota={product?.city}
                hargaPerbulan={product?.monthly_price}
                hargaPerhari={product?.daily_price}
              />
            </div>
          ))}
          {/* </div> */}
        </div>
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
              Produk yang anda cari tidak ditemukan
            </span>
          }
        />
      )}
      <div className='w-full py-[20px] flex justify-end'>
        <Pagination
          current={currentPage}
          total={dataProduct?.count}
          pageSize={limit}
          onChange={handlePageChange}
          className='text-2xl font-semibold'
        />
      </div>
    </div>
  );
}

export default Search;
