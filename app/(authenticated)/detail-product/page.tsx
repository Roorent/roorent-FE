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
  HeartFilled,
  HeartOutlined,
  HomeFilled,
  ReconciliationFilled,
  StarFilled,
  WarningFilled,
} from '@ant-design/icons';
import { Icon } from '@iconify/react';
import {
  Carousel,
  Button,
  DatePicker,
  Form,
  Radio,
  message,
  Spin,
  Modal,
} from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { toIDR } from '#/utils/convertCurrency';
import { imgProduct } from '#/constants/general';
import { RentAppRepository } from '#/repository/rent-application';
import { ReviewsRepository } from '#/repository/reviews';
import { countRate } from '#/utils/convertRating';
import { TransactionRepository } from '#/repository/transaction';

function DetailProduct() {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [filterPrice, setFilterPrice] = useState('perhari');
  const [isFavorite, setIsFavorite] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const productId: any = searchParams?.get('id');

  const { RangePicker } = DatePicker;
  const { confirm } = Modal;

  const token = localStorage.getItem('access_token');
  let role: string = '';
  if (token) {
    role = parseJwt(token).role;
  }

  useEffect(() => {
    document.title = 'Detail Product - Roorent';
  }, []);

  const { data, error, isLoading } =
    productsRepository.hooks.getProductsById(productId);

  const { data: dataReview } =
    ReviewsRepository.hooks.getReviewsByProduct(productId);

  const { data: dataTransaction } =
    TransactionRepository.hooks.getlistTransactionsByProducts(productId);

  if (isLoading) {
    return (
      <Spin
        size='large'
        className='w-full h-full flex items-center justify-center'
      />
    );
  }
  const datas = data?.data;
  const dataReviews = dataReview?.reviewsData;

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
      message.error('Silahkan login terlebih dahulu !');
    }
  };

  const handlebeforelogin = async () => {
    if (!token) {
      confirm({
        title: (
          <div className='text-3xl font-bold flex justify-center'>
            Anda belum login
          </div>
        ),
        closeIcon: false,
        content: (
          <div className='text-xl font-semibold flex justify-center mb-[25px] text-center'>
            Silahkan login terlebih dahulu !
          </div>
        ),
        icon: (
          <div className='modal-beforelogin mb-[10px] flex justify-center'>
            <WarningFilled />
          </div>
        ),
        okText: (
          <div className='modal-hapus text-xl font-bold text-white'>Ya</div>
        ),
        cancelText: (
          <div className='modal-hapus text-xl font-bold text-white'>Batal</div>
        ),
        onOk() {
          router.push('/auth/login');
        },
      });
    }
  };

  const handleClick = () => {
    setIsFavorite((prev) => !prev);
    const successMessage = isFavorite
      ? 'Dihapus dari Favorit'
      : 'Ditambahkan ke Favorit';

    message.success(successMessage);
  };

  const limitedReviews = showAllReviews
    ? dataReviews
    : dataReviews?.slice(0, 3);

  const totalRating = dataReviews?.map((dataReview: any) => {
    return dataReview.rating;
  });

  return (
    <div className='w-full'>
      {!token && (
        <div className='w-full grid gap-y-[20px] grid-cols-1'>
          <a
            href='/'
            className='w-fit hover:text-teks flex font-bold text-xl gap-3'
          >
            <div>
              <ArrowLeftOutlined />
            </div>
            <div>Kembali</div>
          </a>
        </div>
      )}
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
      {role === isRole.admin && (
        <div className='w-full grid gap-y-[20px] grid-cols-1'>
          <a
            href={`/adm/detail-pengguna?id=${datas?.user_id}`}
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
            <Carousel autoplay>
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
              <div className='relative overflow-hidden brightness-100'>
                <GMAPS />
                <div className='absolute inset-0 border-4 border-white'></div>
                <div className='absolute top-[45%] left-[42%] font-bold'>
                  <Button
                    href={datas?.location}
                    target='_blank'
                    className='h-full px-5 py-3 bg-transparent !border !border-white hover:bg-white hover:!text-rstroke !text-white'
                  >
                    Lihat Peta
                  </Button>
                </div>
              </div>
            </div>
            {(role === isRole.renter || role === isRole.admin || !token) && (
              <div className='grid gap-y-3 grid-cols-1 pb-[30px] border-b border-slate-300'>
                <div className='text-xl flex gap-5 items-center'>
                  <div>
                    <Photo size={50} src={datas?.user_photo} />
                  </div>
                  <div className='w-full grid gap-y-1 grid-cols-1'>
                    <p className='font-semibold'>{datas?.user_name}</p>
                    <p className='text-lg text-rstroke'>Pemilik Kost</p>
                  </div>
                  <div className='w-full flex justify-end items-center gap-x-2'>
                    <ReconciliationFilled className='text-primary text-[26px]' />
                    <p className='text-xl'>
                      {dataTransaction?.count} transaksi berhasil
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className='grid gap-y-6 grid-cols-1 pb-[30px] border-b border-slate-300'>
              <div className='font-semibold text-3xl flex items-center gap-4'>
                <StarFilled className='text-[#FFCC00] text-[50px]' />
                <p>
                  {countRate(totalRating)} ({dataReview?.count} review)
                </p>
              </div>
              {limitedReviews?.map((review: any, index: any) => (
                <div key={index}>
                  <div key={review.id}>
                    <ListReview
                      namaPenyewa={review.user_name}
                      rating={review.rating}
                      photos={review.photo}
                      ReviewPenyewa={review.content}
                      createdAt={review.createdAt}
                    />
                  </div>
                </div>
              ))}
              {!showAllReviews && dataReview?.length > 3 && (
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
                  {datas?.gender === 'campur' && (
                    <p className='bg-orange-400 py-2 px-5 rounded-md'>Campur</p>
                  )}
                </div>
              ) : (
                <></>
              )}
              <div className='flex items-center gap-x-2'>
                <StarFilled className='text-[#FFCC00] text-[26px]' />
                <p className='font-bold text-xl text-rstroke'>
                  {countRate(totalRating)}
                </p>
              </div>
              <div className='flex items-center gap-x-2'>
                <ReconciliationFilled className='text-rstroke text-[26px]' />
                <p className='text-xl'>
                  {dataTransaction?.count} transaksi berhasil
                </p>
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
              {role === isRole.renter ? (
                <Button
                  onClick={handleClick}
                  className='rounded-[10px] flex items-center h-12 px-3 border border-rstroke text-rstroke text-xl hover:!border-rstroke hover:!text-rstroke cursor-pointer'
                >
                  {isFavorite ? (
                    <HeartFilled style={{ color: 'red' }} />
                  ) : (
                    <HeartOutlined />
                  )}
                  {isFavorite ? 'Hapus' : 'Simpan'}
                </Button>
              ) : (
                <></>
              )}
            </div>
          </div>
          {(role === isRole.owner || role === isRole.admin) && (
            <div
              className='rounded-[10px] bg-white h-fit p-[25px] sticky top-5'
              style={{
                boxShadow:
                  '0 -2px 40px rgba(0,0,0,.04), 0 16px 40px rgba(0,0,0,.06)',
              }}
            >
              <div className='text-3xl font-bold px-5 border-b border-slate-300 pb-5 flex items-center mb-[30px] text-teks w-full justify-center'>
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
          {(role === isRole.renter || !token) && (
            <div
              className='mt-12 rounded-[10px] bg-white h-fit p-[25px] sticky top-5'
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
                        {filterPrice !== 'perbulan' &&
                          datas?.daily_price === 0 && (
                            <>
                              {setFilterPrice('perbulan')}
                              <div className='font-bold'>
                                {toIDR(datas?.monthly_price)}
                              </div>
                              <div>(Harga {filterPrice})</div>
                            </>
                          )}
                      </div>
                      {datas?.monthly_price !== 0 &&
                        datas?.daily_price !== 0 && (
                          <div className='w-full mt-4 flex justify-center py-5'>
                            <Radio.Group
                              buttonStyle='solid'
                              defaultValue={filterPrice}
                              onChange={handleFilterPrice}
                              className='w-full flex justify-center'
                            >
                              <div className='w-1/3'>
                                <Radio.Button
                                  value='perhari'
                                  className='py-[10px] h-max font-bold flex justify-center text-primary !rounded-e-none'
                                >
                                  <div className='w-full flex items-center text-2xl'>
                                    Perhari
                                  </div>
                                </Radio.Button>
                              </div>
                              <div className='w-1/3'>
                                <Radio.Button
                                  value='perbulan'
                                  className='py-[10px] h-max font-bold flex justify-center text-primary !rounded-s-none'
                                >
                                  <div className='w-full flex items-center text-2xl'>
                                    Perbulan
                                  </div>
                                </Radio.Button>
                              </div>
                            </Radio.Group>
                          </div>
                        )}
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
                            {filterPrice === 'perhari' &&
                              datas?.daily_price !== 0 && (
                                <RangePicker
                                  defaultValue={[null, null]}
                                  placeholder={[
                                    'Tanggal Awal Sewa',
                                    'Tanggal Akhir Sewa',
                                  ]}
                                  className='w-full regis'
                                />
                              )}
                            {filterPrice === 'perbulan' &&
                              datas?.monthly_price !== 0 && (
                                <RangePicker
                                  picker='month'
                                  defaultValue={[null, null]}
                                  placeholder={[
                                    'Bulan Awal Sewa',
                                    'Bulan Akhir Sewa',
                                  ]}
                                  className='w-full regis'
                                />
                              )}
                            {filterPrice !== 'perbulan' &&
                              datas?.daily_price === 0 && (
                                <RangePicker
                                  picker='month'
                                  defaultValue={[null, null]}
                                  placeholder={[
                                    'Bulan Awal Sewa',
                                    'Bulan Akhir Sewa',
                                  ]}
                                  className='w-full regis'
                                />
                              )}
                            {filterPrice !== 'perhari' &&
                              datas?.monthly_price === 0 && (
                                <RangePicker
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
                  {role === isRole.renter && (
                    <>
                      <div>
                        <Button className='w-full p-[8px] h-14 rounded-2xl flex justify-center items-center !bg-transparent !border-2 !border-primary !text-primary !font-bold !text-xl hover:!text-opacity-60'>
                          <div className='flex items-center'>
                            <CommentOutlined className='text-3xl font-bold mr-3' />
                            Tanya Pemilik
                          </div>
                        </Button>
                      </div>
                      <div>
                        <Form.Item>
                          {datas?.stock === 0 ? (
                            <Button
                              type='primary'
                              htmlType='submit'
                              disabled={true}
                              className='bg-primary w-full p-[8px] h-14 !-mt-2 rounded-2xl flex justify-center items-center text-white !font-bold !text-xl'
                            >
                              Ajukan Sewa
                            </Button>
                          ) : (
                            <Button
                              type='primary'
                              htmlType='submit'
                              className='bg-primary w-full p-[8px] h-14 !-mt-2 rounded-2xl flex justify-center items-center text-white !font-bold !text-xl hover:!bg-rhover1 hover:text-white'
                            >
                              Ajukan Sewa
                            </Button>
                          )}
                        </Form.Item>
                      </div>
                    </>
                  )}
                  {!token && (
                    <>
                      <div>
                        <Button
                          onClick={handlebeforelogin}
                          className='w-full p-[8px] h-14 rounded-2xl flex justify-center items-center !bg-transparent !border-2 !border-primary !text-primary !font-bold !text-xl hover:!text-opacity-60'
                        >
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
                            onClick={handlebeforelogin}
                            className='bg-primary w-full p-[8px] h-14 !-mt-2 rounded-2xl flex justify-center items-center text-white !font-bold !text-xl hover:!bg-rhover1 hover:text-white'
                          >
                            Ajukan Sewa
                          </Button>
                        </Form.Item>
                      </div>
                    </>
                  )}
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
