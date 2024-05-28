const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");

const { MONGODB_URI } = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
require("express-async-errors");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

logger.info(`Connecting to MongoDB...\n\nURI: ${MONGODB_URI}`);

mongoose.set("strictQuery", false);

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log("\nConnection established ✅");
	})
	.catch((error) => {
		logger.error(error);
		logger.info("Connection Failed ❌");
	});

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

module.exports = app;
