import React from 'react';
import { PROFILE } from '#/constants/images';
import { Avatar } from 'antd';
import { config } from '#/config/app';

function Photo({ className, src, icon, ...props }: any) {
  const customIcon = icon || <PROFILE />;
  const imgProfile = (img: string) => `${config.baseUrl}/images/profile/${img}`;

  return (
    <Avatar size={50} src={imgProfile(src)} icon={customIcon} {...props} />
  );
}

export default Photo;
