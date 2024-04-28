import { useEffect, useState } from "react";

import Numbers from "./components/Numbers";
import Filter from "./components/Filter";
import AddPerson from "./components/AddPerson";

import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newPhone, setNewPhone] = useState("");
	const [message, setMessage] = useState(null);
	const [errorType, setMessageType] = useState("sucess");
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
				personService
					.updatePerson(person.id, newPerson)
					.then((returnedValue) => {
						setPersons(
							persons.map((n) => (n.id !== newPerson.id ? n : returnedValue))
						);
						setMessage(`Successfully updated number from ${newPerson.name}`);
						setNewName("");
						setNewPhone("");
						setTimeout(() => {
							setMessage(null);
						}, 5000);
					})
					.catch((error) => {
						if (error.response.status === 404) {
							setMessage(
								`Information of ${newPerson.name} has already been removed from server`
							);
							setMessageType("error");
							setPersons(persons.filter((n) => n.id !== newPerson.id));
							setTimeout(() => {
								setMessage(null);
								setMessageType("sucess");
							}, 5000);
						}
					});
			}
		} else {
			personService.addNewPerson(newPerson).then((returnedValue) => {
				setPersons(persons.concat(returnedValue));
				setNewName("");
				setNewPhone("");
				setMessage(`Added ${newPerson.name}`);
				setTimeout(() => {
					setMessage(null);
				}, 5000);
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
			personService
				.deletePerson(id)
				.then((returnedValue) => {
					const newPersons = persons.filter((n) => n.id !== id);
					setPersons(newPersons);
					return;
				})
				.catch((error) => {
					if (error.response.status === 404) {
						setMessage(
							`Information of ${personToDelete.name} has already been removed from server`
						);
						setMessageType("error");
						setPersons(persons.filter((n) => n.id !== personToDelete.id));
						setTimeout(() => {
							setMessage(null);
							setMessageType("sucess");
						}, 5000);
					}
				});
		}

		return;
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} type={errorType} />
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
