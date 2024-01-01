'use client';

import React, { useState } from 'react';
import Button from '#/components/Button';
import { Step1, Step2, Step3 } from '#/components/payment';
import { RentAppRepository } from '#/repository/rent-application';
import { toIDR } from '#/utils/convertCurrency';
import {
  ArrowLeftOutlined,
  CheckCircleFilled,
  EnvironmentFilled,
  ExclamationCircleFilled,
  HomeFilled,
} from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { Card, Modal, Statistic, Steps } from 'antd';
import { CountdownProps } from 'antd/lib';
import { useRouter, useSearchParams } from 'next/navigation';
import { imgProduct } from '#/constants/general';

function Payment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadFile, setUploadFile] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const rentAppId: any = searchParams?.get('id');

  const { Countdown } = Statistic;

  const deadline = Date.now() + 1000 * 60 * 60 * 3;

  const onChange: CountdownProps['onChange'] = (val) => {
    if (typeof val === 'number' && 4.95 * 1000 < val && val < 5 * 1000) {
      console.log('changed!');
    }
  };

  const { data, error, isLoading } =
    RentAppRepository.hooks.getRentAppById(rentAppId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const datas = data?.data;

  const onFinish: CountdownProps['onFinish'] = () => {
    router.push(`/detail-product?id=${datas?.product_id}`);
  };

  const steps = [
    {
      title: 'Ajukan Sewa',
      component: <Step1 onNext={() => setCurrentStep(1)} datas={datas} />,
      isValid: true,
    },
    {
      title: 'Bayar Sewa',
      component: <Step2 onNext={() => setCurrentStep(2)} datas={datas} />,
      isValid: !!uploadFile,
    },
    {
      title: 'Kwitansi',
      component: (
        <Step3
          datas={datas}
          onFinish={() => {
            Modal.success({
              icon: (
                <div className='modal-hapus mb-[10px] flex justify-center'>
                  <CheckCircleFilled />
                </div>
              ),
              title: (
                <div className='text-3xl font-bold flex justify-center'>
                  Transaksi Anda Sudah Berhasil !
                </div>
              ),
              content: (
                <div className='text-xl font-semibold flex justify-center mb-[25px]'>
                  Semoga nyaman dengan pilihan anda
                </div>
              ),
            });
            router.push('/home');
          }}
        />
      ),
      isValid: true,
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const renderFormattedTime = ({ hours, minutes, seconds }: any) => {
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <div className='grid gap-y-[20px] grid-cols-1'>
        {currentStep === 0 && (
          <a
            href={`/detail-product?id=${datas?.product_id}`}
            className='w-fit hover:text-teks flex font-bold text-xl gap-3'
          >
            <div>
              <ArrowLeftOutlined />
            </div>
            <div>Kembali</div>
          </a>
        )}
        <div className='flex gap-x-[95px] mt-[20px]'>
          <div className='w-1/2'>
            <div className='grid gap-y-[50px] mb-[40px]'>
              {currentStep === 0 && (
                <div className='text-3xl font-bold flex items-center mt-[30px]'>
                  <p>Pengajuan Sewa</p>
                </div>
              )}
              {currentStep === 1 && (
                <div className='text-3xl font-bold flex items-center mt-[30px]'>
                  <p>Pembayaran Sewa</p>
                </div>
              )}
              {currentStep === 2 && (
                <div className='text-3xl font-bold flex items-center mt-[30px]'>
                  <p>Kwitansi Pembayaran</p>
                </div>
              )}
              <div
                style={{ boxShadow: '0 6px 16px #0000001f' }}
                className='rounded-[10px] flex justify-center items-center gap-4 p-2 py-[20px] border-2 border-primary text-primary text-2xl cursor-default'
              >
                {datas?.product_type === 'kost' && (
                  <>
                    <HomeFilled />
                    <p className='font-bold'>Kost</p>
                  </>
                )}
                {datas?.product_type === 'gedung' && (
                  <>
                    <Icon fontSize={35} icon='mingcute:building-1-fill' />
                    <p className='font-bold'>Gedung</p>
                  </>
                )}
                {datas?.product_type === 'hotel' && (
                  <>
                    <Icon fontSize={25} icon='fa6-solid:hotel' />
                    <p className='font-bold'>Hotel</p>
                  </>
                )}
              </div>
            </div>
            <div>
              <Steps current={currentStep} items={items}>
                {steps.map((step, index) => (
                  <Steps key={index} />
                ))}
              </Steps>

              {steps[currentStep].component}
            </div>
          </div>
          <div className='w-1/2'>
            <div className='sticky top-5'>
              <div
                className='rounded-[10px] bg-white h-fit p-[20px]'
                style={{
                  boxShadow:
                    '0 -2px 40px rgba(0,0,0,.04), 0 16px 40px rgba(0,0,0,.06)',
                }}
              >
                <div className='flex items-center gap-x-[30px] pb-[30px] border-b border-slate-300'>
                  <div className='w-1/2 h-[190px]'>
                    <img
                      src={imgProduct(datas?.product_photo)}
                      alt={`produk ${datas?.product_name}`}
                      className='object-cover object-center w-full h-full rounded-xl'
                    />
                  </div>
                  <div className='w-1/2'>
                    <div className='flex flex-col gap-y-3 w-[300px]'>
                      <div className='flex gap-x-5'>
                        <div className='rounded-[10px] flex justify-center items-center gap-x-2 p-1.5 border border-rstroke text-rstroke text-xl cursor-default'>
                          {datas?.product_type === 'kost' && (
                            <>
                              <HomeFilled />
                              <p className='font-semibold'>Kost</p>
                            </>
                          )}
                          {datas?.product_type === 'gedung' && (
                            <>
                              <Icon
                                fontSize={25}
                                icon='mingcute:building-1-fill'
                              />
                              <p className='font-semibold'>Gedung</p>
                            </>
                          )}
                          {datas?.product_type === 'hotel' && (
                            <>
                              <Icon fontSize={20} icon='fa6-solid:hotel' />
                              <p className='font-semibold'>Hotel</p>
                            </>
                          )}
                        </div>
                        <div className='font-bold text-white text-xl'>
                          {datas?.product_label === 'pria' && (
                            <>
                              <p className='bg-primary py-1.5 px-5 rounded-md'>
                                Pria
                              </p>
                            </>
                          )}
                          {datas?.product_label === 'wanita' && (
                            <>
                              <p className='bg-labelWanita py-1.5 px-5 rounded-md'>
                                Wanita
                              </p>
                            </>
                          )}
                          {datas?.product_label === 'campuran' && (
                            <>
                              <p className='bg-orange-400 py-1.5 px-5 rounded-md'>
                                Campuran
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                      <div className='w-[300px] text-2xl font-semibold'>
                        <p className='truncate'>{datas?.product_name}</p>
                      </div>
                      <div className='flex items-center gap-x-2 text-rstroke w-[300px]'>
                        <EnvironmentFilled className='text-[26px]' />
                        <p className='text-2xl truncate'>
                          {datas?.product_address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-y-[30px] pb-[30px] border-b border-slate-300'>
                  {currentStep === 1 && (
                    <>
                      <div className='gap-y-5 justify-center text-2xl text-rstroke font-semibold flex flex-col items-center mt-[30px]'>
                        <div className='text-xl'>Akan berakhir dalam</div>
                        <div>
                          <Card
                            bordered={false}
                            className='bg-primary flex justify-center text-white font-bold'
                          >
                            <Countdown
                              value={deadline}
                              onFinish={onFinish}
                              format='HH:mm:ss'
                            />
                          </Card>
                        </div>
                      </div>
                    </>
                  )}
                  <div className='text-3xl font-bold flex items-center mt-[30px]'>
                    <p>Rincian Pembayaran </p>
                  </div>
                  <div className='grid gap-y-5 grid-cols-1 font-semibold text-rstroke underline underline-offset-2'>
                    <div className='flex text-2xl justify-between'>
                      <div>Biaya sewa</div>
                      <div>{toIDR(datas?.price)}</div>
                    </div>
                    <div className='flex text-2xl justify-between'>
                      <div>Lama Sewa</div>
                      {datas?.product_type === 'kost' && (
                      <div className='flex gap-2'>
                        <p>{datas?.amount}</p>
                        {datas?.rental_type === 'bulanan' ? (
                          <p>bulan</p>
                        ) : (
                          <p>hari</p>
                        )}
                      </div>
                      )}
                      {datas?.product_type === 'gedung' && (
                      <div className='flex gap-2'>
                        <p>{datas?.amount}</p>
                        {datas?.rental_type === 'harian' ? (
                          <p>bulan</p>
                        ) : (
                          <p>hari</p>
                        )}
                      </div>
                      )}
                      {datas?.product_type === 'hotel' && (
                      <div className='flex gap-2'>
                        <p>{datas?.amount}</p>
                        {datas?.rental_type === 'harian' ? (
                          <p>bulan</p>
                        ) : (
                          <p>hari</p>
                        )}
                      </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className='flex font-bold justify-between text-3xl py-10'>
                  <div>Total</div>
                  <div>{toIDR(datas?.total_price)}</div>
                </div>
              </div>
              {currentStep === 2 && (
                <div className='grid gap-y-5'>
                  <Button className='!font-bold !text-2xl !py-3'>
                    Lepaskan Dana
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
