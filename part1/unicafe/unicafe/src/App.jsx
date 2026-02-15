import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
    setTotal(total + 1);
  };

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Header text="statistics" />
      <Statistics total={total} good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Header = ({ text }) => <h1>{text}</h1>;

const Display = ({ counter, name }) => (
  <p>
    {name} {counter}
  </p>
);

const Statistics = ({ total, good, neutral, bad }) => {
  if (!total)
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  else {
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={total} />
            <StatisticLine text="average" value={((good - bad) / total).toFixed(1)} />
            <StatisticLine text="positive" value={((good / total) * 100).toFixed(1) + " %"} />
          </tbody>
        </table>
      </div>
    );
  }
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

export default App;