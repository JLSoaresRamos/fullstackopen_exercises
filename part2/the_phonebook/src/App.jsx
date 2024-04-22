import { useState } from "react";
import Numbers from "./components/Numbers";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newPhone, setNewPhone] = useState("");
	const [filterValue, setFilterValue] = useState("");
	const [filteredPersons, setFilteredPersons] = useState([]);

	console.log(persons);

	const preventSameName = () => persons.find((x) => x.name === newName);

	const addPerson = (e) => {
		e.preventDefault();

		const newPerson = {
			id: persons.length + 1,
			name: newName,
			number: newPhone,
		};

		if (preventSameName()) {
			alert(`${newName} is already added to phonebook`);
		} else {
			setPersons(persons.concat(newPerson));
			setNewName("");
			setNewPhone("");
		}
	};

	const handleFilter = (e) => {
		e.preventDefault();
		const value = e.target.value.toLowerCase();

		if (value.length > 0) {
			setFilterValue(value);

			const filteredPersons = persons.filter((person) => {
				return person.name.toLowerCase().startsWith(value);
			});

			setFilteredPersons(filteredPersons);
		} else {
			setFilteredPersons([]);
			setFilterValue("");
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form>
				<div>
					<label htmlFor="filterValue">Filter shows with:</label>
					<input
						type="text"
						id="filterValue"
						value={filterValue}
						onChange={handleFilter}
					/>
				</div>
			</form>
			<form>
				<h2>Add a new</h2>
				<div>
					<label htmlFor="name">name:</label>
					<input
						onChange={(e) => setNewName(e.target.value)}
						value={newName}
						type="text"
						id="name"
					/>
					<div>
						<label htmlFor="number">number:</label>
						<input
							onChange={(e) => setNewPhone(e.target.value)}
							value={newPhone}
							type="tel"
							id="number"
						/>
					</div>
				</div>
				<div>
					<button
						type="submit"
						onClick={addPerson}
						aria-label="Add new person on phone list"
					>
						add
					</button>
				</div>
			</form>
			<Numbers
				persons={filteredPersons.length > 0 ? filteredPersons : persons}
			/>
		</div>
	);
};

export default App;
