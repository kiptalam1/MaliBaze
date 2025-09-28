// src/pages/ShoppingCartPage.tsx
import OrderSummary from "../components/cards/OrderSummary";
import ShoppingCard from "../components/cards/ShoppingCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import useCartMutation from "../hooks/useCartMutation";
import useDelete from "../hooks/useDelete";
import useFetch from "../hooks/useFetch";

export interface ProductProps {
	product: {
		imageUrl: string;
		category: {
			_id: string;
			name: string;
		};
		name: string;
		price: number;
		_id: string;
	};
	quantity: number;
	_id: string;
}

export interface CartProps {
	products: ProductProps[];
	totalAmount: number;
	totalQuantity: number;
	uniqueItems: number;
	updatedAt: Date;
	user: string;
	_id: string;
	createdAt: Date;
	tax?: number;
}

const ShoppingCartPage = () => {
	const { data, isPending } = useFetch<{ cart: CartProps }>("/cart", ["cart"]);

	const cart = data?.cart;

	const { increment, decrement } = useCartMutation();

	const {
		mutate: deleteCartItem,
		isPending: isDeleting,
		variables: deletingId,
	} = useDelete<CartProps>("cart/item", ["cart"]);

	return (
		<div className="min-h-screen w-full flex flex-col gap-5 p-4 sm:p-6">
			<h1 className="text-lg sm:text-2xl md:text-3xl font-semibold">
				Shopping Cart
			</h1>
			<p className="text-[var(--color-text-secondary)]">
				{cart?.uniqueItems} items in your cart
			</p>
			<div className="flex flex-col sm:flex-row gap-5">
				{/* Shopping cards container */}
				<div className="w-full sm:w-2/3 flex flex-col gap-4">
					{isPending ? (
						<LoadingSpinner />
					) : (
						cart?.products?.map((p) => {
							if (!p.product) {
								return null;
							}

							return (
								<ShoppingCard
									key={p._id}
									category={p.product.category?.name}
									name={p.product.name}
									price={p.product.price}
									imageUrl={p.product.imageUrl}
									quantity={p.quantity}
									onRemove={() => deleteCartItem(p.product._id)}
									loading={isDeleting && deletingId === p.product._id}
									onIncrease={() => increment.mutate(p.product._id)}
									onDecrease={() => decrement.mutate(p.product._id)}
								/>
							);
						})
					)}
				</div>

				{/* Single order summary */}
				<div className="w-full sm:w-1/3">
					{(cart?.products?.length ?? 0) > 0 && (
						<OrderSummary subTotal={cart?.totalAmount ?? 0} tax={0} />
					)}
				</div>
			</div>
		</div>
	);
};

export default ShoppingCartPage;
