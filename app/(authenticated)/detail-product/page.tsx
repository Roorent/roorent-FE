'use client';

import React, { useEffect, useState } from 'react';
import { isRole } from '#/constants/general';
import Button from '#/components/Button';
import ListReview from '#/components/List-Review';
import Photo from '#/components/Photo';
import { GMAPS } from '#/constants/images';
import { productsRepository } from '#/repository/products';
import { parseJwt } from '#/utils/convert';
import {
  ArrowLeftOutlined,
  CommentOutlined,
  EnvironmentFilled,
  HeartOutlined,
  HomeFilled,
  ReconciliationFilled,
  StarFilled,
} from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { Carousel, DatePicker, Form, Radio } from 'antd';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { toIDR } from '#/utils/convertCurrency';
import { config } from '#/config/app';

function DetailProduct() {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [defaultStartDate, setDefaultStartDate] = useState(dayjs());
  const [filterPrice, setFilterPrice] = useState('perbulan');

  const router = useRouter();
  const { RangePicker } = DatePicker;

  const token = localStorage.getItem('access_token');
  let role: string = '';

  if (token) {
    role = parseJwt(token).role;
  }
  if (!token) {
    router.push('/');
  }
  if (role == 'admin') {
    router.push('/adm/dashboard');
  }

  useEffect(() => {
    document.title = 'Detail Product';
  }, []);

  const searchParams = useSearchParams();
  const productId: any = searchParams?.get('id');
  const { data, error, isLoading } =
    productsRepository.hooks.getProductsById(productId);

  if (!data) {
    return <div>Loading...</div>;
  }

  const datas = data?.data;

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  const imgProduct = (img: string) =>
    `${config.baseUrl}/images/photo-products/${img}`;

  const reviews = [
    {
      id: '1',
      namaPemilik: 'M Danar Kahfi',
      rating: '5.0',
      photo1: 'assets/images/Hotel.png',
      photo2: 'assets/images/Gedung.png',
      photo3: 'assets/images/Kost.png',
      ReviewPenyewa:
        'Di sekitar kost banyak resto dan coffe shop. Pemiliknya baik, tempatnya juga nyaman dan bersih',
      BalasanReview:
        'Halo, Kak Clara. Terima kasih atas reviewny dan ratingnya.',
    },
    {
      id: '2',
      namaPemilik: 'M Danar Kahfi',
      rating: '5.0',
      photo1: 'assets/images/Hotel.png',
      photo2: 'assets/images/Gedung.png',
      photo3: 'assets/images/Kost.png',
      ReviewPenyewa:
        'Di sekitar kost banyak resto dan coffe shop. Pemiliknya baik, tempatnya juga nyaman dan bersih',
      BalasanReview:
        'Halo, Kak Clara. Terima kasih atas reviewny dan ratingnya.',
    },
    {
      id: '3',
      namaPemilik: 'M Danar Kahfi',
      rating: '5.0',
      photo1: 'assets/images/Hotel.png',
      photo2: 'assets/images/Gedung.png',
      photo3: 'assets/images/Kost.png',
      ReviewPenyewa:
        'Di sekitar kost banyak resto dan coffe shop. Pemiliknya baik, tempatnya juga nyaman dan bersih',
      BalasanReview:
        'Halo, Kak Clara. Terima kasih atas reviewny dan ratingnya.',
    },
    {
      id: '4',
      namaPemilik: 'M Danar Kahfi',
      rating: '5.0',
      photo1: 'assets/images/Hotel.png',
      photo2: 'assets/images/Gedung.png',
      photo3: 'assets/images/Kost.png',
      ReviewPenyewa:
        'Di sekitar kost banyak resto dan coffe shop. Pemiliknya baik, tempatnya juga nyaman dan bersih',
      BalasanReview:
        'Halo, Kak Clara. Terima kasih atas reviewny dan ratingnya.',
    },
  ];

  const limitedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

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
          <div className='mb-8'>
            <Carousel afterChange={onChange}>
              {datas?.photoProducts.map((item: any) => (
                <div key={item.id}>
                  <img
                    src={imgProduct(item.photo)}
                    alt={`Photo product ${datas?.name}`}
                    className='object-cover object-center w-full h-full rounded-xl'
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <div className='grid gap-y-[40px] grid-cols-1'>
            <div className='grid gap-y-3 grid-cols-1 pb-[30px] border-b border-slate-300'>
              <div className='font-semibold text-3xl'>Spesifikasi</div>
              <pre className='preStyle text-xl leading-normal text-rstroke'>
                {datas?.specifications}
              </pre>
            </div>
            <div className='grid gap-y-3 grid-cols-1 pb-[30px] border-b border-slate-300'>
              <div className='font-semibold text-3xl'>Deskripsi Product</div>
              <pre className='preStyle text-xl leading-normal text-rstroke'>
                {datas?.descriptions}
              </pre>
            </div>
            <div className='grid gap-y-3 grid-cols-1 pb-[30px] border-b border-slate-300'>
              <div className='font-semibold text-3xl'>Fasilitas</div>
              <pre className='preStyle text-xl leading-normal text-rstroke'>
                {datas?.facilities}
              </pre>
            </div>
            <div className='grid gap-y-3 grid-cols-1 pb-[30px] border-b border-slate-300'>
              <div className='font-semibold text-3xl'>Peraturan</div>
              <pre className='preStyle text-xl leading-normal text-rstroke'>
                {datas?.rules}
              </pre>
            </div>
            <div className='grid gap-y-3 grid-cols-1 pb-[30px] border-b border-slate-300'>
              <div className='font-semibold text-3xl'>Lokasi</div>
              <div className='relative overflow-hidden brightness-100 '>
                <GMAPS />
                <div className='absolute inset-0 border-4 border-white '></div>
                <div className='absolute top-[40%] left-[40%] font-bold'>
                  <Button
                    href={datas?.location}
                    className='px-5 bg-transparent !border !border-white hover:bg-white hover:!text-rstroke'
                  >
                    Lihat Peta
                  </Button>
                </div>
              </div>
            </div>
            {role === isRole.renter && (
              <div className='grid gap-y-3 grid-cols-1 pb-[30px] border-b border-slate-300'>
                <div className='text-xl flex gap-5 items-center'>
                  <div>
                    <Photo src={datas?.user_photo} />
                  </div>
                  <div className='w-full grid gap-y-1 grid-cols-1'>
                    <p className='font-semibold'>{datas?.user_name}</p>
                    <p className='text-lg text-rstroke'>Pemilik Kost</p>
                  </div>
                  <div className='w-full flex justify-end items-center gap-x-2'>
                    <ReconciliationFilled className='text-primary text-[26px]' />
                    <p className='text-xl'>31 transaksi berhasil</p>
                  </div>
                </div>
              </div>
            )}
            <div className='grid gap-y-6 grid-cols-1 pb-[30px] border-b border-slate-300'>
              <div className='font-semibold text-3xl flex items-center gap-4'>
                <StarFilled className='text-[#FFCC00] text-[50px]' />
                <p>3.4 (2 review)</p>
              </div>
              {limitedReviews.map((review, index) => (
                <div key={index}>
                  <div key={review.id}>
                    <ListReview
                      namaPemilik={review.namaPemilik}
                      rating={review.rating}
                      photo1={review.photo1}
                      photo2={review.photo2}
                      photo3={review.photo3}
                      ReviewPenyewa={review.ReviewPenyewa}
                      BalasanReview={review.BalasanReview}
                    />
                  </div>
                </div>
              ))}
              {!showAllReviews && reviews.length > 3 && (
                <Button
                  onClick={() => setShowAllReviews(true)}
                  className='w-fit px-7 hover:bg-transparent !text-rstroke text-xl font-bold border border-rstroke bg-transparent cursor-pointer'
                >
                  Lihat semua review
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className='w-1/2'>
          <div className='grid gap-y-5 grid-cols-1 mb-5'>
            <div className='text-5xl font-semibold leading-snug'>
              {datas?.name}
            </div>
            <div className='flex gap-x-[30px]'>
              <div className='rounded-[10px] flex justify-center items-center gap-x-2 p-1.5 border border-rstroke text-rstroke text-base cursor-default'>
                <HomeFilled />
                <p className='font-semibold'>{datas?.type}</p>
              </div>
              <div className='font-bold text-white'>
                {datas?.sr_gender === 'pria' && (
                  <p className='bg-primary py-2 px-5 rounded-md'>Pria</p>
                )}
                {datas?.sr_gender === 'wanita' && (
                  <p className='bg-labelWanita py-2 px-5 rounded-md'>Wanita</p>
                )}
              </div>
              <div className='flex items-center gap-x-2'>
                <StarFilled className='text-[#FFCC00] text-[26px]' />
                <p className='font-bold text-xl text-rstroke'>3.4</p>
              </div>
              <div className='flex items-center gap-x-2'>
                <ReconciliationFilled className='text-rstroke text-[26px]' />
                <p className='text-xl'>31 transaksi berhasil</p>
              </div>
            </div>
            <div className='flex items-center gap-x-2 text-rstroke'>
              <EnvironmentFilled className='text-[26px]' />
              <p className='text-xl'>{datas?.address + ', ' + datas?.city}</p>
            </div>
            <div className='flex'>
              <div className='w-full items-center flex gap-x-2 text-rstroke text-xl'>
                <Icon icon='akar-icons:door' className='text-[30px]' />
                <p className='text-[#DA3438] font-semibold'>
                  sisa <span className='font-bold'>{datas?.stock}</span> kamar
                </p>
              </div>
              {role === isRole.renter && (
                <div className='rounded-[10px] flex items-center h-12 gap-x-2 px-3 border border-rstroke text-rstroke text-xl cursor-default'>
                  <HeartOutlined />
                  <p className='font-semibold'>Simpan</p>
                </div>
              )}
            </div>
          </div>
          <div
            className='rounded-[10px] bg-white h-[212px] p-[15px] sticky top-5'
            style={{
              boxShadow:
                '0 -2px 40px rgba(0,0,0,.04), 0 16px 40px rgba(0,0,0,.06)',
            }}
          >
            <div className='text-xl font-bold bg-primary rounded-[10px] px-5 py-2.5 flex items-center mb-[30px] text-white w-full justify-center'>
              Harga Produk
            </div>
            <div className='grid gap-y-5 grid-cols-1'>
              <div className='flex text-3xl justify-between'>
                <div>Harga perbulan :</div>
                <div className='font-bold'>{toIDR(datas?.monthly_price)}</div>
              </div>
              <div className='flex text-3xl justify-between'>
                <div>Harga perhari :</div>
                <div className='font-bold'>{toIDR(datas?.daily_price)}</div>
              </div>
            </div>
          </div>
          {role === isRole.renter && (
            <div
              className='mt-12 rounded-[10px] bg-white h-fit p-[15px] sticky top-5'
              style={{
                boxShadow:
                  '0 -2px 40px rgba(0,0,0,.04), 0 16px 40px rgba(0,0,0,.06)',
              }}
            >
              <Form className='detail-product'>
                <div className='grid gap-y-5 grid-cols-1'>
                  <div className='flex text-3xl gap-x-3 items-center'>
                    <div className='font-bold'>
                      {filterPrice === 'perbulan'
                        ? toIDR(datas?.monthly_price)
                        : toIDR(datas?.daily_price)}
                    </div>
                    <div>(Harga {filterPrice})</div>
                  </div>
                  <div className='w-full flex justify-center'>
                    <Radio.Group
                      defaultValue={filterPrice}
                      onChange={(e) => setFilterPrice(e.target.value)}
                      size='large'
                      buttonStyle='solid'
                      className='font-bold border-2 border-primary rounded-[11px]'
                    >
                      <Radio.Button value='perhari' className='px-6'>
                        Perhari
                      </Radio.Button>
                      <Radio.Button value='perbulan'>Perbulan</Radio.Button>
                    </Radio.Group>
                  </div>
                  <div className='grid gap-y-4 grid-cols-1'>
                    <div className='w-full'>
                      <Form.Item
                        //nanti di onfinish panggil name dan isi [lease_date.0, lease_date.1]
                        name='lease_date'
                        rules={[
                          {
                            required: true,
                            message: 'Harap masukan tanggal lahir anda!',
                          },
                        ]}
                      >
                        <RangePicker
                          defaultValue={[defaultStartDate, null]}
                          placeholder={[
                            'Tanggal Awal Sewa',
                            'Tanggal Akhir Sewa',
                          ]}
                          className='w-full regis'
                          onChange={(e: any) => {
                            // setData({ ...data, birth_date: e?.$d.toString() });
                            console.log(e);
                          }}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div>
                    <Button className='!mt-0 !bg-transparent !border-2 !border-primary !text-primary !font-bold !text-xl !flex !items-center hover:!bg-primary hover:!text-white'>
                      <div className='flex items-center'>
                        <CommentOutlined className='text-3xl font-bold mr-3' />
                        Tanya Pemilik
                      </div>
                    </Button>
                  </div>
                  <div>
                    <Form.Item>
                      <Button
                        type='primary'
                        htmlType='submit'
                        className='!mt-0 !font-bold !text-2xl !py-3'
                      >
                        Ajukan Sewa
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
