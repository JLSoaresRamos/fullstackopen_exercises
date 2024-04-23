import { useEffect, useState } from "react";

import Numbers from "./components/Numbers";
import Filter from "./components/Filter";
import AddPerson from "./components/AddPerson";

import personService from "./services/persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newPhone, setNewPhone] = useState("");
	const [filterValue, setFilterValue] = useState("");
	const [filteredPersons, setFilteredPersons] = useState([]);

	useEffect(() => {
		personService.getAll().then((initialValues) => {
			setPersons(initialValues);
		});
	}, []);

	const findPerson = (name) => persons.find((x) => x.name === name);

	const addPerson = (e) => {
		e.preventDefault();

		const newPerson = {
			name: newName,
			number: newPhone,
		};

		if (findPerson(newName)) {
			const checkAnwser = confirm(
				`${newName} is already added to phonebook, replace old number with a new one?`
			);

			if (checkAnwser) {
				const person = findPerson(newName);
				const newPerson = { ...person, number: newPhone };
				setPersons(persons.map((n) => (n.id !== newPerson.id ? n : newPerson)));
			}
		} else {
			personService.addNewPerson(newPerson).then((returnedValue) => {
				setPersons(persons.concat(returnedValue));
				setNewName("");
				setNewPhone("");
			});
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

	const handleDeletePerson = (id) => {
		const personToDelete = persons.find((n) => n.id === id);

		const checkAnwser = confirm(`Delete ${personToDelete.name} ?`);

		if (checkAnwser) {
			personService.deletePerson(id).then((returnedValue) => {
				const newPersons = persons.filter((n) => n.id !== id);
				setPersons(newPersons);
				return;
			});
		}

		return;
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
				handleDeletePerson={handleDeletePerson}
			/>
		</div>
	);
};

export default App;
