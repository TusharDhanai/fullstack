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

export default Course;