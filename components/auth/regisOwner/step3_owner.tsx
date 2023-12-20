import { Register } from '#/types/typeRegis';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { FormInstance } from 'antd/lib';

type Props = {
  setData: any;
  dataInput: Register;
  formStep3: FormInstance<any>;
};

function OwnerStep3({ setData, dataInput, formStep3 }: Props) {
  return (
    <Form name='step3Owner' form={formStep3}>
      <div>
        <div className='grid gap-y-4 grid-cols-1'>
          <div>
            <p className='text-teks text-2xl font-bold'>Email</p>
          </div>
          <div className='w-full'>
            <Form.Item
              name='email'
              rules={[
                { required: true, message: 'Harap masukkan email anda!' },
              ]}
            >
              <Input
                onChange={(e) => {
                  setData({ ...dataInput, email: e.target.value });
                }}
                size='large'
                placeholder='Masukkan email'
                className=' p-[10px] rounded-[10px] border border-rstroke regis text-xl'
              />
            </Form.Item>
          </div>
        </div>
        <div className='grid gap-y-4 grid-cols-1'>
          <div>
            <p className='text-teks text-2xl font-bold'>Kata Sandi</p>
          </div>
          <div className='w-full'>
            <Form.Item
              name='password'
              rules={[
                { required: true, message: 'Harap masukkan kata sandi anda!' },
              ]}
            >
              <Input.Password
                onChange={(e) => {
                  setData({ ...dataInput, password: e.target.value });
                }}
                size='large'
                placeholder='Masukkan kata sandi'
                className='p-[10px] rounded-[10px] border border-rstroke regis text-xl'
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </div>
        </div>
        <div className='grid gap-y-4 grid-cols-1'>
          <div>
            <p className='text-teks text-2xl font-bold'>
              Konfirmasi Kata Sandi
            </p>
          </div>
          <div className='w-full'>
            <Form.Item
              name='confirm'
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Harap konfirmasi kata sandi anda!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Kata sandi yang Anda masukkan tidak cocok!')
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                size='large'
                placeholder='Masukkan kembali kata sandi'
                className='p-[10px] rounded-[10px] border border-rstroke regis text-xl'
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
}
export default OwnerStep3;
