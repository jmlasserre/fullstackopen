import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0);

  const handleGood = () => {
    setGood(good+1);
    setTotal(total+1);
  }

  const handleNeutral = () => {
    setNeutral(neutral+1);
    setTotal(total+1);
  }

  const handleBad = () => {
    setBad(bad+1);
    setTotal(total+1);
  }

  return (
    <div>
      <Header text="give feedback"/>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <Header text="statistics"/>
      <Display counter={good} name="good"/>
      <Display counter={neutral} name="neutral"/>
      <Display counter={bad} name="bad"/>
      <Display counter={total} name="total"/>
      <Display counter={(good - bad)/total} name="average"/>
      <Display counter={(good/total)*100 + "%"} name="positive"/>
    </div>
  )
}

const Header = ({ text }) => <h1>{text}</h1>

const Display = ({counter, name}) => <p>{name} {counter}</p>

export default App