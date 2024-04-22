const Total = ({ parts }) => {
	const total = (parts) => parts.reduce((sum, part) => sum + part.exercises, 0);

	return (
		<p>
			<strong>Total of {total(parts)} exercises</strong>
		</p>
	);
};

export default Total;
