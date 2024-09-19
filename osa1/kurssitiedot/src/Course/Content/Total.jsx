const total = (props) => {
  const totalExercises = props.parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return (
    <div>
      <b>total of exercises {totalExercises}</b>
    </div>
  );
}


export default total