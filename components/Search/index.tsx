import { SearchOutlined } from "@ant-design/icons";
import { SearchProps } from "antd/es/input";
import { Input } from "antd/lib";
import React from "react";

const { Search } = Input;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

function Searchs({placeholder,}:any) {
  return (
    <div className="search">
      <Search
        className="search font-semibold"
        placeholder={placeholder}
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
