import { LOGO } from '#/constants/images';
import { Steps } from 'antd';
import { useState } from 'react';
import { Form } from 'antd';
import { Register } from '#/types/typeRegis';
import Regis from '#/components/auth/img_regis';
import { Button, message } from 'antd/lib/index';
import RenterStep1 from './step1_renter';
import RenterStep2 from './step2_renter';
import { useRouter } from 'next/navigation';
import { authRepository } from '#/repository/auth';

function RegisRenter() {
  const router = useRouter();
  const [dataInput, setData] = useState<Register>({
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

  const steps = [
    {
      title: 'Biodata',
      content: (
        <RenterStep1
          setData={setData}
          dataInput={dataInput}
          formStep1={formStep1}
        />
      ),
    },
    {
      title: 'Akun',
      content: (
        <RenterStep2
          setData={setData}
          dataInput={dataInput}
          formStep2={formStep2}
        />
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
    const role = 'renter';
    const data = {
      first_name: dataInput?.first_name,
      last_name: dataInput?.last_name,
      phone: '+62' + dataInput?.phone,
      birth_date: dataInput?.birth_date,
      gender: dataInput?.gender,
      email: dataInput?.email,
      password: dataInput?.password,
      nik: dataInput?.nik,
    };
    await authRepository.manipulatedata.register(data, role);

    setTimeout(message.success('Anda Telah Berhasil Registrasi!'), 5000);
    router.push('/auth/login');
  };

  return (
    <div className='w-full min-h-screen flex justify-center relative'>
      <div className='w-1/2 relative'>
        <div className='h-full flex items-center justify-center'>
          <Regis />
        </div>
        <div className='w-full h-full bg-primary blur-[2px] top-0 right-0 absolute -z-50'></div>
      </div>
      <div className='w-1/2 flex justify-center min-h-screen relative'>
        <div className='w-[653px] py-5'>
          <div className='mb-[80px] flex justify-end'>
            <LOGO className='w-[300px]' />
          </div>
          <div className='text-teks text-4xl font-bold flex justify-center mb-[45px]'>
            <p>Daftar Akun Penyewa</p>
          </div>
          <Steps current={current} items={items} className='mb-[33px]' />
          <div>{steps[current].content}</div>
          <div style={{ marginTop: 34 }} className='flex justify-between'>
            <div className='regis'>
              {current > 0 && (
                <Button
                  style={{ margin: '0 8px' }}
                  onClick={() => prev()}
                  className='regis rounded-[20px] px-8 py-2.5 text-xl font-bold h-max'
                >
                  Kembali
                </Button>
              )}
            </div>
            <div></div>
            <div className='regis'>
              {current < steps.length - 1 && (
                <Button
                  type='primary'
                  htmlType='submit'
                  onClick={() => {
                    next();
                  }}
                  className='regis bg-primary rounded-[20px] px-8 py-2.5 text-xl font-bold h-max'
                >
                  Lanjut
                </Button>
              )}
            </div>
          </div>
          <div className='regis'>
            {current === steps.length - 1 && (
              <Button
                type='primary'
                htmlType='submit'
                disabled={
                  dataInput.first_name.length <= 1 ||
                  dataInput.last_name.length <= 1 ||
                  dataInput.phone.length <= 1 ||
                  typeof dataInput.birth_date !== 'object' ||
                  dataInput.gender.length <= 1 ||
                  dataInput.email.length <= 1 ||
                  dataInput.password.length <= 1
                }
                onClick={onFinish}
                className='bg-primary rounded-[20px] px-8 py-2.5 text-xl font-bold regis w-full mt-[38px] h-max regis'
              >
                Daftar
              </Button>
            )}
          </div>
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
    </div>
  );
}
export default RegisRenter;
