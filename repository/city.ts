import { http } from "#/utils/http";
import useSWR from "swr";

const url = {
	getAllCity() {
		return "/cities";
	},
};

const hooks = {
	allCity() {
		return useSWR(url.getAllCity(), http.fetcher);
	},
};


export const cityRepository = {
	url,
	hooks,
};
