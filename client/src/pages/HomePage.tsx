import FeaturedProducts from "../components/FeaturedProducts";
import Header from "../components/Header";
import SellingPoints from "../components/SellingPoints";
import ShopByCategory from "../components/ShopByCategory";

const HomePage = () => {
	return (
		<>
			<Header />
			<SellingPoints />
			<ShopByCategory />
			<FeaturedProducts />
		</>
	);
};

export default HomePage;
