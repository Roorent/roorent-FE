import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  createTransactionRenter: (id: string) => `/rent-applications/${id}`,
  uploadPayment: () => '/transactions/upload-transactions',
};

const manipulatedata = {
  createTransactionRenter(id: string, data: any) {
    return http.post(url.createTransactionRenter(id)).send(data);
  },
  uploadPayment(data: any) {
    const formData = new FormData();
    formData.append('photo_transactions', data);
    return http.post(url.uploadPayment()).send(formData);
  },
};

const hooks = {};

export const TransactionRepository = {
  url,
  manipulatedata,
  hooks,
};
