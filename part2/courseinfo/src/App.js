const Header = ({course}) => {
    return (
        <div>
            <h2>{course}</h2>
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

const Content = ({parts}) => parts.map(item => <Part key={item.id} part={item} />)

const Total = ({parts}) => {
    let totalCount = parts.reduce((total,current) => total + current.exercises, 0)
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
            <Total parts={course.parts} />
        </div>
    )
}

const App = () => {
    const courses = [
        {
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
                {
                    name: "Redux",
                    exercises: 11,
                    id:4
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

    return (
        courses.map(item => <Course key={item.id} course={item} />)
    )
}

export default App;
