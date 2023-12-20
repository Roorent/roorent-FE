import React from 'react';
import Button from '../Button';

function CardProduk({
  image,
  icon,
  label,
  content,
  hapus,
  hrefDetail,
  hrefEdit,
}: any) {
  return (
    <div>
      <div className='p-7 rounded-[10px] border border-[#858585]'>
        <div className='grid gap-y-5 grid-cols-1'>
          <div className='flex gap-x-5 grid-cols-2 border-b border-slate-200 pb-5'>
            <div className='w-1/2 h-[180px]'>
              <img
                src={image}
                alt='produk'
                className='object-cover object-center w-full h-full rounded-xl'
              />
            </div>
            <div className='w-1/2'>
              <div className='rounded-[10px] flex justify-center items-center gap-x-2 p-1.5 border border-rstroke text-rstroke text-base'>
                {icon}
                <p className='font-semibold'>{label}</p>
              </div>
              <div className='mt-2'>
                <p className='text-lg font-bold'>{content}</p>
              </div>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='w-full'>
              <div className='w-full lihat-detail'>
                <Button
                  type='primary'
                  htmlType='submit'
                  href={hrefDetail}
                  className='lihat-detail hover:bg-primary hover:!text-white !text-primary bg-transparent rounded-[10px] text-base font-bold py-3 px-2 border-2 border-primary w-[150px] h-max !mt-0'
                >
                  Lihat Detail
                </Button>
              </div>
            </div>
            <div className='flex gap-2 items-center'>
              <div>
                <Button
                  type='primary'
                  htmlType='submit'
                  href={hrefEdit}
                  className='hover:text-white hover:bg-[#7291F5] bg-primary rounded-[10px] text-base font-bold py-3 w-[111px] h-max !mt-0'
                >
                  Edit
                </Button>
              </div>
              <div className='modal-hapus h-max'>{hapus}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProduk;
