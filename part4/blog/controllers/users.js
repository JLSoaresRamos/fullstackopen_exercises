const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

const {
	passwordValidation,
	userNameValidation,
} = require("../errors/errorHandler");

usersRouter.get("/", (request, response) => {
	User.find({}).then((blogs) => {
		response.json(blogs);
	});
});

usersRouter.post("/", async (request, response) => {
	const { username, name, password } = request.body;

	try {
		passwordValidation(password);
		await userNameValidation(username);

		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(password, saltRounds);

		// Create a new user instance
		const user = new User({
			username,
			name,
			passwordHash,
		});

		// Save the user to the database
		const savedUser = await user.save();

		// Send a successful response
		response.status(201).json(savedUser);
	} catch (error) {
		response.status(error.status).json({ error: error.message });
	}
});

module.exports = usersRouter;
