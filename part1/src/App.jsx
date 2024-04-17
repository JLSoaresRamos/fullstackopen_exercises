const App = () => {
	const course = {
		name: "Half Stack application development",
		parts: [
			{ part: "Fundamentals of React", exercises: 10 },
			{ part: "Using props to pass data", exercises: 7 },
			{ part: "State of a component", exercises: 14 },
		],
		total: function () {
			let sum = 0;
			if (this.parts.length > 0) {
				this.parts.forEach((part) => {
					sum += part.exercises;
				});
			}
			return sum;
		},
	};

	const Header = ({ courseName }) => {
		return <h1>{courseName}</h1>;
	};

	const Part = ({ partName, exercises }) => {
		return (
			<p>
				{partName} {exercises}
			</p>
		);
	};

	const Content = ({ partsInfo }) => {
		return (
			<>
				{partsInfo.map((item, index) => (
					<Part
						key={item.part + index}
						partName={item.part}
						exercises={item.exercises}
					/>
				))}
			</>
		);
	};

	const Total = ({ total }) => {
		return <p>Number of exercises {total}</p>;
	};

	return (
		<div>
			<Header courseName={course.name} />
			<Content partsInfo={course.parts} />
			<Total total={course.total()} />
		</div>
	);
};

export default App;
