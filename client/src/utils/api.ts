import axios from "axios";
import { toast } from "sonner";
import type { User } from "../contexts/AuthContext";

export const api = axios.create({
	baseURL: "/api",
	withCredentials: true,
});

interface SetupInterceptorsProps {
	refreshAccessToken: () => Promise<void>;
	logout: () => void;
	getCurrentUser?: () => Promise<User | void>;
}

export const setupInterceptors = ({
	logout,
	refreshAccessToken,
	getCurrentUser,
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

			if (error.response.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;

				try {
					await refreshAccessToken();
					if (getCurrentUser) {
						await getCurrentUser();
					}
					return api(originalRequest);
				} catch (error) {
					toast.error("Session has expired. Please log in again.");
					logout(); // if refresh fails;
					return Promise.reject(error);
				}
			}
		}
	);
};
