const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => (
  <div>
    <Part part={props.parts[0]} />
    <Part part={props.parts[1]} />
    <Part part={props.parts[2]} />
  </div>
);

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Total = (props) => <p>Number of exercises {props.total}</p>;

const Course = ({ course }) => {
  const renderedParts = course.parts.map((c) => <p key={c.id}>{c.name} {c.exercises}</p>);
  const total = course.parts.reduce((sum, curr) => sum + curr.exercises, 0);
  // No changes because I already calculated it using reduce. I watched the "Functional Programming in JS" videos and thought I could try my hand :P
  return (
    <div>
      <Header course={course.name}/>
      {renderedParts}
      <b>total of {total} exercises</b>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const renderedCourses = courses.map((c) => <div key={c.id}><Course course={c}/></div>)
  return (
    <div>
      {renderedCourses}
    </div>
  )
}

export default App;
