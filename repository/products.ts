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
  getAllProduct: (type?: string) => {
    return `/products/all?type=${type}`;
  },
  searchProducts: (search: string) => {
    return `/products/search?q=${search}`;
  },
  nonactivatProductOwner: (id: string) => {
    return `/products/noactivate-products/${id}`;
  },
  getProductsOwnerByAdmin(
    id: string,
    type?: string,
    page?: number,
    limit?: number,
    status?: string
  ) {
    return `/products/find-owner/${id}?type=${type}&page=${page}&limit=${limit}&status=${status}`;
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
  async nonactivatProductOwner(id: string) {
    await http.put(url.nonactivatProductOwner(id)).send();
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
  getAllProduct(type?: string) {
    return useSWR(url.getAllProduct(type), http.fetcher);
  },
  searchProducts(search: string) {
    return useSWR(url.searchProducts(search), http.fetcher);
  },
  getProductsOwnerByAdmin(
    id: string,
    type?: string,
    page?: number,
    limit?: number,
    status?: string
  ) {
    return useSWR(
      url.getProductsOwnerByAdmin(id, type, page, limit, status),
      http.fetcher
    );
  },
};

export const productsRepository = {
  url,
  manipulatedata,
  hooks,
};
