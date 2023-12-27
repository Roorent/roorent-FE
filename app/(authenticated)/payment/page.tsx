'use client';

import Step1 from '#/components/payment/step1';
import Step2 from '#/components/payment/step2';
import Step3 from '#/components/payment/step3';
import {
  ArrowLeftOutlined,
  EnvironmentFilled,
  HomeFilled,
} from '@ant-design/icons';
import { Card, Statistic, Steps } from 'antd';
import { CountdownProps } from 'antd/lib';
import React, { useState } from 'react';

function Payment() {
  const { Countdown } = Statistic;

  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

  const onFinish: CountdownProps['onFinish'] = () => {
    console.log('finished!');
  };

  const onChange: CountdownProps['onChange'] = (val) => {
    if (typeof val === 'number' && 4.95 * 1000 < val && val < 5 * 1000) {
      console.log('changed!');
    }
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [uploadFile, setUploadFile] = useState(null);

  const steps = [
    {
      title: 'Ajukan Sewa',
      component: <Step1 onNext={() => setCurrentStep(1)} />,
      isValid: true,
    },
    {
      title: 'Bayar Sewa',
      component: <Step2 onNext={() => setCurrentStep(2)} />,
      isValid: !!uploadFile,
    },
    {
      title: 'Kwitansi',
      component: <Step3 onFinish={() => alert('Sewa Selesai')} />,
      isValid: true,
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const renderFormattedTime = ({ hours, minutes, seconds }: any) => {
    // Sesuaikan warna latar belakang sesuai kebutuhan Anda
    return `${hours}:${minutes}:${seconds}`;
  };
  return (
    <div>
      <div className='grid gap-y-[20px] grid-cols-1'>
        <a
          href='/detail-product'
          className='w-fit hover:text-teks flex font-bold text-xl gap-3'
        >
          <div>
            <ArrowLeftOutlined />
          </div>
          <div>Kembali</div>
        </a>
        <div className='flex gap-x-[95px] mt-[20px]'>
          <div className='w-1/2'>
            <div className='grid gap-y-[50px] mb-[40px]'>
              <div className='text-3xl font-bold flex items-center mt-[30px]'>
                <p>Pengajuan Sewa</p>
              </div>
              <div
                style={{ boxShadow: '0 6px 16px #0000001f' }}
                className='rounded-[10px] flex justify-center items-center gap-x-2 p-1.5 border-2 border-primary text-primary text-2xl cursor-default py-[20px]'
              >
                <HomeFilled />
                <p className='font-bold'>Kost</p>
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
            <div
              className='rounded-[10px] bg-white h-fit p-[20px] sticky top-5'
              style={{
                boxShadow:
                  '0 -2px 40px rgba(0,0,0,.04), 0 16px 40px rgba(0,0,0,.06)',
              }}
            >
              <div className='flex items-center gap-x-[30px] pb-[30px] border-b border-slate-300'>
                <div className='w-1/2 h-[190px]'>
                  <img
                    src='assets/images/Hotel.png'
                    alt='produk'
                    className='object-cover object-center w-full h-full rounded-xl'
                  />
                </div>
                <div className='w-1/2'>
                  <div className='grid gap-y-3'>
                    <div className='flex gap-x-5'>
                      <div className='rounded-[10px] flex justify-center items-center gap-x-2 p-1.5 border border-rstroke text-rstroke text-xl cursor-default'>
                        <HomeFilled />
                        <p className='font-semibold'>Kost</p>
                      </div>
                      <div className='font-bold text-white text-xl'>
                        <p className='bg-primary py-1.5 px-5 rounded-md'>
                          Pria
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-x-2 text-rstroke'>
                      <EnvironmentFilled className='text-[26px]' />
                      <p className='text-2xl'>Bintara 14, Kota Bekasi</p>
                    </div>
                    <div className='text-2xl'>
                      <p className='w-[370px] overflow-hidden truncate'>
                        Kost Singgahsini MnV Co-Living Tipe B Bendungan Hilir
                        Jakarta Pusat
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='grid gap-y-[30px] pb-[30px] border-b border-slate-300'>
                {currentStep === 1 ? (
                  <>
                    <div className='grid gap-y-5 justify-center text-2xl text-rstroke font-semibold flex items-center mt-[30px]'>
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

                    <div className='text-3xl font-bold flex items-center mt-[30px]'>
                      <p>Rincian Pembayaran </p>
                    </div>
                  </>
                ) : (
                  <div className='text-3xl font-bold flex items-center mt-[30px]'>
                    <p>Rincian Pembayaran </p>
                  </div>
                )}
                <div className='grid gap-y-5 grid-cols-1 font-semibold text-rstroke underline underline-offset-2'>
                  <div className='flex text-2xl justify-between'>
                    <div>Biaya sewa</div>
                    <div> Rp. 600.000</div>
                  </div>
                  <div className='flex text-2xl justify-between'>
                    <div>Biaya admin</div>
                    <div> Rp. 30.000</div>
                  </div>
                </div>
              </div>
              <div className='flex font-bold justify-between text-3xl py-10'>
                <div>Total Pembayaran</div>
                <div>Rp. 630.000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
