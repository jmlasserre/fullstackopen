const Course = ({ course }) => {
  const renderedParts = course.parts.map((c) => (
    <p key={c.id}>
      {c.name} {c.exercises}
    </p>
  ));
  const total = course.parts.reduce((sum, curr) => sum + curr.exercises, 0);
  return (
    <div>
      <h1>{course.name}</h1>
      {renderedParts}
      <b>total of {total} exercises</b>
    </div>
  );
};

export default Course;
