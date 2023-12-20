import React from 'react';
import { MASCOT_RENTER } from '#/constants/images';

interface Props {
  active: boolean;
}

const Renter: React.FC<Props> = (props) => {
  return (
    <div className='flex justify-center items-center'>
      <img src={MASCOT_RENTER} alt='Mascot Owner' className='pr-3' />
      <p className={`font-bold text-xl ${props.active ? 'text-white' : ''}`}>
        Penyewa
      </p>
    </div>
  );
};

export default Renter;
