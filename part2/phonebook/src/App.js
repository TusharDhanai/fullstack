import { useState,useEffect } from 'react'
import personsService from './persons'

const Person = ({id,name,number,onDelete}) => {
    return (
        <p>
            {name} {number} &nbsp;
            <Button type='button' id={id} onClick={onDelete} text="Delete" />
        </p>
    )
}

const People = ({persons,searchText,onDelete}) => {
    return (
        <div>
            {
                persons.map(item => {
                    if (item.name.toLowerCase().includes(searchText.toLowerCase()))
                        return (
                            <Person key={item.id} name={item.name} 
                            number={item.number}
                            onDelete={onDelete}
                            id={item.id} />
                        )
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

const Button = ({id, onClick,type,text}) => <button id={id} onClick={onClick} type={type}>{text}</button>

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

        const contactData = {
            name: newName,
            number: newNumber
        }

        personsService.create(contactData).then(data => setPersons(persons.concat(data)))
    }

    const deletePerson = (event) => {
        const person = persons.find(item => event.target.id == item.id)
        if (window.confirm(`Are you sure you want to delete ${person.name}?`)){
            personsService.delContact(event.target.id)
            setPersons(persons.filter(item => item.id !== person.id))
        }
    }

    useEffect(()=>{
        personsService.getAll().then(data => setPersons(data))
    },[])

    return (
        <div>
            <h2>Phonebook</h2>
            <Input text="Search" onInput={event => setSearchText(event.target.value)} autoComplete='off' />
            <h2>Add new contact</h2>
            <PeopleForm onNameInput={nameInput} onNumberInput={numberInput} onSubmit={addPerson} />
            <h2>Numbers</h2>
            <People persons={persons} onDelete={deletePerson} searchText={searchText} />
        </div>
    )
}

export default App