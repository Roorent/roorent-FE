'use client';

import React, { useState } from 'react';
import { Button, message } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

const Favorite = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    setIsFavorite((prev) => !prev);

    // Menampilkan pesan berhasil tambah/hapus favorit
    const successMessage = isFavorite
      ? 'Dihapus dari Favorit'
      : 'Ditambahkan ke Favorit';

    message.success(successMessage);
  };

  return (
    <Button
      type="text"
      icon={isFavorite ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
      onClick={handleClick}
    >
      {isFavorite ? 'Favorited' : 'Add to Favorites'}
    </Button>
  );
};

export default Favorite;

