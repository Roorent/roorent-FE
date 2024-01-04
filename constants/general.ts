import { config } from '#/config/app';

export const isRole = {
  admin: 'admin',
  owner: 'owner',
  renter: 'renter',
};

export const FEES = [
  { name: 'kost', value: 5 },
  { name: 'gedung', value: 10 },
  { name: 'hotel', value: 10 },
];

export const imgProduct = (img: string) =>
  `${config.baseUrl}/images/photo-products/${img}`;

export const imgProfile = (img: string) =>
  `${config.baseUrl}/images/profile/${img}`;

export const imgKTP = (img: string) => `${config.baseUrl}/images/ktp/${img}`;

export const imgTransProof = (img: string) =>
  `${config.baseUrl}/images/transactions/${img}`;
