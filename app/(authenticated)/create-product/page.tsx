'use client';

import ModalBerhasil from '#/components/Modal/modalBerhasil';
import {
  ArrowLeftOutlined,
  CameraOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import { Form, Input, InputNumber, Modal, Select, Upload, message } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import { RcFile, UploadProps } from 'antd/lib/upload';
import React, { useState } from 'react';

const handleChangeProduk = (value: string) => {
  console.log(`selected ${value}`);
};

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
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleCancel = () => setPreviewOpen(false);

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

  const handleChangeUpload: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => setFileList(newFileList);

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
  };

  const handleHargaPerBulanChange = (value: number | null) => {
    setHargaPerBulan(value);
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
  };
  return (
    <div>
      <Form name='createProduk'>
        <div className='w-full grid gap-y-[20px] grid-cols-1'>
          <div className='flex font-bold text-xl gap-3'>
            <div>
              <ArrowLeftOutlined />
            </div>
            <div>Kembali</div>
          </div>
          <div className='produkOwner text-4xl font-bold bg-primary rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
            <div className='w-full'>
              <p className='text-white w-full'>Tambah Produk </p>
            </div>
            <div className='flex gap-x-6 items-center'>
              <div className='w-full list-produk'>
                <Form.Item name='type'>
                  {/* <Select
                    //   defaultValue="kost"
                    placeholder="Pilih Produk"
                    style={{ width: 170 }}
                    className="produkOwner flex items-center"
                    onChange={handleChangeProduk}
                    options={[
                      { value: "kost", label: "Kost" },
                      { value: "gedung", label: "Gedung" },
                      { value: "hotel", label: "Hotel" },
                    ]}
                  /> */}
                  <Select
                    value={selectedOptionProduk?.value}
                    onChange={handleSelectChangeProduk}
                    defaultValue={defaultSelectedOptionProduk.value}
                    style={{ width: 130 }}
                    className='flex items-center'
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
          </div>
          <div className='flex gap-x-[70px]'>
            <div className='w-1/2'>
              <div className='grid gap-y-4 grid-cols-1'>
                <div>
                  <p className='text-teks text-2xl font-bold'>Foto Produk</p>
                </div>
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
                      onPreview={handlePreview}
                      beforeUpload={beforeUpload}
                      onChange={handleChangeUpload}
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
              <div className='grid gap-y-4 grid-cols-1'>
                <div>
                  <p className='text-teks text-2xl font-bold'>Nama Produk</p>
                </div>
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
                      size='small'
                      placeholder='Masukan nama produk'
                      className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl'
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='grid gap-y-4 grid-cols-1'>
                <div>
                  <p className='text-teks text-2xl font-bold'>Stok Produk</p>
                </div>
                <div>
                  <Form.Item name='stock'>
                    <InputNumber
                      style={{ width: '100%' }}
                      size='small'
                      min={1}
                      max={10000}
                      defaultValue={1}
                      className=' py-[10px] px-[3px] rounded-[10px] border border-rstroke regis text-xl'
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='grid gap-y-4 grid-cols-1'>
                <div>
                  <p className='text-teks text-2xl font-bold'>Alamat</p>
                </div>
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
                      // onChange={onChange}
                      placeholder='Masukan alamat produk'
                      style={{
                        height: 120,
                        resize: 'none',
                        fontSize: '20px',
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='grid gap-y-4 grid-cols-1'>
                <div>
                  <p className='text-teks text-2xl font-bold'>Kota</p>
                </div>
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
                      // optionFilterProp="children"
                      // onChange={onChange}
                      // onSearch={onSearch}
                      filterOption={filterOption}
                      options={[
                        {
                          value: 'jack',
                          label: 'Jack',
                        },
                        {
                          value: 'lucy',
                          label: 'Lucy',
                        },
                        {
                          value: 'tom',
                          label: 'Tom',
                        },
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='grid gap-y-4 grid-cols-1'>
                <div>
                  <p className='text-teks text-2xl font-bold'>Lokasi</p>
                </div>
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
                    />
                  </Form.Item>
                </div>
              </div>
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
                    <div className='grid gap-y-4 grid-cols-1'>
                      <div>
                        <p className='text-teks text-2xl font-bold'>
                          Harga Perhari
                        </p>
                      </div>
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
                    </div>
                  )}
                  {selectedOption?.value === 'perbulan' && (
                    <div className='grid gap-y-4 grid-cols-1'>
                      <div>
                        <p className='text-teks text-2xl font-bold'>
                          Harga Perbulan
                        </p>
                      </div>
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
                      <div className='grid gap-y-4 grid-cols-1'>
                        <div>
                          <p className='text-teks text-2xl font-bold'>
                            Harga Perhari
                          </p>
                        </div>
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
                              prefix='Rp.'
                              min={1000}
                              className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl items-center'
                              value={hargaPerHari}
                              onChange={handleHargaPerHariChange}
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className='grid gap-y-4 grid-cols-1'>
                        <div>
                          <p className='text-teks text-2xl font-bold'>
                            Harga Perbulan
                          </p>
                        </div>
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
                    </>
                  )}
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
                  <div className='grid gap-y-4 grid-cols-1'>
                    <div>
                      <p className='text-teks text-2xl font-bold'>
                        Harga Perhari
                      </p>
                    </div>
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
                          prefix='Rp.'
                          min={1000}
                          className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl items-center'
                          value={hargaPerHari}
                          onChange={handleHargaPerHariChange}
                        />
                      </Form.Item>
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
                  <div className='grid gap-y-4 grid-cols-1'>
                    <div>
                      <p className='text-teks text-2xl font-bold'>
                        Harga Perhari
                      </p>
                    </div>
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
                          prefix='Rp.'
                          min={1000}
                          className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl items-center'
                          value={hargaPerHari}
                          onChange={handleHargaPerHariChange}
                        />
                      </Form.Item>
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
                    Harga yang akan tampil nanti, bukan harga asli yang sudah di
                    input akan ada biaya admin sebesar 5%
                  </p>
                </div>
              </div>
            </div>
            <div className='w-1/2'>
              <div className='produkOwner text-xl font-bold bg-primary rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                <div className='w-full'>
                  <p className='text-white w-full flex justify-center'>
                    Deskripsi Produk
                  </p>
                </div>
              </div>
              <div className='grid gap-y-4 grid-cols-1'>
                <div>
                  <p className='text-teks text-2xl font-bold'>
                    Spesifikasi Produk
                  </p>
                </div>
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
                      // onChange={onChange}
                      placeholder='Masukan spesifikasi produk '
                      style={{
                        height: 120,
                        resize: 'none',
                        fontSize: '20px',
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='grid gap-y-4 grid-cols-1'>
                <div>
                  <p className='text-teks text-2xl font-bold'>Fasilitas</p>
                </div>
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
                      // onChange={onChange}
                      placeholder='Masukan fasilitas produk '
                      style={{
                        height: 120,
                        resize: 'none',
                        fontSize: '20px',
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='grid gap-y-4 grid-cols-1'>
                <div>
                  <p className='text-teks text-2xl font-bold'>Catatan</p>
                </div>
                <div className='textarea-produk'>
                  <Form.Item
                    name='note'
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
                      // onChange={onChange}
                      placeholder='Masukan catatan pemilik'
                      style={{
                        height: 120,
                        resize: 'none',
                        fontSize: '20px',
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='produkOwner text-xl font-bold bg-primary rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]'>
                <div className='w-full'>
                  <p className='text-white w-full flex justify-center'>
                    Peraturan Khusus
                  </p>
                </div>
              </div>
              <div className='grid gap-y-4 grid-cols-1'>
                <div>
                  <p className='text-teks text-2xl font-bold'>Maksimal orang</p>
                </div>
                <div>
                  <Form.Item
                    name='max_person'
                    rules={[
                      {
                        required: true,
                        message: 'Harap tentukan maks.orang!',
                      },
                    ]}
                  >
                    <Input
                      size='small'
                      placeholder='Tentukan maksimal orang'
                      className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl'
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='grid gap-y-4 grid-cols-1'>
                <div>
                  <p className='text-teks text-2xl font-bold'>Tipe</p>
                </div>
                <div className='w-full create-produk'>
                  <Form.Item name='gender'>
                    <Select
                      placeholder='Pilih Tipe'
                      style={{ width: '100%' }}
                      defaultValue={'campur'}
                      // onChange={handleChange}
                      options={[
                        { value: 'campur', label: 'Campur' },
                        { value: 'pria', label: 'Pria' },
                        { value: 'wanita', label: 'Wanita' },
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='grid gap-y-4 grid-cols-1'>
                <div>
                  <p className='text-teks text-2xl font-bold'>Catatan</p>
                </div>
                <div className='textarea-produk'>
                  <Form.Item
                    name='notes'
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
                      // onChange={onChange}
                      placeholder='Masukan catatan pemilik'
                      style={{
                        height: 120,
                        resize: 'none',
                        fontSize: '20px',
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Form.Item>
              {/* <Button
                type="primary"
                htmlType="submit"
                block
                className=" bg-primary border border-white rounded-full text-2xl font-bold py-3 h-max"
              >
                Buat
              </Button> */}
              <ModalBerhasil
                title='Berhasil Buat Produk'
                content='Kamu telah berhasil membuat produk'
                buttonText='Buat'
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default CreateProduct;
