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

app.get("/", (request, response) => {
	response.send("<h1>Welcome to persons phonebook API</h1>");
});

app.get("/api/persons/", (request, response, next) => {
	Person.find({})
		.then((persons) => {
			response.json(persons);
		})
		.catch((error) => next(error));
});

app.get("/api/info/", (request, response, next) => {
	Person.find({})
		.then((persons) => {
			response.send(`
		<p>Phonebook has info for ${persons.length} people</p>
		<p>${new Date()}</p>
		`);
		})
		.catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response) => {
	Person.findById(request.params.id)
		.then((person) => {
			response.json(person);
		})
		.catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
	Person.findByIdAndDelete(request.params.id)
		.then(() => {
			response.status(202).end();
		})
		.catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
	const { name, number } = request.body;

	const person = {
		name: name,
		number: number,
	};

	const opts = { new: true, runValidators: true };

	Person.findByIdAndUpdate(request.params.id, person, opts)
		.then((updatedPerson) => response.json(updatedPerson))
		.catch((error) => next(error));
});

app.post("/api/persons/", (request, response, next) => {
	const { name, number } = request.body;

	const persons = Person.find({}).then((persons) => {
		return persons;
	});

	persons.then((persons) => {
		const personNameAlreadyExists = [...persons]
			.map((p) => p.name)
			.includes(request.body.name);

		if (personNameAlreadyExists) {
			return response.status(403).json({ error: "Name must be unique" });
		}

		const person = new Person({
			name: name,
			number: number,
		});

		person
			.save()
			.then((returnedPerson) => {
				response.json(returnedPerson);
			})
			.catch((error) => next(error));
	});
});

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	}

	if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
	}

	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`API running at port ${PORT}`);
});
