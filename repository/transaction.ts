import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  createTransactionRenter: (id: string) =>
    `/transactions/renter-to-admin/${id}`,
  uploadPayment: () => '/transactions/upload-transactions',
  getDetailRenter: (id: string) => `/transactions/renter/${id}`,
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

const hooks = {
  getDetailRenter(id: string) {
    return useSWR(url.getDetailRenter(id), http.fetcher);
  },
};

export const TransactionRepository = {
  url,
  manipulatedata,
  hooks,
};
