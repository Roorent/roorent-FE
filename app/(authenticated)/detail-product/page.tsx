'use client';

import {
  ArrowLeftOutlined,
  EnvironmentFilled,
  HomeFilled,
  ReconciliationFilled,
  StarFilled,
} from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { Carousel } from 'antd';
import React from 'react';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '351px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

function DetailProduct() {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <div>
      <div className='w-full grid gap-y-[20px] grid-cols-1'>
        <a
          href='/list-product'
          className='w-fit hover:text-teks flex font-bold text-xl gap-3'
        >
          <div>
            <ArrowLeftOutlined />
          </div>
          <div>Kembali</div>
        </a>
      </div>
      <div className='flex gap-x-[30px] mt-[20px]'>
        <div className='w-1/2'>
          <Carousel afterChange={onChange}>
            <div>
              <img
                src='/assets/images/Gedung.png'
                alt=''
                className='object-cover object-center w-full h-full rounded-xl'
              />
            </div>
            <div>
              <img
                src='/assets/images/Gedung.png'
                alt=''
                className='object-cover object-center w-full h-full rounded-xl'
              />
            </div>
            <div>
              <img
                src='/assets/images/Gedung.png'
                alt=''
                className='object-cover object-center w-full h-full rounded-xl'
              />
            </div>
            <div>
              <img
                src='/assets/images/Gedung.png'
                alt=''
                className='object-cover object-center w-full h-full rounded-xl'
              />
            </div>
          </Carousel>
          <div>a</div>
        </div>
        <div className='w-1/2'>
          <div className='grid gap-y-5 grid-cols-1 mb-5'>
            <div className='text-5xl font-semibold leading-snug'>
              Kost Apik Pikitdro 22 Tipe C Cibeunying Kaler Bandung
            </div>
            <div className='flex gap-x-[30px]'>
              <div className='rounded-[10px] flex justify-center items-center gap-x-2 p-1.5 border border-rstroke text-rstroke text-base cursor-default'>
                <HomeFilled />
                <p className='font-semibold'>Kost</p>
              </div>
              <div className='font-bold text-white'>
                <p className='bg-primary py-2 px-5 rounded-md'>Pria</p>
              </div>
              <div className='flex items-center gap-x-2'>
                <StarFilled className='text-[#FFCC00] text-[26px]' />
                <p className='font-bold text-xl text-rstroke'>3.4</p>
              </div>
              <div className='flex items-center gap-x-2'>
                <ReconciliationFilled className='text-rstroke text-[26px]' />
                <p className='font-semibold text-xl text-rstroke'>
                  31 transaksi berhasil
                </p>
              </div>
            </div>
            <div className='flex items-center gap-x-2 text-rstroke'>
              <EnvironmentFilled className='text-[26px]' />
              <p className='font-semibold text-xl '>Bintara 14, Kota Bekasi</p>
            </div>
            <div className='items-center flex items-center gap-x-2 text-rstroke text-xl'>
              <Icon icon='akar-icons:door' className='text-[30px]' />
              <p className='text-[#DA3438] font-semibold'>
                sisa <span className='font-bold'>2</span> kamar
              </p>
            </div>
          </div>
          <div className='rounded-[10px] bg-white h-[212px] p-[15px] sticky top-0' style={{boxShadow: '0 1px 8px rgba(36,36,36,.14)'}}>
            <div className='text-xl font-bold bg-primary rounded-[10px] px-5 py-2.5 flex items-center mb-[30px] text-white w-full flex justify-center'>
              Harga Produk
            </div>
            <div className='grid gap-y-5 grid-cols-1'>
              <div className='flex text-3xl justify-between'>
                <div>Bulan Pertama :</div>
                <div className='font-bold'> Rp. 600.000.000</div>
              </div>
              <div className='flex text-3xl justify-between'>
                <div>Hari Pertama :</div>
                <div className='font-bold'> Rp. 600.000.000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
