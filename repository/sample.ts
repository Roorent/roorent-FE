import { http } from "#/utils/http";
import useSWR from "swr";

const url = {
	getUsers() {
		return "/api/users";
	},
};

const hooks = {
	useUsers() {
		return useSWR(url.getUsers(), http.fetcher);
	},
};

const api = {};

export const sampleRepository = {
	url,
	hooks,
	api,
};
