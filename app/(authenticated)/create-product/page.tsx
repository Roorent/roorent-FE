'use client';

import TypeRadio from '#/components/TypeButton';
import { FEES } from '#/constants/general';
import { cityRepository } from '#/repository/city';
import { productsRepository } from '#/repository/products';
import { toIDR } from '#/utils/convertCurrency';
import {
  ArrowLeftOutlined,
  CameraOutlined,
  CheckCircleFilled,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
  message,
} from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import { RcFile, UploadProps } from 'antd/lib/upload';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

function CreateProduct() {
  const router = useRouter();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [datas, setDatas] = useState<any>({
    name: '',
    type: 'kost',
    stock: 1,
    daily_price: 0,
    monthly_price: 0,
    address: '',
    location: '',
    city: '',
    photo: [],
    specifications: '',
    facilities: '',
    descriptions: '',
    gender: 'campur',
    rules: '',
  });

  const handleCancel = () => setPreviewOpen(false);

  const onFinish = async () => {
    try {
      const dataProducts = {
        name: datas?.name,
        type: datas?.type,
        stock: datas?.stock,
        daily_price: datas?.daily_price,
        monthly_price: datas?.monthly_price,
        address: datas?.address,
        location: datas?.location,
        city: datas?.city,
        photo: datas?.photo,
        specifications: datas?.specifications,
        facilities: datas?.facilities,
        descriptions: datas?.descriptions,
        gender: datas?.gender,
        rules: datas?.rules,
      };

      await productsRepository.manipulatedata.createProducts(dataProducts);

      Modal.success({
        icon: (
          <div className='modal-hapus mb-[10px] flex justify-center'>
            <CheckCircleFilled />
          </div>
        ),
        title: (
          <div className='text-3xl font-bold flex justify-center'>
            Berhasil Buat Produk
          </div>
        ),
        content: (
          <div className='text-xl font-semibold flex justify-center mb-[25px]'>
            Anda telah berhasil membuat produk
          </div>
        ),
      });
      setTimeout(() => router.push('/list-product'), 3000);
    } catch (err: any) {
      message.error('Gagal membuat produk');
    }
  };

  const { data } = cityRepository.hooks.allCity();

  const handleUploadPhoto: UploadProps['onChange'] = async (
    args: UploadChangeParam<UploadFile<any>>
  ) => {
    // Fungsi uploadProducts
    const photoProducts: any = args?.file;
    const maxSize: number = 1024 * 1024 * 2;

    try {
      if (photoProducts.status === 'done') {
        if (
          photoProducts.type === 'image/png' ||
          photoProducts.type === 'image/jpg' ||
          photoProducts.type === 'image/jpeg'
        ) {
          const response =
            await productsRepository.manipulatedata.uploadPhotoProducts(
              photoProducts?.originFileObj
            );

          setDatas({
            ...datas,
            photo: [response.body.filename],
          });
        } else {
          message.error('Anda hanya dapat mengunggah file JPG/JPEG/PNG !');
        }
      } else if (
        photoProducts.status === 'error' &&
        photoProducts.size > maxSize
      ) {
        message.error('ukuran photo produk terlalu besar');
      } else if (photoProducts.status === 'error') {
        message.error('Cek koneksi anda!');
      }

      // Fungsi handleChangeUpload
      const { fileList: newFileList } = args;
      setFileList(newFileList);
    } catch (err: any) {
      message.error(err.response.body?.error);
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    );
  };

  const uploadButton = (
    <div>
      <CameraOutlined className='text-4xl text-primary' />
      <div style={{ marginTop: 5 }} className='text-xl'>
        Masukan Foto
      </div>
      <div className='text-[#BBBBBB]'>Berupa format jpg/jpeg/png.</div>
    </div>
  );

  const { TextArea } = Input;

  interface OptionType {
    value: string;
    label: string;
  }

  const { Option } = Select;

  //get value harga
  const options: OptionType[] = [
    { value: 'campur', label: 'Campur' },
    { value: 'perhari', label: 'Perhari' },
    { value: 'perbulan', label: 'Perbulan' },
  ];

  const [selectedOption, setSelectedOption] = useState<OptionType | undefined>({
    value: 'campur',
    label: 'Campur',
  });

  const [hargaPerHari, setHargaPerHari] = useState<number>(0);
  const [hargaPerBulan, setHargaPerBulan] = useState<number>(0);

  const handleSelectChange: any = (value: string) => {
    const selected = options.find((option) => option.value === value);
    setSelectedOption(selected);
  };

  const handleHargaPerHariChange: any = (value: number) => {
    setHargaPerHari(value);
    setDatas({ ...datas, daily_price: value || 0 });
  };

  const handleHargaPerBulanChange: any = (value: number) => {
    setHargaPerBulan(value);
    setDatas({ ...datas, monthly_price: value || 0 });
  };

  // get value tipe produk
  const optionsProduk: OptionType[] = [
    { value: 'kost', label: 'Kost' },
    { value: 'gedung', label: 'Gedung' },
    { value: 'hotel', label: 'Hotel' },
  ];

  const [selectedOptionProduk, setSelectedOptionProduk] = useState<
    OptionType | undefined
  >({
    value: 'kost',
    label: 'Kost',
  });

  const [adminFee, setAdminFee] = useState({ daily: 0, monthly: 0 });

  const handleSelectChangeProduk = (value: string) => {
    const selected = optionsProduk.find((option) => option.value === value);
    setSelectedOptionProduk(selected);
    setDatas({ ...datas, type: value });
  };

  // const beforeUpload = (file: RcFile) => {
  //   const isJpgOrPng =
  //     file.type === 'image/jpeg' ||
  //     file.type === 'image/png' ||
  //     file.type === 'image/jpg';
  //   if (!isJpgOrPng) {
  //     message.error('Anda hanya dapat mengunggah file JPG/JPEG/PNG!');
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;

  //   if (!isLt2M) {
  //     message.error('Gambar harus lebih kecil dari 2 MB!');
  //   }

  //   return !isJpgOrPng || !isLt2M;
  // };

  const matchingFee = FEES.find(
    (fee) => selectedOptionProduk?.value === fee.name
  );

  useEffect(() => {
    if (matchingFee) {
      const feeDaily = hargaPerHari - (matchingFee.value / 100) * hargaPerHari;
      const feeMonthly =
        hargaPerBulan - (matchingFee.value / 100) * hargaPerBulan;

      setAdminFee({ daily: feeDaily, monthly: feeMonthly });
    }
  }, [matchingFee, hargaPerHari, hargaPerBulan, setAdminFee]);

  const sisaBagiPerhari = hargaPerHari - adminFee.daily;
  const sisaBagiPerbulan = hargaPerBulan - adminFee.monthly;

  return (
    <div>
      <Form name='createProduk'>
        <div className='w-full grid gap-y-[20px] grid-cols-1'>
          <div className='w-full flex items-center gap-x-[20px] grid-cols-1 mb-10'>
            <a
              href='/list-product'
              className='w-fit hover:text-teks flex font-bold text-4xl gap-3'
            >
              <div>
                <ArrowLeftOutlined />
              </div>
            </a>
            <div className='w-full flex justify-center text-4xl font-bold'>
              Tambah Produk
            </div>
          </div>
          <div className='flex gap-x-[70px]'>
            <div className='w-full'>
              <div className='my-4'>
                <p className='mb-4 text-teks text-2xl font-bold'>
                  Kategori Produk
                </p>
                <div>
                  <Form.Item name='type'>
                    <TypeRadio
                      onChange={(e: any) => {
                        handleSelectChangeProduk(e);
                      }}
                      value={selectedOptionProduk?.value}
                      defaultValue={'kost'}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
          <div className='flex gap-x-[70px]'>
            <div className='w-1/2'>
              <div className='my-4'>
                <p className='mb-4 text-teks text-2xl font-bold'>Foto Produk</p>
                <div>
                  <Form.Item
                    name='photo'
                    rules={[
                      {
                        required: true,
                        message: 'Harap masukan foto produk!',
                      },
                    ]}
                  >
                    <Upload
                      action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
                      listType='picture-card'
                      fileList={fileList}
                      multiple={true}
                      onPreview={handlePreview}
                      onChange={handleUploadPhoto}
                      // beforeUpload={beforeUpload}
                    >
                      {fileList.length >= 10 ? null : uploadButton}
                    </Upload>
                    <Modal
                      open={previewOpen}
                      title={previewTitle}
                      footer={null}
                      onCancel={handleCancel}
                    >
                      <img
                        alt='Produk'
                        style={{ width: '100%' }}
                        src={previewImage}
                      />
                    </Modal>
                  </Form.Item>
                </div>
              </div>
              <div className='my-4'>
                <p className='mb-4 text-teks text-2xl font-bold'>Nama Produk</p>
                <div>
                  <Form.Item
                    name='name'
                    rules={[
                      {
                        required: true,
                        message: 'Harap masukan nama produk!',
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setDatas({ ...datas, name: e.target.value });
                      }}
                      size='small'
                      placeholder='Masukan nama produk'
                      className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl'
                    />
                  </Form.Item>
                </div>
              </div>
              {selectedOptionProduk?.value !== 'gedung' ? (
                <div className='my-4'>
                  <p className='mb-4 text-teks text-2xl font-bold'>
                    Stok Kamar
                  </p>
                  <div>
                    <Form.Item name='stock'>
                      <InputNumber
                        style={{ width: '100%' }}
                        size='small'
                        min={1}
                        max={10000}
                        defaultValue={1}
                        className=' py-[10px] px-[3px] rounded-[10px] border border-rstroke regis text-xl'
                        onChange={(e) => {
                          setDatas({ ...datas, stock: e || 1 });
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div className='my-4'>
                <p className='mb-4 text-teks text-2xl font-bold'>Alamat</p>
                <div className='textarea-produk'>
                  <Form.Item
                    name='address'
                    rules={[
                      {
                        required: true,
                        message: 'Harap masukan alamat produk!',
                      },
                    ]}
                  >
                    <TextArea
                      showCount
                      maxLength={225}
                      placeholder='Masukan alamat produk'
                      style={{
                        height: 120,
                        resize: 'none',
                        fontSize: '20px',
                      }}
                      onChange={(e) => {
                        setDatas({ ...datas, address: e.target.value });
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='my-4'>
                <p className='mb-4 text-teks text-2xl font-bold'>Kota</p>
                <div className='create-produk'>
                  <Form.Item
                    name='city'
                    rules={[
                      {
                        required: true,
                        message: 'Harap masukan kota!',
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder='Pilih kota'
                      filterOption={filterOption}
                      options={data?.data.map((val: any) => {
                        return {
                          value: val.name,
                          label: val.name,
                        };
                      })}
                      onChange={(e) => {
                        setDatas({ ...datas, city: e });
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='my-4'>
                <p className='mb-4 text-teks text-2xl font-bold'>Lokasi</p>
                <div>
                  <Form.Item
                    name='location'
                    rules={[
                      {
                        required: true,
                        message: 'Harap masukan lokasi produk!',
                      },
                    ]}
                  >
                    <Input
                      size='small'
                      placeholder='Masukan link google maps'
                      className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl'
                      onChange={(e) => {
                        setDatas({ ...datas, location: e.target.value });
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='text-xl border border-slate-300 rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                <div className='mr-5'>
                  <ExclamationCircleFilled className='text-3xl text-primary' />
                </div>
                <div className='w-full'>
                  <p className='w-full '>
                    Pastikan anda memasukan link lokasi dengan benar
                  </p>
                </div>
              </div>
            </div>
            <div className='w-1/2'>
              <div className='my-4'>
                <p className='mb-4 text-teks text-2xl font-bold'>
                  Spesifikasi Produk
                </p>
                <div className='textarea-produk'>
                  <Form.Item
                    name='specifications'
                    rules={[
                      {
                        required: true,
                        message: 'Harap masukan spesifikasi produk!',
                      },
                    ]}
                  >
                    <TextArea
                      showCount
                      maxLength={225}
                      placeholder='Masukan spesifikasi produk '
                      style={{
                        height: 120,
                        resize: 'none',
                        fontSize: '20px',
                      }}
                      onChange={(e) => {
                        setDatas({ ...datas, specifications: e.target.value });
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='my-4'>
                <p className='mb-4 text-teks text-2xl font-bold'>
                  Deskripsi Produk
                </p>
                <div className='textarea-produk'>
                  <Form.Item
                    name='descriptions'
                    rules={[
                      {
                        required: true,
                        message: 'Harap masukan deskripsi produk!',
                      },
                    ]}
                  >
                    <TextArea
                      showCount
                      maxLength={225}
                      placeholder='Masukan deskripsi produk'
                      style={{
                        height: 175,
                        resize: 'none',
                        fontSize: '20px',
                      }}
                      onChange={(e) => {
                        setDatas({ ...datas, descriptions: e.target.value });
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='my-4'>
                <p className='mb-4 text-teks text-2xl font-bold'>Fasilitas</p>
                <div className='textarea-produk'>
                  <Form.Item
                    name='facilities'
                    rules={[
                      {
                        required: true,
                        message: 'Harap masukan fasilitas produk!',
                      },
                    ]}
                  >
                    <TextArea
                      showCount
                      maxLength={225}
                      placeholder='Masukan fasilitas produk '
                      style={{
                        height: 120,
                        resize: 'none',
                        fontSize: '20px',
                      }}
                      onChange={(e) => {
                        setDatas({ ...datas, facilities: e.target.value });
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
              {selectedOptionProduk?.value === 'gedung' ||
              selectedOptionProduk?.value === 'hotel' ? (
                <></>
              ) : (
                <div className='my-4'>
                  <p className='mb-4 text-teks text-2xl font-bold'>Tipe Kost</p>
                  <div className='w-full create-produk'>
                    <Form.Item name='gender'>
                      <Select
                        // placeholder='Pilih Tipe'
                        style={{ width: '100%' }}
                        defaultValue={'campur'}
                        options={[
                          { value: 'campur', label: 'Campur' },
                          { value: 'pria', label: 'Pria' },
                          { value: 'wanita', label: 'Wanita' },
                        ]}
                        onChange={(e) => {
                          setDatas({ ...datas, gender: e });
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>
              )}
              <div className='my-4'>
                <p className='mb-4 text-teks text-2xl font-bold'>Peraturan</p>
                <div className='textarea-produk'>
                  <Form.Item
                    name='rules'
                    rules={[
                      {
                        required: true,
                        message: 'Harap masukan catatan pemilik!',
                      },
                    ]}
                  >
                    <TextArea
                      showCount
                      maxLength={225}
                      placeholder='Masukan catatan pemilik'
                      style={{
                        height: 160,
                        resize: 'none',
                        fontSize: '20px',
                      }}
                      onChange={(e) => {
                        setDatas({ ...datas, rules: e.target.value });
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
          <div className='flex gap-x-[70px]'>
            <div className='w-full'>
              <div className='my-4'>
                {selectedOptionProduk?.value === 'kost' && (
                  <>
                    <div className='w-full'>
                      <div className='w-full mb-7'>
                        <p className='text-teks text-2xl font-bold'>
                          Tipe Harga
                        </p>
                      </div>
                      <div className='w-full list-produk my-4'>
                        <Form.Item>
                          <Select
                            value={selectedOption?.value}
                            onChange={handleSelectChange}
                            className='flex items-center'
                          >
                            {options.map((option) => (
                              <Option key={option.value} value={option.value}>
                                {option.label}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    {selectedOption?.value === 'perhari' && (
                      <div className='my-4'>
                        <p className='mb-4 text-teks text-2xl font-bold'>
                          Harga Perhari
                        </p>
                        <div>
                          <Form.Item
                            name='daily_price'
                            rules={[
                              {
                                required: true,
                                message: 'Harap masukan harga produk!',
                              },
                            ]}
                          >
                            <InputNumber
                              style={{ width: '100%' }}
                              size='small'
                              prefix='Rp.'
                              defaultValue={0}
                              placeholder='Masukan Harga'
                              min={1000}
                              className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl items-center'
                              value={hargaPerHari}
                              onChange={handleHargaPerHariChange}
                            />
                          </Form.Item>
                        </div>
                        {hargaPerHari === 0 ? (
                          <div className='text-xl border border-slate-300 rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                            <div className='mr-5'>
                              <ExclamationCircleFilled className='text-3xl text-primary' />
                            </div>
                            <div className='w-full'>
                              <p className='w-full '>
                                Harga akan di kenakan biaya admin sebesar 5%
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className='my-4'>
                            <p className='mb-4 text-teks text-2xl font-bold'>
                              Rincian Harga
                            </p>
                            <div className='text-xl border border-slate-300 rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                              <div className='w-full text-xl'>
                                <div className='grid gap-y-3 pb-5 border-b border-slate-300'>
                                  <div className='flex'>
                                    <p className='w-1/2'>Harga input :</p>
                                    <p className='w-1/2 flex justify-center underline-offset-2'>
                                      {toIDR(hargaPerHari)}
                                    </p>
                                  </div>
                                  <div className='flex'>
                                    <p className='w-1/2 '>Biaya admin 5% :</p>
                                    <p className='w-1/2 flex justify-center text-merah font-bold'>
                                      -{toIDR(sisaBagiPerhari)}
                                    </p>
                                  </div>
                                </div>
                                <div className='flex mt-3'>
                                  <p className='w-1/2 font-bold'>Total</p>
                                  <p className='w-1/2 flex justify-center font-bold'>
                                    {toIDR(adminFee.daily)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {selectedOption?.value === 'perbulan' && (
                      <div className='my-4'>
                        <p className='mb-4 text-teks text-2xl font-bold'>
                          Harga Perbulan
                        </p>
                        <div>
                          <Form.Item
                            name='monthly_price'
                            rules={[
                              {
                                required: true,
                                message: 'Harap masukan harga produk!',
                              },
                            ]}
                          >
                            <InputNumber
                              style={{ width: '100%' }}
                              size='small'
                              defaultValue={0}
                              placeholder='Masukan Harga'
                              prefix='Rp.'
                              min={1000}
                              className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl items-center'
                              value={hargaPerBulan}
                              onChange={handleHargaPerBulanChange}
                            />
                          </Form.Item>
                        </div>
                        {hargaPerBulan === 0 ? (
                          <div className='text-xl border border-slate-300 rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                            <div className='mr-5'>
                              <ExclamationCircleFilled className='text-3xl text-primary' />
                            </div>
                            <div className='w-full'>
                              <p className='w-full '>
                                Harga akan di kenakan biaya admin sebesar 5%
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className='my-4'>
                            <p className='mb-4 text-teks text-2xl font-bold'>
                              Rincian Harga
                            </p>
                            <div className='text-xl border border-slate-300 rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                              <div className='w-full text-xl'>
                                <div className='grid gap-y-3 pb-5 border-b border-slate-300'>
                                  <div className='flex'>
                                    <p className='w-1/2'>Harga input :</p>
                                    <p className='w-1/2 flex justify-center underline-offset-2'>
                                      {toIDR(hargaPerBulan)}
                                    </p>
                                  </div>
                                  <div className='flex'>
                                    <p className='w-1/2 '>Biaya admin 5% :</p>
                                    <p className='w-1/2 flex justify-center text-merah font-bold'>
                                      -{toIDR(sisaBagiPerbulan)}
                                    </p>
                                  </div>
                                </div>
                                <div className='flex mt-3'>
                                  <p className='w-1/2 font-bold'>Total</p>
                                  <p className='w-1/2 flex justify-center font-bold'>
                                    {toIDR(adminFee.monthly)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {selectedOption?.value === 'campur' && (
                      <>
                        <div className='flex gap-[70px]'>
                          <div className='w-1/2 my-4'>
                            <p className='mb-4 text-teks text-2xl font-bold'>
                              Harga Perhari
                            </p>
                            <div>
                              <Form.Item
                                name='daily_price'
                                rules={[
                                  {
                                    required: true,
                                    message: 'Harap masukan harga produk!',
                                  },
                                ]}
                              >
                                <InputNumber
                                  style={{ width: '100%' }}
                                  size='small'
                                  defaultValue={0}
                                  placeholder='Masukan harga'
                                  prefix='Rp.'
                                  min={1000}
                                  className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl items-center'
                                  value={hargaPerHari}
                                  onChange={handleHargaPerHariChange}
                                />
                              </Form.Item>
                            </div>
                            {hargaPerHari === 0 ? (
                              <div className='text-xl border border-slate-300 rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                                <div className='mr-5'>
                                  <ExclamationCircleFilled className='text-3xl text-primary' />
                                </div>
                                <div className='w-full'>
                                  <p className='w-full '>
                                    Harga akan di kenakan biaya admin sebesar 5%
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className='my-4'>
                                <p className='mb-4 text-teks text-2xl font-bold'>
                                  Rincian Harga
                                </p>
                                <div className='text-xl border border-slate-300 rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                                  <div className='w-full text-xl'>
                                    <div className='grid gap-y-3 pb-5 border-b border-slate-300'>
                                      <div className='flex'>
                                        <p className='w-1/2'>Harga input :</p>
                                        <p className='w-1/2 flex justify-center underline-offset-2'>
                                          {toIDR(hargaPerHari)}
                                        </p>
                                      </div>
                                      <div className='flex'>
                                        <p className='w-1/2 '>
                                          Biaya admin 5% :
                                        </p>
                                        <p className='w-1/2 flex justify-center text-merah font-bold'>
                                          -{toIDR(sisaBagiPerhari)}
                                        </p>
                                      </div>
                                    </div>
                                    <div className='flex mt-3'>
                                      <p className='w-1/2 font-bold'>Total</p>
                                      <p className='w-1/2 flex justify-center font-bold'>
                                        {toIDR(adminFee.daily)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className='w-1/2 my-4'>
                            <p className='mb-4 text-teks text-2xl font-bold'>
                              Harga Perbulan
                            </p>
                            <div>
                              <Form.Item
                                name='monthly_price'
                                rules={[
                                  {
                                    required: true,
                                    message: 'Harap masukan harga produk!',
                                  },
                                ]}
                              >
                                <InputNumber
                                  style={{ width: '100%' }}
                                  size='small'
                                  defaultValue={0}
                                  placeholder='Masukan harga'
                                  prefix='Rp.'
                                  min={1000}
                                  className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl items-center'
                                  value={hargaPerBulan}
                                  onChange={handleHargaPerBulanChange}
                                />
                              </Form.Item>
                            </div>
                            {hargaPerBulan === 0 ? (
                              <div className='text-xl border border-slate-300 rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                                <div className='mr-5'>
                                  <ExclamationCircleFilled className='text-3xl text-primary' />
                                </div>
                                <div className='w-full'>
                                  <p className='w-full '>
                                    Harga akan di kenakan biaya admin sebesar 5%
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className='my-4'>
                                <p className='mb-4 text-teks text-2xl font-bold'>
                                  Rincian Harga
                                </p>
                                <div className='text-xl border border-slate-300 rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                                  <div className='w-full text-xl'>
                                    <div className='grid gap-y-3 pb-5 border-b border-slate-300'>
                                      <div className='flex'>
                                        <p className='w-1/2'>Harga input :</p>
                                        <p className='w-1/2 flex justify-center underline-offset-2'>
                                          {toIDR(hargaPerBulan)}
                                        </p>
                                      </div>
                                      <div className='flex'>
                                        <p className='w-1/2 '>
                                          Biaya admin 5% :
                                        </p>
                                        <p className='w-1/2 flex justify-center text-merah font-bold'>
                                          -{toIDR(sisaBagiPerbulan)}
                                        </p>
                                      </div>
                                    </div>
                                    <div className='flex mt-3'>
                                      <p className='w-1/2 font-bold'>Total</p>
                                      <p className='w-1/2 flex justify-center font-bold'>
                                        {toIDR(adminFee.monthly)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
                {selectedOptionProduk?.value === 'gedung' && (
                  <>
                    <div className='my-4'>
                      <p className='mb-4 text-teks text-2xl font-bold'>
                        Harga Produk
                      </p>
                      <div>
                        <Form.Item
                          name='daily_price'
                          rules={[
                            {
                              required: true,
                              message: 'Harap masukan harga produk!',
                            },
                          ]}
                        >
                          <InputNumber
                            style={{ width: '100%' }}
                            size='small'
                            defaultValue={0}
                            placeholder='Masukan harga'
                            prefix='Rp.'
                            min={1000}
                            className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl items-center'
                            value={hargaPerHari}
                            onChange={handleHargaPerHariChange}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    {hargaPerHari === 0 ? (
                      <div className='text-xl border border-slate-300 rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                        <div className='mr-5'>
                          <ExclamationCircleFilled className='text-3xl text-primary' />
                        </div>
                        <div className='w-full'>
                          <p className='w-full '>
                            Harga akan di kenakan biaya admin sebesar 10%
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className='my-4'>
                        <p className='mb-4 text-teks text-2xl font-bold'>
                          Rincian Harga
                        </p>
                        <div className='text-xl border border-slate-300 rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                          <div className='w-full text-xl'>
                            <div className='grid gap-y-3 pb-5 border-b border-slate-300'>
                              <div className='flex'>
                                <p className='w-1/2'>Harga input :</p>
                                <p className='w-1/2 flex justify-center underline-offset-2'>
                                  {toIDR(hargaPerHari)}
                                </p>
                              </div>
                              <div className='flex'>
                                <p className='w-1/2 '>Biaya admin 5% :</p>
                                <p className='w-1/2 flex justify-center text-merah font-bold'>
                                  -{toIDR(sisaBagiPerhari)}
                                </p>
                              </div>
                            </div>
                            <div className='flex mt-3'>
                              <p className='w-1/2 font-bold'>Total</p>
                              <p className='w-1/2 flex justify-center font-bold'>
                                {toIDR(adminFee.daily)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {selectedOptionProduk?.value === 'hotel' && (
                  <>
                    <div className='my-4'>
                      <p className='mb-4 text-teks text-2xl font-bold'>
                        Harga Produk
                      </p>
                      <div>
                        <Form.Item
                          name='daily_price'
                          rules={[
                            {
                              required: true,
                              message: 'Harap masukan harga produk!',
                            },
                          ]}
                        >
                          <InputNumber
                            style={{ width: '100%' }}
                            size='small'
                            placeholder='Masukan harga'
                            defaultValue={0}
                            prefix='Rp.'
                            min={1000}
                            className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl items-center'
                            value={hargaPerHari}
                            onChange={handleHargaPerHariChange}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    {hargaPerHari === 0 ? (
                      <div className='text-xl border border-slate-300 rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                        <div className='mr-5'>
                          <ExclamationCircleFilled className='text-3xl text-primary' />
                        </div>
                        <div className='w-full'>
                          <p className='w-full '>
                            Harga akan di kenakan biaya admin sebesar 10%
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className='my-4'>
                        <p className='mb-4 text-teks text-2xl font-bold'>
                          Rincian Harga
                        </p>
                        <div className='text-xl border border-slate-300 rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                          <div className='w-full text-xl'>
                            <div className='grid gap-y-3 pb-5 border-b border-slate-300'>
                              <div className='flex'>
                                <p className='w-1/2'>Harga input :</p>
                                <p className='w-1/2 flex justify-center underline-offset-2'>
                                  {toIDR(hargaPerHari)}
                                </p>
                              </div>
                              <div className='flex'>
                                <p className='w-1/2 '>Biaya admin 5% :</p>
                                <p className='w-1/2 flex justify-center text-merah font-bold'>
                                  -{toIDR(sisaBagiPerhari)}
                                </p>
                              </div>
                            </div>
                            <div className='flex mt-3'>
                              <p className='w-1/2 font-bold'>Total</p>
                              <p className='w-1/2 flex justify-center font-bold'>
                                {toIDR(adminFee.daily)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                block
                className='bg-primary border border-white !rounded-full text-2xl font-bold py-3 h-max'
                onClick={onFinish}
              >
                Simpan
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default CreateProduct;
