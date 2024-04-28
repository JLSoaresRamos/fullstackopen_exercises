var morgan = require("morgan");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(cors());

morgan.token("body", function (req, res) {
	return JSON.stringify(req.body);
});

let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

const PORT = 3001;

app.get("/", (request, response) => {
	response.send("<h1>Welcome to persons phonebook API</h1>");
});

app.get("/api/persons/", (request, response) => {
	response.json(persons);
});

app.get("/api/info/", (request, response) => {
	response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `);
});

app.get("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);

	const person = persons.find((p) => p.id === id);

	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

app.delete("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);

	persons = persons.filter((p) => p.id !== id);

	response.status(202).end();
});

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

app.post("/api/persons/", (request, response) => {
	const id = getRandomInt(10000);

	if (request.body.name && request.body.number) {
		const personNameAlreadyExists = [...persons]
			.map((p) => p.name)
			.includes(request.body.name);

		if (personNameAlreadyExists) {
			return response.status(403).json({ error: "Name must be unique" });
		}

		const person = {
			id: id,
			name: request.body.name,
			number: request.body.number,
		};

		persons = persons.concat(person);

		response.json(person);
	} else {
		response.status(400).json({ error: "Please inform number and name" }).end();
	}
});

app.listen(PORT, () => {
	console.log(`API running at port ${PORT}`);
});
