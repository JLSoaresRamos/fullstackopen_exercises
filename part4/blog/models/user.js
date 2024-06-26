const { uniq } = require("lodash");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
	},
	name: String,
	passwordHash: String,
});

userSchema.set("toJson", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.passwordHash;
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
