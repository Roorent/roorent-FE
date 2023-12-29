import { http } from "#/utils/http";
import useSWR from "swr";

const url = {
    getAllUsers() {
		return "/users/all-users";
	},
    approveOwner(id: any){
        return `/users/approve/${id}`
    }
}

const hooks = {
    getAllUsers() {
		return useSWR(url.getAllUsers(), http.fetcher);
	},
}

const manipulatedata = {
    approveOwner(id: any) {
        return http.put(url.approveOwner(id)).send();
      },
}

export const adminRepository = {
    url,
    hooks,
    manipulatedata
};
  