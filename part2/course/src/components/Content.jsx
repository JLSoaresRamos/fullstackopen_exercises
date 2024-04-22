import Part from "./Part";

const Content = ({ parts }) => {
	return (
		<>
			{parts.map((item) => (
				<Part key={item.id} partName={item.name} exercises={item.exercises} />
			))}
		</>
	);
};

export default Content;
