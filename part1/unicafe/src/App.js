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
    const good = Number(props.count[0]);
    const neutral = Number(props.count[1]);
    const bad = Number(props.count[2]);
    const total = good + bad + neutral;
    const average = (good - bad) / total;
    console.log(average)
    const positive = good / total * 100
    return (
        <div>
            <h1>Statistics</h1>
            <p>{props.name[0]} {good}</p>
            <p>{props.name[1]} {neutral}</p>
            <p>{props.name[2]} {bad}</p>
            <p>All {total}</p>
            <p>Average {total != 0 ? average:0}</p>
            <p>Positive {total != 0 ? positive:0}%</p>
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