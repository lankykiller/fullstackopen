const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  console.log(now, a+b)

  return(
    <div>
      <h1>Greetings</h1>
      <Hello/>
    </div>
  )
}

const Hello = () => {
  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}
export default App
