import { useState } from "react";
import Numbers from "./components/Numbers";
import Filter from "./components/Filter";
import AddPerson from "./components/AddPerson";

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

	const isNewNameInPersons = () => persons.find((x) => x.name === newName);

	const addPerson = (e) => {
		e.preventDefault();

		const newPerson = {
			id: persons.length + 1,
			name: newName,
			number: newPhone,
		};

		if (isNewNameInPersons()) {
			alert(`${newName} is already added to phonebook`);
		} else {
			setPersons(persons.concat(newPerson));
			setNewName("");
			setNewPhone("");
		}
	};

	const handleFilter = (e) => {
		e.preventDefault();

		const value = e.target.value;
		setFilterValue(value);

		if (value.length > 0) {
			const filteredPersons = persons.filter((person) => {
				const personName = person.name.toLowerCase();
				return personName.startsWith(value.toLowerCase());
			});
			setFilteredPersons(filteredPersons);
		} else {
			setFilteredPersons([]);
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter onChange={handleFilter} value={filterValue} />
			<AddPerson
				nameValue={newName}
				phoneValue={newPhone}
				setNewName={setNewName}
				setNewPhone={setNewPhone}
				handleAddPerson={addPerson}
			/>
			<Numbers
				persons={filteredPersons.length > 0 ? filteredPersons : persons}
			/>
		</div>
	);
};

export default App;
