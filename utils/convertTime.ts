import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/id';

export const convertTime = (inputString: any) => {
  moment.locale('id');

  const inputDate = moment(inputString);
  const currentDate = moment();

  const diffInDays = currentDate.diff(inputDate, 'days');

  if (diffInDays === 0) {
    // Hari ini, tampilkan jam
    const hours = inputDate.format('HH:mm');
    return hours;
  } else if (diffInDays === 1) {
    // Kemarin
    const yesterday = moment(currentDate);
    yesterday.add(-1, 'days');
    const hours = inputDate.format('HH:mm');
    return `Kemarin ${hours}`;
  } else if (diffInDays <= 7) {
    // Dalam 7 hari terakhir
    const day = inputDate.format('D');
    return `${day} hari yang lalu`;
  } else {
    // Tanggal lebih dari 7 hari yang lalu, tampilkan tanggal
    const date = inputDate.format('DD MMMM YYYY');
    return date;
  }
};
