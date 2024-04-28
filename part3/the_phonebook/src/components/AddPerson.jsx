const AddPerson = ({
	nameValue,
	phoneValue,
	setNewName,
	setNewPhone,
	handleAddPerson,
}) => {
	return (
		<form>
			<h2>Add a new</h2>
			<div>
				<label htmlFor="name">name:</label>
				<input
					onChange={(e) => setNewName(e.target.value)}
					value={nameValue}
					type="text"
					id="name"
				/>
				<div>
					<label htmlFor="number">number:</label>
					<input
						onChange={(e) => setNewPhone(e.target.value)}
						value={phoneValue}
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
