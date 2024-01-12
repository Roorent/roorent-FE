import { CameraOutlined, ExclamationCircleFilled} from '@ant-design/icons';
import { Form, Select, Upload, message } from 'antd';
import Button from '../Button';
import React, { useState } from 'react';
import { UploadFile } from 'antd/lib';
import { TransactionRepository } from '#/repository/transaction';
import { useSearchParams } from 'next/navigation';
import { RcFile } from 'antd/es/upload';

const Step2 = ({ onNext, datas }: any) => {
  const searchParams = useSearchParams();
  const rentAppId: any = searchParams?.get('id');

  const { Option } = Select;

  interface OptionType {
    bank_id: any;
    value: string;
    label: string;
    name: string;
    number: string;
  }

  const [uploadPembayaran, setUploadPembayaran] = useState<UploadFile[]>([]);
  const [photoTransactions, setPhotoTransactions] = useState<
    UploadFile<any> | any
  >();
  const [bank, setBank] = useState<OptionType | undefined>({
    bank_id: datas?.adm_bank[0].id,
    value: datas?.adm_bank[0].bank_name.toLowerCase(),
    label: datas?.adm_bank[0].bank_name,
    name: datas?.adm_bank[0].acc_name,
    number: datas?.adm_bank[0].acc_number,
  });

  const optionsBank: OptionType[] = datas?.adm_bank.map((item: any) => {
    return {
      bank_id: item.id,
      value: item.bank_name.toLowerCase(),
      label: item.bank_name,
      name: item.acc_name,
      number: item.acc_number,
    };
  });

  const selectBank = (value: string) => {
    const selected = optionsBank.find((option) => option.value === value);
    setBank(selected);
  };

  const handleUpload = async () => {
    try {
      if (photoTransactions.status === 'done') {
        if (photoTransactions?.size > 2097152) {
          message.error('ukuran photoTransactions terlalu besar');
        } else {
          if (
            photoTransactions.type === 'image/png' ||
            photoTransactions.type === 'image/jpg' ||
            photoTransactions.type === 'image/jpeg'
          ) {
            const response =
              await TransactionRepository.manipulatedata.uploadPayment(
                photoTransactions?.originFileObj
              );

            const sendData: any = {
              transaction_proof: response.body.filename,
              bank_id: bank?.bank_id,
            };
            setUploadPembayaran(photoTransactions);

            await TransactionRepository.manipulatedata.createTransactionRenter(
              rentAppId,
              sendData
            );
          } else {
            message.error('Anda hanya dapat mengunggah file JPG/JPEG/PNG!');
          }
        }
      }

      uploadPembayaran && onNext();
    } catch (err: any) {
      message.error('File tidak ditemukan!');
    }
  };

  // const beforeUpload = (file: RcFile) => {
  //   const isJpgOrPng =
  //     file.type === 'image/jpeg' ||
  //     file.type === 'image/png' ||
  //     file.type === 'image/jpg';
  //   if (!isJpgOrPng) {
  //     message.error('Anda hanya dapat mengunggah file JPG/JPEG/PNG!');
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2 ;

  //   if (!isLt2M) {
  //     message.error('Gambar harus lebih kecil dari 2 MB!');
  //   }

  //   return !isJpgOrPng || !isLt2M;
  // };
  return (
    <div className='grid gap-y-2 pb-10'>
      <Form>
        <div className='pb-[50px] border-b border-slate-300 mt-[30px]'>
          <div className='produkOwner text-xl font-bold bg-primary rounded-[10px] px-5 flex items-center mb-[30px]'>
            <div className='w-full list-produk'>
              <Form.Item>
                <Select
                  value={bank?.value}
                  onChange={selectBank}
                  className='flex items-center'
                  bordered={false}
                >
                  {optionsBank.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className='grid gap-y-5'>
            <div className='flex text-xl'>
              <div className='font-bold w-full'>Bank</div>
              <div className='text-rstroke font-semibold w-full'>
                : {bank?.label}
              </div>
            </div>
            <div className='flex text-xl'>
              <div className='font-bold w-full'>Nama</div>
              <div className='text-rstroke font-semibold w-full'>
                : {bank?.name}
              </div>
            </div>
            <div className='flex text-xl'>
              <div className='font-bold w-full'>No.Rekening</div>
              <div className='text-rstroke font-semibold w-full'>
                : {bank?.number}
              </div>
            </div>
          </div>
        </div>
        <div className='w-full'>
          <div className='pb-[50px] border-b border-slate-300 mt-[30px]'>
            <div className='grid gap-y-2 grid-cols-1'>
              <div className='grid gap-y-2'>
                <p className='text-teks text-2xl font-bold'><span className='text-merah mr-2'>*</span>Bukti Pembayaran</p>
                <p className='text-teks text-md mt-2'>
                  <ExclamationCircleFilled className='text-primary text-xl pr-2' />
                  Pastikan photo terlihat jelas, agar kami dapat proses dengan
                  cepat
                </p>
              </div>
              <div className='btn-upload'>
                <Form.Item
                  name='payment'
                  rules={[{ required: true, message: 'Harap masukan foto!' }]}
                >
                  <Upload
                    className='w-full'
                    action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
                    listType='picture'
                    maxCount={1}
                    // beforeUpload={beforeUpload}
                    // onChange={handleUpload}
                    onChange={(info: any) => {
                      setPhotoTransactions(info?.file);
                    }}
                  >
                    <Button className='!bg-transparent !text-primary !p-[10px] !rounded-[10px] !border-rstroke !text-xl !h-max btn-upload !border-dashed !border hover:!border-primary'>
                      <div className='p-5'>
                        <div className='flex justify-center'>
                          <CameraOutlined className='text-5xl mb-3' />
                        </div>
                        <div>Upload di sini</div>
                      </div>
                    </Button>
                  </Upload>
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
      </Form>
      <div>
        <Button
          onClick={handleUpload}
          disabled={!uploadPembayaran}
          className='!text-white !font-bold !py-3 !text-2xl'
        >
          Bayar
        </Button>
      </div>
    </div>
  );
};

export default Step2;
