import axios from "axios";
import { toast } from "sonner";
import type { User } from "../contexts/AuthContext";

const BASE_URL =
	import.meta.env.MODE === "development"
		? "http://localhost:5000/api"
		: import.meta.env.VITE_API_URL + "/api";

export const api = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

interface SetupInterceptorsProps {
	refreshAccessToken: () => Promise<void>;
	// logout: () => void;
	getCurrentUser?: () => Promise<User | void>;
}

export const setupInterceptors = ({
	refreshAccessToken,
}: SetupInterceptorsProps) => {
	api.interceptors.request.use(
		(config) => {
			return config;
		},
		(error) => Promise.reject(error)
	);

	// auto refresh on 401
	api.interceptors.response.use(
		(response) => response,
		async (error) => {
			const originalRequest = error.config;

			if (error.response?.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;

				try {
					await refreshAccessToken();

					return api(originalRequest);
				} catch (error) {
					toast.error("Session has expired. Please log in again.");

					return Promise.reject(error);
				}
			}

			const message =
				error.response?.data.message ||
				error.response?.data.error ||
				error.message ||
				"Unknown error";

			toast.error(message);
			return Promise.reject(error);
		}
	);
};
