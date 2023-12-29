import { http } from "#/utils/http";
import useSWR from "swr";

const url = {
  getAllUsers: () => '/users',
}

const hooks = {
  getAllUsers(){
    return useSWR(url.getAllUsers(), http.fetcher)
  },
}

export const adminRepository = {
  url,
  hooks,
};