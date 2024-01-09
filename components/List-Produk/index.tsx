import React from 'react';
import ModalDelete from '../Modal/modalDelete';
import {
  HomeFilled,
  QuestionCircleFilled,
  StarFilled,
} from '@ant-design/icons';
import { Icon } from '@iconify/react';
import Button from '../Button';

function ListProduk({ image, label, title, idProducts, mutate }: any) {
  return (
    <div>
      <div className='p-5 rounded-[10px] border border-[#858585]'>
        <div className='grid gap-y-5 grid-cols-1'>
          <div className='flex gap-x-5 grid-cols-2'>
            <div className='w-1/2 h-[180px]'>
              <img
                src={image}
                alt='produk'
                className='object-cover object-center w-full h-full rounded-xl'
              />
            </div>
            <div className='w-1/2 grid gap-y-5'>
              <div className='grid gap-y-3'>
                <p className='text-2xl font-bold line-clamp-2'>{title}</p>
                <div className='flex gap-x-3'>
                  <div className='rounded-[10px] flex justify-center items-center gap-x-2 p-1.5 border border-rstroke text-rstroke text-base cursor-default'>
                    <>
                      {label === 'kost' && <HomeFilled />}
                      {label === 'gedung' && (
                        <Icon
                          icon='mingcute:building-1-fill'
                          className='text-xl'
                        />
                      )}
                      {label === 'hotel' && <Icon icon='fa6-solid:hotel' />}
                    </>
                    <p className='font-semibold'>{label}</p>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    <StarFilled className='text-[#FFCC00] text-[26px]' />
                    <p className='font-bold text-xl text-rstroke'>0 (0)</p>
                  </div>
                </div>
              </div>
              <div className='flex gap-x-4 justify-between items-center'>
                <div className='lihat-detail'>
                  <Button
                    type='primary'
                    htmlType='submit'
                    href={`/detail-product?id=${idProducts}`}
                    className='hover:!bg-primary hover:!text-white !text-primary bg-transparent rounded-[10px] text-base font-bold px-2 border-2 border-primary w-[140px] h-max !mt-0'
                  >
                    Lihat Detail
                  </Button>
                </div>
                <div className='w-full modal-nonaktifkan h-max'>
                  <ModalDelete
                    id={idProducts}
                    title='Nonaktif Produk'
                    content='Apakah kamu yakin ingin nonaktif ?'
                    icon={<QuestionCircleFilled />}
                    buttonText='Nonaktif'
                    mutate={mutate}
                    className='!w-full'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListProduk;
