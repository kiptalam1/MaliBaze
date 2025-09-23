import { AxiosError } from "axios";
import {
	createContext,
	useState,
	useEffect,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
} from "react";
import { toast } from "sonner";
import { api, setupInterceptors } from "../utils/api";

export interface User {
	id: string;
	role: string;
	name: string;
	email: string;
}

interface AuthContextType {
	user: User | null;
	login: (formData: { email: string; password: string }) => Promise<void>;
	logout: () => Promise<void>;
	loading: boolean;
	setLoading: Dispatch<SetStateAction<boolean>>;
	setUser: Dispatch<SetStateAction<User | null>>;
	getCurrentUser: () => Promise<User | void>;
	refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface BackendUser {
	_id?: string;
	id?: string;
	role: string;
	name: string;
	email: string;
}

const normalizeUser = (user: BackendUser): User => ({
	id: user._id || user.id!,
	role: user.role,
	name: user.name,
	email: user.email,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const login = async (formData: { email: string; password: string }) => {
		setLoading(true);
		try {
			const response = await api.post("/auth/login", formData, {});
			setUser(normalizeUser(response.data.user));
			toast.success(response.data.message || "Logged in successfully");
		} catch (error) {
			const err = error as AxiosError<{ message: string }>;
			toast.error(err.response?.data.message || err.message);
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	const getCurrentUser = async () => {
		setLoading(true);
		try {
			const response = await api.get("/users/me", {});
			const normalized = normalizeUser(response.data.user);
			setUser(normalized);
			return normalized;
		} catch (error) {
			const err = error as AxiosError<{ message: string }>;
			toast.error(err.response?.data.message || err.message);
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	const refreshAccessToken = async () => {
		try {
			await api.post("/auth/refresh-token");
		} catch {
			setUser(null); // logout if refresh fails
			throw new Error("Token refresh failed");
		}
	};

	const logout = async () => {
		setLoading(true);
		try {
			await api.post("/auth/logout");
			setUser(null);
			toast.success("Logged out successfully");
		} catch (error) {
			const err = error as AxiosError<{ message: string }>;
			toast.error(err.response?.data.message || err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getCurrentUser();

		setupInterceptors({
			logout,
			refreshAccessToken,
		});
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				logout,
				loading,
				setLoading,
				setUser,
				getCurrentUser,
				refreshAccessToken,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
export { AuthContext };
