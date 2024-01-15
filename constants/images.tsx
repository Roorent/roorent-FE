export const MASCOT_OWNER = '/assets/images/mascot-owner.png';
export const MASCOT_RENTER = '/assets/images/mascot-renter.png';
export const LOGIN = '/assets/images/Login.png';
export const REGIS = '/assets/images/Register.png';

// untuk komponen
import React from 'react';

const PROFILE = () => {
  return <img src='/assets/images/profile.png' alt='Profile' />;
};
const GMAPS = () => {
  return <img src='/assets/images/gmaps.png' alt='Google-Map' className='w-full rounded-[10px] object-cover object-center filter blur-[2px]'/>;
};

const LOGO = ({ className }: any) => {
  const custClass = `w-[230px] ${className}`;
  return (
    <img src='/assets/images/logo.png' alt='Roorent' className={custClass} />
  );
};

export { PROFILE, LOGO, GMAPS };
