import { DollarSign, Package2, ShoppingCart, Users } from "lucide-react";
import OverviewCard from "../components/cards/OverviewCard";

const AdminOverview = () => {
	return (
		<div className="w-full flex flex-col sm:flex-row gap-5 flex-wrap items-center justify-around">
			<OverviewCard
				title="Total Revenue"
				icon={<DollarSign size={16} />}
				number={45232.75}
				stats="+20.1% from last month"
			/>

			<OverviewCard
				title="Orders"
				icon={<ShoppingCart size={16} />}
				number={1234}
				stats="+15.3% from last month"
			/>

			<OverviewCard
				title="Products"
				icon={<Package2 size={16} />}
				number={89}
				stats="+5.2% from last month"
			/>

			<OverviewCard
				title="Customers"
				icon={<Users size={16} />}
				number={2350}
				stats="+12.5% from last month"
			/>
		</div>
	);
};

export default AdminOverview;
