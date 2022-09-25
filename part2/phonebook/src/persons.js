import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = (contactData) => {
    return axios.post(baseUrl,contactData).then(response => response.data)
}

const delContact = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then()
}

export default {getAll,create,delContact}