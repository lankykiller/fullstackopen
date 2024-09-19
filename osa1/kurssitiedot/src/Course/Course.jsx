import Content from "./Content/Content";
import Header from "./Header/Header";
import Total from "./Content/Total"

const Course = ({ course }) => {
    return (
        <div>
        <h1><Header header={course.name} /></h1>
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </div>
    );
    }

export default Course