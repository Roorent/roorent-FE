'use client';

import React, { useEffect, useState } from 'react';
import { isRole } from '#/constants/general';
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
import { Carousel, Button, DatePicker, Form, Radio, message } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { toIDR } from '#/utils/convertCurrency';
import { imgProduct } from '#/constants/general';
import { RentAppRepository } from '#/repository/rent-application';

function DetailProduct() {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [filterPrice, setFilterPrice] = useState('perbulan');

  const router = useRouter();
  const searchParams = useSearchParams();
  const productId: any = searchParams?.get('id');

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

  const { data, error, isLoading } =
    productsRepository.hooks.getProductsById(productId);

  if (!data) {
    return <div>Loading...</div>;
  }

  const datas = data?.data;

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  const handleFilterPrice = (e: any) => {
    setFilterPrice(e.target.value);
  };

  const onFinish = async (val: any) => {
    try {
      const rentApp = {
        lease_start: val.lease_date[0].toISOString(),
        lease_expiration: val.lease_date[1].toISOString(),
        rental_type: filterPrice === 'perbulan' ? 'bulanan' : 'harian',
      };

      const dataRentApp = await RentAppRepository.manipulatedata.createRentApp(
        productId,
        rentApp
      );
      const rentAppId = dataRentApp.body.data.id;

      router.push(`/payment?id=${rentAppId}`);
    } catch (err: any) {
      message.error(err.response.data.message);
    }
  };

  const reviews = [
    {
      id: '1',
      namaPemilik: 'M Danar Kahfi',
      rating: '0',
      photo1: 'assets/images/Hotel.png',
      photo2: 'assets/images/Gedung.png',
      photo3: 'assets/images/Kost.png',
      ReviewPenyewa:
        'Di sekitar kost banyak resto dan coffe shop. Pemiliknya baik, tempatnya juga nyaman dan bersih',
    },
    {
      id: '2',
      namaPemilik: 'M Danar Kahfi',
      rating: '0',
      photo1: 'assets/images/Hotel.png',
      photo2: 'assets/images/Gedung.png',
      photo3: 'assets/images/Kost.png',
      ReviewPenyewa:
        'Di sekitar kost banyak resto dan coffe shop. Pemiliknya baik, tempatnya juga nyaman dan bersih',
    },
    {
      id: '3',
      namaPemilik: 'M Danar Kahfi',
      rating: '0',
      photo1: 'assets/images/Hotel.png',
      photo2: 'assets/images/Gedung.png',
      photo3: 'assets/images/Kost.png',
      ReviewPenyewa:
        'Di sekitar kost banyak resto dan coffe shop. Pemiliknya baik, tempatnya juga nyaman dan bersih',
    },
    {
      id: '4',
      namaPemilik: 'M Danar Kahfi',
      rating: '0',
      photo1: 'assets/images/Hotel.png',
      photo2: 'assets/images/Gedung.png',
      photo3: 'assets/images/Kost.png',
      ReviewPenyewa:
        'Di sekitar kost banyak resto dan coffe shop. Pemiliknya baik, tempatnya juga nyaman dan bersih',
    },
  ];

  const limitedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <div className='w-full'>
      {role === isRole.owner && (
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
      )}
      {role === isRole.renter && (
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
      )}
      <div className='flex gap-x-[30px] mt-[20px]'>
        <div className='w-1/2'>
          <div className='mb-8'>
            <Carousel afterChange={onChange}>
              {datas?.photoProducts.map((item: any) => (
                <div key={item.id}>
                  <img
                    src={imgProduct(item.photo)}
                    alt={`Photo product ${datas?.name}`}
                    className='object-cover object-center w-full h-[450px] rounded-xl'
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
                <div className='absolute top-[45%] left-[42%] font-bold'>
                  <Button
                    href={datas?.location}
                    className='h-full px-5 py-3 bg-transparent !border !border-white hover:bg-white hover:!text-rstroke !text-white'
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
                    <p className='text-xl'>0 transaksi berhasil</p>
                  </div>
                </div>
              </div>
            )}
            <div className='grid gap-y-6 grid-cols-1 pb-[30px] border-b border-slate-300'>
              <div className='font-semibold text-3xl flex items-center gap-4'>
                <StarFilled className='text-[#FFCC00] text-[50px]' />
                <p>0 (0 review)</p>
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
                    />
                  </div>
                </div>
              ))}
              {!showAllReviews && reviews.length > 3 && (
                <Button
                  onClick={() => setShowAllReviews(true)}
                  className='w-fit h-max px-7 py-3 hover:bg-transparent hover:!text-primary !text-rstroke text-xl font-bold border border-rstroke bg-transparent cursor-pointer'
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
            <div className='flex gap-x-[20px] items-center'>
              {datas?.type === 'kost' && (
                <div className='rounded-[10px] flex justify-center items-center gap-x-2 p-1.5 border border-rstroke text-rstroke text-xl cursor-default'>
                  <HomeFilled />
                  <p className='font-semibold'>Kost</p>
                </div>
              )}
              {datas?.type === 'gedung' && (
                <div className='rounded-[10px] flex justify-center items-center gap-x-2 p-1.5 border border-rstroke text-rstroke text-xl cursor-default'>
                  <Icon icon='mingcute:building-1-fill' />
                  <p className='font-semibold'>Gedung</p>
                </div>
              )}
              {datas?.type === 'hotel' && (
                <div className='rounded-[10px] flex justify-center items-center gap-x-2 p-1.5 border border-rstroke text-rstroke text-xl cursor-default'>
                  <Icon icon='fa6-solid:hotel' />
                  <p className='font-semibold'>Hotel</p>
                </div>
              )}
              {datas?.type === 'kost' ? (
                <div className='font-bold text-white flex items-center'>
                  {datas?.gender === 'pria' && (
                    <p className='bg-primary py-2 px-5 rounded-md'>Pria</p>
                  )}
                  {datas?.gender === 'wanita' && (
                    <p className='bg-labelWanita py-2 px-5 rounded-md'>
                      Wanita
                    </p>
                  )}
                  \
                  {datas?.gender === 'campur' && (
                    <p className='bg-orange-400 py-2 px-5 rounded-md'>Campur</p>
                  )}
                </div>
              ) : (
                <></>
              )}
              <div className='flex items-center gap-x-2'>
                <StarFilled className='text-[#FFCC00] text-[26px]' />
                <p className='font-bold text-xl text-rstroke'>0</p>
              </div>
              <div className='flex items-center gap-x-2'>
                <ReconciliationFilled className='text-rstroke text-[26px]' />
                <p className='text-xl'>0 transaksi berhasil</p>
              </div>
            </div>
            <div className='flex items-start gap-x-2 text-rstroke'>
              <EnvironmentFilled className='text-[26px]' />
              <p className='text-xl flex items-start'>
                {datas?.address + ', ' + datas?.city}
              </p>
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
          {role === isRole.owner && (
            <div
              className='rounded-[10px] bg-white h-[188px] p-[15px] sticky top-5'
              style={{
                boxShadow:
                  '0 -2px 40px rgba(0,0,0,.04), 0 16px 40px rgba(0,0,0,.06)',
              }}
            >
              <div className='text-xl font-bold bg-primary rounded-[10px] px-5 py-2.5 flex items-center mb-[30px] text-white w-full justify-center'>
                Harga Produk
              </div>
              {datas?.type === 'kost' && (
                <div className='grid gap-y-5 grid-cols-1'>
                  <div className='flex text-3xl justify-between'>
                    {datas?.monthly_price !== 0 ? (
                      <>
                        <div>Harga perbulan :</div>
                        <div className='font-bold'>
                          {toIDR(datas?.monthly_price)}
                        </div>
                      </>
                    ) : null}
                  </div>
                  <div className='flex text-3xl justify-between'>
                    {datas?.daily_price !== 0 ? (
                      <>
                        <div>Harga perhari :</div>
                        <div className='font-bold'>
                          {toIDR(datas?.daily_price)}
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              )}
              {(datas?.type === 'gedung' || datas?.type === 'hotel') && (
                <div className='grid gap-y-5 grid-cols-1'>
                  <div className='flex text-3xl justify-between'>
                    <div>Harga perhari :</div>
                    <div className='font-bold'>{toIDR(datas?.daily_price)}</div>
                  </div>
                </div>
              )}
            </div>
          )}
          {role === isRole.renter && (
            <div
              className='mt-12 rounded-[10px] bg-white h-fit p-[15px] sticky top-5'
              style={{
                boxShadow:
                  '0 -2px 40px rgba(0,0,0,.04), 0 16px 40px rgba(0,0,0,.06)',
              }}
            >
              <Form className='detail-product' onFinish={onFinish}>
                <div className='grid gap-y-5 grid-cols-1'>
                  {datas?.type === 'kost' ? (
                    <>
                      <div className='flex text-3xl gap-x-3 items-center'>
                        {filterPrice === 'perbulan' &&
                          datas?.monthly_price !== 0 && (
                            <>
                              <div className='font-bold'>
                                {toIDR(datas?.monthly_price)}
                              </div>
                              <div>(Harga {filterPrice})</div>
                            </>
                          )}
                        {filterPrice === 'perhari' &&
                          datas?.daily_price !== 0 && (
                            <>
                              <div className='font-bold'>
                                {toIDR(datas?.daily_price)}
                              </div>
                              <div>(Harga {filterPrice})</div>
                            </>
                          )}
                      </div>
                      <div className='w-full mt-4 flex justify-center'>
                        <Radio.Group
                          defaultValue={filterPrice}
                          onChange={handleFilterPrice}
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
                            name='lease_date'
                            rules={[
                              {
                                required: true,
                                message: 'Harap masukan tanggal sewa anda!',
                              },
                            ]}
                          >
                            {filterPrice === 'perhari' ? (
                              <RangePicker
                                defaultValue={[null, null]}
                                placeholder={[
                                  'Tanggal Awal Sewa',
                                  'Tanggal Akhir Sewa',
                                ]}
                                className='w-full regis'
                              />
                            ) : (
                              <RangePicker
                                picker='month'
                                defaultValue={[null, null]}
                                placeholder={[
                                  'Tanggal Awal Sewa',
                                  'Tanggal Akhir Sewa',
                                ]}
                                className='w-full regis'
                              />
                            )}
                          </Form.Item>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='flex text-3xl gap-x-3 items-center mb-3'>
                        <div className='font-bold'>
                          {toIDR(datas?.daily_price)}
                        </div>
                        <div>(Harga Perhari)</div>
                      </div>
                      <div className='grid gap-y-4 grid-cols-1'>
                        <div className='w-full'>
                          <Form.Item
                            name='lease_date'
                            rules={[
                              {
                                required: true,
                                message: 'Harap masukan tanggal sewa anda!',
                              },
                            ]}
                          >
                            <RangePicker
                              defaultValue={[null, null]}
                              placeholder={[
                                'Tanggal Awal Sewa',
                                'Tanggal Akhir Sewa',
                              ]}
                              className='w-full regis'
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </>
                  )}
                  <div>
                    <Button className='w-full p-[8px] h-14 rounded-2xl flex justify-center items-center !bg-transparent !border-2 !border-primary !text-primary !font-bold !text-xl hover:!bg-primary hover:!text-white'>
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
                        className='bg-primary w-full p-[8px] h-14 !-mt-2 rounded-2xl flex justify-center items-center text-white !font-bold !text-xl hover:!bg-rhover1 hover:text-white'
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
