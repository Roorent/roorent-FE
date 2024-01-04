'use client';

import React, { useState } from 'react';
import Button from '../Button';
import { ConfigProvider, Modal, Rate, Input, Form } from 'antd';
import PhotoUpload from './PhotoUpload';
import SummaryProducts from '../SummaryProducts';

function Review() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rateVal, setRateVal] = useState(0);
  const [photos, setPhotos] = useState([]);

  const { TextArea } = Input;

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
  };
  const handleFiles = (value: any) => {
    setPhotos(value);
  };

  return (
    <div className='review'>
      <Button
        className='!font-bold !w-full !py-3 !text-xl !mt-0'
        onClick={openModal}
      >
        Nilai
      </Button>
      <ConfigProvider
        modal={{
          styles: {
            content: {
              width: '90%',
              padding: '25px',
              boxShadow: '0 10px 20px -12px rgb(0 0 0 / 0.5)',
              display: 'block',
            },
          },
        }}
      >
        <Modal
          title={
            <div>
              <div>
                <SummaryProducts
                  isType='kost'
                  isLabel='pria'
                  address='Jl. Bandeng No.2'
                  image='/assets/images/Kost.png'
                  nameProduk='Kost Singgahsini Wisma Setia Tipe B Pondok Gede Bekasi'
                />
              </div>
              <div className='border-slate-200 border-b-2 mt-2 mb-4'></div>
            </div>
          }
          mask={false}
          open={isModalOpen}
          onCancel={closeModal}
          closeIcon={<p></p>}
          className='review'
          footer={
            <div className='font-bold flex gap-4 justify-end mb-2'>
              <Button
                className='w-[120px] !bg-white !text-primary border border-primary hover:!text-opacity-80 hover:!bg-white'
                onClick={closeModal}
              >
                Nanti Saja
              </Button>
              <Button className='w-[120px]' onClick={handleSubmit}>
                OK
              </Button>
            </div>
          }
        >
          <div className='flex flex-col gap-4 my-2'>
            <Form name='review'>
              <div className='flex flex-col gap-4'>
                <Form.Item name='rating'>
                  <Rate
                    allowClear={false}
                    defaultValue={rateVal}
                    style={{ fontSize: 40, display: 'flex', gap: '10px' }}
                    className='justify-center'
                    onChange={(value) => setRateVal(value)}
                  />
                </Form.Item>
                <Form.Item name='photo_reviews'>
                  <PhotoUpload files={handleFiles} />
                </Form.Item>
              </div>
              <div className='my-4'>
                <p className='mb-4 text-teks text-xl font-semibold'>Ulasan :</p>
                <div className='textarea-produk'>
                  <Form.Item
                    name='content'
                    rules={[
                      {
                        required: true,
                        message: 'Masukan ulasan anda!',
                      },
                    ]}
                  >
                    <TextArea
                      showCount
                      maxLength={225}
                      placeholder='Masukan ulasan anda'
                      style={{
                        height: 120,
                        resize: 'none',
                        fontSize: '15px',
                      }}
                      // onChange={(e) => {
                      //   setDatas({ ...datas, address: e.target.value });
                      // }}
                    />
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
}

export default Review;
