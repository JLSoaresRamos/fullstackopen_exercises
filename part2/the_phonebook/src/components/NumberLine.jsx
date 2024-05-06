const NumberLine = ({ person, onDelete }) => {
	const { name, number } = person;

	return (
		<p key={person._id}>
			{name} {number} <button onClick={onDelete}>Delete</button>
		</p>
	);
};

export default NumberLine;
