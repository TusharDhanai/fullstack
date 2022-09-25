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

const Notification = ({className,text}) => {
    if (text === null)
        return
    
    return (
        <div className={className}>
            {text}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchText, setSearchText] = useState('')
    const [notif, setNotif] = useState('')
    const [notifClass, setNotifClass] = useState('')

    const nameInput = event => setNewName(event.target.value)

    const numberInput = event => setNewNumber(event.target.value)

    const addPerson = (event) => {
        event.preventDefault();
        const duplicate = persons.find(item => item.name === newName);

        const contactData = {
            name: newName,
            number: newNumber
        }

        if (duplicate) {
            let shouldUpdateContact = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
            if (shouldUpdateContact) {
                personsService
                .update(duplicate.id,contactData)
                .then(data => setPersons(data))
                .then(() => {
                    setNotifClass('updated')
                    setNotif('Updated Contact successfully.')
                    setTimeout(() => setNotif(null),5*1000)
                }).catch(error => {
                    if (error.request.status === 404) {
                        setNotifClass('deleted')
                        setNotif('Information does not exist on the server.')
                        setTimeout(() => setNotif(null),5*1000)
                    }
                })
            }
            return;
        }

        personsService.create(contactData)
        .then(data => setPersons(persons.concat(data)))
        .then(() => {
            setNotifClass('created')
            setNotif('Added contact successfully.')
            setTimeout(() => setNotif(null), 5*1000);
        })
    }

    const deletePerson = (event) => {
        const person = persons.find(item => event.target.id == item.id)

        if (person === undefined) {
            setNotifClass('deleted')
            setNotif('No such person with this name')
            setTimeout(() => setNotif(null),5*1000)
            return
        }

        if (window.confirm(`Are you sure you want to delete ${person.name}?`)){
            personsService.delContact(event.target.id)
            .then(() => setPersons(persons.filter(item => item.id !== person.id)))
            .then(() => {
                setNotifClass('deleted')
                setNotif('Deleted contact successfully.')
                setTimeout(() => setNotif(null),5*1000)
            })
        }
    }

    useEffect(()=>{
        personsService.getAll().then(data => setPersons(data))
    },[])

    return (
        <div>
            <h2>Phonebook</h2>
            <Input text="Search" onInput={event => setSearchText(event.target.value)} autoComplete='off' />
            <Notification className={notifClass} text={notif} />
            <h2>Add new contact</h2>
            <PeopleForm onNameInput={nameInput} onNumberInput={numberInput} onSubmit={addPerson} />
            <h2>Numbers</h2>
            <People persons={persons} onDelete={deletePerson} searchText={searchText} />
        </div>
    )
}

export default App