import { http } from '#/utils/http';

const url = {
  createRentApp: (id: string) => `/rent-applications/${id}`,
};

const manipulatedata = {
  createRentApp(id: string, data: any) {
    return http.post(url.createRentApp(id)).send(data);
  },
};

export const RentAppRepository = {
  url,
  manipulatedata,
};
