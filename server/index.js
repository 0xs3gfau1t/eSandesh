const { app, server } = require("./app");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
// Redirect everything other that /api/ to frontend
app.get("*", (req, res) => {
	res.json({ response: "it works" });
});

// Start the server specied in PORT from .env
let host = process.env.HOST || "localhost";
let port = process.env.PORT || 80;

server.listen({ host, port }, () => {
	console.log(`\nBackend Server\nHost: ${host}\nPort: ${port}\n`);
});

module.exports = { app, server };
