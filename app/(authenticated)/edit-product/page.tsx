'use client';

import React, { useEffect, useState } from 'react';
import TypeRadio from '#/components/TypeButton';
import { productsRepository } from '#/repository/products';
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
import { useRouter, useSearchParams } from 'next/navigation';
import { config } from '#/config/app';

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

function EditProduct() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [photoProductsArray, setPhotoProducts] = useState<string[] | []>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams?.get('id');
  const { data, error, isLoading } =
    productsRepository.hooks.getProductsById(productId);

  const handleCancel = () => setPreviewOpen(false);
  const [form] = Form.useForm();
  const imgProduct = (img: string) =>
    `${config.baseUrl}/images/photo-products/${img}`;

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
        gender: data?.data?.sr_gender,
        rules: data?.data?.sr_rules,
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
        gender: data?.data?.sr_gender,
        rules: data?.data?.sr_rules,
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

  const onFinish = async () => {
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
          Kamu telah berhasil mengubah produk
        </div>
      ),
    });
    router.push('/list-product');
  };

  const handleUploadPhoto: UploadProps['onChange'] = async (
    args: UploadChangeParam<UploadFile<any>>
  ) => {
    // Fungsi uploadProducts
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
          console.log(response);
          // setFileList((state)=> [...state, response.body.filename])
          setPhotoProducts([...photoProductsArray, response.body.filename]);
          // setDatas({
          //   ...datas,
          //   photo: [...photoProductsArray, response.body.filename],
          // });
        } else {
          message.error('Extensi file tidak diketahui');
        }
      }
    }
    // Fungsi handleChangeUpload
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

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/jpg';
    if (!isJpgOrPng) {
      message.error('Anda hanya dapat mengunggah file JPG/JPEG/PNG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Gambar harus lebih kecil dari 2MB!');
    }
    return isJpgOrPng && isLt2M;
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

  const defaultSelectedOption: OptionType = {
    value: 'campur',
    label: 'Campur',
  };

  const [selectedOption, setSelectedOption] = useState<OptionType | undefined>(
    defaultSelectedOption
  );

  const [hargaPerHari, setHargaPerHari] = useState<number | null>(null);
  const [hargaPerBulan, setHargaPerBulan] = useState<number | null>(null);

  const handleSelectChange = (value: string) => {
    const selected = options.find((option) => option.value === value);
    setSelectedOption(selected);
  };

  const handleHargaPerHariChange = (value: number | null) => {
    setHargaPerHari(value);
    setDatas({ ...datas, daily_price: value || 1000 });
  };

  const handleHargaPerBulanChange = (value: number | null) => {
    setHargaPerBulan(value);
    setDatas({ ...datas, monthly_price: value || 1000 });
  };

  // get value tipe produk
  const optionsProduk: OptionType[] = [
    { value: 'kost', label: 'Kost' },
    { value: 'gedung', label: 'Gedung' },
    { value: 'hotel', label: 'Hotel' },
  ];

  const defaultSelectedOptionProduk: OptionType = {
    value: 'kost',
    label: 'Kost',
  };

  const [selectedOptionProduk, setSelectedOptionProduk] = useState<
    OptionType | undefined
  >(defaultSelectedOptionProduk);

  const handleSelectChangeProduk = (value: string) => {
    const selected = optionsProduk.find((option) => option.value === value);
    setSelectedOptionProduk(selected);
    setDatas({ ...datas, type: value });
  };
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
                    <TypeRadio
                      onChange={(e: any) =>
                        handleSelectChangeProduk(e.target.value)
                      }
                      // value={selectedOptionProduk?.value}
                      // value = {data?.product.type}
                      // defaultValue={defaultSelectedOptionProduk.value}
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
                      beforeUpload={beforeUpload}
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
                    // initialValue={data?.data?.name}
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
                      // defaultValue={1}
                      // value={data?.data.stock}
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
                    Harga yang di input akan dikenakan biaya admin sebesar 5%
                  </p>
                </div>
              </div>
            </div>
            <div className='w-1/2'>
              {/* <div className='produkOwner text-xl font-bold bg-[#ECF0FB] rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                <div className='w-full'>
                  <p className='text-primary w-full flex justify-center'>
                    Deskripsi Produk
                  </p>
                </div>
              </div> */}
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
                    <div className='produkOwner text-xl font-bold bg-primary rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                      <div className='w-full'>
                        <p className='text-white w-full '>Harga Produk</p>
                      </div>
                      <div className='flex gap-x-6'>
                        <div className='w-full list-produk'>
                          <Form.Item>
                            <Select
                              value={selectedOption?.value}
                              onChange={handleSelectChange}
                              defaultValue={defaultSelectedOption.value}
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
                              defaultValue={1000}
                              placeholder='Masukan Harga'
                              min={1000}
                              className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl items-center'
                              value={hargaPerHari}
                              onChange={handleHargaPerHariChange}
                            />
                          </Form.Item>
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
                          </div>
                        </div>
                      </>
                    )}
                    <div className='text-xl border border-slate-300 rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                      <div className='mr-5'>
                        <ExclamationCircleFilled className='text-3xl text-primary' />
                      </div>
                      <div className='w-full'>
                        <p className='w-full '>
                          Harga yang di input akan dikenakan biaya admin sebesar
                          5%
                        </p>
                      </div>
                    </div>
                  </>
                )}
                {selectedOptionProduk?.value === 'gedung' && (
                  <>
                    <div className='produkOwner text-xl font-bold bg-primary rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                      <div className='w-full'>
                        <p className='text-white w-full flex justify-center'>
                          Harga Produk
                        </p>
                      </div>
                    </div>
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
                    </div>
                    <div className='text-xl border border-slate-300 rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                      <div className='mr-5'>
                        <ExclamationCircleFilled className='text-3xl text-primary' />
                      </div>
                      <div className='w-full'>
                        <p className='w-full '>
                          Harga yang di input akan dikenakan biaya admin sebesar
                          10%
                        </p>
                      </div>
                    </div>
                  </>
                )}
                {selectedOptionProduk?.value === 'hotel' && (
                  <>
                    <div className='produkOwner text-xl font-bold bg-primary rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                      <div className='w-full'>
                        <p className='text-white w-full flex justify-center'>
                          Harga Produk
                        </p>
                      </div>
                    </div>
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
                    </div>
                    <div className='text-xl border border-slate-300 rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                      <div className='mr-5'>
                        <ExclamationCircleFilled className='text-3xl text-primary' />
                      </div>
                      <div className='w-full'>
                        <p className='w-full '>
                          Harga yang di input akan dikenakan biaya admin sebesar
                          10%
                        </p>
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
