import React from 'react';
import { PROFILE } from '#/constants/images';
import { Avatar } from 'antd';
import { imgProfile } from '#/constants/general';

function Photo({ className, src, icon, ...props }: any) {
  const customIcon = icon || <PROFILE />;

  return (
    <Avatar size={50} src={imgProfile(src)} icon={customIcon} {...props} />
  );
}

export default Photo;
