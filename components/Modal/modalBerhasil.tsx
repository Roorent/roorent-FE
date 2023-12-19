import { CheckCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React from "react";

function ModalBerhasil({ title, content, buttonText }: any) {
  const success = () => {
    Modal.success({
      icon: (
        <div className="modal-hapus mb-[10px] flex justify-center">
          <CheckCircleFilled />
        </div>
      ),
      title: (
        <div className="text-3xl font-bold flex justify-center">{title}</div>
      ),
      content: (
        <div className="text-xl font-semibold flex justify-center mb-[25px]">
          {content}
        </div>
      ),
    });
  };
  return (
    <div className="modal-berhasil">
      <Button
        type="primary"
        htmlType="submit"
        block
        onClick={success}
        className="bg-primary border border-white !rounded-full text-2xl font-bold py-3 h-max"
      >
        {buttonText}
      </Button>
    </div>
  );
}

export default ModalBerhasil;
