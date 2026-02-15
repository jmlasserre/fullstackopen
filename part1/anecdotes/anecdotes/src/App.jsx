import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [maxVotes, setMaxVotes] = useState(0);
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState(0);

  // Based on: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  const getRandomInt = (max) => Math.floor(Math.random() * max);

  const handleNext = () => setSelected(getRandomInt(anecdotes.length));

  const handleVote = () => {
    let newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);
    if (newVotes[selected] > maxVotes) {
      setMaxVotes(newVotes[selected]);
      setMostVotedAnecdote(selected);
    }
  };
  if (!maxVotes) {
    return (
      <div>
        <Header text="Anecdote of the day" />
        <div>{anecdotes[selected]}</div>
        <div>has {votes[selected]} votes</div>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleNext}>next anecdote</button>
        <Header text="Anecdote with most votes" />
        <div>No votes have been submitted yet.</div>
      </div>
    );
  } else
    return (
      <div>
        <Header text="Anecdote of the day" />
        <div>{anecdotes[selected]}</div>
        <div>has {votes[selected]} votes</div>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleNext}>next anecdote</button>
        <Header text="Anecdote with most votes" />
        <div>{anecdotes[mostVotedAnecdote]}</div>
      </div>
    );
};

const Header = ({ text }) => <h2>{text}</h2>;

export default App;
