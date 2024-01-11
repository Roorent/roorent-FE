import { http } from '#/utils/http';
import useSWR, { mutate } from 'swr';

const url = {
  getAllUsers(role?: string, page?: number, limit?: number) {
    return `/users?role=${role}&page=${page}&limit=${limit}`;
  },
  getUserById: (id: string) => `/users/byId/${id}`,
  approveReject: (id: string, status: string) => `/users/${status}/${id}`,
  uploadPhotoProfile: () => '/biodatas/upload-profile',
  updateProfile: (id: string) => `/users/${id}`,
  getUserProfile: (id: string) => `/users/profile/${id}`,
  updatePassword: (id: string) => `/users/password/${id}`,
  nonactiveAccount: (id: string) => `/users/nonactive/${id}`,
};

const manipulateData = {
  approveReject: async (id: string, status: string) => {
    await http.put(url.approveReject(id, status)).send();
    mutate(url.getUserById(id));
  },
  uploadPhotoProfile(data: any) {
    const formData = new FormData();
    formData.append('photo_profile', data);
    return http.post(url.uploadPhotoProfile()).send(formData);
  },
  updateProfile(id: any, data: any) {
    return http.put(url.updateProfile(id)).send(data);
  },
  updatePassword(id: any, data: any) {
    return http.put(url.updatePassword(id)).send(data);
  },
  async nonactiveAccount(id: string) {
    await http.put(url.nonactiveAccount(id)).send();
  },
};

const hooks = {
  getAllUsers(role?: string, page?: number, limit?: number) {
    return useSWR(url.getAllUsers(role, page, limit), http.fetcher);
  },
  getUserById(id: string) {
    return useSWR(url.getUserById(id), http.fetcher);
  },
  getUserProfile(id: string) {
    return useSWR(url.getUserProfile(id), http.fetcher);
  },
};

export const usersRepository = {
  url,
  manipulateData,
  hooks,
};
