import { LOGO } from '#/constants/images';
import {
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
  TwitterOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';
import React from 'react';

function Footer() {
  return (
    <div className='h-[300px] items-center flex justify-between border-t border-slate-200  mt-[100px]'>
      <div className='w-full px-[190px] items-center flex justify-between'>
        <div className='w-[288px] grid gap-y-[15px] grid-cols-1'>
          <div>
            <LOGO className='w-[200px]' />
          </div>
          <div className='font-semibold text-lg'>
            <p>
              Dapatkan berbagai macam tempat untuk di sewa hanya di Roorent.
            </p>
          </div>
        </div>
        <div className='w-fit grid gap-y-[15px] grid-cols-1'>
          <div className='text-3xl font-bold'>
            <p>ROORENT</p>
          </div>
          <div className='grid gap-x-8 gap-y-4 grid-cols-3 font-semibold text-lg'>
            <div>
              <a href='#'>Blog Roorent</a>
            </div>
            <div>
              <a href='#'>Tentang Kami</a>
            </div>
            <div>
              <a href='#'>Pusat Bantuan</a>
            </div>
            <div>
              <a href='#'>Sewa Gedung</a>
            </div>
            <div>
              <a href='#'>Sewa Kost</a>
            </div>
            <div>
              <a href='#'>Sewa Hotel</a>
            </div>
          </div>
        </div>
        <div className='w-fit grid gap-y-[15px] grid-cols-1'>
          <div className='text-3xl font-bold'>
            <p>KEBIJAKAN</p>
          </div>
          <div className='grid gap-y-4 grid-cols-1 font-semibold text-lg'>
            <div>
              <a href='#'>Kebijakan Privasi</a>
            </div>
            <div>
              <a href='#'>Syarat dan Ketentuan Umum</a>
            </div>
          </div>
        </div>
        <div className='w-fit grid gap-y-[15px] grid-cols-1 mt-[45px]'>
          <div className='text-3xl font-bold'>
            <p>HUBUNGI KAMI</p>
          </div>
          <div className='grid gap-y-4 grid-cols-1 font-semibold text-lg'>
            <div>
              <a href='#'>
                <MailOutlined className='mr-2' />
                cs@roorent.com
              </a>
            </div>
            <div>
              <a href='#'>
                <WhatsAppOutlined className='mr-2' />
                +6287625673811
              </a>
            </div>
            <div className='flex gap-8'>
              <a href='#'>
                <TwitterOutlined />
              </a>
              <a href='#'>
                <InstagramOutlined />
              </a>
              <a href='#'>
                <FacebookOutlined />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
