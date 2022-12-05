const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// If connecting to mongoatlas remove authSource, user and pass options
async function db() {
	await mongoose
		.connect(process.env.MONGO_URI, {
			authSource: "admin",
			user: process.env.MONGO_USER,
			pass: process.env.MONGO_PASS,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((r) => {
			console.log("Connected to the database.\n");
			return mongoose;
		})
		.catch((e) => {
			console.log("Error while connecting to database\n", e);
		});
}

module.exports = db;
