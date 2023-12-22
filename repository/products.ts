import { http } from '#/utils/http';

const url = {
  createProduct: () => '/products',
  uploadProduct: () => '/photo-products/upload-photo-products',
  updateProduct: (id:any) => '/products/${id}',
};

const manipulatedata = {
  createProducts(data: any) {
    return http.post(url.createProduct()).send(data);
  },
  uploadPhotoProducts(data: any) {
    const formData = new FormData();
    formData.append('photo-products', data);
    return http.post(url.uploadProduct()).send(formData);
  },
  updateProducts(id: any) {
    return http.put(url.updateProduct(id)).send(id);
  },
  // updatePhoto(data: any) {
  //   const formData = new FormData();
  //   formData.append('photo-products', data);
  //   return http.put(url.uploadProduct()).send(formData);
  // },
};

export const productsRepository = {
  url,
  manipulatedata,
};
