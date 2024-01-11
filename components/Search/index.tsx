import { productsRepository } from '#/repository/products';
import { SearchOutlined } from '@ant-design/icons';
import { SearchProps } from 'antd/es/input';
import { Input } from 'antd/lib';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function Searchs({ placeholder }: any) {
  const [searcher, setSearcher] = useState('');

  const { Search } = Input;
  const router = useRouter();

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    setSearcher(value);
    router.push('/search');
  };

  const { data, error, isLoading } =
    productsRepository.hooks.searchProducts(searcher);

  // if (data) {
  //   router.push('/search');
  // }

  return (
    <div className='search'>
      <Search
        className='search font-semibold'
        placeholder={placeholder}
        prefix={<SearchOutlined className='text-3xl' />}
        allowClear
        enterButton='Cari'
        size='large'
        onSearch={onSearch}
      />
    </div>
  );
}

export default Searchs;
