import { http } from '#/utils/http';
import useSWR, { mutate } from 'swr';

const url = {
  getUserById: (id: string) => `/users/byId/${id}`,
  approveReject: (id: string, status: string) => `/users/${status}/${id}`,
};

const manipulateData = {
  approveReject: async (id: string, status: string) => {
    await http.put(url.approveReject(id, status)).send();
    mutate(url.getUserById(id));
  },
};

const hooks = {
  getUserById(id: string) {
    return useSWR(url.getUserById(id), http.fetcher);
  },
};

export const usersRepository = {
  url,
  manipulateData,
  hooks,
};
