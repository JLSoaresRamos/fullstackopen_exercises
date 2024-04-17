import { useState } from "react";

const Button = ({ onClick, children }) => (
	<button onClick={onClick}>{children}</button>
);

const StatisticLine = ({ text, votes }) => (
	<p>
		{text} {votes}
	</p>
);

const Statistics = ({ totalGood, totalNeutral, totalBad }) => {
	const totalVotes = totalBad + totalNeutral + totalGood;
	const goodPercentage = (totalGood / totalVotes) * 100;

	if (totalVotes > 0) {
		return (
			<>
				<StatisticLine text="Good" votes={totalGood} />
				<StatisticLine text="Neutral" votes={totalNeutral} />
				<StatisticLine text="Bad" votes={totalBad} />
				<StatisticLine text="All" votes={totalVotes} />
				<StatisticLine text="Positive" votes={goodPercentage + "%"} />
			</>
		);
	} else {
		return <p>No feedback given</p>;
	}
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<main>
			<h1>Give Feedback</h1>

			<Button onClick={() => setGood(good + 1)}>Good</Button>
			<Button onClick={() => setNeutral(neutral + 1)}>Neutral</Button>
			<Button onClick={() => setBad(bad + 1)}>Bad</Button>

			<h2>Statistics</h2>
			<Statistics totalBad={bad} totalGood={good} totalNeutral={neutral} />
		</main>
	);
};

export default App;
