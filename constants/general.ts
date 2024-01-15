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

export const PROD_TYPE = [
  { name: 'kost', label: 'Kost' },
  { name: 'gedung', label: 'Gedung' },
  { name: 'hotel', label: 'Hotel' },
];

export const PAYMENT_TYPE = [
  { name: 'harian', value: 'Harian' },
  { name: 'bulanan', value: 'Bulanan' },
];

export const RANGE_PRICE = [
  { name: 'min0-max1', min: 1, max: 1000000 },
  { name: 'min1-max2', min: 1000001, max: 2000000 },
  { name: 'min2-max3', min: 2000001, max: 3000000 },
  { name: 'min3-maxn', min: 3000001, max: 999999999 },
];

export const imgProduct = (img: string) =>
  `${config.baseUrl}/images/photo-products/${img}`;

export const imgProfile = (img: string) =>
  `${config.baseUrl}/images/profile/${img}`;

export const imgKTP = (img: string) => `${config.baseUrl}/images/ktp/${img}`;

export const imgTransProof = (img: string) =>
  `${config.baseUrl}/images/transactions/${img}`;

export const imgReviews = (img: string) =>
  `${config.baseUrl}/images/photo-reviews/${img}`;
