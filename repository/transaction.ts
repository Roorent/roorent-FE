import { http } from '#/utils/http';
import useSWR, { mutate } from 'swr';

const url = {
  createTransactionRenter: (id: string) =>
    `/transactions/renter-to-admin/${id}`,
  uploadPayment: () => '/transactions/upload-transactions',
  getDetailRenter: (id: string) => `/transactions/renter/${id}`,
  getTransactionsRenter: () => '/transactions/all-renter',
  transactionsApp: (id: string) => `/transactions/applications/${id}/`,
  getListTransactionsByRenter: (
    id: string,
    status: string,
    page?: number,
    limit?: number
  ) =>
    `/transactions/list-renter/${id}?status=${status}&page=${page}&limit=${limit}`,
  getDetailTransactions: (id: string) => `/transactions/${id}`,
  getlistTransactionsByProducts: (id: string) => `/transactions/products/${id}`,
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

  async transactionsApp(id: string, data: any) {
    try {
      await http.put(url.transactionsApp(id)).send(data);
      mutate(url.getTransactionsRenter());
    } catch (err) {
      throw err;
    }
  },
};

const hooks = {
  getDetailRenter(id: string) {
    return useSWR(url.getDetailRenter(id), http.fetcher);
  },
  getTransactionsRenter() {
    return useSWR(url.getTransactionsRenter(), http.fetcher);
  },
  getListTransactionsByRenter(
    id: string,
    status: string,
    page?: number,
    limit?: number
  ) {
    return useSWR(
      url.getListTransactionsByRenter(id, status, page, limit),
      http.fetcher
    );
  },
  getDetailTransactions(id: string) {
    return useSWR(url.getDetailTransactions(id), http.fetcher);
  },
  getlistTransactionsByProducts(id: string) {
    return useSWR(url.getlistTransactionsByProducts(id), http.fetcher);
  },
};

export const TransactionRepository = {
  url,
  manipulatedata,
  hooks,
};
