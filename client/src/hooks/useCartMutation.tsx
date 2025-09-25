import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../utils/api";
import { type CartProps, type ProductProps } from "../pages/ShoppingCartPage";

const useCartMutation = () => {
	const queryClient = useQueryClient();

	const increment = useMutation({
		mutationFn: async (productId: string) =>
			(await api.patch(`/cart/item/${productId}/increment`)).data,
		onMutate: async (productId: string) => {
			await queryClient.cancelQueries({ queryKey: ["cart"] });

			const prevCart = queryClient.getQueryData<{ cart: CartProps }>(["cart"]);

			queryClient.setQueryData<{ cart: CartProps }>(["cart"], (old) => {
				if (!old) {
					return old;
				}

				const productToUpdate = old.cart.products.find(
					(p: ProductProps) => p.product._id === productId
				);

				return {
					cart: {
						...old.cart,
						products: old.cart.products.map((p: ProductProps) =>
							p.product._id === productId
								? { ...p, quantity: p.quantity + 1 }
								: p
						),
						totalQuantity: old.cart.totalQuantity + 1,
						totalAmount:
							old.cart.totalAmount + (productToUpdate?.product.price ?? 0),
					},
				};
			});

			return { prevCart };
		},
		onError: (_err, _productId, context) => {
			if (context?.prevCart) {
				queryClient.setQueryData(["cart"], context.prevCart);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
	});

	const decrement = useMutation({
		mutationFn: async (productId: string) =>
			(await api.patch(`/cart/item/${productId}/decrement`)).data,
		onMutate: async (productId: string) => {
			await queryClient.cancelQueries({ queryKey: ["cart"] });

			const prevCart = queryClient.getQueryData<{ cart: CartProps }>(["cart"]);

			queryClient.setQueryData<{ cart: CartProps }>(["cart"], (old) => {
				if (!old) {
					return old;
				}

				const productToUpdate = old.cart.products.find(
					(p: ProductProps) => p.product._id === productId
				);

				const updatedProducts = old.cart.products
					.map((p: ProductProps) =>
						p.product._id === productId ? { ...p, quantity: p.quantity - 1 } : p
					)
					.filter((p: ProductProps) => p.quantity > 0);

				return {
					cart: {
						...old.cart,
						products: updatedProducts,
						totalQuantity: old.cart.totalQuantity - 1,
						totalAmount:
							old.cart.totalAmount - (productToUpdate?.product.price ?? 0),
					},
				};
			});

			return { prevCart };
		},
		onError: (_err, _productId, context) => {
			if (context?.prevCart) {
				queryClient.setQueryData(["cart"], context.prevCart);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
	});

	return { increment, decrement };
};

export default useCartMutation;
