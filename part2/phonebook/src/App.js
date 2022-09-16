import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchText, setSearchText] = useState('')

    const addPerson = (event) => {
        event.preventDefault();
        const duplicate = persons.some(item => item.name === newName);

        if (duplicate) {
            alert(`${newName} is already added to the phonebook.`)
            return;
        }

        setPersons(persons.concat({name: newName,number: newNumber,id: persons.length + 1}))
    }

    return (
        <div>
            <h2>Phonebook</h2>
            search :<input onInput={event => setSearchText(event.target.value)} autoComplete='off' />
            <h2>Add new contact</h2>
            <form>
                <div>
                    name: <input onInput={event => setNewName(event.target.value)} autoComplete="off" />
                </div>
                <div>
                    number: <input onInput={event => setNewNumber(event.target.value)} autoComplete="off" />
                </div>
                <div>
                    <button onClick={addPerson} type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {
                    persons.map(item => {
                        if (item.name.toLowerCase().includes(searchText.toLowerCase()))
                            return <p key={item.id}>{item.name} {item.number}</p>
                    })
                }
            </div>
        </div>
    )
}

export default App