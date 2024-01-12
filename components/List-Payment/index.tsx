import React, { useState } from 'react';
import Button from '../Button';
import { Form, Image, Input, Modal, message } from 'antd';
import { toIDR } from '#/utils/convertCurrency';
import { convertDate, toHours } from '#/utils/convertTime';
import { imgTransProof } from '#/constants/general';
import { TransactionRepository } from '#/repository/transaction';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

function ListPayment({
  tanggal,
  waktu,
  buktiPembayaran,
  renter,
  namaProduk,
  biayaSewa,
  lamaSewa,
  totalPembayaran,
  status,
  idTransaction,
  mutate,
}: any) {
  const { confirm } = Modal;
  const [reason, setReason] = useState('');
  const [form] = Form.useForm()

  const handleReason = (value: any) => {
    setReason(value);
  };

  const reasonForm = (
    <Form name='reason' layout='vertical' autoComplete='off' form={form}>
      <Form.Item
        name='reason'
        label={<span className='text-lg'>Alasan :</span>}
        rules={[
          {
            required: true,
            message: 'Masukkan alasan',
          },
        ]}
      >
        <Input.TextArea
          placeholder='Masukkan alasan'
          rows={4}
          onChange={(e) => setReason(e.target.value)}
          value={reason}
        />
      </Form.Item>
    </Form>
  );

  const showModal = () => {
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
          <div className='w-full'>{reasonForm}</div>
        </div>
      ),
      icon: <></>,
      async onOk() {
        try {
          if ( form.getFieldValue('reason')) {
            const statusReject = { status: 'reject', reason: form.getFieldValue('reason')};
            const reject =
              await TransactionRepository.manipulatedata.transactionsApp(
                idTransaction,
                statusReject
              );
            mutate(reject);
          } else {
            message.error('Harap masukkan alasan penolakan!');
          }
        } catch (err: any) {
          message.error(err);
        }
      },
      onCancel() {
        setReason('');
      },
      okText: (
        <div className='modal-hapus text-xl font-bold text-white'>Simpan</div>
      ),
      cancelText: (
        <div className='modal-hapus text-xl font-bold text-white'>Batal</div>
      ),
      // okButtonProps: {
      //   disabled: isOKButtonDisabled,
      // },
    });
  };

  const handleApprove = async () => {
    try {
      const statusApprove = { status: 'approve', reason: null };
      const appprove =
        await TransactionRepository.manipulatedata.transactionsApp(
          idTransaction,
          statusApprove
        );
      mutate(appprove);
    } catch (error) {
      console.error('Error approving owner:', error);
    }
  };

  return (
    <div>
      <div
        className='grid gap-y-[25px] border border-slate-300 rounded-[10px] p-5'
        style={{
          boxShadow: '0 -1px 4px rgba(0,0,0,.04), 0 4px 8px rgba(0,0,0,.08)',
        }}
      >
        <div className='flex justify-between pb-5 border-b border-slate-300'>
          <div className='flex font-[650] gap-x-3 text-xl'>
            <p className=''>Tanggal :</p>
            <p className='font-semibold text-rstroke'>{convertDate(tanggal)}</p>
          </div>
          <div className='flex font-[650] gap-x-3 text-xl'>
            <p className=''>Waktu :</p>
            <p className='font-semibold text-rstroke'>{toHours(waktu)}</p>
          </div>
        </div>
        <div className='flex pb-5 border-b border-slate-300'>
          <div className='w-1/2 h-[304px]'>
            <Image
              src={imgTransProof(buktiPembayaran)}
              alt='Bukti Pembayaran'
              className='object-cover object-center !h-[300px] rounded-xl'
            />
          </div>
          <div className='w-1/2 grid'>
            <div className='flex font-semibold text-2xl'>
              <p>Dari</p>
              <div className='font-semibold flex text-2xl'>
                <p className='mr-2'>:</p>
                <p>{renter}</p>
              </div>
            </div>
            <div className='flex font-semibold gap-x-3 text-2xl h-fit'>
              <p className='line-clamp-5'>{namaProduk}</p>
            </div>
            <div className='grid gap-y-[2px] grid-cols-1 font-semibold text-rstroke pt-2'>
              <div className='flex text-2xl justify-between'>
                <div>Biaya sewa</div>
                <div className=' underline underline-offset-2'>
                  {toIDR(biayaSewa)}
                </div>
              </div>
              <div className='flex text-2xl justify-between'>
                <div>Lama Sewa</div>
                <div className='flex gap-2'>
                  <p className=' underline underline-offset-2'>
                    {lamaSewa} Bulan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-between font-[650] text-2xl'>
          <div className='text-3xl'>Total Pembayaran</div>
          <div>{toIDR(totalPembayaran)}</div>
        </div>
        {status === 'pending' ? (
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
              <Button
                className='!py-3 !mt-0 !font-semibold !text-2xl'
                onClick={handleApprove}
              >
                Konfirmasi
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {status === 'approve' && (
              <div className='text-2xl bg-[#19B929] text-white font-bold rounded-[10px] px-2 py-2.5 flex items-center justify-center'>
                <div className='mr-5'>
                  <CheckCircleFilled className='text-4xl' />
                </div>
                <p>Terkonfirmasi</p>
              </div>
            )}
            {status === 'reject' && (
              <div className='text-2xl bg-merah text-white font-bold rounded-[10px] px-3 py-2.5 flex items-center justify-center'>
                <div className='mr-5'>
                  <CloseCircleFilled className='text-4xl' />
                </div>
                <p>Ditolak</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListPayment;
