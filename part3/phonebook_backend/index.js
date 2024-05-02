const Person = require("./models/person");
var morgan = require("morgan");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(cors());

morgan.token("body", function (req, res) {
	return JSON.stringify(req.body);
});

const PORT = process.env.PORT || 3001;

app.get("/", (request, response) => {
	response.send("<h1>Welcome to persons phonebook API</h1>");
});

app.get("/api/persons/", (request, response) => {
	Person.find({}).then((persons) => {
		response.json(persons);
	});
});

app.get("/api/info/", (request, response) => {
	Person.find({})
		.then((persons) => {
			response.send(`
		<p>Phonebook has info for ${persons.length} people</p>
		<p>${new Date()}</p>
		`);
		})
		.catch((error) => {
			console.log(error);
			response.send("<p>Something gone wrong please try later...</p>");
		});
});

app.get("/api/persons/:id", (request, response) => {
	Person.findById(request.params.id).then((person) => {
		response.json(person);
	});
});

app.delete("/api/persons/:id", (request, response) => {
	Person.findByIdAndDelete(request.params.id).then(() => {
		response.status(202).end();
	});
});

app.post("/api/persons/", (request, response) => {
	const persons = Person.find({}).then((persons) => {
		return persons;
	});

	persons
		.then((persons) => {
			if (request.body.name && request.body.number) {
				const personNameAlreadyExists = [...persons]
					.map((p) => p.name)
					.includes(request.body.name);

				if (personNameAlreadyExists) {
					return response.status(403).json({ error: "Name must be unique" });
				}

				const person = new Person({
					name: request.body.name,
					number: request.body.number,
				});

				person.save().then((returnedPerson) => {
					response.json(returnedPerson);
				});
			} else {
				response
					.status(400)
					.json({ error: "Please inform number and name" })
					.end();
			}
		})
		.catch((error) => {
			response.json({ message: "Could not acess persons" });
		});
});

app.listen(PORT, () => {
	console.log(`API running at port ${PORT}`);
});
