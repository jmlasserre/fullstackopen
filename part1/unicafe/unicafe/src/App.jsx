import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback"/>
      <button onClick={() => setGood(good+1)}>good</button>
      <button onClick={() => setNeutral(neutral+1)}>neutral</button>
      <button onClick={() => setBad(bad+1)}>bad</button>
      <Header text="statistics"/>
      <Display counter={good} name="good"/>
      <Display counter={neutral} name="neutral"/>
      <Display counter={bad} name="bad"/>
    </div>
  )
}

const Header = ({ text }) => <h1>{text}</h1>

const Display = ({counter, name}) => <p>{name} {counter}</p>

export default App