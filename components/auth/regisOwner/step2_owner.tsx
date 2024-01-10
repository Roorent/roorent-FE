import { authRepository } from '#/repository/auth';
import { Register } from '#/types/typeRegis';
import { CameraOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Form, Input, Upload, message } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/es/upload/interface';
import { FormInstance, UploadFile } from 'antd/lib';
import { useState } from 'react';

type Props = {
  setData: any;
  data: Register;
  formStep2: FormInstance<any>;
};

function OwnerStep2({ setData, data, formStep2 }: Props) {
  const handleUploadKtp = async (args: UploadChangeParam<UploadFile<any>>) => {
    const photoKtp = args?.file;
    try {
      if (photoKtp.status === 'done') {
        if (photoKtp.size && photoKtp.size > 2097152) {
          message.error('ukuran photoKtp terlalu besar');
        } else {
          if (
            photoKtp.type === 'image/png' ||
            photoKtp.type === 'image/jpg' ||
            photoKtp.type === 'image/jpeg'
          ) {
            const response = await authRepository.manipulatedata.uploadKtp(
              photoKtp?.originFileObj
            );
            setData({ ...data, photo_ktp: response.body.filename });
          } else {
            message.error('Anda hanya dapat mengunggah file JPG/JPEG/PNG!');
          }
        }
      }
    } catch (err: any) {
      message.error(err.response.body?.error);
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
    <Form name='step2Owner' form={formStep2}>
      <div>
        <div className='grid gap-y-4 grid-cols-1'>
          <div className='grid gap-y-2'>
            <p className='text-teks text-2xl font-bold'>NIK</p>
            <p className='text-teks text-md'>
              <ExclamationCircleFilled className='text-primary text-xl pr-2' />
              Pastikan anda memasukan NIK dengan benar
            </p>
          </div>
          <div className='w-full'>
            <Form.Item
              name='nik'
              rules={[{ required: true, message: 'Harap masukan NIK!' }]}
            >
              <Input
                onChange={(e) => {
                  setData({ ...data, nik: e.target.value });
                }}
                size='large'
                placeholder='Masukan no nik'
                maxLength={16}
                className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl'
              />
            </Form.Item>
          </div>
        </div>
        <div className='grid gap-y-4 grid-cols-1'>
          <div className='grid gap-y-2'>
            <p className='text-teks text-2xl font-bold'>Foto</p>
            <p className='text-teks text-md'>
              <ExclamationCircleFilled className='text-primary text-xl pr-2' />
              Foto diri dengan KTP
            </p>
          </div>
          <div className='w-full btn-upload'>
            <Form.Item
              name='photo_ktp'
              rules={[{ required: true, message: 'Harap masukan foto!' }]}
            >
              <Upload
                className='w-full'
                action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
                listType='picture'
                maxCount={1}
                // beforeUpload={beforeUpload}
                onChange={handleUploadKtp}
              >
                <Button className=' p-[10px] rounded-[10px] border-rstroke text-xl h-max w-full btn-upload border-dashed border'>
                  <div className='p-5'>
                    <div>
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
    </Form>
  );
}
export default OwnerStep2;
