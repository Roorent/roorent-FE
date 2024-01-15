import { productsRepository } from '#/repository/products';
import { Button, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

//disini tambahin mutate juga
function ModalDelete({ title, content, icon, buttonText, id, mutate, className }: any) {
  const { confirm } = Modal;
  const router = useRouter()
  const data = productsRepository.manipulatedata.deleteProducts(id)

  const showDeleteConfirm = () => {
    confirm({
      title: (
        <div className='text-3xl font-bold flex justify-center'>{title}</div>
      ),
      content: (
        <div className='text-xl font-semibold flex justify-center mb-[25px]'>
          {content}
        </div>
      ),
      icon: (
        <div className='modal-hapus mb-[10px] flex justify-center'>{icon}</div>
      ),
      okText: (
        <div className='modal-hapus text-xl font-bold text-white'>Ya</div>
      ),
      cancelText: <div className='text-xl font-bold text-white'>Batal</div>,
      onOk() {       
        data.then((del:any) => {
          return del
        });
        //disini panggil mutate nya
        mutate(data)
        // router.refresh()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const styleButton = `hover:text-white hover:!bg-[#e24444] hapus !bg-merah rounded-[10px] text-base font-bold py-3 w-[111px] h-max ${className}`
  return (
    <div className='modal-hapus'>
      <Button
        type='primary'
        onClick={showDeleteConfirm}
        className={styleButton}
      >
        {buttonText}
      </Button>
    </div>
  );
}

export default ModalDelete;
