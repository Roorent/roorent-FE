'use client';
import React from 'react'

function RenterPayment() {
    return (
        <div>
            <div
                className='grid gap-y-[25px] border border-slate-300 rounded-[10px] p-5 mt-[30px]'
                style={{
                    boxShadow: '0 -1px 4px rgba(0,0,0,.04), 0 4px 8px rgba(0,0,0,.08)',
                }}
            >
                <div className='flex justify-between pb-5 border-b border-slate-300'>
                    <div className='flex font-[650] gap-x-3 text-xl'>
                        <p className=''>Tanggal :</p>
                        <p className='font-semibold text-rstroke'>
                            29 Desember 2023
                        </p>
                    </div>
                    <div className='flex font-[650] gap-x-3 text-xl'>
                        <p className=''>Waktu :</p>
                        <p className='font-semibold text-rstroke'>17:30</p>
                    </div>
                </div>
                <div className='flex font-[650] gap-x-3 text-2xl'>
                    <p className='w-1/2 '>Dari</p>
                    <div className='w-1/2 flex font-semibold'>
                        <p className='font-[650] mr-2'>:</p>
                        <p className='text-rstroke'>M Danar Kahfi</p>
                    </div>
                </div>
                <div className='flex font-[650] gap-x-3 text-2xl'>
                    <p className='w-1/2 '>Kost Apik Pikitdro 22 Tipe C Cibeunying Kaler Bandung</p>
                </div>
                {/* <div className='grid gap-y-5 grid-cols-1 font-semibold text-rstroke underline underline-offset-2'>
                    <div className='flex text-2xl justify-between'>
                        <div>Biaya sewa</div>
                        <div>{toIDR(datas?.price)}</div>
                    </div>
                    <div className='flex text-2xl justify-between'>
                        <div>Lama Sewa</div>
                        <div className='flex gap-2'>
                            <p>{datas?.amount}</p>
                            {datas?.rental_type === 'bulanan' ? (
                                <p>bulan</p>
                            ) : (
                                <p>hari</p>
                            )}
                        </div>
                    </div>
                </div> */}
                <div className='flex font-[650] gap-x-3 text-2xl font-semibold text-rstroke underline underline-offset-2'>
                    <div className='flex text-2xl justify-between'>
                        <div>Biaya sewa</div>
                        <div>Rp.600.000</div>
                    </div>
                </div>
                <div className='flex font-[650] gap-x-3 text-2xl'>
                    <p className='w-1/2 '>Tanggal Awal Sewa</p>
                    <div className='w-1/2 flex font-semibold'>
                        <p className='font-[650] mr-2'>:</p>
                        <p className='text-rstroke'>ff</p>
                    </div>
                </div>
                <div className='flex font-[650] gap-x-3 text-2xl'>
                    <p className='w-1/2 '>Tanggal Akhir Sewa</p>
                    <div className='w-1/2 flex font-semibold'>
                        <p className='font-[650] mr-2'>:</p>
                        <p className='text-rstroke'>
                            ff
                        </p>
                    </div>
                </div>
                <div className='flex font-[650] gap-x-3 text-2xl'>
                    <p className='w-1/2 '>Durasi Sewa</p>
                    <div className='w-1/2 flex font-semibold'>
                        <p className='font-[650] mr-2'>:</p>
                        <p className='text-rstroke flex gap-2'>
                            <p>dd</p>
                        </p>
                    </div>
                </div>
                <div className='flex font-[650] gap-x-3 text-2xl'>
                    <p className='w-1/2'>Catatan</p>
                    {/* ksih kondisi kalo masih pending isiny "-" intinya selain reject "-" */}
                    <div className='w-1/2 flex font-semibold'>
                        <p className='font-[650] mr-2'>:</p>
                        <p className='text-rstroke'>-</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RenterPayment