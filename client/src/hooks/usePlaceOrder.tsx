import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../utils/api";
import type { AxiosError } from "axios";
import { toast } from "sonner";

type AxiosResponse<T> = {
	message?: string;
	error?: string;
	data: T;
};

type OrderProps = {
	formData: {
		destination: string;
		shippingMethod?: "standard" | "express";
	};
};

const usePlaceOrder = <T,>(url: string) => {
	const queryClient = useQueryClient();
	return useMutation<
		AxiosResponse<T>,
		AxiosError<{ message: string }>,
		OrderProps
	>({
		mutationFn: async ({ formData }) => {
			return await api.post(url, formData);
		},
		onError: (error) => {
			toast.error(
				error.response?.data.message || error.message || "Order failed"
			);
		},
		onSuccess: () => {
			toast.success("Order placed successfully");
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
	});
};

export default usePlaceOrder;
