import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getNotification(id: string) {
    return `/notifications/user/${id}`;
  },
};

const hooks = {
  getNotifByUser(id: string) {
    return useSWR(url.getNotification(id), http.fetcher);
  },
};

export const notifRepository = {
  url,
  hooks,
};
