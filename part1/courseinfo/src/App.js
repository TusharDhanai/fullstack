const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.name} {props.count}</p>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part name={props.names[0]} count={props.count[0]} />
            <Part name={props.names[1]} count={props.count[1]} />
            <Part name={props.names[2]} count={props.count[2]} />
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>Number of excercises {props.totalCount}</p>
        </div>
        )
}

const App = () => {
    const course = "Half Stack application development"
    const part1 = "Fundamentals of React"
    const exercises1 = 10
    const part2 = "Using props to pass data"
    const exercises2 = 7
    const part3 = "State of a component"
    const exercises3 = 14
    
    return (
        <div>
            <Header course={course} />

            <Content names={[part1,part2,part3]} count={[exercises1,exercises2,exercises3]} />

            <Total totalCount={exercises1 + exercises2 + exercises3} />
        </div>
    )
}

export default App;
