'use client';
import { ArrowLeftOutlined } from '@ant-design/icons';
import React from 'react'

function DetailPengguna() {
    return (
    <div>
        <div className='w-full grid gap-y-[20px] grid-cols-1'>
            <div className='w-full grid gap-y-[20px] grid-cols-1'>
                <a
                    href='/adm/pengguna'
                    className='w-fit hover:text-teks flex font-bold text-xl gap-3'
                >
                    <div>
                        <ArrowLeftOutlined />
                    </div>
                    <div>Kembali</div>
                </a>
            </div>
            <div className='produkOwner text-white text-4xl font-bold bg-primary rounded-[10px] px-5 py-3 flex justify-center items-center mb-[30px]'>
                <p>Data Pemilik</p>
            </div>
        </div>
    </div>
    )
}

export default DetailPengguna