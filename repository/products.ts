import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  createProduct: () => '/products',
  uploadProduct: () => '/photo-products/upload-photo-products',
  updateProduct: (id: any) => `/products/${id}`,
  getListProductByOwner(
    id: string,
    type?: string,
    page?: number,
    limit?: number
  ) {
    return `/products/find-owner/${id}?type=${type}&page=${page}&limit=${limit}`;
  },
  getProductById(id: string) {
    return `/products/${id}`;
  },
  deleteProductById(id: string) {
    return `/products/${id}`;
  },
  getProductsById(id: string) {
    return `/products/${id}`;
  },
  getAllKos: () => '/products/all',
  searchProducts: (search: string) => {
    return `/products/search?q=${search}`;
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
  updateProducts(id: any, data: any) {
    return http.put(url.updateProduct(id)).send(data);
  },
  deleteProducts(id: string) {
    return http.del(url.deleteProductById(id)).send(id);
  },
};

const hooks = {
  getListProductByOwner(
    id: string,
    type?: string,
    page?: number,
    limit?: number
  ) {
    return useSWR(
      url.getListProductByOwner(id, type, page, limit),
      http.fetcher
    );
  },
  getProductsById(id: any) {
    return useSWR(url.getProductsById(id), http.fetcher);
  },
  getAllKos() {
    return useSWR(url.getAllKos(), http.fetcher);
  },
  searchProducts(search: string) {
    return useSWR(url.searchProducts(search), http.fetcher);
  },
};

export const productsRepository = {
  url,
  manipulatedata,
  hooks,
};
