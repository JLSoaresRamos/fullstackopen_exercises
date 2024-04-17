const App = () => {
	const courseInfo = {
		name: "Half Stack application development",
		parts: [
			{ part: "Fundamentals of React", exercises: 10 },
			{ part: "Using props to pass data", exercises: 7 },
			{ part: "State of a component", exercises: 14 },
		],
		total: function () {
			let sum = 0;
			if (this.parts) {
				this.parts.forEach((part) => {
					sum += part.exercises;
				});
			}
			return sum;
		},
	};

	const totalExercises = courseInfo.total();

	const Header = (props) => {
		return <h1>{props.courseName}</h1>;
	};

	const Part = (props) => {
		return (
			<p>
				{props.partName} {props.exercises}
			</p>
		);
	};

	const Content = (props) => {
		return (
			<>
				{props.partsInfo.map((item, index) => (
					<Part
						key={item.part + index}
						partName={item.part}
						exercises={item.exercises}
					/>
				))}
			</>
		);
	};

	const Total = (props) => {
		return <p>Number of exercises {props.total}</p>;
	};

	return (
		<div>
			<Header courseName={courseInfo.name} />
			<Content partsInfo={courseInfo.parts} />
			<Total total={totalExercises} />
		</div>
	);
};

export default App;
