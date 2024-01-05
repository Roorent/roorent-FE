import React from 'react';
import { PROFILE } from '#/constants/images';
import { Avatar } from 'antd';
import { imgProfile } from '#/constants/general';

function Photo({ className, size, src, icon, ...props }: any) {
  const customIcon = icon || <PROFILE />;

  return (
    <div className={className} {...props}>
      <Avatar size={size} src={imgProfile(src)} icon={customIcon} />
    </div>
  );
}

export default Photo;
