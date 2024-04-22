import NumberLine from "./NumberLine";

const Numbers = ({ persons }) => {
	return (
		<section>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<NumberLine key={person.id} person={person} />
			))}
		</section>
	);
};

export default Numbers;
