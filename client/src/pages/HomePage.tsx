import FeaturedProducts from "../components/ui/FeaturedProducts";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";
import SellingPoints from "../components/ui/SellingPoints";
import ShopByCategory from "../components/ui/ShopByCategory";

const HomePage = () => {
	return (
		<>
			<Header />
			<SellingPoints />
			<ShopByCategory />
			<FeaturedProducts />
			<Footer />
		</>
	);
};

export default HomePage;
