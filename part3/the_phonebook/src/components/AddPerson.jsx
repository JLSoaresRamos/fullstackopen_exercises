const AddPerson = ({ person, handleAddPerson, setPerson }) => {
	console.log(person);

	return (
		<form>
			<h2>Add a new</h2>
			<div>
				<label htmlFor="name">name:</label>
				<input
					onChange={(e) => setPerson({ ...person, name: e.target.value })}
					value={person.name}
					type="text"
					id="name"
				/>
				<div>
					<label htmlFor="number">number:</label>
					<input
						onChange={(e) => setPerson({ ...person, number: e.target.value })}
						value={person.number}
						type="tel"
						id="number"
					/>
				</div>
			</div>
			<div>
				<button
					type="submit"
					onClick={handleAddPerson}
					aria-label="Add new person on phone list"
				>
					add
				</button>
			</div>
		</form>
	);
};

export default AddPerson;
