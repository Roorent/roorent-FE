'use client';

import React, { useState } from 'react';
import Button from '../Button';
import { ConfigProvider, Modal, Rate, Input } from 'antd';
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
    <div>
      <Button className='font-bold w-[150px]' onClick={openModal}>
        Nilai
      </Button>
      <ConfigProvider
        modal={{
          styles: {
            content: {
              width: '90%',
              padding: '25px',
              boxShadow: '0 10px 20px -12px rgb(0 0 0 / 0.5)',
            },
          },
        }}
      >
        <Modal
          title={
            <div>
              <div>
                <SummaryProducts
                  isType='Gedung'
                  isLabel='campuran'
                  address='Jl. Bandeng No.2'
                  image='/assets/images/Kost.png'
                />
              </div>
              <div className='border-slate-200 border-b-2 mt-2 mb-4'></div>
            </div>
          }
          mask={false}
          open={isModalOpen}
          onCancel={closeModal}
          closeIcon={<p></p>}
          footer={
            <div className='font-bold flex gap-4 justify-end mb-2'>
              <Button
                className='w-[120px] bg-white !text-primary border border-primary hover:bg-gray-100'
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
            <div className='flex flex-col gap-4'>
              <Rate
                allowClear={false}
                defaultValue={rateVal}
                style={{ fontSize: 40, display: 'flex', gap: '10px' }}
                className='justify-center'
                onChange={(value) => setRateVal(value)}
              />
              <PhotoUpload files={handleFiles} />
            </div>
            <div>
              <TextArea
                placeholder='Tulis ulasan anda'
                autoSize={{ minRows: 4, maxRows: 4 }}
              />
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
}

export default Review;
