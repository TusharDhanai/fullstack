import { useState } from 'react'

const Button = (props) => {
    return (
        <button onClick={props.onClick}>{props.text}</button>
    )
}

const Feedback = () => {
    return(
        <div>
            <h1>Give Feedback</h1>
        </div>
    )
}

const Statistics = (props) => {
    return (
        <div>
            <h1>Statistics</h1>
            <p>{props.name[0]} {props.count[0]}</p>
            <p>{props.name[1]} {props.count[1]}</p>
            <p>{props.name[2]} {props.count[2]}</p>
        </div>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Feedback  />
            <Button text="good" onClick={() => setGood(good + 1)} />
            <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
            <Button text="bad" onClick={() => setBad(bad + 1)} />
            <Statistics name={["good","neutral","bad"]} count={[good,neutral,bad]} />
        </div>
    )
}

export default App;