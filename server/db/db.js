const mongoose = require("mongoose");

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
			console.log("Connected to the database.\n", r);
			return mongoose;
		})
		.catch((e) => {
			console.log("Error while connecting to database\n", e);
		});
}

module.exports = db
