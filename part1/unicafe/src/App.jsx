import { useState } from "react";

const Button = ({ onClick, children }) => (
	<button onClick={onClick}>{children}</button>
);

const Statistics = ({ totalGood, totalNeutral, totalBad }) => {
	return (
		<>
			<p>Good {totalGood}</p>
			<p>Neutral {totalNeutral}</p>
			<p>Bad {totalBad}</p>
		</>
	);
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
