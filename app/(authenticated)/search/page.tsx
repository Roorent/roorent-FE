'use client';

import Button from '#/components/Button';
import ListSearch from '#/components/List-Search';
import Searchs from '#/components/Search';
import { cityRepository } from '#/repository/city';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Input, InputNumber, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import React from 'react';

const searchs = [
  {
    id: '1',
    image: '/assets/images/Kost.png',
    type: 'kost',
    namaProduk: 'Kost Mawar Roseca Tipe A Kebon Jeruk Jakarta Barat',
    gender: 'campur',
    alamat:
      'jl.Kebon Jeruk no.09 jsfdjADGQ GWD JGDUQGWUDGUQWGD DHIWEGHDUWEY WIUDIEWGUY',
    stok: '3',
    totalRating: '2',
    kota: 'Kota Bekasi',
    hargaPerbulan: 'Rp.20000000',
    hargaPerhari: 'Rp.20000000',
  },
  {
    id: '2',
    image: '/assets/images/Kost.png',
    type: 'kost',
    namaProduk: 'Kost Mawar Roseca Tipe A Kebon Jeruk Jakarta Barat',
    gender: 'campur',
    alamat:
      'jl.Kebon Jeruk no.09 jsfdjADGQ GWD JGDUQGWUDGUQWGD DHIWEGHDUWEY WIUDIEWGUY',
    stok: '3',
    totalRating: '2',
    kota: 'Kota Bekasi',
    hargaPerbulan: 'Rp.20000000',
    hargaPerhari: 'Rp.20000000',
  },
  {
    id: '3',
    image: '/assets/images/Kost.png',
    type: 'kost',
    namaProduk: 'Kost Mawar Roseca Tipe A Kebon Jeruk Jakarta Barat',
    gender: 'campur',
    alamat:
      'jl.Kebon Jeruk no.09 jsfdjADGQ GWD JGDUQGWUDGUQWGD DHIWEGHDUWEY WIUDIEWGUY',
    stok: '3',
    totalRating: '2',
    kota: 'Kota Bekasi',
    hargaPerbulan: 'Rp.20000000',
    hargaPerhari: 'Rp.20000000',
  },
];
function Search() {
  const token = localStorage.getItem('access_token');
  const { data: dataCity } = cityRepository.hooks.allCity();

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
          <Searchs placeholder={'Masukan nama/kota/alamat'} />
        </div>
      </div>
      <div className='w-full flex gap-x-5 items-end'>
        <div className='w-full grid gap-y-4 grid-cols-1'>
          <div>
            <p className='text-teks text-xl font-bold'>Tipe Kost</p>
          </div>
          <div className='w-full regis'>
            <Select placeholder='Tipe' className='w-full regis'>
              <Option value='campur'>Campur</Option>
              <Option value='pria'>Pria</Option>
              <Option value='wanita'>Wanita</Option>
            </Select>
          </div>
        </div>
        <div className='w-full grid gap-y-4 grid-cols-1'>
          <div>
            <p className='text-teks text-xl font-bold'>Kota</p>
          </div>
          <div className='w-full regis'>
            <Select
              placeholder='Kota'
              className='w-full regis'
              showSearch
              options={dataCity?.data.map((val: any) => {
                return {
                  value: val.name,
                  label: val.name,
                };
              })}
            />
          </div>
        </div>
        <div className='w-full grid gap-y-4 grid-cols-1'>
          <div className='grid gap-y-2'>
            <p className='text-teks text-xl font-bold'>Maksimal Harga</p>
          </div>
          <div className='w-full'>
            <Input
              size='large'
              placeholder='Maksimal harga'
              className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl'
            />
          </div>
        </div>
        <div className='w-2/5'>
          <Button
            type='primary'
            htmlType='submit'
            // onClick={onFinish}
            block
            className='bg-primary border border-white !rounded-[10px] text-2xl font-bold py-3 h-max'
          >
            Cari
          </Button>
        </div>
      </div>
      <div className='flex gap-3 grid-cols-3'>
        {/* <div
          className='mt-5 rounded-[10px]'
          style={{ boxShadow: '0 1px 8px rgba(36,36,36,.14)' }}
        > */}
        {searchs.map((search) => (
          <div key={search.id}>
            <ListSearch
              image={search.image}
              type={search.type}
              namaProduk={search.namaProduk}
              gender={search.gender}
              alamat={search.alamat}
              stok={search.stok}
              totalRating={search.totalRating}
              kota={search.kota}
              hargaPerbulan={search.hargaPerbulan}
              hargaPerhari={search.hargaPerhari}
            />
          </div>
        ))}
        {/* </div> */}
      </div>
    </div>
  );
}

export default Search;
