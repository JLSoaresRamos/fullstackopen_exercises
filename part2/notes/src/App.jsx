import { useState, useEffect } from "react";

import noteService from "./services/notes";

import axios from "axios";

import Note from "./components/Note";

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState("a new note...");
	const [showAll, setShowAll] = useState(true);

	useEffect(() => {
		noteService.getAll().then((initialNotes) => setNotes(initialNotes));
	}, []);

	const toggleImportanceOf = (id) => {
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, important: !note.important };

		noteService
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)));
			})
			.catch((error) => {
				alert(`The note '${note.content}' was already deleted from server`);
				setNotes(notes.filter((n) => n.id !== id));
			});
	};

	const notesToShow = showAll
		? notes
		: notes.filter((note) => note.important === true);

	const addNote = (event) => {
		event.preventDefault();
		const noteObject = {
			content: newNote,
			important: Math.random() < 0.5,
		};

		noteService.create(noteObject).then((returnedNote) => {
			setNotes(notes.concat(returnedNote));
			setNewNote("");
		});
	};

	return (
		<div>
			<h1>Notes</h1>
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? "important" : "all"}
				</button>
			</div>
			<ul>
				{notesToShow.map((note) => (
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
				))}
			</ul>
			<form onSubmit={addNote}>
				<input
					type="text"
					value={newNote}
					onChange={(e) => setNewNote(e.target.value)}
				/>
				<button type="submit">Save</button>
			</form>
		</div>
	);
};

export default App;
