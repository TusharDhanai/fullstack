import { useState,useEffect } from 'react'
import axios from 'axios'

const Person = ({name,number}) => <p>{name} {number}</p>

const People = ({persons,searchText}) => {
    return (
        <div>
            {
                persons.map(item => {
                    if (item.name.toLowerCase().includes(searchText.toLowerCase()))
                        return <Person key={item.id} name={item.name} number={item.number} />
                })
            }
        </div>
    )
}

const Input = ({text,onInput,autoComplete}) => {
    return (
        <div>
            {text}: <input onInput={onInput} autoComplete={autoComplete} />
        </div>
    )   
}

const Button = ({onClick,type,text}) => <button onClick={onClick} type={type}>{text}</button>

const PeopleForm = ({onNameInput,onNumberInput,onSubmit}) => {
    return (
        <form>
            <Input text="name" onInput={onNameInput} autoComplete="off" />
            <Input text="number" onInput={onNumberInput} autoComplete="off" />
            <Button onClick={onSubmit} type="submit" text="add" />
        </form>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchText, setSearchText] = useState('')

    const nameInput = event => setNewName(event.target.value)

    const numberInput = event => setNewNumber(event.target.value)

    const addPerson = (event) => {
        event.preventDefault();
        const duplicate = persons.some(item => item.name === newName);

        if (duplicate) {
            alert(`${newName} is already added to the phonebook.`)
            return;
        }

        setPersons(persons.concat({name: newName,number: newNumber,id: persons.length + 1}))
    }

    useEffect(()=>{
        axios
        .get('http://localhost:2000/persons')
        .then(response => {
            setPersons(response.data)
        })
    },[])

    return (
        <div>
            <h2>Phonebook</h2>
            <Input text="Search" onInput={event => setSearchText(event.target.value)} autoComplete='off' />
            <h2>Add new contact</h2>
            <PeopleForm onNameInput={nameInput} onNumberInput={numberInput} onSubmit={addPerson} />
            <h2>Numbers</h2>
            <People persons={persons} searchText={searchText} />
        </div>
    )
}

export default App