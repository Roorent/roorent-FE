import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  createRentApp: (id: string) => `/rent-applications/${id}`,
  getRentAppById: (id: string) => `/rent-applications/${id}`,
};

const manipulatedata = {
  createRentApp(id: string, data: any) {
    return http.post(url.createRentApp(id)).send(data);
  },
};

const hooks = {
  getRentAppById(id: string) {
    return useSWR(url.getRentAppById(id), http.fetcher);
  },
};

export const RentAppRepository = {
  url,
  manipulatedata,
  hooks,
};
