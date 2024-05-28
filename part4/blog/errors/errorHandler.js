const User = require("../models/user");

const passwordValidation = (password) => {
	if (password.length < 3) {
		throw {
			message: "Password has to be at least three characters",
			status: 400, // Bad Request
		};
	}
};

const userNameValidation = async (username) => {
	const user = await User.findOne({ username });

	if (user) {
		throw {
			message: "There is already a user with this username",
			status: 409, // Conflict
		};
	}

	if (username.length < 3) {
		throw {
			message: "Username has to be at least three characters",
			status: 400, // Bad Request
		};
	}
};

module.exports = {
	passwordValidation,
	userNameValidation,
};
