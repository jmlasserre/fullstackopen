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
      <Statistics stats={[{value: good, name: "good"},
                        {value: neutral, name: "neutral"},
                        {value: bad, name: "bad"},
                        {value: total, name: "total"},
                        {value: (good - bad)/total, name: "average"},
                        {value: (good/total)*100 + "%", name: "positive"},
                        ]}/>
    </div>
  )
}

const Header = ({ text }) => <h1>{text}</h1>

const Display = ({counter, name}) => <p>{name} {counter}</p>

const Statistics = ({ stats }) => {
  let map = stats.map((e) => <p key={e.name}>{e.name} {e.value}</p>);
  return (
    <div>
      {map}
    </div>
  )
}

export default App