import { useState } from "react";

const App = () => {
	const [selected, setSelected] = useState(0);
	const [mostVotedAnecdote, setMostVotedAnecdote] = useState({});
	const [anecdotes, setAnecdotes] = useState([
		{ phrase: "If it hurts, do it more often.", votes: 0 },
		{
			phrase: "Adding manpower to a late software project makes it later!",
			votes: 0,
		},
		{
			phrase:
				"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
			votes: 0,
		},
		{
			phrase:
				"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
			votes: 0,
		},
		{ phrase: "Premature optimization is the root of all evil.", votes: 0 },
		{
			phrase:
				"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
			votes: 0,
		},
		{
			phrase:
				"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
			votes: 0,
		},
		{ phrase: "The only way to go fast, is to go well.", votes: 0 },
	]);

	console.log(mostVotedAnecdote);

	const handleNextAnecdote = () => {
		setSelected(() => {
			return Math.floor(Math.random() * anecdotes.length);
		});
	};

	const handleUpdateMostVotedAnecdote = () => {
		//Assuming that the first anectode is the most voted
		let winner = 0;
		let latestMostVoted = anecdotes[0].votes;

		anecdotes.forEach((anecdote, index) => {
			if (index > 0) {
				if (latestMostVoted < anecdote.votes) {
					latestMostVoted = anecdote.votes;
					winner = index;
				}
			}
		});

		setMostVotedAnecdote(anecdotes[winner]);
	};

	const handleVote = () => {
		const copyAnecdotes = [...anecdotes];
		copyAnecdotes[selected].votes += 1;

		setAnecdotes(copyAnecdotes);
		handleUpdateMostVotedAnecdote();
	};

	return (
		<main>
			<section>
				<h1>Anecdote of the day</h1>
				<p>
					{anecdotes[selected].phrase}
					<br />
					has {anecdotes[selected].votes} votes
				</p>
			</section>
			<section>
				<h2>Anectode with most votes</h2>
				<p>
					{mostVotedAnecdote.phrase}
					<br />
					has {mostVotedAnecdote.votes} votes
				</p>
			</section>
			<div>
				<button onClick={handleNextAnecdote}>Next Anecdotes</button>
				<button onClick={handleVote}>Vote</button>
			</div>
		</main>
	);
};

export default App;
