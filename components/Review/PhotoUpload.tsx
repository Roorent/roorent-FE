'use client';

import React, { useState } from 'react';
import { UploadProps, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import { Upload, UploadFile } from 'antd/lib';
import { CameraOutlined } from '@ant-design/icons';

// const beforeUpload = (file: RcFile) => {
//   const isJpgOrPng =
//     file.type === 'image/jpeg' ||
//     file.type === 'image/png' ||
//     file.type === 'image/jpg';
//   if (isJpgOrPng) {
//     message.error('Anda hanya dapat mengunggah file JPG/JPEG/PNG!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;

//   if (!isLt2M) {
//     message.error('Gambar harus lebih kecil dari 2 MB!');
//   }

//   return !isJpgOrPng || !isLt2M;
// };

function PhotoUpload({ files }: any) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    files(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
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

  return (
    <Upload
      action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
      listType='picture-card'
      fileList={fileList}
      multiple={true}
      maxCount={3}
      onChange={onChange}
      onPreview={onPreview}
      // beforeUpload={beforeUpload}
    >
      {fileList.length < 3 && uploadButton}
    </Upload>
  );
}

export default PhotoUpload;
