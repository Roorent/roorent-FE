import { productsRepository } from "#/repository/products";
import { SearchOutlined } from "@ant-design/icons";
import { SearchProps } from "antd/es/input";
import { Input } from "antd/lib";
import React from "react";

const { Search } = Input;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

function Searchs() {
  const search = ''
  const { data, error, isLoading } = productsRepository.hooks.searchProducts(search);
  
  return (
    <div className="search">
      <Search
        className="search"
        placeholder="Masukan nama lokasi/kota/alamat/produk"
        prefix={<SearchOutlined className="text-3xl" />}
        allowClear
        enterButton="Cari"
        size="large"
        onSearch={onSearch}
      />
    </div>
  );
}

export default Searchs;
