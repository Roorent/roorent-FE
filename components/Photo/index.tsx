import React from 'react';
import { PROFILE } from '#/constants/images';
import { Avatar } from 'antd';
import { imgProfile } from '#/constants/general';

function Photo({ className, size, src, icon, ...props }: any) {
  const customIcon = icon || <PROFILE />;

  console.log(size, icon, imgProfile(src), 'mn' )
  return (
    <div className={`${className} text-white flex `} {...props}>
      <Avatar size={size} src={imgProfile(src)} icon={customIcon} />
      L
    </div>
  );
}

export default Photo;
