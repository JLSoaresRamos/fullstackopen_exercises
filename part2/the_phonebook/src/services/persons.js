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
	return promise.then((response) => console.log(response.data));
}

export default {
	getAll,
	addNewPerson,
	deletePerson,
};
