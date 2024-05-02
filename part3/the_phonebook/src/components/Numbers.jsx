import NumberLine from "./NumberLine";

const Numbers = ({ persons, handleDeletePerson }) => {
	return (
		<section>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<NumberLine
					key={person._id}
					person={person}
					onDelete={() => handleDeletePerson(person._id)}
				/>
			))}
		</section>
	);
};

export default Numbers;
