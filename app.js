import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Product from "./models/Product.js";

const app = express();

app.use(bodyParser.json());

const MONGO_URL =
	"mongodb+srv://shadabimran2017:Shadabimran1@cluster0.wub0gms.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connetcDb = async () => {
	const db = mongoose.createConnection(MONGO_URL);
	db.on("error", console.error.bind(console, "connection error:"));
	db.once("open", () => {
		console.log("db connected");
	});
};
await connetcDb();

app.get("/", (req, res) => {
	res.send("Hello world");
});

app.post("/createProduct", async (req, res) => {
	const { name, brand, price } = req.body;
	if (!name || !brand || !price) {
		res.status(400).send("Please provide all details");
	}

	const product = await Product.create({
		name,
		brand,
		price,
	});
	return res.status(200).json(product);
});

app.post("/getProducts", async (req, res) => {
	const { id } = req.body;
	if (id) {
		const product = await Product.findOne({ _id: id });
		return res.status(200).json(product);
	}
	return res.status(404).json({ status: 404, message: "Product not found" });
});

app.listen(3000, () => {
	console.log("server is runned on port 3000");
});
