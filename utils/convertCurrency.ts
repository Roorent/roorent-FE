export const toIDR = (number: any) => {
  const formattedNumber = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(number);

  return formattedNumber.replace(/,\d{2}$/, '');
};
