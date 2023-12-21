import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getListProductByOwner(id: string) {
    return `/products/find-owner/${id}`;
  },
};

const hooks = {
  getListProductByOwner(id: string) {
    return useSWR(url.getListProductByOwner(id), http.fetcher);
  },
};

export const productRepository = {
  url,
  hooks,
};
