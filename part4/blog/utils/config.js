require("dotenv").config();

const PORT = process.env.PORT || 3000;

const MONGODB_URI = (() => {
	if (process.env.NODE_ENV === "test") {
		if (!process.env.TEST_MONGODB_URI) {
			throw new Error("TEST_MONGODB_URI is not set");
		}
		return process.env.TEST_MONGODB_URI;
	} else {
		if (!process.env.MONGODB_URI) {
			throw new Error("MONGODB_URI is not set");
		}
		return process.env.MONGODB_URI;
	}
})();

module.exports = { PORT, MONGODB_URI };
