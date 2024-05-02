require("dotenv").config();

const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

console.log(`Connecting to ${URI}`);

mongoose.set("strictQuery", false);

mongoose
	.connect(URI)
	.then(() => {
		console.log("Connected successfully to MongoDB");
	})
	.catch((error) => {
		console.log(error);
	});

const schemaPerson = new mongoose.Schema({
	name: String,
	number: String,
});

schemaPerson.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject._id = returnedObject._id.toString();
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("Person", schemaPerson);
