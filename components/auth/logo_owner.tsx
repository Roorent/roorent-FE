import React from 'react';
import { MASCOT_OWNER } from '#/constants/images';

interface Props {
  active: boolean;
}

const Owner: React.FC<Props> = (props) => {
  return (
    <div className='flex justify-center items-center'>
      <img src={MASCOT_OWNER} alt='Mascot Owner' className='pr-3' />
      <p className={`font-bold text-xl ${props.active ? 'text-white' : ''}`}>
        Pemilik
      </p>
    </div>
  );
};

export default Owner;
