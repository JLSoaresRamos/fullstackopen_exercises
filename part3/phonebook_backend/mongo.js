const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log("give password as argument");
	process.exit(1);
}

const password = process.argv[2];
const personName = process.argv[3];
const personNumber = process.argv[4];

const URL = `mongodb+srv://jlramossoares:${password}@cluster0.agrgqpt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(URL);

const schemaPerson = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model("Person", schemaPerson);

if (personName && personNumber) {
	const person = new Person({
		name: personName,
		number: personNumber,
	});

	person.save().then((result) => {
		console.log(`added ${personName} number ${personNumber} to phonebook`);
		mongoose.disconnect();
	});
} else if (personName && !personNumber) {
	console.log("Please provide the phone number as the fourth argument.");
	mongoose.disconnect();
} else {
	Person.find({}).then((result) => {
		console.log("Phonebook");
		result.forEach((p) => {
			console.log(`${p.name} ${p.number}`);
		});
		mongoose.disconnect();
	});
}
