'use client';

import React from 'react';
import Review from '#/components/Review';
import { useRouter } from 'next/navigation';

function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/auth/login');
  };

  return (
    <div>
      Home ketika user belum masuk <Review />
      <div
        className='p-2 w-[100px] text-white font-bold text-center bg-blue-400 rounded-xl cursor-pointer'
        onClick={handleLogin}
      >
        Login
      </div>
    </div>
  );
}

export default Home;
