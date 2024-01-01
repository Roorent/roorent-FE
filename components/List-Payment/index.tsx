import React, { useState } from 'react';
import Button from '../Button';
import { Form, Image, Input, Modal } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

function ListPayment({
  tanggal,
  waktu,
  buktiPembayaran,
  renter,
  namaProduk,
  biayaSewa,
  biayaAdmin,
  totalPembayaran,
}: any) {
  const { confirm } = Modal;
  const showModal = () => {
    // setIsModalOpen(true);
    confirm({
      title: (
        <div className='text-3xl font-bold flex justify-center'>
          Menolak Pembayaran
        </div>
      ),
      content: (
        <div className='w-full text-xl font-semibold grid gap-y-5 mb-[25px]'>
          <div className='flex justify-center'>
            Berikan Alasan Menolak Pembayaran
          </div>
          <div className='w-full'>
            <Form name='trigger' layout='vertical' autoComplete='off'>
              <Form.Item
                name='reason'
                label={<span className='text-lg'>Alasan :</span>}
                className=''
              >
                <Input.TextArea placeholder='Masukkan alasan' rows={4} />
              </Form.Item>
            </Form>
          </div>
        </div>
      ),
      icon: (
        <></>
      ),
      okText:(
        <div className='modal-hapus text-xl font-bold text-white'>Simpan</div>
      ),
      cancelText: (
        <div className='modal-hapus text-xl font-bold text-white'>Batal</div>
      ),
      // onOk() {
      //   setLoading(true);
      //   data.then((del: any) => {
      //     return del;
      //   });
      //   //disini panggil mutate nya
      //   mutate;
      //   setLoading(false);
      //   // router.refresh()
      // },
      // onCancel() {
      //   console.log('Cancel');
      // },
    });
  };
  return (
    <div>
      <div
        className='grid gap-y-[25px] border border-slate-300 rounded-[10px] p-5 mt-[30px]'
        style={{
          boxShadow: '0 -1px 4px rgba(0,0,0,.04), 0 4px 8px rgba(0,0,0,.08)',
        }}
      >
        <div className='flex justify-between pb-5 border-b border-slate-300'>
          <div className='flex font-[650] gap-x-3 text-xl'>
            <p className=''>Tanggal :</p>
            <p className='font-semibold text-rstroke'>{tanggal}</p>
          </div>
          <div className='flex font-[650] gap-x-3 text-xl'>
            <p className=''>Waktu :</p>
            <p className='font-semibold text-rstroke'>{waktu}</p>
          </div>
        </div>
        <div className='flex pb-5 border-b border-slate-300'>
          <div className='w-1/2 h-[304px]'>
            <Image
              src={buktiPembayaran}
              alt='Bukti Pembayaran'
              className='object-cover object-center w-full h-full rounded-xl'
            />
            {/* <img
              src={buktiPembayaran}
              alt='Bukti Pembayaran'
              className='object-cover object-center w-full h-full rounded-xl'
            /> */}
          </div>
          <div className='w-1/2 grid '>
            <div className='flex font-semibold text-2xl'>
              <p>Dari</p>
              <div className='font-semibold flex font-semibold text-2xl'>
                <p className='mr-2'>:</p>
                <p>{renter}</p>
              </div>
            </div>
            <div className='flex font-semibold gap-x-3 text-2xl h-fit'>
              <p className='line-clamp-5'>{namaProduk}</p>
            </div>
            <div className='grid gap-y-[2px] grid-cols-1 font-semibold text-rstroke underline underline-offset-2 pt-2'>
              <div className='flex text-2xl justify-between'>
                <div>Biaya sewa</div>
                <div>Rp.{biayaSewa}</div>
              </div>
              <div className='flex text-2xl justify-between'>
                <div>Biaya Admin</div>
                <div className='flex gap-2'>
                  <p>Rp.{biayaAdmin}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-between font-[650] text-2xl'>
          <div className='text-3xl'>Total Pembayaran</div>
          <div>Rp.{totalPembayaran}</div>
        </div>
        <div className='flex gap-x-5'>
          <div className='w-full'>
            <Button
              onClick={showModal}
              className='!py-3 !mt-0 !font-semibold !text-2xl !bg-merah hover:!bg-[#e24444]'
            >
              Tolak
            </Button>
          </div>
          <div className='w-full'>
            <Button className='!py-3 !mt-0 !font-semibold !text-2xl'>
              Konfirmasi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPayment;
