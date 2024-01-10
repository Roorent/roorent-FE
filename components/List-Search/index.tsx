import React from 'react';
import ModalDelete from '../Modal/modalDelete';
import { EnvironmentFilled, HomeFilled, StarFilled } from '@ant-design/icons';
import { Icon } from '@iconify/react';

//disini tambahin mutate
function ListSearch({
  image,
  type,
  namaProduk,
  gender,
  stok,
  totalRating,
  kota,
  hargaPerbulan,
  hargaPerhari,
  alamat,
  idProducts,
  mutate,
}: any) {
  //   const imgProduct = (img: string) =>
  //     `${config.baseUrl}/images/photo-products/${img}`;

  return (
    <div>
      <a href={`/detail-product?id=${idProducts}`}>
        <div className='flex gap-x-5 border border-slate-300 p-5 rounded-[10px]'>
          <div className='w-2/5 h-[180px]'>
            <img
              // src={imgProduct(image)}
              src={image}
              alt='produk'
              className='object-cover object-center w-full h-full rounded-xl'
            />
          </div>
          <div className='w-3/5'>
            <div className='text-slate-600'>
              <div className='flex gap-x-2 items-center mb-2'>
                {type === 'kost' && (
                  <>
                    <div className='font-semibold p-2 border border-slate-700 rounded-md flex gap-2 items-center'>
                      <HomeFilled />
                      <p>Kost</p>
                    </div>
                  </>
                )}
                {type === 'gedung' && (
                  <>
                    <div className='font-semibold p-2 border border-slate-700 rounded-md flex gap-2 items-center'>
                      <Icon fontSize={20} icon='mingcute:building-1-fill' />
                      <p>Gedung</p>
                    </div>
                  </>
                )}
                {type === 'hotel' && (
                  <>
                    <div className='font-semibold p-2 border border-slate-700 rounded-md flex gap-2 items-center'>
                      <Icon fontSize={20} icon='fa6-solid:hotel' />
                      <p>Hotel</p>
                    </div>
                  </>
                )}
                <div className='font-bold text-white'>
                  {gender === 'pria' && (
                    <p className='bg-primary py-2 px-5 rounded-md'>Pria</p>
                  )}
                  {gender === 'wanita' && (
                    <p className='bg-labelWanita p-2 px-5 rounded-md'>Wanita</p>
                  )}
                  {gender === 'campur' && (
                    <p className='bg-orange-400 p-2 px-5 rounded-md'>Campur</p>
                  )}
                </div>
                <div className='flex items-center gap-x-2'>
                  <StarFilled className='text-[#FFCC00] text-[26px]' />
                  <p className='font-bold text-xl text-rstroke'>
                    {/* {countRate(totalRating)} */}
                    {totalRating}
                  </p>
                </div>
              </div>
              <div className='text-[#DA3438] font-semibold text-lg'>
                {type === 'kost' && (
                  <>
                    <div>
                      <p>
                        sisa <span className='font-bold'>{stok}</span> kamar
                      </p>
                    </div>
                  </>
                )}
                {type === 'hotel' && (
                  <>
                    <div>
                      <p>
                        sisa <span className='font-bold'>{stok}</span> kamar
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className='text-xl '>
                <p className='w-[32rem] overflow-hidden truncate'>
                  {namaProduk}
                </p>
              </div>
              <div className='flex items-center gap-x-2 text-rstroke w-[32rem]'>
                <EnvironmentFilled className='text-xl' />
                <p className='text-xl truncate'>{alamat}</p>
              </div>
              <div className='text-xl font-bold'>
                <p className='w-[300px] overflow-hidden truncate'>{kota}</p>
              </div>
              <div className='text-xl flex '>
                {type === 'kost' && (
                  <div className='flex gap-x-1'>
                    {/* <p className='font-bold'>{toIDR(hargaPerbulan)}</p> */}
                    <p className='font-bold'>{hargaPerbulan}</p>
                    <p className='text-lg'>/bulan</p>
                  </div>
                )}
                {type === 'gedung' && (
                  <div className='flex gap-x-1'>
                    {/* <p className='font-bold'>{toIDR(hargaPerhari)}</p> */}
                    <p className='font-bold'>{hargaPerhari}</p>
                    <p className='text-lg'>/hari</p>
                  </div>
                )}
                {type === 'hotel' && (
                  <div className='flex gap-x-1'>
                    {/* <p className='font-bold'>{toIDR(hargaPerhari)}</p> */}
                    <p className='font-bold'>{hargaPerhari}</p>
                    <p className='text-lg'>/hari</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default ListSearch;
