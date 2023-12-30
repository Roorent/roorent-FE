import { http } from "#/utils/http";
import useSWR, { mutate } from "swr";

const url = {
    getAllUsers() {
		return "/users/all-users";
	},
    approveOwner(id: any){
        return `/users/approve/${id}`
    },
    rejectOwner(id: any){
        return `/users/reject/${id}`
    },
}

const hooks = {
    getAllUsers() {
		return useSWR(url.getAllUsers(), http.fetcher);
	},
}

const manipulatedata = {
    async approveOwner(id:any) {
        try {
            await http.put(url.approveOwner(id)).send();
            // Setelah berhasil melakukan approveOwner pada server, perbarui cache
            mutate(url.getAllUsers()); // Memperbarui cache data semua pengguna
        } catch (err) {
            throw err
        }
    },
    async rejectOwner(id:any, reason: any) {
        try {
            await http.put(url.rejectOwner(id)).send(reason);
            mutate(url.getAllUsers());
        } catch (err) {
            throw err
        }
    },
}

export const adminRepository = {
    url,
    hooks,
    manipulatedata
};
  