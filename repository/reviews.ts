import { http } from "#/utils/http";

const url = {
  createReviews: (id:string) => `/reviews/${id}`,
  uploadReviews: () => '/photo-reviews/upload-photo-reviews',
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

export const ReviewsRepository = {
  url,
  manipulatedata,
};