'use client';
import Button from '#/components/Button';
import ListProduk from '#/components/ListProduk';
import Photo from '#/components/Photo';
import TypeRadio from '#/components/TypeButton';
import { productsRepository } from '#/repository/products';
import { parseJwt } from '#/utils/convert';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Image, Pagination, Spin } from 'antd';
import React, { useState } from 'react';

const Produks = [
  {
    idProducts: '1',
    image: '/assets/images/Gedung.png',
    label: 'gedung',
    title:
      'Gedung serba ada HSDGSDKSH ASHDKASKDJHAS KHKAHDA HKAHFKSAHF DFHIASHFISH FDHFSDHFIUW',
  },
  {
    idProducts: '2',
    image: '/assets/images/Gedung.png',
    label: 'gedung',
    title: 'Gedung serba ada',
  },
];

function DetailPengguna() {
  const [filterType, setFilterType] = useState('kost');

  const token = localStorage.getItem('access_token');
  let id: string = '';

  if (token) {
    id = parseJwt(token).id;
  }

  const handleChange = (value: string) => {
    setFilterType(value);
  };

  const { data, error, isLoading, mutate } =
    productsRepository.hooks.getListProductByOwner(id, filterType);

  if (!data) {
    return <div className='w-full h-full flex items-center justify-center'><Spin size="large" /></div>;
  }
  
  const datas = data?.data;
  return (
    <div>
      <div className='w-full grid gap-y-[20px] grid-cols-1 pb-10 border-b border-slate-300'>
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
        <div className='grid gap-y-5 pb-10 border-b border-slate-300'>
          <div className='produkOwner text-white text-4xl font-bold bg-primary rounded-[10px] px-5 py-3 flex items-center mb-[30px]'>
            <p>Data Pemilik</p>
          </div>
          <div className='flex gap-x-10'>
            <div>
              <Photo size={200} src='/assets/images/profile.png' />
            </div>
            <div className='w-full'>
              <div className='grid gap-5'>
                <div className='w-full flex gap-x-5'>
                  <div className='w-full grid gap-y-4 grid-cols-1'>
                    <div>
                      <p className='text-teks text-2xl font-bold'>
                        Nama Lengkap
                      </p>
                    </div>
                    <div className='w-full p-[10px] rounded-[10px] border border-rstroke regis text-xl'>
                      M Danar Kahfi
                    </div>
                  </div>
                </div>
                <div className='w-full flex gap-x-5'>
                  <div className='w-full grid gap-y-4 grid-cols-1'>
                    <div>
                      <p className='text-teks text-2xl font-bold'>No.NIK</p>
                    </div>
                    <div className='w-full p-[10px] rounded-[10px] border border-rstroke regis text-xl'>
                      3275022211058726
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full flex gap-x-5'>
            <div className='w-1/2 grid gap-y-4 grid-cols-1'>
              <div>
                <p className='text-teks text-2xl font-bold'>Emai</p>
              </div>
              <div className='w-full p-[10px] rounded-[10px] border border-rstroke regis text-xl'>
                muhdankah22@gmail.com
              </div>
            </div>
            <div className='w-1/2 grid gap-y-4 grid-cols-1'>
              <div>
                <p className='text-teks text-2xl font-bold'>No. HP</p>
              </div>
              <div className='flex'>
                <div className='w-[10%] p-[10px] rounded-s-[10px] border border-rstroke regis text-xl bg-primary text-white flex justify-center'>
                  +62
                </div>
                <div className='w-full p-[10px] rounded-e-[10px] border-s-0 border border-rstroke regis text-xl'>
                  85156310805
                </div>
              </div>
            </div>
          </div>
          <div className='w-full grid gap-y-4 grid-cols-1'>
            <div>
              <p className='text-teks text-2xl font-bold'>Alamat</p>
            </div>
            <div className='w-full h-[120px] p-[10px] rounded-[10px] border border-rstroke regis text-xl'>
              Jl.Bintara 14 no.100 rt.001/rw.100 kel.harapan kec.orangtua kota
              angan angan
            </div>
          </div>
          <div className='w-full flex gap-x-5'>
            <div className='w-1/2 grid gap-y-4 grid-cols-1'>
              <div>
                <p className='text-teks text-2xl font-bold'>Tanggal Lahir</p>
              </div>
              <div className='w-full p-[10px] rounded-[10px] border border-rstroke regis text-xl'>
                22 November 2005
              </div>
            </div>
            <div className='w-1/2 grid gap-y-4 grid-cols-1'>
              <div>
                <p className='text-teks text-2xl font-bold'>Jenis Kelamin</p>
              </div>
              <div className='w-full p-[10px] rounded-[10px] border border-rstroke regis text-xl'>
                Pria
              </div>
            </div>
          </div>
          <div className='w-full grid gap-y-4 grid-cols-1'>
            <div>
              <p className='text-teks text-2xl font-bold'>Foto KTP</p>
            </div>
            <div className='adm-renter rounded-[10px] w-full flex justify-center'>
              <Image
                // setelah .png jangan di apus itu buat style image nya
                src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_800,w_800'
                width={800}
                style={{ borderRadius: 10 }}
                preview={{
                  src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }}
              />
            </div>
          </div>
          <div className='w-full grid gap-y-4 grid-cols-1'>
            <div>
              <p className='text-teks text-2xl font-bold'>Persetujuan</p>
            </div>
            <div className='w-full'>
              <div className='flex gap-x-5'>
                <div className='w-full'>
                  <Button className='!py-3 !mt-0 !font-semibold !text-2xl !bg-merah hover:!bg-[#e24444]'>
                    Tolak
                  </Button>
                </div>
                <div className='w-full'>
                  <Button className='!py-3 !mt-0 !font-semibold !text-2xl'>
                    Konfirmasi
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-5'>
          <div className='produkOwner text-white text-4xl font-bold bg-primary rounded-[10px] px-5 py-3 flex items-center mb-[30px]'>
            <p>Produk Pemilik</p>
          </div>
          <div className='grid gap-y-3'>
            <div className='w-full mb-[30px]'>
              <TypeRadio
                defaultValue='kost'
                value={filterType}
                onChange={handleChange}
              />
            </div>
            <div className='grid gap-7 grid-cols-2'>
              {datas.map((produk: any) => (
                <div key={produk.id}>
                  <ListProduk
                    idProducts={produk.id}
                    image={produk.photo}
                    label={produk.type}
                    title={produk.name}
                  />
                </div>
              ))}
            </div>
            <div className='w-full py-[20px] flex justify-end'>
              <Pagination
                // current={currentPage}
                // total={totalProducts}
                // pageSize={itemsPerPage}
                // onChange={handlePageChange}
                defaultCurrent={1}
                total={50}
                className='text-2xl font-semibold'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPengguna;
