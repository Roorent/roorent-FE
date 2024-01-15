import React from 'react';
import Photo from '../Photo';
import { StarFilled } from '@ant-design/icons';
import { imgReviews } from '#/constants/general';
import { convertTime } from '#/utils/convertTime';
import { Image } from 'antd';

function ListReview({ namaPenyewa, rating, photos, ReviewPenyewa, createdAt }: any) {
  return (
    <div className='mb-[20px]'>
      <div className='grid gap-y-6 grid-cols-1'>
        <div className='text-xl flex gap-5 items-center'>
          <div>
            <Photo size={50} />
          </div>
          <div className='w-full grid gap-y-1 grid-cols-1'>
            <p className='font-semibold'>{namaPenyewa}</p>
            <p className='text-lg text-rstroke'>{convertTime(createdAt)}</p>
          </div>
          <div className='rounded-[10px] flex items-center h-12 gap-x-2 px-3 border border-rstroke text-rstroke text-xl cursor-default'>
            <StarFilled />
            <p className='font-semibold'>{rating}</p>
          </div>
        </div>
        <div className='flex gap-x-5'>
          {photos.map((item: any) => (
            <div className='w-1/3' key={item.id}>
              <Image
                  src={imgReviews(item.photo)}
                  alt={`Photo ${item.id}`}
                  className='object-cover object-center !h-[200px] rounded-xl'
                />
            </div>
          ))}
        </div>
        <div className='text-xl text-rstroke leading-normal'>
          {ReviewPenyewa}
        </div>
      </div>
    </div>
  );
}

export default ListReview;
