import { http } from "#/utils/http";
import useSWR from "swr";

const url = {
	getJoke() {
		return `/random_joke`;
	},
	getUsers() {
		return "/api/users";
	},
};

const hooks = {
	useJoke() {
		return useSWR(url.getJoke(), http.fetcher);
	},
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
