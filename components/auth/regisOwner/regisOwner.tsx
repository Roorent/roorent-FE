import React, { useState } from 'react';
import { LOGO } from '#/constants/images';
import { Modal, Steps } from 'antd';
import { Form } from 'antd';
import OwnerStep1 from '#/components/auth/regisOwner/step1_owner';
import OwnerStep2 from '#/components/auth/regisOwner/step2_owner';
import OwnerStep3 from '#/components/auth/regisOwner/step3_owner';
import { Register } from '#/types/typeRegis';
import Regis from '#/components/auth/img_regis';
import { Button, message } from 'antd/lib/index';
import { useRouter } from 'next/navigation';
import { authRepository } from '#/repository/auth';
import { ExclamationCircleFilled } from '@ant-design/icons';

function RegisOwner() {
  const router = useRouter();

  const [data, setData] = useState<Register>({
    level: '',
    first_name: '',
    last_name: '',
    phone: '',
    birth_date: '',
    gender: '',
    nik: '',
    photo_ktp: '',
    email: '',
    password: '',
  });

  const [formStep1] = Form.useForm();
  const [formStep2] = Form.useForm();
  const [formStep3] = Form.useForm();

  const steps = [
    {
      title: 'Biodata',
      content: (
        <OwnerStep1 setData={setData} data={data} formStep1={formStep1} />
      ),
    },
    {
      title: 'Veifikasi',
      content: (
        <OwnerStep2 setData={setData} data={data} formStep2={formStep2} />
      ),
    },
    {
      title: 'Akun',
      content: (
        <OwnerStep3 setData={setData} data={data} formStep3={formStep3} />
      ),
    },
  ];

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const onFinish = async () => {
    try {
      const role = 'owner';
      const dataOwner = {
        first_name: data?.first_name,
        last_name: data?.last_name,
        phone: '+62' + data?.phone,
        birth_date: data?.birth_date,
        gender: data?.gender,
        email: data?.email,
        password: data?.password,
        nik: data?.nik,
        photo_ktp: data?.photo_ktp,
      };

      await authRepository.manipulatedata.register(dataOwner, role);
      Modal.success({
        icon: (
          <div className='modal-hapus mb-[10px] flex justify-center'>
            <ExclamationCircleFilled />
          </div>
        ),
        title: (
          <div className='text-3xl font-bold flex justify-center'>
            Anda Telah Berhasil Registrasi
          </div>
        ),
        content: (
          <div className='text-xl font-semibold flex justify-center mb-[25px] text-center'>
            Harap tunggu konfirmasi admin terlebih dahulu !
          </div>
        ),
      });
      setTimeout(() => router.push('/auth/login'));
    } catch (err: any) {
      message.error(err.response.body?.error);
    }
  };

  return (
    <div className='w-full min-h-screen flex justify-center relative'>
      <div className='w-1/2 flex justify-center min-h-screen relative'>
        <div className='w-[653px] py-5'>
          <div className='mb-[100px]'>
            <LOGO className='w-[300px]' />
          </div>
          <div className='text-teks text-4xl font-bold flex justify-center mb-[45px]'>
            <p>Daftar Akun Pemilik</p>
          </div>
          <Steps current={current} items={items} className='mb-[33px]' />
          <div>{steps[current].content}</div>
          {current === 0 && (
            <div style={{ marginTop: 34 }} className='flex justify-end'>
              <div className='regis'>
                {current < steps.length - 1 && (
                  <Button
                    type='primary'
                    htmlType='submit'
                    onClick={() => {
                      next();
                    }}
                    className='regis-next bg-primary rounded-[20px] px-8 py-2.5 text-xl font-bold h-max'
                  >
                    Lanjut
                  </Button>
                )}
              </div>
            </div>
          )}
          {current === 1 && (
            <div style={{ marginTop: 34 }} className='flex justify-between'>
              <div className='regis'>
                {current > 0 && (
                  <Button
                    onClick={() => prev()}
                    className='regis-prev rounded-[20px] px-8 py-2.5 text-xl font-bold h-max'
                  >
                    Kembali
                  </Button>
                )}
              </div>
              <div className='regis'>
                {current < steps.length - 1 && (
                  <Button
                    type='primary'
                    htmlType='submit'
                    onClick={() => {
                      next();
                    }}
                    className='regis-next bg-primary rounded-[20px] px-8 py-2.5 text-xl font-bold h-max'
                  >
                    Lanjut
                  </Button>
                )}
              </div>
            </div>
          )}
          {current === 2 && (
            <div style={{ marginTop: 34 }} className='flex justify-between'>
              <div className='regis'>
                {current > 0 && (
                  <Button
                    onClick={() => prev()}
                    className='regis-prev rounded-[20px] px-8 py-2.5 text-xl font-bold h-max'
                  >
                    Kembali
                  </Button>
                )}
              </div>
              <div className='regis'>
                {current === steps.length - 1 && (
                  <Button
                    type='primary'
                    htmlType='submit'
                    disabled={
                      data.first_name.length <= 1 ||
                      data.last_name.length <= 1 ||
                      data.phone.length <= 1 ||
                      data.birth_date.length <= 1 ||
                      data.gender.length <= 1 ||
                      data.nik.length <= 1 ||
                      data.photo_ktp.length <= 1 ||
                      data.email.length <= 1 ||
                      data.password.length <= 1
                    }
                    onClick={onFinish}
                    // onClick={()=> (
                    //   console.log(data.first_name.length  ,
                    //     data.last_name.length  ,
                    //     data.phone.length  ,
                    //     data.birth_date.length ,
                    //     data.gender.length  ,
                    //     data.nik.length  ,
                    //     data.photo_ktp.length  ,
                    //     data.email.length  ,
                    //     data.password.length )

                    // )}
                    className='regis-next bg-primary rounded-[20px] px-8 py-2.5 text-xl font-bold h-max'
                  >
                    Daftar
                  </Button>
                )}
              </div>
            </div>
          )}
          <div className='text-teks text-xl absolute bottom-10'>
            <p>
              Sudah punya akun?
              <a
                href='/auth/login'
                className='ml-2 font-bold no-underline hover:underline'
              >
                Masuk disini!
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className='w-1/2 relative'>
        <div className='h-full flex items-center justify-center'>
          <Regis />
        </div>
        <div className='w-full h-full bg-primary blur-[2px] top-0 right-0 absolute -z-50'></div>
      </div>
    </div>
  );
}

export default RegisOwner;
