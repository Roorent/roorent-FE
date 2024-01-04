'use client';

import React, { useState } from 'react';
import Button from '../Button';
import { ConfigProvider, Modal, Rate, Input, Form, message, Upload } from 'antd';
import SummaryProducts from '../SummaryProducts';
import { ReviewsRepository } from '#/repository/reviews';
import { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import { UploadProps } from 'antd/lib';
import { RcFile } from 'antd/lib/upload';
import { CameraOutlined, CheckCircleFilled } from '@ant-design/icons';

function Review({
  isType,
  isLabel,
  address,
  image,
  namaProduk,
  idProducts
}:any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoReviewsArray, setPhotoReviews] = useState<string[] | []>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const handleCancel = () => setPreviewOpen(false);
  const [datas, setDatas] = useState<any>({
    rating: 1,
    content: '',
    photo: [],
  });

  const { TextArea } = Input;

  const onFinish = async () => {
    try {
      const dataReviews = {
        rating: datas?.rating,
        content: datas?.content,
        photo: datas?.photo,
      };

      await ReviewsRepository.manipulatedata.createTransactionRenter(idProducts, dataReviews);

      Modal.success({
        icon: (
          <div className='modal-hapus mb-[10px] flex justify-center'>
            <CheckCircleFilled />
          </div>
        ),
        title: (
          <div className='text-3xl font-bold flex justify-center'>
            Berhasil Buat Review
          </div>
        ),
        content: (
          <div className='text-xl font-semibold flex justify-center mb-[25px]'>
            Kamu telah berhasil membuat review
          </div>
        ),
      });

      setIsModalOpen(false);
    } catch (err: any) {
      message.error('Gagal membuat review');
    }
  };

  const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

  const handleUploadPhoto: UploadProps['onChange'] = async (
    args: UploadChangeParam<UploadFile<any>>
  ) => {
    // Fungsi uploadProducts
    const photoReviews = args?.file;
    try {
      if (photoReviews.status === 'done') {
        if (photoReviews.size && photoReviews.size > 2097152) {
          message.error('ukuran photoReviews terlalu besar');
        } else {
          if (
            photoReviews.type === 'image/png' ||
            photoReviews.type === 'image/jpg' ||
            photoReviews.type === 'image/jpeg'
          ) {
            const response =
              await ReviewsRepository.manipulatedata.uploadPhotoReviews(
                photoReviews?.originFileObj
              );

              setPhotoReviews([...photoReviewsArray, response.body.filename]);
            setDatas({
              ...datas,
              photo: [...photoReviewsArray, response.body.filename],
            });
          } else {
            message.error('Anda hanya dapat mengunggah file JPG/JPEG/PNG !');
          }
        }
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

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='review'>
      <Button
        className='!font-bold !w-full !py-3 !text-xl !mt-0'
        onClick={openModal}
      >
        Nilai
      </Button>
      <ConfigProvider
        modal={{
          styles: {
            content: {
              width: '100%',
              padding: '25px',
              boxShadow: '0 10px 20px -12px rgb(0 0 0 / 0.5)',
              display: 'block',
            },
          },
        }}
      >
        <Modal
          title={
            <div>
              <div>
                <SummaryProducts
                  isType={isType}
                  isLabel={isLabel}
                  address={address}
                  image={image}
                  namaProduk={namaProduk}
                />
              </div>
              <div className='border-slate-200 border-b-2 mt-2 mb-4'></div>
            </div>
          }
          mask={false}
          open={isModalOpen}
          onCancel={closeModal}
          closeIcon={<p></p>}
          className='review'
          footer={
            <div className='font-bold flex gap-4 justify-end mb-2'>
              <Button
                className='w-[120px] !bg-white !text-primary border border-primary hover:!text-opacity-80 hover:!bg-white'
                onClick={closeModal}
              >
                Nanti Saja
              </Button>
              <Button className='w-[120px]' onClick={onFinish}>
                OK
              </Button>
            </div>
          }
        >
          <div className='flex flex-col gap-4 my-2'>
            <Form name='review'>
              <div className='flex flex-col gap-4'>
                <Form.Item name='rating'>
                  <Rate
                    allowClear={false}
                    style={{ fontSize: 40, display: 'flex', gap: '10px' }}
                    className='justify-center'
                    onChange={(e) => {
                      setDatas({ ...datas, rating: e });
                    }}
                  />
                </Form.Item>
                <Form.Item name='photo'>
                  {/* <PhotoUpload files={handleUploadPhoto} /> */}
                  <Upload
                      action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
                      listType='picture-card'
                      fileList={fileList}
                      multiple={true}
                      onPreview={handlePreview}
                      onChange={handleUploadPhoto}
                    >
                      {fileList.length >= 3 ? null : uploadButton}
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
              <div className='my-4'>
                <p className='mb-4 text-teks text-xl font-semibold'>Ulasan :</p>
                <div className='textarea-produk'>
                  <Form.Item
                    name='content'
                    rules={[
                      {
                        required: true,
                        message: 'Masukan ulasan anda!',
                      },
                    ]}
                  >
                    <TextArea
                      showCount
                      maxLength={225}
                      placeholder='Masukan ulasan anda'
                      style={{
                        height: 120,
                        resize: 'none',
                        fontSize: '15px',
                      }}
                      onChange={(e) => {
                        setDatas({ ...datas, content: e.target.value });
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
}

export default Review;
