import { useEffect, useState } from "react";

import Numbers from "./components/Numbers";
import Filter from "./components/Filter";
import AddPerson from "./components/AddPerson";

import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [person, setPerson] = useState({ name: "", number: "" });
	const [notification, setNotification] = useState(null);
	const [filterValue, setFilterValue] = useState("");
	const [filteredPersons, setFilteredPersons] = useState([]);

	useEffect(() => {
		personService.getAll().then((initialValues) => {
			setPersons(initialValues);
		});
	}, []);

	const findPerson = (name) => persons.find((x) => x.name === name);

	const resetPersonFields = () => {
		setPerson({ name: "", number: "" });
	};

	const addPerson = (e) => {
		e.preventDefault();

		const { name, number } = person;

		const newPerson = {
			name: name,
			number: number,
		};

		if (findPerson(name)) {
			const checkAnwser = confirm(
				`${name} is already added to phonebook, replace old number with a new one?`
			);

			if (checkAnwser) {
				const person = findPerson(name);
				const newPerson = { ...person, number: number };
				personService
					.updatePerson(person._id, newPerson)
					.then((returnedValue) => {
						setPersons(
							persons.map((n) => (n._id !== newPerson._id ? n : returnedValue))
						);
						setNotification({
							message: `Successfully updated number from ${newPerson.name}`,
							type: "sucess",
						});
						resetPersonFields();
					})
					.catch((error) => {
						if (error.response.status === 400) {
							setNotification({
								message: error.response.data.error,
								type: "error",
							});
						}

						if (error.response.status === 404) {
							setNotification({
								message: `Information of ${newPerson.name} has already been removed from server`,
								type: "error",
							});
							setPersons(persons.filter((n) => n.id !== newPerson.id));
						}
					});
			}
		} else {
			personService
				.addNewPerson(newPerson)
				.then((returnedValue) => {
					setPersons(persons.concat(returnedValue));
					setNotification({
						message: `Added ${newPerson.name}`,
						type: "sucess",
					});
					resetPersonFields();
				})
				.catch((error) => {
					console.log(error.message);
					setNotification({
						message: error.response.data.error,
						type: "error",
					});
				});
		}
	};

	const handleFilter = (e) => {
		e.preventDefault();

		const value = e.target.value.toLowerCase();
		setFilterValue(value);

		if (value.length > 0) {
			const filteredPersons = persons.filter(({ name }) => {
				return name.toLowerCase().startsWith(value);
			});
			setFilteredPersons(filteredPersons);
		} else {
			setFilteredPersons([]);
		}
	};

	const handleDeletePerson = (id) => {
		const personToDelete = persons.find((n) => n._id === id);

		const checkAnwser = confirm(`Delete ${personToDelete.name} ?`);

		if (checkAnwser) {
			personService
				.deletePerson(id)
				.then(() => {
					const newPersons = persons.filter((n) => n._id !== id);
					setPersons(newPersons);
					return;
				})
				.catch((error) => {
					if (error.response.status === 404) {
						setNotification({
							message: `Information of ${personToDelete.name} has already been removed from server`,
							type: "error",
						});
						setPersons(persons.filter((n) => n._id !== personToDelete._id));
					}
				});
		}

		return;
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification
				notification={notification}
				setNotification={setNotification}
			/>
			<Filter onChange={handleFilter} value={filterValue} />
			<AddPerson
				person={person}
				setPerson={setPerson}
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
