import { HeartOutlined } from "@ant-design/icons";
import React from "react";

function Favorite() {
  return (
    <div>
      <div className="bg-primary flex w-10 h-10 p-1 items-center justify-center rounded-[5px] cursor-pointer border-2 border-[#2951A3]">
        <HeartOutlined className="text-white text-3xl" />
      </div>
    </div>
  );
}

export default Favorite;
