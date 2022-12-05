const express = require("express");
const app = express();

app.use(function (req, res, next) {
	console.log(`-> ${req.url}\n`);
	next();
});

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

module.exports = app;
