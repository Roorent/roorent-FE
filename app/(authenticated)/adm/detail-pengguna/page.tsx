'use client';

import Button from '#/components/Button';
import ListProduk from '#/components/List-Produk';
import Photo from '#/components/Photo';
import TypeRadio from '#/components/TypeButton';
import { imgKTP, imgProduct, isRole } from '#/constants/general';
import { productsRepository } from '#/repository/products';
import { usersRepository } from '#/repository/users';
import { parseJwt } from '#/utils/convert';
import { convertDate } from '#/utils/convertTime';
import { ArrowLeftOutlined, CalendarOutlined, DownOutlined } from '@ant-design/icons';
import { Empty, Image, Pagination, Spin } from 'antd';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function DetailPengguna() {
  useEffect(() => {
    document.title = 'Detail Pengguna - Roorent';
  }, []);
  const searchParams = useSearchParams();
  const userId: any = searchParams?.get('id');

  const [filterType, setFilterType] = useState('kost');

  const { data: productData } = productsRepository.hooks.getListProductByOwner(
    userId,
    filterType
  );
  const { data: userData } = usersRepository.hooks.getUserById(userId);

  if (!productData) {
    return (
      <Spin
        size='large'
        className='w-full h-full flex items-center justify-center'
      />
    );
  }
  const products = productData?.data;

  if (!userData) {
    return (
      <Spin
        size='large'
        className='w-full h-full flex items-center justify-center'
      />
    );
  }
  const users = userData?.data;

  const handleChange = (value: string) => {
    setFilterType(value);
  };
  const handleApprove = () => {
    usersRepository.manipulateData.approveReject(userId, 'approve');
  };
  const handleReject = () => {
    usersRepository.manipulateData.approveReject(userId, 'reject');
  };

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
              <Photo size={200} src={users.photo} />
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
                      {users.name}
                    </div>
                  </div>
                </div>
                <div className='w-full flex gap-x-5'>
                  <div className='w-full grid gap-y-4 grid-cols-1'>
                    <div>
                      <p className='text-teks text-2xl font-bold'>NIK</p>
                    </div>
                    <div className='w-full p-[10px] rounded-[10px] border border-rstroke regis text-xl'>
                      {users.nik}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full flex gap-x-5'>
            <div className='w-1/2 grid gap-y-4 grid-cols-1'>
              <div>
                <p className='text-teks text-2xl font-bold'>Email</p>
              </div>
              <div className='w-full p-[10px] rounded-[10px] border border-rstroke regis text-xl'>
                {users.email}
              </div>
            </div>
            <div className='w-1/2 grid gap-y-4 grid-cols-1'>
              <div>
                <p className='text-teks text-2xl font-bold'>No. HP</p>
              </div>
              <div className='flex'>
                <div className='w-full p-[10px] rounded-[10px]  border border-rstroke regis text-xl'>
                  {users.phone}
                </div>
              </div>
            </div>
          </div>
          <div className='w-full grid gap-y-4 grid-cols-1'>
            <div>
              <p className='text-teks text-2xl font-bold'>Alamat</p>
            </div>
            <div className='w-full h-[120px] p-[10px] rounded-[10px] border border-rstroke regis text-xl'>
              {users.address}
            </div>
          </div>
          <div className='w-full flex gap-x-5'>
            <div className='w-1/2 grid gap-y-4 grid-cols-1'>
              <div>
                <p className='text-teks text-2xl font-bold'>Tanggal Lahir</p>
              </div>
              <div className='w-full p-[10px] rounded-[10px] border border-rstroke regis text-xl flex'>
                <div className='w-full'>
                  {convertDate(users.birthday)}
                </div>
                <div>
                  <CalendarOutlined />
                </div>
              </div>
            </div>
            <div className='w-1/2 grid gap-y-4 grid-cols-1'>
              <div>
                <p className='text-teks text-2xl font-bold'>Jenis Kelamin</p>
              </div>
              <div className='w-full p-[10px] rounded-[10px] border border-rstroke regis text-xl flex'>
                <div className='w-full'>
                  {users.gender === 'pria' ? 'Pria' : 'Wanita'}
                </div>
                <div>
                  <DownOutlined />
                </div>
              </div>
            </div>
          </div>
          {users.userRole === isRole.owner ? (
            <div className='w-full grid gap-y-4 grid-cols-1'>
              <div>
                <p className='text-teks text-2xl font-bold'>Foto KTP</p>
              </div>
              <div className='adm-renter rounded-[10px] w-full flex justify-center'>
                <Image
                  src={imgKTP(users.ktp)}
                  width={500}
                  className='blur'
                  style={{ borderRadius: 10 }}
                  preview={{
                    src: imgKTP(users.ktp),
                  }}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
          {users.userRole === isRole.owner && (
            <>
              {users.status === 'pending' && (
                <div className='w-full grid gap-y-4 grid-cols-1'>
                  <div>
                    <p className='text-teks text-2xl font-bold'>Persetujuan</p>
                  </div>
                  <div className='w-full'>
                    <div className='flex gap-x-5'>
                      <div className='w-full'>
                        <Button
                          className='!py-3 !mt-0 !font-semibold !text-2xl !bg-merah hover:!bg-[#e24444]'
                          onClick={handleReject}
                        >
                          Tolak
                        </Button>
                      </div>
                      <div className='w-full'>
                        <Button
                          className='!py-3 !mt-0 !font-semibold !text-2xl'
                          onClick={handleApprove}
                        >
                          Konfirmasi
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        {users.userRole === isRole.owner ? (
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
              {products.length ? (
                <div className='grid gap-7 grid-cols-2'>
                  {products.map((produk: any) => (
                    <div key={produk.id}>
                      <ListProduk
                        idProducts={produk.id}
                        image={imgProduct(produk.photo)}
                        label={produk.type}
                        title={produk.name}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <Empty
                  image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                  imageStyle={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '100%',
                  }}
                  description={
                    <span className='font-semibold text-2xl text-[#C0C0C0]'>
                      Belum mempunyai produk
                    </span>
                  }
                />
              )}
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
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default DetailPengguna;
