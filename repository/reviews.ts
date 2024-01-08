import { http } from "#/utils/http";
import useSWR from "swr";

const url = {
  createReviews: (id:string) => `/reviews/${id}`,
  uploadReviews: () => '/photo-reviews/upload-photo-reviews',
  getReviewsByProducts: (id: string) => `/reviews/product/${id}`,
}

const manipulatedata = {
  createTransactionRenter(id: string, data: any) {
    return http.post(url.createReviews(id)).send(data);
  },
  uploadPhotoReviews(data: any) {
    const formData = new FormData();
    formData.append('photo-reviews', data);
    return http.post(url.uploadReviews()).send(formData);
  },
}

const hooks = {
  getReviewsByProduct(id: string) {
    return useSWR(url.getReviewsByProducts(id), http.fetcher);
  },
}

export const ReviewsRepository = {
  url,
  manipulatedata,
  hooks,
};