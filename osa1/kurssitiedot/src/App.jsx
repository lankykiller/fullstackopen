import Course from './Course/Course'
import courses from './Course/Courses'

const App = () => {

return (
  <div>
    {courses.map(course => 
      <Course key={course.id} course={course} />
    )}
  </div>
)
}


export default App
