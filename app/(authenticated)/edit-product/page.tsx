'use client';

import React, { useEffect, useState } from 'react';
import { productsRepository } from '#/repository/products';
import {
  ArrowLeftOutlined,
  CameraOutlined,
  CheckCircleFilled,
  ExclamationCircleFilled,
  HomeFilled,
} from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Upload,
  message,
} from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import { RcFile, UploadProps } from 'antd/lib/upload';
import { useRouter, useSearchParams } from 'next/navigation';
import { Icon } from '@iconify/react';
import { FEES, imgProduct } from '#/constants/general';
import { toIDR } from '#/utils/convertCurrency';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function EditProduct() {
  const searchParams = useSearchParams();
  const productId = searchParams?.get('id');

  const router = useRouter();
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [photoProductsArray, setPhotoProducts] = useState<string[] | []>([]);

  const { data, error, isLoading } =
    productsRepository.hooks.getProductsById(productId);

  const handleCancel = () => setPreviewOpen(false);

  const [datas, setDatas] = useState({
    name: '',
    type: 'kost',
    stock: 1,
    daily_price: 0,
    monthly_price: 0,
    address: '',
    location: '',
    specifications: '',
    facilities: '',
    descriptions: '',
    gender: 'campur',
    rules: '',
  });

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
        photo: photoProductsArray,
        specifications: datas?.specifications,
        facilities: datas?.facilities,
        descriptions: datas?.descriptions,
        gender: datas?.gender,
        rules: datas?.rules,
      };

      await productsRepository.manipulatedata.updateProducts(
        productId,
        dataProducts
      );

      Modal.success({
        icon: (
          <div className='modal-hapus mb-[10px] flex justify-center'>
            <CheckCircleFilled />
          </div>
        ),
        title: (
          <div className='text-3xl font-bold flex justify-center'>
            Berhasil Edit Produk
          </div>
        ),
        content: (
          <div className='text-xl font-semibold flex justify-center mb-[25px]'>
            Anda telah berhasil mengubah produk
          </div>
        ),
      });
      setTimeout(() => (window.location.href = '/list-product'), 3000);
    } catch (err: any) {
      message.error('Gagal mengubah produk');
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setDatas({
        name: data?.data?.name,
        type: data?.data?.type,
        stock: data?.data?.stock,
        daily_price: data?.data?.daily_price,
        monthly_price: data?.data?.monthly_price,
        address: data?.data?.address,
        location: data?.data?.location,
        specifications: data?.data?.specifications,
        facilities: data?.data?.facilities,
        descriptions: data?.data?.descriptions,
        gender: data?.data?.gender,
        rules: data?.data?.rules,
      });
      setPhotoProducts(
        data?.data?.photoProducts?.map((item: any) => item.photo)
      );
      form.setFieldsValue({
        name: data?.data?.name,
        type: data?.data?.type,
        stock: data?.data?.stock,
        daily_price: data?.data?.daily_price,
        monthly_price: data?.data?.monthly_price,
        address: data?.data?.address,
        location: data?.data?.location,
        photo: data?.data?.photo,
        specifications: data?.data?.specifications,
        facilities: data?.data?.facilities,
        descriptions: data?.data?.descriptions,
        gender: data?.data?.gender,
        rules: data?.data?.rules,
      });
      setFileList(
        data?.data?.photoProducts?.map((item: any) => {
          return {
            url: imgProduct(item.photo),
            name: item.photo,
          };
        })
      );
    }
  }, [isLoading]);

  const handleUploadPhoto: UploadProps['onChange'] = async (
    args: UploadChangeParam<UploadFile<any>>
  ) => {
    const photoProducts = args?.file;
    if (photoProducts.status === 'done') {
      if (photoProducts.size && photoProducts.size > 2097152) {
        message.error('ukuran photoProducts terlalu besar');
      } else {
        if (
          photoProducts.type === 'image/png' ||
          photoProducts.type === 'image/jpg' ||
          photoProducts.type === 'image/jpeg'
        ) {
          const response =
            await productsRepository.manipulatedata.uploadPhotoProducts(
              photoProducts?.originFileObj
            );

          setFileList((state) => [...state, response.body.filename]);
          setPhotoProducts([...photoProductsArray, response.body.filename]);
        } else {
          message.error('Anda hanya dapat mengunggah file JPG/JPEG/PNG');
        }
      }
    }

    const { fileList: newFileList } = args;
    setFileList(newFileList);
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

  const price = {
    daily: data?.data?.daily_price,
    monthly: data?.data?.monthly_price,
  };

  interface OptionType {
    value: string;
    label: string;
  }

  const [selectedOption, setSelectedOption] = useState<OptionType | undefined>({
    value: 'campur',
    label: 'Campur',
  });
  const [hargaPerHari, setHargaPerHari] = useState<number>(0);
  const [hargaPerBulan, setHargaPerBulan] = useState<number>(0);
  const [adminFee, setAdminFee] = useState({ daily: 0, monthly: 0 });

  const handleHargaPerHariChange = (value: any) => {
    setHargaPerHari(value);
    setDatas({ ...datas, daily_price: value || 0 });
  };
  const handleHargaPerBulanChange = (value: any) => {
    setHargaPerBulan(value);
    setDatas({ ...datas, monthly_price: value || 0 });
  };

  const [selectedOptionProduk, setSelectedOptionProduk] = useState<
    OptionType | undefined
  >();

  const matchingFee = FEES.find(
    (fee) => selectedOptionProduk?.value === fee.name
  );

  useEffect(() => {
    document.title = 'Edit Product - Roorent';

    if (price?.daily !== 0 && price?.monthly !== 0) {
      setSelectedOption({ value: 'campur', label: 'Campur' });
    } else if (price?.daily !== 0) {
      setSelectedOption({ value: 'perhari', label: 'Perhari' });
    } else if (price?.monthly !== 0) {
      setSelectedOption({ value: 'perbulan', label: 'Perbulan' });
    }

    if (data?.data?.type === 'kost') {
      setSelectedOptionProduk({ value: 'kost', label: 'Kost' });
    } else if (data?.data?.type === 'gedung') {
      setSelectedOptionProduk({ value: 'gedung', label: 'Gedung' });
    } else if (data?.data?.type === 'hotel') {
      setSelectedOptionProduk({ value: 'hotel', label: 'Hotel' });
    }

    if (matchingFee) {
      const feeDaily =
        hargaPerHari === 0
          ? price?.daily - (matchingFee.value / 100) * price?.daily
          : hargaPerHari - (matchingFee.value / 100) * hargaPerHari;
      const feeMonthly =
        hargaPerBulan === 0
          ? price.monthly - (matchingFee.value / 100) * price.monthly
          : hargaPerBulan - (matchingFee.value / 100) * hargaPerBulan;

      setAdminFee({ daily: feeDaily, monthly: feeMonthly });
    }
  }, [price, data?.data?.type]);

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
    <div>
      <Form name='createProduk' form={form}>
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
          <div className='produkOwner text-white text-4xl font-bold bg-primary rounded-[10px] px-5 py-5 flex justify-center items-center mb-[30px]'>
            <p>Edit Produk </p>
          </div>
          <div className='flex gap-x-[70px]'>
            <div className='w-full'>
              <div className='my-4'>
                <p className='mb-4 text-teks text-2xl font-bold'>
                  Kategori Produk
                </p>
                <div>
                  <Form.Item name='type'>
                    {datas?.type === 'kost' && (
                      <div className='w-full'>
                        <Radio.Button
                          value='kost'
                          className='py-[20px] h-max font-bold flex justify-center text-primary'
                        >
                          <div className='w-full flex items-center text-2xl'>
                            <HomeFilled className='mr-2' />
                            Kost
                          </div>
                        </Radio.Button>
                      </div>
                    )}
                    {datas?.type === 'gedung' && (
                      <div className='w-full'>
                        <Radio.Button
                          value='gedung'
                          className='py-[20px] h-max font-bold flex justify-center text-primary'
                        >
                          <div className='w-full flex items-center text-2xl'>
                            <Icon
                              icon='mingcute:building-1-fill'
                              className='mr-2'
                            />
                            Gedung
                          </div>
                        </Radio.Button>
                      </div>
                    )}
                    {datas?.type === 'hotel' && (
                      <div className='w-full'>
                        <Radio.Button
                          value='hotel'
                          className='py-[20px] h-max font-bold flex justify-center text-primary'
                        >
                          <div className='w-full flex items-center text-2xl'>
                            <Icon icon='fa6-solid:hotel' className='mr-2' />
                            Hotel
                          </div>
                        </Radio.Button>
                      </div>
                    )}
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
                      // beforeUpload={beforeUpload}
                      onChange={handleUploadPhoto}
                    >
                      {fileList && fileList.length >= 10 ? null : uploadButton}
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
              <div className='my-4'>
                <p className='mb-4 text-teks text-2xl font-bold'>Stok Produk</p>
                <div>
                  <Form.Item name='stock'>
                    <InputNumber
                      style={{ width: '100%' }}
                      size='small'
                      min={1}
                      max={10000}
                      className=' py-[10px] px-[3px] rounded-[10px] border border-rstroke regis text-xl'
                      onChange={(e) => {
                        setDatas({ ...datas, stock: e || 1 });
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
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
                  <p className='mb-4 text-teks text-2xl font-bold'>Tipe</p>
                  <div className='w-full create-produk'>
                    <Form.Item name='gender'>
                      <Select
                        style={{ width: '100%' }}
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
                      <div className='w-full mb-4'>
                        <p className='text-teks text-2xl font-bold '>
                          Tipe Harga{' '}
                        </p>
                      </div>
                      <div className='w-full'>
                        <div className='w-full list-produk'>
                          <div
                            className='w-full text-primary font-bold text-2xl flex justify-center items-center border-2 border-primary rounded-[10px] py-3'
                            style={{
                              boxShadow: '0 1px 8px rgba(36, 36, 36, 0.14)',
                            }}
                          >
                            {selectedOption?.value === 'campur' && 'Campur'}
                            {selectedOption?.value === 'perbulan' && 'Perbulan'}
                            {selectedOption?.value === 'perhari' && 'Perhari'}
                          </div>
                        </div>
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
                              placeholder='Masukan Harga'
                              min={1000}
                              className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl items-center'
                              value={hargaPerHari}
                              onChange={handleHargaPerHariChange}
                            />
                          </Form.Item>
                        </div>
                        <div className='text-xl border border-slate-300 rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                          <div className='mr-5'>
                            <ExclamationCircleFilled className='text-3xl text-primary' />
                          </div>
                          <div className='w-full'>
                            <p className='w-full '>
                              Harga yang akan anda terima =
                              <span className='font-bold'>
                                {' ' + toIDR(adminFee.daily)}
                              </span>
                            </p>
                          </div>
                        </div>
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
                              defaultValue={1000}
                              placeholder='Masukan Harga'
                              prefix='Rp.'
                              min={1000}
                              className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl items-center'
                              value={hargaPerBulan}
                              onChange={handleHargaPerBulanChange}
                            />
                          </Form.Item>
                        </div>
                        <div className='text-xl border border-slate-300 rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                          <div className='mr-5'>
                            <ExclamationCircleFilled className='text-3xl text-primary' />
                          </div>
                          <div className='w-full'>
                            <p className='w-full '>
                              Harga yang akan anda terima =
                              <span className='font-bold'>
                                {' ' + toIDR(adminFee.monthly)}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedOption?.value === 'campur' && (
                      <>
                        <div className='flex gap-5'>
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
                                  defaultValue={1000}
                                  placeholder='Masukan harga'
                                  prefix='Rp.'
                                  min={1000}
                                  className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl items-center'
                                  value={hargaPerHari}
                                  onChange={handleHargaPerHariChange}
                                />
                              </Form.Item>
                            </div>
                            <div className='text-xl border border-slate-300 rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                              <div className='mr-5'>
                                <ExclamationCircleFilled className='text-3xl text-primary' />
                              </div>
                              <div className='w-full'>
                                <p className='w-full '>
                                  Harga yang akan anda terima =
                                  <span className='font-bold'>
                                    {' ' + toIDR(adminFee.daily)}
                                  </span>
                                </p>
                              </div>
                            </div>
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
                                  defaultValue={1000}
                                  placeholder='Masukan harga'
                                  prefix='Rp.'
                                  min={1000}
                                  className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl items-center'
                                  value={hargaPerBulan}
                                  onChange={handleHargaPerBulanChange}
                                />
                              </Form.Item>
                            </div>
                            <div className='text-xl border border-slate-300 rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                              <div className='mr-5'>
                                <ExclamationCircleFilled className='text-3xl text-primary' />
                              </div>
                              <div className='w-full'>
                                <p className='w-full '>
                                  Harga yang akan anda terima =
                                  <span className='font-bold'>
                                    {' ' + toIDR(adminFee.monthly)}
                                  </span>
                                </p>
                              </div>
                            </div>
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
                            defaultValue={1000}
                            placeholder='Masukan harga'
                            prefix='Rp.'
                            min={1000}
                            className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl items-center'
                            value={hargaPerHari}
                            onChange={handleHargaPerHariChange}
                          />
                        </Form.Item>
                      </div>
                      <div className='text-xl border border-slate-300 rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                        <div className='mr-5'>
                          <ExclamationCircleFilled className='text-3xl text-primary' />
                        </div>
                        <div className='w-full'>
                          <p className='w-full '>
                            Harga yang akan anda terima =
                            <span className='font-bold'>
                              {' ' + toIDR(adminFee.daily)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
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
                            defaultValue={1000}
                            prefix='Rp.'
                            min={1000}
                            className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl items-center'
                            value={hargaPerHari}
                            onChange={handleHargaPerHariChange}
                          />
                        </Form.Item>
                      </div>
                      <div className='text-xl border border-slate-300 rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                        <div className='mr-5'>
                          <ExclamationCircleFilled className='text-3xl text-primary' />
                        </div>
                        <div className='w-full'>
                          <p className='w-full '>
                            Harga yang akan anda terima =
                            <span className='font-bold'>
                              {' ' + toIDR(adminFee.daily)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
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

export default EditProduct;
