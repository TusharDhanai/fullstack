const Header = ({course}) => {
    return (
        <div>
            <h1>{course}</h1>
        </div>
    )
}

const Part = ({part}) => {
    return (
        <div>
            <p>{part.name} {part.exercises}</p>
        </div>
    )
}

const Content = ({parts}) => {
    return (
        <div>
            <Part part={parts[0]} />
            <Part part={parts[1]} />
            <Part part={parts[2]} />
        </div>
    )
}

const Total = ({parts}) => {
    let totalCount = 0;
    parts.forEach(item => totalCount += item.exercises);
    return (
        <div>
            <p>Number of excercises {totalCount}</p>
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

const App = () => {
    const course = {
        id:1,
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
                id:1
            },
            {
                name: "Using props to pass data",
                exercises: 7,
                id:2
            },
            {
                name: "State of a component",
                exercises: 14,
                id:3
            },
        ]
    }
    return (
        <Course course={course} />
    )
}

export default App;