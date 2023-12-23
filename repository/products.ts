import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  createProduct: () => '/products',
  uploadProduct: () => '/photo-products/upload-photo-products',
  updateProduct: (id: any) => `/products/${id}`,
  getListProductByOwner(id: string) {
    return `/products/find-owner/${id}`;
  },
  deleteProductById(id: string) {
    return `/products/${id}`;
  },
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
  deleteProducts(id: string){
    return http.del(url.deleteProductById(id)).send(id);
  }
  // updatePhoto(data: any) {
    //   const formData = new FormData();
    //   formData.append('photo-products', data);
    //   return http.put(url.uploadProduct()).send(formData);
    // },
  };
  
  const hooks = {
    getListProductByOwner(id: string) {
      return useSWR(url.getListProductByOwner(id), http.fetcher);
    },
  };

export const productsRepository = {
  url,
  manipulatedata,
  hooks,
};
