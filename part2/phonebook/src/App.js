import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { 
            name: 'Arto Hellas',
        }
    ])
    const [newName, setNewName] = useState('')

    const addPerson = (event) => {
        event.preventDefault();
        const duplicate = persons.some(item => item.name === newName);

        if (duplicate) {
            alert(`${newName} is already added to the phonebook.`)
            return;
        }

        setPersons(persons.concat({name: newName}))
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
                {persons.map(item => <p key={item.name}>{item.name}</p>)}
            </div>
        </div>
    )
}

export default App