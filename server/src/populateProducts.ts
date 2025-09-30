import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Product from "./models/product.model.js";
import { generateSKU } from "./utils/product.utils.js";
import { findOrCreateCategory } from "./utils/category.utils.js";

const products = [
	{
		name: "Wireless Bluetooth Headphones",
		description: "High-quality sound with noise cancellation.",
		price: 99.99,
		category: "Electronics",
		imageUrl:
			"https://images.pexels.com/photos/33034333/pexels-photo-33034333.jpeg",
	},

	{
		name: "Organic Green Tea",
		description: "Freshly harvested green tea leaves.",
		price: 15.99,
		category: "Food & Beverages",
		imageUrl:
			"https://images.pexels.com/photos/8951984/pexels-photo-8951984.jpeg",
	},

	{
		name: "Leather Wallet",
		description: "Premium leather wallet with multiple compartments.",
		price: 49.99,
		category: "Accessories",
		imageUrl:
			"https://images.pexels.com/photos/4452399/pexels-photo-4452399.jpeg",
	},
	{
		name: "Running Shoes",
		description: "Comfortable shoes for running and jogging.",
		price: 79.99,
		category: "Sports",
		imageUrl:
			"https://images.pexels.com/photos/29096399/pexels-photo-29096399.jpeg",
	},
	{
		name: "Coffee Maker",
		description: "Automatic coffee brewer with timer.",
		price: 59.99,
		category: "Home & Kitchen",
		imageUrl:
			"https://images.pexels.com/photos/27890509/pexels-photo-27890509.jpeg",
	},
	{
		name: "Smartphone Case",
		description: "Protective case for smartphones.",
		price: 19.99,
		category: "Electronics",
		imageUrl:
			"https://images.pexels.com/photos/374140/pexels-photo-374140.jpeg",
	},
	{
		name: "Yoga Mat",
		description: "Non-slip yoga mat for exercise.",
		price: 29.99,
		category: "Sports",
		imageUrl:
			"https://images.pexels.com/photos/25596886/pexels-photo-25596886.jpeg",
	},
	{
		name: "Sunglasses",
		description: "Stylish UV protection sunglasses.",
		price: 39.99,
		category: "Accessories",
		imageUrl:
			"https://images.pexels.com/photos/25651731/pexels-photo-25651731.jpeg",
	},
	{
		name: "Laptop Stand",
		description: "Adjustable stand for laptops.",
		price: 34.99,
		category: "Electronics",
		imageUrl:
			"https://images.pexels.com/photos/15979704/pexels-photo-15979704.jpeg",
	},
	{
		name: "Herbal Shampoo",
		description: "Natural shampoo for healthy hair.",
		price: 12.99,
		category: "Beauty",
		imageUrl:
			"https://images.pexels.com/photos/18186006/pexels-photo-18186006.jpeg",
	},
	{
		name: "Soccer Ball",
		description: "Standard size soccer ball.",
		price: 24.99,
		category: "Sports",
		imageUrl: "https://images.pexels.com/photos/46798/pexels-photo-46798.jpeg",
	},
	{
		name: "Blender",
		description: "High-speed blender for smoothies.",
		price: 49.99,
		category: "Home & Kitchen",
		imageUrl:
			"https://images.pexels.com/photos/28100422/pexels-photo-28100422.jpeg",
	},
	{
		name: "Watch",
		description: "Elegant wristwatch with leather strap.",
		price: 89.99,
		category: "Accessories",
		imageUrl:
			"https://images.pexels.com/photos/33987031/pexels-photo-33987031.jpeg",
	},
	{
		name: "Earbuds",
		description: "Wireless earbuds with charging case.",
		price: 59.99,
		category: "Electronics",
		imageUrl:
			"https://images.pexels.com/photos/33936400/pexels-photo-33936400.jpeg",
	},
	{
		name: "Protein Powder",
		description: "Whey protein for muscle building.",
		price: 39.99,
		category: "Health",
		imageUrl:
			"https://images.pexels.com/photos/31443923/pexels-photo-31443923.jpeg",
	},
	{
		name: "Backpack",
		description: "Durable backpack for daily use.",
		price: 44.99,
		category: "Accessories",
		imageUrl:
			"https://images.pexels.com/photos/18999339/pexels-photo-18999339.jpeg",
	},
	{
		name: "Electric Kettle",
		description: "Quick boil electric kettle.",
		price: 29.99,
		category: "Home & Kitchen",
		imageUrl:
			"https://images.pexels.com/photos/30319695/pexels-photo-30319695.jpeg",
	},
	{
		name: "Fitness Tracker",
		description: "Wearable device to track fitness.",
		price: 69.99,
		category: "Electronics",
		imageUrl:
			"https://images.pexels.com/photos/32977239/pexels-photo-32977239.jpeg",
	},
	{
		name: "Lipstick",
		description: "Long-lasting matte lipstick.",
		price: 14.99,
		category: "Beauty",
		imageUrl:
			"https://images.pexels.com/photos/33469398/pexels-photo-33469398.jpeg",
	},
	{
		name: "Tennis Racket",
		description: "Lightweight tennis racket.",
		price: 59.99,
		category: "Sports",
		imageUrl:
			"https://images.pexels.com/photos/34015711/pexels-photo-34015711.jpeg",
	},
	{
		name: "Microwave Oven",
		description: "Compact microwave for quick heating.",
		price: 79.99,
		category: "Home & Kitchen",
		imageUrl:
			"https://images.pexels.com/photos/11701150/pexels-photo-11701150.jpeg",
	},
	{
		name: "Scarf",
		description: "Soft wool scarf for winter.",
		price: 19.99,
		category: "Clothing",
		imageUrl:
			"https://images.pexels.com/photos/15842702/pexels-photo-15842702.jpeg",
	},
	{
		name: "Power Bank",
		description: "Portable charger for devices.",
		price: 24.99,
		category: "Electronics",
		imageUrl:
			"https://images.pexels.com/photos/19495448/pexels-photo-19495448.jpeg",
	},
	{
		name: "Essential Oil",
		description: "Lavender essential oil for aromatherapy.",
		price: 9.99,
		category: "Health",
		imageUrl:
			"https://images.pexels.com/photos/8450469/pexels-photo-8450469.jpeg",
	},
	{
		name: "Umbrella",
		description: "Compact travel umbrella.",
		price: 14.99,
		category: "Accessories",
		imageUrl:
			"https://images.pexels.com/photos/16900455/pexels-photo-16900455.jpeg",
	},
	{
		name: "Toaster",
		description: "4-slice toaster with bagel setting.",
		price: 39.99,
		category: "Home & Kitchen",
		imageUrl:
			"https://images.pexels.com/photos/7696932/pexels-photo-7696932.jpeg",
	},
	{
		name: "Gaming Mouse",
		description: "Ergonomic mouse for gaming.",
		price: 49.99,
		category: "Electronics",
		imageUrl:
			"https://images.pexels.com/photos/33307580/pexels-photo-33307580.jpeg",
	},
	{
		name: "Face Cream",
		description: "Moisturizing face cream for all skin types.",
		price: 19.99,
		category: "Beauty",
		imageUrl:
			"https://images.pexels.com/photos/8154390/pexels-photo-8154390.jpeg",
	},
	{
		name: "Bicycle Helmet",
		description: "Safety helmet for cycling.",
		price: 34.99,
		category: "Sports",
		imageUrl:
			"https://images.pexels.com/photos/19351989/pexels-photo-19351989.jpeg",
	},
	{
		name: "Vacuum Cleaner",
		description: "Cordless vacuum for home cleaning.",
		price: 129.99,
		category: "Home & Kitchen",
		imageUrl:
			"https://images.pexels.com/photos/8566433/pexels-photo-8566433.jpeg",
	},
	{
		name: "Belt",
		description: "Leather belt for men.",
		price: 29.99,
		category: "Accessories",
		imageUrl:
			"https://images.pexels.com/photos/31432650/pexels-photo-31432650.jpeg",
	},
	{
		name: "Speaker",
		description: "Portable Bluetooth speaker.",
		price: 59.99,
		category: "Electronics",
		imageUrl:
			"https://images.pexels.com/photos/33693664/pexels-photo-33693664.jpeg",
	},
	{
		name: "Vitamin Supplements",
		description: "Multivitamin tablets.",
		price: 19.99,
		category: "Health",
		imageUrl:
			"https://images.pexels.com/photos/17891275/pexels-photo-17891275.jpeg",
	},
	{
		name: "Hat",
		description: "Stylish baseball cap.",
		price: 19.99,
		category: "Clothing",
		imageUrl:
			"https://images.pexels.com/photos/8824821/pexels-photo-8824821.jpeg",
	},
	{
		name: "Food Processor",
		description: "Multi-function food processor.",
		price: 69.99,
		category: "Home & Kitchen",
		imageUrl:
			"https://images.pexels.com/photos/7525008/pexels-photo-7525008.jpeg",
	},
	{
		name: "Keyboard",
		description: "Mechanical keyboard for typing.",
		price: 79.99,
		category: "Electronics",
		imageUrl:
			"https://images.pexels.com/photos/30847232/pexels-photo-30847232.jpeg",
	},
	{
		name: "Perfume",
		description: "Fresh scent perfume.",
		price: 49.99,
		category: "Beauty",
		imageUrl:
			"https://images.pexels.com/photos/22589359/pexels-photo-22589359.jpeg",
	},
	{
		name: "Dumbbells",
		description: "Set of adjustable dumbbells.",
		price: 89.99,
		category: "Sports",
		imageUrl:
			"https://images.pexels.com/photos/14289784/pexels-photo-14289784.jpeg",
	},
	{
		name: "Pillow",
		description: "Memory foam pillow for better sleep.",
		price: 29.99,
		category: "Home & Kitchen",
		imageUrl:
			"https://images.pexels.com/photos/18492337/pexels-photo-18492337.jpeg",
	},
	{
		name: "Earrings",
		description: "Gold plated hoop earrings.",
		price: 24.99,
		category: "Accessories",
		imageUrl:
			"https://images.pexels.com/photos/33936420/pexels-photo-33936420.jpeg",
	},
	{
		name: "Webcam",
		description: "HD webcam for video calls.",
		price: 39.99,
		category: "Electronics",
		imageUrl:
			"https://images.pexels.com/photos/27934755/pexels-photo-27934755.jpeg",
	},
	{
		name: "Tea Infuser",
		description: "Stainless steel tea infuser.",
		price: 9.99,
		category: "Food & Beverages",
		imageUrl:
			"https://images.pexels.com/photos/7368108/pexels-photo-7368108.jpeg",
	},
	{
		name: "Jump Rope",
		description: "Speed jump rope for fitness.",
		price: 14.99,
		category: "Sports",
		imageUrl:
			"https://images.pexels.com/photos/4804339/pexels-photo-4804339.jpeg",
	},
	{
		name: "Mixer",
		description: "Stand mixer for baking.",
		price: 199.99,
		category: "Home & Kitchen",
		imageUrl:
			"https://images.pexels.com/photos/7450059/pexels-photo-7450059.jpeg",
	},
	{
		name: "Necklace",
		description: "Silver chain necklace.",
		price: 34.99,
		category: "Accessories",
		imageUrl:
			"https://images.pexels.com/photos/19647000/pexels-photo-19647000.jpeg",
	},
	{
		name: "Monitor",
		description: "24-inch computer monitor.",
		price: 149.99,
		category: "Electronics",
		imageUrl:
			"https://images.pexels.com/photos/18304033/pexels-photo-18304033.jpeg",
	},
	{
		name: "Soap",
		description: "Organic hand soap.",
		price: 7.99,
		category: "Beauty",
		imageUrl:
			"https://images.pexels.com/photos/10853717/pexels-photo-10853717.jpeg",
	},
	{
		name: "Golf Balls",
		description: "Pack of golf balls.",
		price: 19.99,
		category: "Sports",
		imageUrl:
			"https://images.pexels.com/photos/9207754/pexels-photo-9207754.jpeg",
	},
	{
		name: "Lamp",
		description: "Desk lamp with adjustable brightness.",
		price: 24.99,
		category: "Home & Kitchen",
		imageUrl:
			"https://images.pexels.com/photos/17027430/pexels-photo-17027430.jpeg",
	},
	{
		name: "Gloves",
		description: "Winter gloves for cold weather.",
		price: 19.99,
		category: "Clothing",
		imageUrl:
			"https://images.pexels.com/photos/10646992/pexels-photo-10646992.jpeg",
	},
];

const populate = async () => {
	try {
		await mongoose.connect(process.env["MONGO_URI"] as string);
		console.log("MongoDB connected");

		await Product.deleteMany({});
		console.log("Existing products cleared");

		let count = 0;

		for (const item of products) {
			const categoryDoc = await findOrCreateCategory(item.category);
			const sku = await generateSKU(categoryDoc.name, item.name);

			await Product.create({
				name: item.name,
				description: item.description,
				price: item.price,
				category: categoryDoc._id,
				sku,
				imageUrl: item.imageUrl,
			});

			count++;
			console.log(`Inserted ${count}/${products.length}: ${item.name}`);
		}

		console.log(`${products.length} products inserted successfully`);
		process.exit(0);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

populate();
