import FeaturedProducts from "../components/home/FeaturedProducts";
import Footer from "../components/home/Footer";
import Header from "../components/home/Header";
import SellingPoints from "../components/home/SellingPoints";
import ShopByCategory from "../components/home/ShopByCategory";

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
