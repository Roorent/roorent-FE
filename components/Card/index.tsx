import React from 'react';
import Button from '../Button';
import ModalDelete from '../Modal/modalDelete';
import { HomeFilled, QuestionCircleFilled } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { config } from '#/config/app';

//disini tambahin mutate
function CardProduk({ image, label, title, address, idProducts, mutate }: any) {
  const imgProduct = (img: string) =>
    `${config.baseUrl}/images/photo-products/${img}`;

  return (
    <div>
      <div className='p-7 rounded-[10px] border border-[#858585]'>
        <div className='grid gap-y-5 grid-cols-1'>
          <div className='flex gap-x-5 grid-cols-2 border-b border-slate-200 pb-5'>
            <div className='w-1/2 h-[180px]'>
              <img
                src={`${imgProduct(image)}`}
                alt='produk'
                className='object-cover object-center w-full h-full rounded-xl'
              />
            </div>
            <div className='w-1/2'>
              <div className='rounded-[10px] flex justify-center items-center gap-x-2 p-1.5 border border-rstroke text-rstroke text-base cursor-default'>
                <>
                  {label === 'kost' && <HomeFilled />}
                  {label === 'gedung' && (
                    <Icon icon='mingcute:building-1-fill' className='text-xl' />
                  )}
                  {label === 'hotel' && <Icon icon='fa6-solid:hotel' />}
                </>
                <p className='font-semibold'>{label}</p>
              </div>
              <p className='mt-2 text-xl font-bold'>{title}</p>
              <p className='mt-3 text-lg font-semibold text-rstroke line-clamp-2'>
                {address}
              </p>
            </div>
          </div>
          <div className='flex gap-4 justify-between'>
            <div className='lihat-detail'>
              <Button
                type='primary'
                htmlType='submit'
                href={`/detail-product?id=${idProducts}`}
                className='lihat-detail hover:!bg-primary hover:!text-white !text-primary bg-transparent rounded-[10px] text-base font-bold py-3 px-2 border-2 border-primary w-[140px] h-max !mt-0'
              >
                Lihat Detail
              </Button>
            </div>
            <div className='flex gap-2 items-center justify-end'>
              <div className='w-1/2'>
                <Button
                  type='primary'
                  htmlType='submit'
                  href={`/edit-product?id=${idProducts}`}
                  className='hover:text-white hover:!bg-[#7291F5] bg-primary rounded-[10px] text-base font-bold py-3 h-max !mt-0 !px-10'
                >
                  Edit
                </Button>
              </div>
              <div className='w-1/2 modal-hapus h-max'>
                <ModalDelete
                  id={idProducts}
                  title='Hapus Produk'
                  content='Apakah anda yakin ingin hapus ?'
                  icon={<QuestionCircleFilled />}
                  buttonText='Hapus'
                  // mutate nya dipanggil disini
                  mutate={mutate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProduk;
