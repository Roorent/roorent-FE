'use client';

import ListRiwayat from '#/components/List-Riwayat';
import Photo from '#/components/Photo';
import { TransactionRepository } from '#/repository/transaction';
import { usersRepository } from '#/repository/users';
import { parseJwt } from '#/utils/convert';
import {
  ArrowLeftOutlined,
  FileSyncOutlined,
  RightOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Empty, Menu, Pagination, Select, Spin } from 'antd';
import { MenuProps } from 'antd/lib';
import { Option } from 'antd/lib/mentions';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

function RiwayatTransaksi() {
  const token = localStorage.getItem('access_token');
  let id: string = '';

  if (token) {
    id = parseJwt(token).id;
  }

  const [filteredDatas, setFilteredDatas] = useState([]);
  const [filterType, setFilterType] = useState('semua');
  const riwayatTransaksi: MenuItem[] = [
    getItem(
      null,
      null,
      null,
      [
        getItem('Pengaturan', '/profile/setting', <SettingOutlined />),
        getItem(
          'Riwayat Transaksi',
          '/riwayat-transaksi',
          <FileSyncOutlined />
        ),
      ],
      'group'
    ),
  ];
  const pathname = usePathname();
  const router = useRouter();
  const [currRiwayat, setCurrRiwayat] = useState<any>(pathname);

  const onClickRiwayat: MenuProps['onClick'] = (e: any) => {
    setCurrRiwayat(e.key);
    router.push(e.key);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const { data, error, isLoading, mutate } =
    TransactionRepository.hooks.getListTransactionsByRenter(
      id,
      filterType,
      currentPage,
      limit
    );

  const datas = data?.transactionsData;

  const { data: dataProfile } = usersRepository.hooks.getUserProfile(id);
  const datasUser = dataProfile?.data;

  useEffect(() => {
    setFilteredDatas(datas);
  }, [datas]);

  interface OptionTypeIO {
    value: string;
    label: string;
  }

  const options: OptionTypeIO[] = [
    { value: 'semua', label: 'Semua Transaksi' },
    { value: 'pending', label: 'Belum Dikonfirmasi' },
    { value: 'approve', label: 'Dikonfirmasi' },
    { value: 'reject', label: 'Ditolak' },
  ];

  const handleChange = (value: string) => {
    setFilterType(value);
    setCurrentPage(1);

    if (value === 'semua') {
      setFilteredDatas(datas);
    } else {
      const filtered = datas?.filter(
        (item: any) => item.payment_status === value
      );
      setFilteredDatas(filtered);
    }
  };

  if (!datas) {
    return (
      <Spin
        size='large'
        className='w-full h-full flex items-center justify-center'
      />
    );
  }

  return (
    <div>
      <div className='w-full grid gap-y-[20px]'>
        <div className='w-full flex items-center gap-x-[20px] grid-cols-1 mb-10'>
          <a
            href='/profile'
            className='w-fit hover:text-teks flex font-bold text-4xl gap-3'
          >
            <div>
              <ArrowLeftOutlined />
            </div>
          </a>
          <div className='w-full flex justify-center text-4xl font-bold'>
            Riwayat Transaksi
          </div>
        </div>
        <div className='w-full h-full flex gap-x-20 profile'>
          <div className='w-1/4 h-fit grid gap-y-8 profile sticky top-5'>
            <a href='/profile'>
              <div
                className='flex p-3 bg-white rounded-[10px] items-center hover:text-teks'
                style={{ boxShadow: '0 6px 16px #0000001f' }}
              >
                <div className='w-full flex items-center gap-x-3 text-teks'>
                  <div>
                    <Photo
                      className='cursor-pointer'
                      size={70}
                      src={datasUser?.photo}
                    />
                  </div>
                  <div className='text-xl font-bold'>{datasUser?.name}</div>
                </div>
                <div className='text-xl font-bold text-teks'>
                  <RightOutlined />
                </div>
              </div>
            </a>
            <div
              className='w-full flex justify-center text-primary text-xl font-semibold bg-white border border-primary rounded-[10px] py-2'
              style={{ boxShadow: '0 1px 8px rgba(36,36,36,.14)' }}
            >
              {datasUser?.role === 'renter' ? <>Penyewa</> : <>Pemilik</>}
            </div>
            <Menu
              onClick={onClickRiwayat}
              mode='inline'
              style={{ width: '100%', borderRight: 0 }}
              selectedKeys={[currRiwayat]}
              items={riwayatTransaksi}
              className='profile flex flex-col gap-1 justify-center text-rstroke'
            />
          </div>
          <div className='w-3/4 h-full '>
            <div className='grid gap-y-3'>
              <div className='transaksi w-full mb-[30px]'>
                <Select
                  value={filterType}
                  className='transaksi w-full'
                  onChange={handleChange}
                >
                  {options.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            {datas?.length > 0 ? (
              <>
                <div className='grid gap-10 grid-cols-2'>
                  {datas?.map((riwayat: any) => (
                    <div key={riwayat.id}>
                      <ListRiwayat
                        idTransaction={riwayat.id}
                        image={riwayat.product_photo}
                        product_type={riwayat.product_type}
                        product_label={riwayat.product_gender}
                        product_name={riwayat.product_name}
                        product_address={riwayat.product_address}
                        total_price={riwayat.total_price}
                        statusPembayaran={riwayat.statusPembayaran}
                      />
                    </div>
                  ))}
                </div>
                <div className='w-full py-[20px] flex justify-end'>
                  <Pagination
                    current={currentPage}
                    total={data?.count}
                    pageSize={limit}
                    onChange={handlePageChange}
                    className='text-2xl font-semibold'
                  />
                </div>
              </>
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
                    Belum ada riwayat transkasi
                  </span>
                }
              ></Empty>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiwayatTransaksi;
