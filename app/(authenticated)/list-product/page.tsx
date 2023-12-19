"use client";
import { HomeFilled, QuestionCircleFilled } from "@ant-design/icons";
import { Icon } from '@iconify/react';
import { Pagination, Select } from "antd";
import Button from "#/components/Button";
import React, { useEffect } from "react";
import CardProduk from "#/components/Card";
import ModalDelete from "#/components/Modal/modalDelete";

const products = [
  {
    id: "1",
    image: "/assets/images/Kost.png",
    icon: <HomeFilled />,
    label: "Kost",
    content: "Kost Apik Pikitdro 22 Tipe C Cibeunying Kaler Bandung",
    hapus: (
      <ModalDelete
        title="Hapus Produk"
        content="Apakah anda yakin ingin hapus ?"
        icon={<QuestionCircleFilled />}
        buttonText="Hapus"
      />
    ),
    hrefDetail: "#",
    hrefEdit: "#",
  },
  {
    id: "2",
    image: "/assets/images/Gedung.png",
    icon: <Icon icon="mingcute:building-1-fill" className="text-xl" />,
    label: "Gedung",
    content: "Gedung Apik Pikitdro 22 Tipe C Cibeunying Kaler Bandung",
    hapus: (
      <ModalDelete
        title="Hapus Produk"
        content="Apakah anda yakin ingin hapus ?"
        icon={<QuestionCircleFilled />}
        buttonText="Hapus"
      />
    ),
    hrefDetail: "#",
    hrefEdit: "#",
  },
  {
    id: "3",
    image: "/assets/images/Hotel.png",
    icon: <Icon icon="fa6-solid:hotel" />,
    label: "Hotel",
    content: "Hotel Apik Pikitdro 22 Tipe C Cibeunying Kaler Bandung",
    hapus: (
      <ModalDelete
        title="Hapus Produk"
        content="Apakah anda yakin ingin hapus ?"
        icon={<QuestionCircleFilled />}
        buttonText="Hapus"
      />
    ),
    hrefDetail: "#",
    hrefEdit: "#",
  },
  {
    id: "4",
    image: "/assets/images/Kost.png",
    icon: <HomeFilled />,
    label: "Kost",
    content: "Kost Apik Pikitdro 22 Tipe C Cibeunying Kaler Bandung",
    hapus: (
      <ModalDelete
        title="Hapus Produk"
        content="Apakah anda yakin ingin hapus ?"
        icon={<QuestionCircleFilled />}
        buttonText="Hapus"
      />
    ),
    hrefDetail: "#",
    hrefEdit: "#",
  },
];

function ListProduct() {
  useEffect(() => {
    document.title = "List Product";
  }, []);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div>
      <div className="produkOwner text-4xl font-bold bg-primary rounded-[10px] px-5 py-2.5 flex items-center mb-[30px]">
        <div className="w-full">
          <p className="text-white w-full">List Produk </p>
        </div>
        <div className="flex gap-x-6 flex items-center">
          <div className="w-full">
            <Select
              defaultValue="semua"
              style={{ width: 120 }}
              className="produkOwner"
              onChange={handleChange}
              options={[
                { value: "semua", label: "Semua" },
                { value: "kost", label: "Kost" },
                { value: "gedung", label: "Gedung" },
                { value: "hotel", label: "Hotel" },
              ]}
            />
          </div>
          <div className="w-full">
            <Button
              type="primary"
              htmlType="submit"
              href="/create-product"
              className="hover:text-primary hover:bg-white bg-tranparant border-2 border-white rounded-[10px] text-[20px] font-bold !mt-0 px-7"
            >
              Tambah
            </Button>
          </div>
        </div>
      </div>
      <div className="grid gap-5 grid-cols-3">
        {products.map((product) => (
          <div key={product.id}>
            <CardProduk
              image={product.image}
              icon={product.icon}
              label={product.label}
              content={product.content}
              hapus={product.hapus}
              hrefDetail="#"
              hrefEdit="#"
            />
          </div>
        ))}
      </div>
      <div className="w-full py-[20px] flex justify-end">
        <Pagination defaultCurrent={1} total={50} className="text-2xl font-semibold" />
      </div>
    </div>
  );
}

export default ListProduct;
