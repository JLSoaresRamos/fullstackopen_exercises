const NumberLine = ({ person, onDelete }) => (
	<p key={person.id}>
		{person.name} {person.number} <button onClick={onDelete}>Delete</button>
	</p>
);

export default NumberLine;
