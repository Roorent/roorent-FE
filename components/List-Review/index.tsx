import React from 'react';
import Photo from '../Photo';
import { StarFilled } from '@ant-design/icons';

function ListReview({
    namaPemilik,
    rating,
    photo1,
    photo2,
    photo3,
    ReviewPenyewa,
    BalasanReview,
}: any) {
    return (
        <div className='mb-[20px]'>
            <div className='grid gap-y-6 grid-cols-1'>
                <div className='text-xl flex gap-5 items-center'>
                    <div>
                        <Photo size={50}/>
                    </div>
                    <div className='w-full grid gap-y-1 grid-cols-1'>
                        <p className='font-semibold'>{namaPemilik}</p>
                        <p className='text-lg text-rstroke'>1 bulan yang lalu</p>
                    </div>
                    <div className='rounded-[10px] flex items-center h-12 gap-x-2 px-3 border border-rstroke text-rstroke text-xl cursor-default'>
                        <StarFilled />
                        <p className='font-semibold'>{rating}</p>
                    </div>
                </div>
                <div className='flex gap-x-5'>
                    <div className='w-1/3'>
                        <img
                            src={photo1}
                            alt='produk'
                            className='object-cover object-center w-full h-full rounded-xl'
                        />
                    </div>
                    <div className='w-1/3'>
                        <img
                            src={photo2}
                            alt='produk'
                            className='object-cover object-center w-full h-full rounded-xl'
                        />
                    </div>
                    <div className='w-1/3'>
                        <img
                            src={photo3}
                            alt='produk'
                            className='object-cover object-center w-full h-full rounded-xl'
                        />
                    </div>
                </div>
                <div className='text-xl text-rstroke leading-normal'>
                    {ReviewPenyewa}
                </div>
            </div>
        </div>
    )
}


export default ListReview;
