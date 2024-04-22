const NumberLine = ({ person }) => (
	<p key={person.id}>
		{person.name} {person.number}
	</p>
);

export default NumberLine;
