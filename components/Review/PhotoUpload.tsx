'use client';

import React, { useState } from 'react';
import { UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import { Upload, UploadFile } from 'antd/lib';
import { CameraOutlined } from '@ant-design/icons';

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
    >
      {fileList.length < 3 && uploadButton}
    </Upload>
  );
}

export default PhotoUpload;
