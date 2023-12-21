import moment from 'moment';

export const convertTime = (inputString: any) => {
  const inputDate = moment(inputString);
  const currentDate = moment();

  inputDate.locale('jv');
  console.log(inputDate);

  const diffInDays = currentDate.diff(inputDate, 'days');

  if (diffInDays === 0) {
    // Hari ini, tampilkan jam
    const hours = inputDate.format('HH:mm');
    console.log(hours);
    return hours;
  } else if (diffInDays === 1) {
    // Kemarin
    const yesterday = moment(currentDate);
    yesterday.add(-1, 'days');
    const hours = inputDate.format('HH:mm');
    console.log(`Kemarin ${hours}`);
    return `Kemarin ${hours}`;
  } else if (diffInDays <= 7) {
    // Dalam 7 hari terakhir
    const day = inputDate.format('D');
    console.log(`${day} hari yang lalu`);
    return `${day} hari yang lalu`;
  } else {
    // Tanggal lebih dari 7 hari yang lalu, tampilkan tanggal
    const date = inputDate.format('DD MMMM YYYY');
    console.log(date);
    return date;
  }
};
