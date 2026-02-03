const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const exercises = [
    { part: part1, exerciseNumber: exercises1 },
    { part: part2, exerciseNumber: exercises2 },
    { part: part3, exerciseNumber: exercises3 }
  ];

  return (
    <div>
      <Header name={course}/>
      <Content exercises={exercises}/>
      <Total value={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

const Header = (props) => {
    return (
      <>
        <h1>{props.name}</h1>
      </>
    )
}

const Content = (props) => {
  return (
    <>
     <p>
        {props.exercises[0].part} {props.exercises[0].exerciseNumber}
      </p>
      <p>
        {props.exercises[1].part} {props.exercises[1].exerciseNumber}
      </p>
      <p>
        {props.exercises[2].part} {props.exercises[2].exerciseNumber}
      </p>
    </>
  )
     
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.value}</p> 
    </>
  )
}

export default App