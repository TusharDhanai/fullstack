import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { 
            name: 'Arto Hellas',
            id: 1
        }
    ])
    const [newName, setNewName] = useState('')

    const addPerson = (event) => {
        event.preventDefault();
        setPersons(persons.concat({name: newName,id: persons.length + 1}))
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input onInput={event => setNewName(event.target.value)} autoComplete="off" />
                </div>
                <div>
                    <button onClick={addPerson} type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {persons.map(item => <p key={item.id}>{item.name}</p>)}
            </div>
        </div>
    )
}

export default App