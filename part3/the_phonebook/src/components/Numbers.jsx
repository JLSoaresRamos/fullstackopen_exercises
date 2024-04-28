import NumberLine from "./NumberLine";

const Numbers = ({ persons, handleDeletePerson }) => {
	return (
		<section>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<NumberLine
					key={person.id}
					person={person}
					onDelete={() => handleDeletePerson(person.id)}
				/>
			))}
		</section>
	);
};

export default Numbers;
