import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

function getAll() {
	const promise = axios.get(baseUrl);
	return promise.then((response) => response.data);
}

function addNewPerson(newPerson) {
	const promise = axios.post(baseUrl, newPerson);
	return promise.then((response) => response.data);
}

function deletePerson(id) {
	const promise = axios.delete(`${baseUrl}/${id}`);
	return promise.then((response) => response.data);
}

function updatePerson(id, newPerson) {
	const promise = axios.put(`${baseUrl}/${id}`, newPerson);
	return promise.then((response) => response.data);
}

export default {
	getAll,
	addNewPerson,
	deletePerson,
	updatePerson,
};
