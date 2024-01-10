'use client';

import ListSearch from '#/components/List-Search';
import Searchs from '#/components/Search';
import { ArrowLeftOutlined } from '@ant-design/icons';
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
    hargaPerhari: '20000000',
  },
];
function Search() {
  return (
    <div className='grid gap-y-4'>
      <div className='flex text-2xl gap-x-2 border-l-4 pl-5 my-3 border-primary'>
        <div className='font-semibold'>Pencarian kost :</div>
        <div>Kost Mawar</div>
      </div>
      <div className='w-full flex gap-x-8 items-center'>
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
        <div className='w-full'>
          <Searchs placeholder={'Masukan nama/kota/alamat'} />
        </div>
      </div>
      <div className='mt-5 rounded-[10px]' style={{boxShadow: '0 1px 8px rgba(36,36,36,.14)'}}>
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
      </div>
    </div>
  );
}

export default Search;
