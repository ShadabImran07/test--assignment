import mongoose from "mongoose";

const produectSchema = mongoose.Schema({
	name: String,
	brand: String,
	price: String,
});

const Product = mongoose.model("Product", produectSchema);
export default Product;
