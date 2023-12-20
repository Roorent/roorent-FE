import React from 'react';
import { PROFILE } from '#/constants/images';
import { Avatar } from 'antd';

function Photo({ className, icon, ...props }: any) {
  const customIcon = icon || <PROFILE />;

  return <Avatar size={50} icon={customIcon} {...props} />;
}

export default Photo;
