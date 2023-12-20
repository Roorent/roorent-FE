"use client";

import Button from "#/components/Button";
import Searchs from "#/components/Search";
import { HomeFilled } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { Radio } from "antd";
import React from "react";

function Home() {
  return (
    <div>
      <div className="flex">
        <div className="w-1/2 flex items-center">
          <div>
            <div className="text-6xl font-semibold mb-5">Mau cari apa?</div>
            <div className="text-4xl mb-20">
              Dapatkan informasi dan lakukan penyewaan
            </div>
            <div>
              <Searchs />
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <img
            src="/assets/images/Home.svg"
            alt="Roorent"
            className="w-11/12"
          />
        </div>
      </div>
      <div className="flex justify-center mt-[54px]">
        <Radio.Group defaultValue="kost" buttonStyle="solid">
          <div className="flex gap-x-28">
            <div>
              <Radio.Button
                value="kost"
                className="w-[166px] py-[20px] h-max font-bold flex justify-center text-2xl text-primary"
              >
                <div className="w-full flex items-center">
                  <HomeFilled className="mr-2" /> Kost
                </div>
              </Radio.Button>
            </div>
            <div className="flex">
              <Radio.Button
                value="gedung"
                className="w-[166px] py-[20px] h-max font-bold flex justify-center text-2xl text-primary"
              >
                <div className="w-full flex items-center">
                  <Icon icon="mingcute:building-1-fill" className="mr-2" />{" "}
                  Gedung
                </div>
              </Radio.Button>
            </div>
            <div>
              <Radio.Button
                value="hotel"
                className="w-[166px] py-[20px] h-max font-bold flex justify-center text-2xl text-primary"
              >
                <div className="w-full flex items-center">
                  <Icon icon="fa6-solid:hotel" className="mr-2" /> Hotel
                </div>
              </Radio.Button>
            </div>
          </div>
        </Radio.Group>
      </div>
      <div className="flex items-center py-10 mt-[18px]">
        <div className="w-full text-4xl font-bold">Kost Populer</div>
        <div className="flex">
          <Button
            type="primary"
            htmlType="submit"
            href="#"
            className="w-max hover:!text-white hover:!bg-primary !bg-white !text-primary border-2 border-primary rounded-[10px] text-[20px] font-bold !mt-0 px-7 shadow-md shadow-primary hover:!shadow-lg"
          >
            Lihat Semua
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
