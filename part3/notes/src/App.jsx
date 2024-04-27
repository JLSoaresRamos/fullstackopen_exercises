import { useState, useEffect } from "react";

import noteService from "./services/notes";

import Note from "./components/Note";
import Notification from "./components/Notification";

const Footer = () => {
	const footerStyle = {
		color: "green",
		fontStyle: "italic",
		fontSize: 16,
	};
	return (
		<div style={footerStyle}>
			<br />
			<em>
				Note app, Department of Computer Science, University of Helsinki 2024
			</em>
		</div>
	);
};

const App = () => {
	const [notes, setNotes] = useState(null);
	const [newNote, setNewNote] = useState("a new note...");
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		noteService.getAll().then((initialNotes) => setNotes(initialNotes));
	}, []);

	if (!notes) {
		return null;
	}

	const toggleImportanceOf = (id) => {
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, important: !note.important };

		noteService
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)));
			})
			.catch((error) => {
				setErrorMessage(
					`Note '${note.content}' was already removed from server`
				);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
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
			{errorMessage && <Notification message={errorMessage} />}
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
			<Footer />
		</div>
	);
};

export default App;
