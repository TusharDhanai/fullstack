import React, {useState,useEffect,useRef} from 'react';
import axios from 'axios';

const Input = ({onChange,value,id}) => {
    return (
        <input id={id} onChange={onChange} value={value} autoComplete="new-password" />
    )
}

function App() {
    const [input, setInput] = useState('')
    const [countryInfo, setCountryInfo] = useState([])

    const notInitialRender = useRef(false)

    useEffect(() => {
        if (notInitialRender.current)
            search(input)
        else 
            notInitialRender.current = true
    },[input]);

    const showInfo = item => {
        return (
            <div key={item.ccn3}>
                <h2>{item.name.common}</h2>
                <p><b>Capital: </b>{item.capital[0]}</p>
                <p><b>Area: </b>{item.area}</p>
                <h3>Languages:</h3>
                <ul>
                    {
                        Object.keys(item.languages).map(languageItem => {
                            return <li key={languageItem}>{item.languages[languageItem]}</li>
                        })
                    }
                </ul>
                <img src={item.flags.svg} height="300" width="300" alt={`Flag of ${item.name.common}`} />
            </div>
        )
    }

    const search = name => {
        if (name === '')        // exiting in case the query is empty
            return;
        
        axios
        .get(`https://restcountries.com/v3.1/name/${name}`)
        .then(Response => {
            if (Response.data.length > 10) 
                setCountryInfo(<p>Too many matches, specify another filter.</p>)
            else if (Response.data.length === 1) {
                setCountryInfo(showInfo(Response.data[0]))
            }
            else if (Response.data.length < 10 ) 
                setCountryInfo(() => Response.data.map(item => {
                    return (
                        <div key={item.ccn3}>
                            <span>{item.name.common}</span>
                            &nbsp;
                            <button onClick={() => setCountryInfo(showInfo(item))}>Show</button>
                        </div>
                    )
                }))
        })
    }

    return (
        <div className="App">
            <label>find countries </label>
            <Input id='search' value={input} onChange={event => setInput(event.target.value)} />
            <div id='results'>
                {countryInfo}
            </div>
        </div>
    );
}

export default App;
