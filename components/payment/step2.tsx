import { CameraOutlined, WarningFilled } from '@ant-design/icons';
import { Form, Select, Upload } from 'antd';
import Button from '../Button';
import React, { useState } from 'react';

const Step2 = ({ onNext }: any) => {
  const [uploadPembayaran, setUploadPembayaran] = useState(null);

  const handleFileChange = (info: any) => {
    // Pastikan bahwa event memiliki properti 'fileList'
    const fileList = info.fileList;

    // Jika fileList tidak kosong, dapatkan file pertama dari fileList
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      setUploadPembayaran(file);
    }
  };

  //   const handleFileChange = (event: any) => {
  //     const file = event.target.files[0];
  //     setUploadPembayaran(file);
  //   };

  const { Option } = Select;

  interface OptionType {
    value: string;
    label: string;
  }

  const optionsProduk: OptionType[] = [
    { value: 'mandiri', label: 'Mandiri' },
    { value: 'bca', label: 'BCA' },
    { value: 'bni', label: 'BNI' },
    { value: 'bri', label: 'BRI' },
  ];

  const defaultSelectedOptionProduk: OptionType = {
    value: 'mandiri',
    label: 'Mandiri',
  };

  const [selectedOptionProduk, setSelectedOptionProduk] = useState<
    OptionType | undefined
  >(defaultSelectedOptionProduk);

  const handleSelectChangeProduk = (value: string) => {
    const selected = optionsProduk.find((option) => option.value === value);
    setSelectedOptionProduk(selected);
    // setDatas({ ...datas, type: value });
  };
  return (
    <div className='grid gap-y-2 pb-10'>
      <Form>
        <div className='pb-[50px] border-b border-slate-300 mt-[30px]'>
          <div className='produkOwner text-xl font-bold bg-primary rounded-[10px] px-5 flex items-center mb-[30px]'>
            <div className='w-full list-produk'>
              <Form.Item>
                <Select
                  value={selectedOptionProduk?.value}
                  onChange={handleSelectChangeProduk}
                  defaultValue={defaultSelectedOptionProduk.value}
                  className='flex items-center'
                  bordered={false}
                >
                  {optionsProduk.map((option) => (
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
              <div className='text-rstroke font-semibold w-full'>: mandiri</div>
            </div>
            <div className='flex text-xl'>
              <div className='font-bold w-full'>No.Rekening</div>
              <div className='text-rstroke font-semibold w-full'>
                : 0926986416780021
              </div>
            </div>
          </div>
        </div>
        <div className='w-full'>
          <div className='pb-[50px] border-b border-slate-300 mt-[30px]'>
            <div className='grid gap-y-2 grid-cols-1'>
              <div>
                <p className='text-teks text-2xl font-bold'>Bukti Pembayaran</p>
                <p className='text-teks text-md mt-2'>
                  <WarningFilled className='text-[#FFCC00] text-xl pr-2' />
                  Pastikan photo terlihat jelas, agar kami dapat proses dengan cepat
                </p>
              </div>
              <div className='btn-upload'>
                <Form.Item
                  name='photo_ktp'
                  rules={[{ required: true, message: 'Harap masukan foto!' }]}
                >
                  <Upload
                    className='w-full'
                    action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
                    listType='picture'
                    maxCount={1}
                    onChange={handleFileChange}
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
          onClick={uploadPembayaran && onNext}
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
