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

const StatisticLine = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const Statistics = (props) => {
    const good = Number(props.count[0]);
    const neutral = Number(props.count[1]);
    const bad = Number(props.count[2]);

    if (good === 0 && neutral === 0 && bad === 0) {
        return <p>No Feedback given.</p>
    }

    const total = good + bad + neutral;
    const average = (good - bad) / total;
    const positive = good / total * 100
    return (
        <div>
            <h1>Statistics</h1>
            <table>
                <tbody>
                    <StatisticLine text={props.name[0]} value={good} />
                    <StatisticLine text={props.name[1]} value={neutral} />
                    <StatisticLine text={props.name[2]} value={bad} />
                    <StatisticLine text="All" value={total} />
                    <StatisticLine text="Average" value={average} />
                    <StatisticLine text="Positive" value={positive} />
                </tbody>
            </table>
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